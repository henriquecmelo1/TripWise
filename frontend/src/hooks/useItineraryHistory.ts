import { useState, useEffect } from 'react';

interface ItineraryHistoryItem {
  id: string;
  title: string;
  destination: string;
  duration: string;
  createdAt: string;
  data: any;
  searchParams?: any;
}

export const useItineraryHistory = () => {
  const [history, setHistory] = useState<ItineraryHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('tripwise-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing history from localStorage:', error);
        localStorage.removeItem('tripwise-history');
      }
    }
  }, []);

  const addToHistory = (itinerary: Omit<ItineraryHistoryItem, 'id' | 'createdAt'>) => {
    const newHistoryItem: ItineraryHistoryItem = {
      ...itinerary,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    // Keep only the last 50 items to prevent localStorage from getting too large
    const updatedHistory = [newHistoryItem, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('tripwise-history', JSON.stringify(updatedHistory));
  };

  const removeFromHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('tripwise-history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tripwise-history');
  };

  const getHistoryItem = (id: string) => {
    return history.find(item => item.id === id);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
  };
};