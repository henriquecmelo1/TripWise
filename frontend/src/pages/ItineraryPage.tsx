import { type BackendItineraryResponse } from '../data/itineraryInterface';
import { iconDiamond, iconCalendar, iconActivity, iconMeals, iconHotel as iconHotel, iconBriefcase, iconStar, iconLightbulb, iconDollarSign } from '../assets/icons';
import { useTheme } from '../contexts/ThemeContext';

import ItineraryHeader from '../components/Itinerary/Header';
import DailyItinerarySection from '../components/Itinerary/DailyItinerarySection';
import RecommendationsSection from '../components/Itinerary/RecommendationsSection';
import ExperiencesGemsTipsSection from '../components/Itinerary/ExperiencesGemsTipsSection';
import BudgetSection from '../components/Itinerary/BudgetSection';
import SpecialConsiderationsSection from '../components/Itinerary/SpecialConsiderationsSection';
import { useLocation } from 'react-router-dom';




export default function ItineraryPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

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
            
            <div className="flex items-center space-x-4">
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
    </div>
  );
}