import { type RecomendacoesHospedagem } from '../../data/itineraryInterface';

interface RecommendationsSectionProps {
  recommendations: RecomendacoesHospedagem;
  iconHotel: string;
}

export default function RecommendationsSection({ recommendations, iconHotel }: RecommendationsSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
        <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-red-500 dark:text-red-400" dangerouslySetInnerHTML={{ __html: iconHotel }} />
        Recomendações de Hospedagem
      </h3>
      <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg shadow-sm border border-red-200 dark:border-red-700">
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Hotel Principal:</p>
        <p className="text-base text-gray-700 dark:text-gray-300 ml-4">{recommendations.hotelPrincipal}</p>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">Alternativas:</p>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 ml-4 space-y-1">
          {recommendations.alternativas.map((alt, i) => <li key={i}>{alt}</li>)}
        </ul>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">Justificativa:</p>
        <p className="text-base text-gray-700 dark:text-gray-300 ml-4" dangerouslySetInnerHTML={{ __html: recommendations.justificativa }} />
      </div>
    </div>
  );
}