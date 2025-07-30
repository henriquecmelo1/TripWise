// src/pages/ItineraryPage.tsx
import { type BackendItineraryResponse, mockItineraryResponse } from '../data/mockItineraryResponse';
import { iconDiamond, iconCalendar, iconActivity, iconMeals, iconHotel as iconHotel, iconBriefcase, iconStar, iconLightbulb, iconDollarSign } from '../assets/icons';

// Importa os novos componentes
import ItineraryHeader from '../components/Itinerary/Header';
import DailyItinerarySection from '../components/Itinerary/DailyItinerarySection';
import RecommendationsSection from '../components/Itinerary/RecommendationsSection';
import ExperiencesGemsTipsSection from '../components/Itinerary/ExperiencesGemsTipsSection';
import BudgetSection from '../components/Itinerary/BudgetSection';
import SpecialConsiderationsSection from '../components/Itinerary/SpecialConsiderationsSection';
import ItineraryFooter from '../components/Itinerary/Footer';


interface ItineraryPageProps {
  itineraryData?: BackendItineraryResponse;
}

export default function ItineraryPage({ itineraryData = mockItineraryResponse }: ItineraryPageProps) {
  const itinerary = itineraryData.itinerary;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <ItineraryHeader itinerary={itinerary} />

        <DailyItinerarySection
          itinerarioDiario={itinerary.itinerarioDiario}
          iconCalendar={iconCalendar}
          iconActivity={iconActivity}
          iconMeals={iconMeals}
          iconHotel={iconHotel}
          iconBriefcase={iconBriefcase}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8 mt-8">
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

        <ItineraryFooter
          personalizedFor={itineraryData.personalizedFor}
          generatedAt={itineraryData.generatedAt}
          recommendation={itineraryData.recommendation}
        />
      </div>
    </div>
  );
}