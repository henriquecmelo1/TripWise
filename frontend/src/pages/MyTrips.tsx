import React, { useState } from 'react';
import FavoritesPanel from '../components/Favorites/FavoritesPanel';
import HistoryPanel from '../components/History/HistoryPanel';

const MyTrips: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Minhas Viagens
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus itinerários favoritos e histórico de viagens
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'favorites'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>⭐</span>
                  Favoritos
                </span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>📚</span>
                  Histórico
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {activeTab === 'favorites' && <FavoritesPanel />}
          {activeTab === 'history' && <HistoryPanel />}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;