import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  type?: 'destination' | 'activity' | 'hotel' | 'restaurant';
}

interface InteractiveMapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showRoute?: boolean;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  height = '400px',
  showRoute = false,
  className = '',
}) => {
  const { isDarkMode } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const getLocationIcon = (type: string = 'destination') => {
    const icons = {
      destination: '🏛️',
      activity: '🎯',
      hotel: '🏨',
      restaurant: '🍽️',
    };
    return icons[type as keyof typeof icons] || icons.destination;
  };

  const getLocationColor = (type: string = 'destination') => {
    const colors = {
      destination: 'bg-red-500',
      activity: 'bg-blue-500',
      hotel: 'bg-green-500',
      restaurant: 'bg-yellow-500',
    };
    return colors[type as keyof typeof colors] || colors.destination;
  };

  if (locations.length === 0) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-500 dark:text-gray-400">Nenhuma localização para exibir no mapa</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`} style={{ height }}>
      <div className={`h-full w-full relative ${
        isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
        {/* Map Header */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              🗺️ Mapa Interativo
              <span className="text-sm font-normal text-gray-500">({locations.length} locais)</span>
            </h3>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="pt-20 p-6 h-full overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  selectedLocation?.id === location.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedLocation(selectedLocation?.id === location.id ? null : location)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${getLocationColor(location.type)} flex items-center justify-center text-white font-bold`}>
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">{location.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                      {location.type || 'destination'}
                    </p>
                    {location.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {location.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Route Information */}
          {showRoute && locations.length > 1 && (
            <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                🛣️ Rota Sugerida
              </h4>
              <div className="space-y-2">
                {locations.map((location, index) => (
                  <div key={location.id} className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{location.name}</span>
                    {index < locations.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{selectedLocation.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedLocation.description}</p>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;