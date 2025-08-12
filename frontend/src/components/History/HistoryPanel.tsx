import React, { useState } from 'react';
import { useItineraryHistory } from '../../hooks/useItineraryHistory';
import { useFavorites } from '../../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

interface HistoryPanelProps {
  className?: string;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ className = '' }) => {
  const { history, removeFromHistory, clearHistory } = useItineraryHistory();
  const { addToFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewItinerary = (historyItem: any) => {
    navigate('/itinerary', { state: { itinerary: historyItem.data } });
  };

  const handleAddToFavorites = (historyItem: any) => {
    if (!isFavorite(historyItem.title, historyItem.destination)) {
      addToFavorites({
        title: historyItem.title,
        destination: historyItem.destination,
        duration: historyItem.duration,
        data: historyItem.data,
      });
    }
  };

  const handleRemoveFromHistory = (id: string) => {
    removeFromHistory(id);
  };

  const handleClearAll = () => {
    clearHistory();
    setShowConfirmClear(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}sem atrás`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}m atrás`;
  };

  if (history.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum histórico ainda
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Seus itinerários gerados aparecerão aqui automaticamente
        </p>
        <button
          onClick={() => navigate('/questionnaire')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Criar Primeiro Itinerário
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Histórico de Itinerários
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {history.length} {history.length === 1 ? 'itinerário gerado' : 'itinerários gerados'}
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Buscar itinerários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {history.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors whitespace-nowrap"
            >
              Limpar Histórico
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((historyItem) => (
          <div
            key={historyItem.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                      {historyItem.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      📍 {historyItem.destination}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    {getTimeAgo(historyItem.createdAt)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <span className="mr-2">⏱️</span>
                    <span>{historyItem.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>{formatDate(historyItem.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleViewItinerary(historyItem)}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Ver Itinerário
                </button>
                
                <button
                  onClick={() => handleAddToFavorites(historyItem)}
                  disabled={isFavorite(historyItem.title, historyItem.destination)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isFavorite(historyItem.title, historyItem.destination)
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                  title={isFavorite(historyItem.title, historyItem.destination) ? 'Já está nos favoritos' : 'Adicionar aos favoritos'}
                >
                  {isFavorite(historyItem.title, historyItem.destination) ? '⭐' : '☆'}
                </button>
                
                <button
                  onClick={() => handleRemoveFromHistory(historyItem.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  title="Remover do histórico"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum itinerário encontrado para "{searchTerm}"
          </p>
        </div>
      )}

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirmar Limpeza do Histórico
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Limpar Histórico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;