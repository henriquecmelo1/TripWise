import { useState, useEffect, useCallback } from 'react';

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

  const addToHistory = useCallback((itinerary: Omit<ItineraryHistoryItem, 'id' | 'createdAt'>) => {
    // Check if this itinerary already exists in history to avoid duplicates
    const existingItem = history.find(item => 
      item.title === itinerary.title && 
      item.destination === itinerary.destination &&
      JSON.stringify(item.data) === JSON.stringify(itinerary.data)
    );
    
    if (existingItem) {
      return; // Don't add duplicate
    }

    const newHistoryItem: ItineraryHistoryItem = {
      ...itinerary,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    // Keep only the last 50 items to prevent localStorage from getting too large
    const updatedHistory = [newHistoryItem, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('tripwise-history', JSON.stringify(updatedHistory));
  }, [history]);

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