import "dotenv/config";

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
    };
  }

  async getWeatherData(destination, dates) {
    try {
      if (!this.isWeatherForecastAvailable(dates)) {
        return {
          success: false,
          error: "Previsão meteorológica não disponível para datas distantes",
          message:
            "Dados meteorológicos só são confiáveis para viagens até 5 dias no futuro",
          fallback:
            "Consulte dados históricos do clima ou planeje roupas para todas as estações",
          canProvideHistoricalData: true,
        };
      }

      const weatherData = await this.getOpenWeatherData(destination, dates);

      return {
        success: true,
        currentWeather: weatherData.current,
        forecast: weatherData.forecast,
        recommendations: this.generateWeatherRecommendations(weatherData),
        source: "OpenWeatherMap",
        validUntil: this.getValidForecastDate(),
      };
    } catch (error) {
      console.error("Erro ao obter dados meteorológicos:", error);
      return {
        success: false,
        error: "Dados meteorológicos não disponíveis",
        fallback: "Consulte a previsão local antes de viajar",
      };
    }
  }

  async getOpenWeatherData(destination, dates) {
    if (!this.apis.weather.openWeather) {
      throw new Error("API Key OpenWeather não configurada");
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
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
        fallback: "Consulte avaliações locais",
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
        fallback: "Consulte Booking.com ou Airbnb",
      };
    }
  }

  async getFoursquareData(location, category, preferences) {
    if (!this.apis.places.foursquare) {
      throw new Error("API Key Foursquare não configurada");
    }

    const categoryMap = {
      restaurant: "4d4b7105d754a06374d81259",
      attraction: "5109983191d435c0d71c2bb1",
      hotel: "4bf58dd8d48988d1fa931735",
    };

    try {
      const response = await fetch(
        `https://places-api.foursquare.com/places/search?near=${encodeURIComponent(
          location
        )}&fsq_category_ids=${categoryMap[category]}&limit=20`,
        {
          headers: {
            accept: "application/json",
            "X-Places-Api-Version": "2025-06-17",
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
    baseCurrency = "BRL",
    targetCurrencies = ["USD", "EUR"]
  ) {
    try {
      if (!this.apis.exchange.exchangeRate) {
        throw new Error("API Key ExchangeRate não configurada");
      }

      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${this.apis.exchange.exchangeRate}/latest/${baseCurrency}`
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
        fallback: "Consulte XE.com para taxas atuais",
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
    maxForecastDate.setDate(currentDate.getDate() + 5);

    return travelDate <= maxForecastDate && travelDate >= currentDate;
  }

  getValidForecastDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
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
        return (
          restaurant.name &&
          restaurant.name !== "Nome não disponível" &&
          restaurant.rating &&
          restaurant.rating > 4.0
        );
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((restaurant) => ({
        ...restaurant,
        priceRange: this.interpretPriceLevel(restaurant.price),
        recommendedFor: this.getRecommendationReason(restaurant),
      }));
  }

  processHotelData(rawData) {
    return rawData
      .filter((hotel) => {
        return (
          hotel.name &&
          hotel.name !== "Nome não disponível" &&
          hotel.rating &&
          hotel.rating > 3.5
        );
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)
      .map((hotel) => ({
        ...hotel,
        priceRange: this.interpretHotelPriceLevel(hotel.price),
        recommendedFor: this.getHotelRecommendationReason(hotel),
        hotelType: this.categorizeHotelType(hotel.categories),
      }));
  }

  interpretPriceLevel(price) {
    if (!price || price === null) return "Preço não informado";

    const priceMap = {
      1: "Econômico ($ - até R$ 30)",
      2: "Moderado ($$ - R$ 30-60)",
      3: "Caro ($$$ - R$ 60-120)",
      4: "Muito Caro ($$$$ - acima de R$ 120)",
    };
    return priceMap[price] || "Preço não informado";
  }

  interpretHotelPriceLevel(price) {
    if (!price || price === null) return "Preço não informado";

    const priceMap = {
      1: "Econômico ($ - até R$ 150/noite)",
      2: "Moderado ($$ - R$ 150-300/noite)",
      3: "Caro ($$$ - R$ 300-600/noite)",
      4: "Luxo ($$$$ - acima de R$ 600/noite)",
    };
    return priceMap[price] || "Preço não informado";
  }

  getCurrencySymbol(currency) {
    const symbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      BRL: "R$",
    };
    return symbols[currency] || currency;
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
      return "Hotel Padrão";
    }

    const categoryNames = categories.map((cat) => cat.toLowerCase()).join(" ");

    if (categoryNames.includes("luxury") || categoryNames.includes("resort"))
      return "Luxo/Resort";
    if (categoryNames.includes("boutique")) return "Boutique";
    if (categoryNames.includes("business")) return "Executivo";
    if (categoryNames.includes("historic")) return "Histórico";
    if (categoryNames.includes("hostel")) return "Hostel";

    return "Hotel Padrão";
  }
}

export default ExternalAPIsService;
