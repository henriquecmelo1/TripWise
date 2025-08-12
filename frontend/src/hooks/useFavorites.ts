import { useState, useEffect } from 'react';

interface FavoriteItinerary {
  id: string;
  title: string;
  destination: string;
  duration: string;
  createdAt: string;
  data: any; // Full itinerary data
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItinerary[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('tripwise-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem('tripwise-favorites');
      }
    }
  }, []);

  const addToFavorites = (itinerary: Omit<FavoriteItinerary, 'id' | 'createdAt'>) => {
    const newFavorite: FavoriteItinerary = {
      ...itinerary,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('tripwise-favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('tripwise-favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (title: string, destination: string) => {
    return favorites.some(fav => fav.title === title && fav.destination === destination);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('tripwise-favorites');
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };
};