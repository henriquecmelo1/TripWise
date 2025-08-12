import React, { useState, useEffect } from 'react';
import { type BackendItineraryResponse } from '../data/itineraryInterface';
import { iconDiamond, iconCalendar, iconActivity, iconMeals, iconHotel as iconHotel, iconBriefcase, iconStar, iconLightbulb, iconDollarSign } from '../assets/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';
import { useItineraryHistory } from '../hooks/useItineraryHistory';

import ItineraryHeader from '../components/Itinerary/Header';
import DailyItinerarySection from '../components/Itinerary/DailyItinerarySection';
import RecommendationsSection from '../components/Itinerary/RecommendationsSection';
import ExperiencesGemsTipsSection from '../components/Itinerary/ExperiencesGemsTipsSection';
import BudgetSection from '../components/Itinerary/BudgetSection';
import SpecialConsiderationsSection from '../components/Itinerary/SpecialConsiderationsSection';
import InteractiveMap from '../components/Map/InteractiveMap';
import ItineraryTimeline from '../components/Timeline/ItineraryTimeline';
import { useLocation } from 'react-router-dom';
import { exportItineraryToPDF } from '../services/pdfExportService';
import { searchDestinationPhotos, type UnsplashPhoto } from '../services/unsplashService';




export default function ItineraryPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { addToFavorites, isFavorite } = useFavorites();
  const { addToHistory } = useItineraryHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'map'>('overview');
  const [destinationPhotos, setDestinationPhotos] = useState<UnsplashPhoto[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const itineraryData: BackendItineraryResponse = location.state.itinerary;
  
  if(!itineraryData) {
    return(<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Nenhum itinerário encontrado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Por favor, volte e preencha o formulário corretamente.
        </p>
      </div>)
  }
  const itinerary = itineraryData.itinerary;

  // Load destination photos and add to history on mount
  useEffect(() => {
    const loadDestinationPhotos = async () => {
      try {
        const photos = await searchDestinationPhotos(itinerary.destino, 3);
        setDestinationPhotos(photos);
      } catch (error) {
        console.error('Error loading destination photos:', error);
      }
    };

    // Add to history
    addToHistory({
      title: `Roteiro para ${itinerary.destino}`,
      destination: itinerary.destino,
      duration: itinerary.duracao,
      data: itineraryData,
    });

    loadDestinationPhotos();
  }, [itinerary.destino, itinerary.duracao, addToHistory, itineraryData]);

  // Generate mock locations for map (in a real app, this would come from the itinerary data)
  const generateMapLocations = () => {
    // This is a simplified example - in reality, you'd extract locations from the itinerary
    const baseCoords = getDestinationCoordinates(itinerary.destino);
    const locations = [];
    
    // Add main destination
    locations.push({
      id: 'destination',
      name: itinerary.destino,
      lat: baseCoords.lat,
      lng: baseCoords.lng,
      description: `Destino principal da viagem`,
      type: 'destination' as const,
    });

    // Add some mock locations around the destination
    if (itinerary.itinerarioDiario) {
      itinerary.itinerarioDiario.forEach((day, dayIndex) => {
        if (day.atividades) {
          day.atividades.slice(0, 2).forEach((activity, actIndex) => {
            locations.push({
              id: `day-${dayIndex}-activity-${actIndex}`,
              name: activity.nome || activity.atividade || 'Atividade',
              lat: baseCoords.lat + (Math.random() - 0.5) * 0.02,
              lng: baseCoords.lng + (Math.random() - 0.5) * 0.02,
              description: activity.descricao || 'Atividade do itinerário',
              type: 'activity' as const,
            });
          });
        }
      });
    }

    return locations;
  };

  // Simple function to get approximate coordinates (in a real app, use a geocoding service)
  const getDestinationCoordinates = (destination: string) => {
    const coordinates: { [key: string]: { lat: number; lng: number } } = {
      'paris': { lat: 48.8566, lng: 2.3522 },
      'london': { lat: 51.5074, lng: -0.1278 },
      'tokyo': { lat: 35.6762, lng: 139.6503 },
      'new york': { lat: 40.7128, lng: -74.0060 },
      'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
      'são paulo': { lat: -23.5505, lng: -46.6333 },
      'barcelona': { lat: 41.3851, lng: 2.1734 },
      'rome': { lat: 41.9028, lng: 12.4964 },
    };
    
    const key = destination.toLowerCase();
    return coordinates[key] || { lat: 0, lng: 0 };
  };

  const generateTimelineData = () => {
    if (!itinerary.itinerarioDiario) return [];
    
    return itinerary.itinerarioDiario.map((day, index) => ({
      day: index + 1,
      date: `Dia ${index + 1}`,
      events: day.atividades?.map((activity, actIndex) => ({
        id: `day-${index}-event-${actIndex}`,
        time: activity.horario || `${8 + actIndex * 2}:00`,
        title: activity.nome || activity.atividade || 'Atividade',
        description: activity.descricao,
        type: activity.tipo || 'activity',
        duration: activity.duracao || '2h',
        location: activity.local,
      })) || [],
    }));
  };

  const handleAddToFavorites = () => {
    addToFavorites({
      title: `Roteiro para ${itinerary.destino}`,
      destination: itinerary.destino,
      duration: itinerary.duracao,
      data: itineraryData,
    });
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportItineraryToPDF({
        title: `Roteiro para ${itinerary.destino}`,
        destination: itinerary.destino,
        duration: itinerary.duracao,
        dailyItinerary: itinerary.itinerarioDiario,
        budget: itinerary.orcamentoDetalhado,
        recommendations: itinerary.recomendacoesHospedagem,
        experiences: itinerary.experienciasUnicas,
        specialConsiderations: itinerary.consideracoesEspeciais,
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const mapLocations = generateMapLocations();
  const timelineData = generateTimelineData();
  const isAlreadyFavorite = isFavorite(`Roteiro para ${itinerary.destino}`, itinerary.destino);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Seu Roteiro de Viagem
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
                Itinerário personalizado criado especialmente para você
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Export PDF Button */}
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                title="Exportar para PDF"
              >
                {isExporting ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span className="hidden sm:inline">{isExporting ? 'Exportando...' : 'PDF'}</span>
              </button>

              {/* Add to Favorites Button */}
              <button
                onClick={handleAddToFavorites}
                disabled={isAlreadyFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 ${
                  isAlreadyFavorite
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
                title={isAlreadyFavorite ? 'Já está nos favoritos' : 'Adicionar aos favoritos'}
              >
                <span className="text-lg">{isAlreadyFavorite ? '⭐' : '☆'}</span>
                <span className="hidden sm:inline">{isAlreadyFavorite ? 'Favoritado' : 'Favoritar'}</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                aria-label="Alternar modo escuro"
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5 text-yellow-500 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-700 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'map'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Mapa Interativo
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'timeline'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Timeline
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8 transition-colors duration-300">
            <ItineraryHeader itinerary={itinerary} />

            <DailyItinerarySection
              itinerarioDiario={itinerary.itinerarioDiario}
              iconCalendar={iconCalendar}
              iconActivity={iconActivity}
              iconMeals={iconMeals}
              iconHotel={iconHotel}
              iconBriefcase={iconBriefcase}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
              <div className="space-y-6">
                <RecommendationsSection
                  recommendations={itinerary.recomendacoesHospedagem}
                  iconHotel={iconHotel}
                />
                <ExperiencesGemsTipsSection
                  experienciasUnicas={itinerary.experienciasUnicas}
                  joiasEscondidas={itinerary.joiasEscondidas}
                  dicasEspecialistas={itinerary.dicasEspecialistas}
                  iconStar={iconStar}
                  iconDiamond={iconDiamond}
                  iconLightbulb={iconLightbulb}
                />
              </div>
              <div className="space-y-6">
                <BudgetSection
                  budget={itinerary.orcamentoDetalhado}
                  iconDollarSign={iconDollarSign}
                />
                <SpecialConsiderationsSection
                  considerations={itinerary.consideracoesEspeciais}
                  iconLightbulb={iconLightbulb}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Mapa Interativo
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explore os locais do seu itinerário no mapa interativo abaixo.
              </p>
              <div className="h-96 rounded-lg overflow-hidden">
                <InteractiveMap locations={mapLocations} />
              </div>
            </div>
            
            {/* Destination Photos */}
            {destinationPhotos.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Fotos dos Destinos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destinationPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo.urls.small}
                        alt={photo.alt_description || 'Destino'}
                        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-end">
                        <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium">{photo.alt_description}</p>
                          <p className="text-xs">Por {photo.user.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Timeline do Itinerário
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Visualize seu itinerário em uma timeline organizada por dias e atividades.
              </p>
              <ItineraryTimeline events={timelineData} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}