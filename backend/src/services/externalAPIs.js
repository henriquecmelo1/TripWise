import "dotenv/config";
import { createApi } from "unsplash-js";
import {
  API_BASE_URLS,
  FOURSQUARE_CATEGORIES,
  API_LIMITS,
  API_VERSIONS,
  CURRENCY_SYMBOLS,
  RESTAURANT_PRICE_RANGES,
  HOTEL_PRICE_RANGES,
  HOTEL_TYPES,
  ERROR_MESSAGES,
  DEFAULT_CURRENCIES,
} from "../constants/externalAPIs.constants.js";
import logger from "../utils/logger.js";
import rateLimiter from "../middleware/rateLimiting.js";

class ExternalAPIsService {
  constructor() {
    this.apis = {
      weather: {
        openWeather: process.env.OPENWEATHER_API_KEY,
      },
      places: {
        foursquare: process.env.FOURSQUARE_API_KEY,
      },
      exchange: {
        exchangeRate: process.env.EXCHANGE_RATE_API_KEY,
      },
      photos: {
        unsplash: process.env.UNSPLASH_ACCESS_KEY,
      },
    };

    // Initialize Unsplash API
    this.unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
    });
  }

  async getWeatherData(destination, dates) {
    const startTime = Date.now();

    try {
      // Verifica rate limit
      rateLimiter.checkApiLimit("weather");

      if (!this.isWeatherForecastAvailable(dates)) {
        logger.warn("Previsão meteorológica não disponível", {
          destination,
          dates,
          reason: "dates_out_of_range",
        });

        return {
          success: false,
          error: ERROR_MESSAGES.WEATHER_NOT_AVAILABLE,
          message: ERROR_MESSAGES.WEATHER_RELIABILITY,
          fallback: this.generateWeatherFallback(destination),
          canProvideHistoricalData: true,
        };
      }

      const weatherData = await this.getOpenWeatherData(destination, dates);

      logger.logExternalApiCall(
        "OpenWeather",
        `forecast/${destination}`,
        true,
        Date.now() - startTime
      );

      return {
        success: true,
        currentWeather: weatherData.current,
        forecast: weatherData.forecast,
        recommendations: this.generateWeatherRecommendations(weatherData),
        source: "OpenWeatherMap",
        validUntil: this.getValidForecastDate(),
      };
    } catch (error) {
      logger.logExternalApiCall(
        "OpenWeather",
        `forecast/${destination}`,
        false,
        Date.now() - startTime,
        error
      );

      return this.generateWeatherFallback(destination, error);
    }
  }

  async getOpenWeatherData(destination, dates) {
    if (!this.apis.weather.openWeather) {
      throw new Error("API Key OpenWeather não configurada");
    }

    try {
      const response = await fetch(
        `${API_BASE_URLS.OPENWEATHER}/forecast?q=${encodeURIComponent(
          destination
        )}&appid=${this.apis.weather.openWeather}&units=metric&lang=pt_br`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("API Key OpenWeather inválida");
        } else if (response.status === 404) {
          throw new Error(`Localização '${destination}' não encontrada`);
        } else if (response.status === 429) {
          throw new Error("Limite de requisições da API OpenWeather excedido");
        }
        throw new Error(`Erro na API OpenWeather: ${response.status}`);
      }

      const data = await response.json();

      if (!data.list || !Array.isArray(data.list) || data.list.length === 0) {
        throw new Error("Dados de previsão meteorológica inválidos");
      }

      return {
        current: {
          temperature: Math.round(data.list[0].main.temp),
          description: data.list[0].weather[0].description,
          humidity: data.list[0].main.humidity,
          windSpeed: data.list[0].wind.speed,
          location: data.city?.name || destination,
        },
        forecast: data.list.slice(0, 5).map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("pt-BR"),
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          rain: item.rain ? item.rain["3h"] || 0 : 0,
          timestamp: item.dt,
        })),
      };
    } catch (error) {
      console.error("Erro detalhado na API OpenWeather:", error.message);
      throw error;
    }
  }

  async getRestaurantData(location, userPreferences) {
    try {
      const restaurantData = await this.getFoursquareData(
        location,
        "restaurant",
        userPreferences
      );

      return {
        success: true,
        restaurants: this.processRestaurantData(restaurantData),
        totalFound: restaurantData.length,
        source: "Foursquare",
      };
    } catch (error) {
      console.error("Erro ao obter dados de restaurantes:", error);
      return {
        success: false,
        error: "Dados de restaurantes não disponíveis",
        fallback: ERROR_MESSAGES.RESTAURANT_FALLBACK,
      };
    }
  }

  async getHotelData(location, userPreferences) {
    try {
      const hotelData = await this.getFoursquareData(
        location,
        "hotel",
        userPreferences
      );

      return {
        success: true,
        hotels: this.processHotelData(hotelData),
        totalFound: hotelData.length,
        source: "Foursquare",
      };
    } catch (error) {
      console.error("Erro ao obter dados de hotéis:", error);
      return {
        success: false,
        error: "Dados de hotéis não disponíveis",
        fallback: ERROR_MESSAGES.HOTEL_FALLBACK,
      };
    }
  }

  async getFoursquareData(location, category, preferences) {
    if (!this.apis.places.foursquare) {
      throw new Error("API Key Foursquare não configurada");
    }

    const categoryMap = {
      restaurant: FOURSQUARE_CATEGORIES.RESTAURANT,
      attraction: FOURSQUARE_CATEGORIES.ATTRACTION,
      hotel: FOURSQUARE_CATEGORIES.HOTEL,
    };

    try {
      const response = await fetch(
        `${API_BASE_URLS.FOURSQUARE}/places/search?near=${encodeURIComponent(
          location
        )}&fsq_category_ids=${categoryMap[category]}&limit=${
          API_LIMITS.FOURSQUARE_SEARCH_LIMIT
        }`,
        {
          headers: {
            accept: "application/json",
            "X-Places-Api-Version": API_VERSIONS.FOURSQUARE_PLACES,
            authorization: `Bearer ${this.apis.places.foursquare}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("API Key Foursquare inválida");
        } else if (response.status === 429) {
          throw new Error("Limite de requisições da API Foursquare excedido");
        } else if (response.status === 400) {
          throw new Error(`Localização '${location}' inválida para Foursquare`);
        }
        console.log("Detalhes do erro na API Foursquare:", response);
        throw new Error(`Erro na API Foursquare: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || !Array.isArray(data.results)) {
        console.warn("Estrutura de dados Foursquare inesperada:", data);
        return [];
      }

      return data.results.map((place) => ({
        name: place.name || "Nome não disponível",
        address: place.location?.formatted_address || "Endereço não disponível",
        rating: place.rating || null,
        price: place.price || null,
        categories: place.categories
          ? place.categories.map((cat) => cat.name)
          : [],
        coordinates: place.geocodes?.main
          ? {
              lat: place.geocodes.main.latitude,
              lng: place.geocodes.main.longitude,
            }
          : null,
        source: "Foursquare",
        id: place.fsq_id,
      }));
    } catch (error) {
      console.error("Erro detalhado na API Foursquare:", error.message);
      throw error;
    }
  }

  async getExchangeRates(
    baseCurrency = DEFAULT_CURRENCIES.BASE,
    targetCurrencies = DEFAULT_CURRENCIES.TARGETS
  ) {
    try {
      if (!this.apis.exchange.exchangeRate) {
        throw new Error("API Key ExchangeRate não configurada");
      }

      const response = await fetch(
        `${API_BASE_URLS.EXCHANGE_RATE}/${this.apis.exchange.exchangeRate}/latest/${baseCurrency}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("API Key ExchangeRate inválida");
        } else if (response.status === 429) {
          throw new Error("Limite de requisições da API ExchangeRate excedido");
        }
        throw new Error(`Erro na API de câmbio: ${response.status}`);
      }

      const data = await response.json();

      if (!data.rates || typeof data.rates !== "object") {
        throw new Error("Dados de câmbio inválidos recebidos da API");
      }

      const rates = {};

      targetCurrencies.forEach((currency) => {
        if (data.rates[currency]) {
          rates[currency] = {
            rate: data.rates[currency],
            symbol: this.getCurrencySymbol(currency),
            lastUpdate: data.date,
          };
        } else {
          console.warn(`Taxa de câmbio para ${currency} não encontrada`);
        }
      });

      return {
        success: true,
        baseCurrency,
        rates,
        lastUpdate: data.date,
        source: "ExchangeRate-API",
      };
    } catch (error) {
      console.error("Erro ao obter taxas de câmbio:", error.message);
      return {
        success: false,
        error: "Dados de câmbio não disponíveis",
        fallback: ERROR_MESSAGES.EXCHANGE_FALLBACK,
        details: error.message,
      };
    }
  }

  isWeatherForecastAvailable(dates) {
    if (!dates || (!dates.startDate && !dates.departureDate)) {
      return false;
    }

    const travelDate = new Date(dates.startDate || dates.departureDate);
    const currentDate = new Date();
    const maxForecastDate = new Date();
    maxForecastDate.setDate(
      currentDate.getDate() + API_LIMITS.WEATHER_FORECAST_DAYS
    );

    return travelDate <= maxForecastDate && travelDate >= currentDate;
  }

  getValidForecastDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + API_LIMITS.WEATHER_FORECAST_DAYS);
    return maxDate.toLocaleDateString("pt-BR");
  }

  generateWeatherRecommendations(weatherData) {
    const recommendations = [];

    if (weatherData.current.temperature < 15) {
      recommendations.push("Leve roupas quentes e agasalhos");
    }

    if (weatherData.forecast.some((day) => day.rain > 0)) {
      recommendations.push("Inclua atividades indoor como alternativa");
      recommendations.push("Leve guarda-chuva ou capa de chuva");
    }

    if (weatherData.current.temperature > 30) {
      recommendations.push("Prefira atividades matinais ou noturnas");
      recommendations.push("Mantenha-se hidratado e use protetor solar");
    }

    return recommendations;
  }

  processRestaurantData(rawData) {
    return rawData
      .filter((restaurant) => {
        return restaurant.name && restaurant.name !== "Nome não disponível";
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, API_LIMITS.RESTAURANT_RESULTS_LIMIT)
      .map((restaurant) => ({
        ...restaurant,
        priceRange: this.interpretPriceLevel(restaurant.price),
        recommendedFor: this.getRecommendationReason(restaurant),
      }));
  }

  processHotelData(rawData) {
    return rawData
      .filter((hotel) => {
        return hotel.name && hotel.name !== "Nome não disponível";
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, API_LIMITS.HOTEL_RESULTS_LIMIT)
      .map((hotel) => ({
        ...hotel,
        priceRange: this.interpretHotelPriceLevel(hotel.price),
        recommendedFor: this.getHotelRecommendationReason(hotel),
        hotelType: this.categorizeHotelType(hotel.categories),
      }));
  }

  interpretPriceLevel(price) {
    if (!price || price === null) return "Preço não informado";

    return RESTAURANT_PRICE_RANGES[price] || "Preço não informado";
  }

  interpretHotelPriceLevel(price) {
    if (!price || price === null) return "Preço não informado";

    return HOTEL_PRICE_RANGES[price] || "Preço não informado";
  }

  getCurrencySymbol(currency) {
    return CURRENCY_SYMBOLS[currency] || currency;
  }

  getRecommendationReason(restaurant) {
    if (restaurant.rating > 4.5) return "Altamente avaliado pelos usuários";
    if (restaurant.categories.includes("Local"))
      return "Experiência autêntica local";
    if (restaurant.price <= 2) return "Boa relação custo-benefício";
    return "Recomendado pela qualidade";
  }

  getHotelRecommendationReason(hotel) {
    if (hotel.rating > 4.5) return "Excelência em hospedagem";
    if (hotel.categories.some((cat) => cat.toLowerCase().includes("boutique")))
      return "Hotel boutique com charme único";
    if (hotel.categories.some((cat) => cat.toLowerCase().includes("luxury")))
      return "Experiência de luxo premium";
    if (hotel.price <= 2) return "Excelente custo-benefício";
    if (hotel.categories.some((cat) => cat.toLowerCase().includes("historic")))
      return "Hotel histórico com personalidade";
    return "Recomendado pela qualidade e localização";
  }

  categorizeHotelType(categories) {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return HOTEL_TYPES.STANDARD;
    }

    const categoryNames = categories.map((cat) => cat.toLowerCase()).join(" ");

    if (categoryNames.includes("luxury") || categoryNames.includes("resort"))
      return HOTEL_TYPES.LUXURY_RESORT;
    if (categoryNames.includes("boutique")) return HOTEL_TYPES.BOUTIQUE;
    if (categoryNames.includes("business")) return HOTEL_TYPES.BUSINESS;
    if (categoryNames.includes("historic")) return HOTEL_TYPES.HISTORIC;
    if (categoryNames.includes("hostel")) return HOTEL_TYPES.HOSTEL;

    return HOTEL_TYPES.STANDARD;
  }

  /**
   * Get destination photos from Unsplash
   * @param {string} destination - Destination name
   * @param {number} count - Number of photos to fetch (default: 3)
   * @param {string} query - Custom search query (optional)
   * @returns {Object} Photos data or error
   */
  async getDestinationPhotos(destination, count = 3, query = null) {
    try {
      if (!this.apis.photos.unsplash) {
        return {
          success: false,
          error: "Unsplash API key not configured",
          photos: [],
        };
      }

      const searchQuery = query || `${destination} travel destination`;

      const result = await this.unsplash.search.getPhotos({
        query: searchQuery,
        page: 1,
        perPage: Math.min(count, 10), // Limit to max 10 photos
        orientation: "landscape",
        contentFilter: "high", // Get high quality photos
      });

      console.log("result");

      if (result.type === "success") {
        const photos = result.response.results.map((photo) => ({
          id: photo.id,
          urls: {
            small: photo.urls.small,
            regular: photo.urls.regular,
            full: photo.urls.full,
          },
          alt_description: photo.alt_description || `Photo of ${destination}`,
          user: {
            name: photo.user.name,
            username: photo.user.username,
          },
          links: {
            download: photo.links.download_location,
            html: photo.links.html,
          },
        }));

        return {
          success: true,
          photos,
          total: result.response.total,
          source: "Unsplash",
          query: searchQuery,
        };
      } else {
        return {
          success: false,
          error: "Failed to fetch photos from Unsplash",
          details: result.errors,
          photos: [],
        };
      }
    } catch (error) {
      console.error("Error fetching Unsplash photos:", error);
      return {
        success: false,
        error: "Error fetching destination photos",
        details: error.message,
        photos: [],
      };
    }
  }

  /**
   * Check if Unsplash API is available
   * @returns {boolean} True if API key is configured
   */
  isUnsplashAvailable() {
    return !!this.apis.photos.unsplash;
  }

  /**
   * Gera fallback para dados meteorológicos quando API falha
   */
  generateWeatherFallback(destination, error = null) {
    const month = new Date().getMonth();
    const isWinter = month === 11 || month === 0 || month === 1;
    const isSummer = month >= 5 && month <= 7;

    // Recomendações genéricas baseadas na época do ano
    const seasonalAdvice = [];
    if (isWinter) {
      seasonalAdvice.push("Leve roupas quentes e agasalhos");
      seasonalAdvice.push("Verifique se há aquecimento na hospedagem");
    } else if (isSummer) {
      seasonalAdvice.push("Leve roupas leves e protetor solar");
      seasonalAdvice.push("Mantenha-se hidratado");
    } else {
      seasonalAdvice.push("Leve roupas para clima variável");
      seasonalAdvice.push("Tenha um casaco leve sempre à mão");
    }

    return {
      success: false,
      error: "Dados meteorológicos não disponíveis",
      fallback: {
        message: "Consulte a previsão do tempo local antes da viagem",
        seasonalAdvice,
        generalTips: [
          "Verifique a previsão 24h antes da viagem",
          "Prepare-se para mudanças climáticas inesperadas",
          "Consulte fontes locais de meteorologia",
        ],
      },
      source: "Fallback Sazonal",
    };
  }

  /**
   * Gera fallback para restaurantes quando API falha
   */
  generateRestaurantFallback(location) {
    return {
      success: false,
      error: "Dados de restaurantes não disponíveis",
      fallback: {
        message: "Explore restaurantes locais usando essas dicas",
        suggestions: [
          "Pergunte aos locais por recomendações",
          "Busque restaurantes com boa movimentação",
          "Evite locais muito turísticos para experiência autêntica",
          "Consulte apps locais como Zomato ou TripAdvisor",
        ],
        alternatives: [
          "Google Maps - busque por 'restaurantes próximos'",
          "TripAdvisor - filtre por avaliações altas",
          "Yelp (se disponível na região)",
        ],
      },
      source: "Fallback Genérico",
    };
  }

  /**
   * Gera fallback para hotéis quando API falha
   */
  generateHotelFallback(location) {
    return {
      success: false,
      error: "Dados de hotéis não disponíveis",
      fallback: {
        message: "Use estas plataformas confiáveis para hospedagem",
        platforms: [
          "Booking.com - maior variedade",
          "Airbnb - experiências locais",
          "Hotels.com - programas de fidelidade",
          "Expedia - pacotes completos",
        ],
        tips: [
          "Reserve com antecedência para melhores preços",
          "Verifique políticas de cancelamento",
          "Leia avaliações recentes de outros hóspedes",
          "Considere localização vs preço",
        ],
      },
      source: "Fallback Genérico",
    };
  }

  /**
   * Verifica saúde das APIs externas
   */
  async checkApiHealth() {
    const health = {
      weather: false,
      places: false,
      exchange: false,
      timestamp: new Date().toISOString(),
    };

    // Testa OpenWeather
    try {
      if (this.apis.weather.openWeather) {
        const response = await fetch(
          `${API_BASE_URLS.OPENWEATHER}/weather?q=London&appid=${this.apis.weather.openWeather}`,
          { signal: AbortSignal.timeout(5000) }
        );
        health.weather = response.ok;
      }
    } catch (error) {
      logger.debug("Weather API health check failed", { error: error.message });
    }

    // Testa Foursquare
    try {
      if (this.apis.places.foursquare) {
        const response = await fetch(
          `${API_BASE_URLS.FOURSQUARE}/places/search?near=London&limit=1`,
          {
            headers: {
              authorization: `Bearer ${this.apis.places.foursquare}`,
            },
            signal: AbortSignal.timeout(5000),
          }
        );
        health.places = response.ok;
      }
    } catch (error) {
      logger.debug("Places API health check failed", { error: error.message });
    }

    // Testa Exchange
    try {
      if (this.apis.exchange.exchangeRate) {
        const response = await fetch(
          `${API_BASE_URLS.EXCHANGE_RATE}/${this.apis.exchange.exchangeRate}/latest/USD`,
          { signal: AbortSignal.timeout(5000) }
        );
        health.exchange = response.ok;
      }
    } catch (error) {
      logger.debug("Exchange API health check failed", {
        error: error.message,
      });
    }

    return health;
  }
}

export default ExternalAPIsService;
