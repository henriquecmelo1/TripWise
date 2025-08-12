export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  ENDPOINTS: {
    AI: {
      BASE: '/api/ai',
      HEALTH: '/api/ai/health',
      GENERATE_ITINERARY: '/api/ai/itinerary/generate',
      CHAT: '/api/ai/chat',
      PROFILE: {
        CREATE: '/api/ai/profile/create',
        UPDATE: '/api/ai/profile/update',
        GET: '/api/ai/profile/get',
      },
      ONBOARDING: {
        QUESTIONS: '/api/ai/onboarding/questions',
      },
    },
    EXTERNAL: {
      PHOTOS: '/api/external/photos',
      WEATHER: '/api/external/weather',
      FLIGHTS: '/api/external/flights',
    },
  },
} as const;

export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};
export const getDefaultHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = buildApiUrl(endpoint);
  const config: RequestInit = {
    ...options,
    headers: {
      ...getDefaultHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};