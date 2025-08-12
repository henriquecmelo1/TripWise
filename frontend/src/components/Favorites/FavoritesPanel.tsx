import React, { useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

interface FavoritesPanelProps {
  className?: string;
}

const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ className = '' }) => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const navigate = useNavigate();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleViewItinerary = (favorite: any) => {
    // Navigate to itinerary page with the favorite data
    navigate('/itinerary', { state: { itinerary: favorite.data } });
  };

  const handleRemoveFavorite = (id: string) => {
    removeFromFavorites(id);
  };

  const handleClearAll = () => {
    clearFavorites();
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

  if (favorites.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">⭐</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum favorito ainda
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Adicione itinerários aos seus favoritos para acessá-los rapidamente
        </p>
        <button
          onClick={() => navigate('/questionnaire')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Criar Novo Itinerário
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Meus Favoritos
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'itinerário salvo' : 'itinerários salvos'}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
          >
            Limpar Todos
          </button>
        )}
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    {favorite.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    📍 {favorite.destination}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Remover dos favoritos"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-2">⏱️</span>
                  <span>{favorite.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-2">📅</span>
                  <span>Salvo em {formatDate(favorite.createdAt)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewItinerary(favorite)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Ver Itinerário
                </button>
                <button
                  onClick={() => {
                    // Copy to clipboard or share functionality
                    navigator.clipboard.writeText(`${favorite.title} - ${favorite.destination}`);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  title="Compartilhar"
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirmar Limpeza
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem certeza que deseja remover todos os favoritos? Esta ação não pode ser desfeita.
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
                Limpar Todos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPanel;