// src/components/Itinerary/RecommendationsSection.tsx
import { type RecomendacoesHospedagem } from '../../data/mockItineraryResponse';

interface RecommendationsSectionProps {
  recommendations: RecomendacoesHospedagem;
  iconBed: string;
}

export default function RecommendationsSection({ recommendations, iconBed }: RecommendationsSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-red-500" dangerouslySetInnerHTML={{ __html: iconBed }} />
        Recomendações de Hospedagem
      </h3>
      <div className="bg-red-50 p-5 rounded-lg shadow-sm border border-red-200">
        <p className="text-lg font-bold text-gray-800 mb-2">Hotel Principal:</p>
        <p className="text-base text-gray-700 ml-4">{recommendations.hotelPrincipal}</p>
        <p className="text-lg font-bold text-gray-800 mt-4 mb-2">Alternativas:</p>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4 space-y-1">
          {recommendations.alternativas.map((alt, i) => <li key={i}>{alt}</li>)}
        </ul>
        <p className="text-lg font-bold text-gray-800 mt-4 mb-2">Justificativa:</p>
        <p className="text-base text-gray-700 ml-4" dangerouslySetInnerHTML={{ __html: recommendations.justificativa }} />
      </div>
    </div>
  );
}