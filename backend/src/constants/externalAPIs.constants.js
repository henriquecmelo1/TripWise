export const API_BASE_URLS = {
  OPENWEATHER: "https://api.openweathermap.org/data/2.5",
  FOURSQUARE: "https://places-api.foursquare.com",
  EXCHANGE_RATE: "https://v6.exchangerate-api.com/v6",
};

export const FOURSQUARE_CATEGORIES = {
  RESTAURANT: "4d4b7105d754a06374d81259",
  ATTRACTION: "5109983191d435c0d71c2bb1",
  HOTEL: "4bf58dd8d48988d1fa931735",
};

export const API_LIMITS = {
  WEATHER_FORECAST_DAYS: 5,
  FOURSQUARE_SEARCH_LIMIT: 20,
  RESTAURANT_RESULTS_LIMIT: 10,
  HOTEL_RESULTS_LIMIT: 8,
  MIN_RESTAURANT_RATING: 4.0,
  MIN_HOTEL_RATING: 3.5,
};

export const API_VERSIONS = {
  FOURSQUARE_PLACES: "2025-06-17",
};

export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  BRL: "R$",
};

export const RESTAURANT_PRICE_RANGES = {
  1: "Econômico ($ - até R$ 30)",
  2: "Moderado ($$ - R$ 30-60)",
  3: "Caro ($$$ - R$ 60-120)",
  4: "Muito Caro ($$$$ - acima de R$ 120)",
};

export const HOTEL_PRICE_RANGES = {
  1: "Econômico ($ - até R$ 150/noite)",
  2: "Moderado ($$ - R$ 150-300/noite)",
  3: "Caro ($$$ - R$ 300-600/noite)",
  4: "Luxo ($$$$ - acima de R$ 600/noite)",
};

export const HOTEL_TYPES = {
  LUXURY_RESORT: "Luxo/Resort",
  BOUTIQUE: "Boutique",
  BUSINESS: "Executivo",
  HISTORIC: "Histórico",
  HOSTEL: "Hostel",
  STANDARD: "Hotel Padrão",
};

export const ERROR_MESSAGES = {
  WEATHER_NOT_AVAILABLE:
    "Previsão meteorológica não disponível para datas distantes",
  WEATHER_RELIABILITY:
    "Dados meteorológicos só são confiáveis para viagens até 5 dias no futuro",
  WEATHER_FALLBACK:
    "Consulte dados históricos do clima ou planeje roupas para todas as estações",
  RESTAURANT_FALLBACK: "Consulte avaliações locais",
  HOTEL_FALLBACK: "Consulte Booking.com ou Airbnb",
  EXCHANGE_FALLBACK: "Consulte XE.com para taxas atuais",
  WEATHER_TRAVEL_ADVICE: "Consulte a previsão local antes de viajar",
};

export const DEFAULT_CURRENCIES = {
  BASE: "BRL",
  TARGETS: ["USD", "EUR"],
};
