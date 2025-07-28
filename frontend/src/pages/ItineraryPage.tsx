// src/pages/ItineraryPage.tsx
import React from 'react';
import { type BackendItineraryResponse, mockItineraryResponse } from '../data/mockItineraryResponse';

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

  // Definições de TODOS os SVGs aqui, para passar para os componentes filhos
  const iconCalendar = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>';
  const iconActivity = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
  const iconMeals = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 6C8.75 4.9 7.85 4 6.75 4s-2 0.9-2 2 .9 2 2 2 2-0.9 2-2zm-2 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-10-8h10c1.1 0 2-.9 2-2s-.9-2-2-2H8.75c-1.1 0-2 .9-2 2s.9 2 2 2z"/></svg>';
  const iconBed = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 7H8v5h2V7zm-2 7H6v3H4v-3H2v5h2v-2h2v2h2v-5zm12 0v5h2v-5h-2zm-2 0h-2v3h-2v-3h-2v5h2v-2h2v2h2v-5zM14 7h-2v5h2V7z"/></svg>';
  const iconBriefcase = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-1.99.9-1.99 2L2 19c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/></svg>';
  const iconStar = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L6 21z"/></svg>';
  const iconDiamond = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L3 8l9 15 9-15-9-7zm0 14.99L5.41 9.8L12 4.41l6.59 5.39L12 15z"/></svg>';
  const iconLightbulb = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.96 2 6.5 4.46 6.5 7.5c0 2.47 1.48 4.54 3.78 5.48.55.23 1.14.35 1.72.35.58 0 1.17-.12 1.72-.35 2.3-1.07 3.78-3.14 3.78-5.48C17.5 4.46 15.04 2 12 2zm0 10.5C9.79 12.5 8 10.71 8 8.5 8 6.47 9.47 5 11.5 5h1c2.03 0 3.5 1.47 3.5 3.5 0 2.21-1.79 4-4 4z"/></svg>';
  const iconDollarSign = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <ItineraryHeader itinerary={itinerary} />

        <DailyItinerarySection
          itinerarioDiario={itinerary.itinerarioDiario}
          iconCalendar={iconCalendar}
          iconActivity={iconActivity}
          iconMeals={iconMeals}
          iconBed={iconBed}
          iconBriefcase={iconBriefcase}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8 mt-8">
          <div className="space-y-6">
            <RecommendationsSection
              recommendations={itinerary.recomendacoesHospedagem}
              iconBed={iconBed}
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