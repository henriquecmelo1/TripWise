import { buildApiUrl, API_CONFIG } from '../constants/api';

export interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
}

export const searchDestinationPhotos = async (
  destination: string,
  count: number = 3
): Promise<UnsplashPhoto[]> => {
  try {
    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.EXTERNAL.PHOTOS), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination,
        count,
        query: `${destination} travel destination`,
      }),
    });

    if (!response.ok) {
      console.warn('Failed to fetch photos from backend');
      return [];
    }

    const data = await response.json();
    
    if (data.success && data.photos) {
      return data.photos;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching destination photos:', error);
    return [];
  }
};