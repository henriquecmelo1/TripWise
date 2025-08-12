import { type ItineraryData } from '../../data/itineraryInterface'; // Importa a interface

interface ItineraryHeaderProps {
  itinerary: ItineraryData;
  onViewTimeline?: () => void;
  destination?: string;
  duration?: string;
}

export default function ItineraryHeader({ itinerary, onViewTimeline, destination, duration }: ItineraryHeaderProps) {
  const displayDestination = destination ?? itinerary.destino;
  const displayDuration = duration ?? itinerary.duracao;

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{itinerary.tematicaNarrativa}</h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{itinerary.resumoExecutivo}</p>

      {/* Chips com informações chave (somente se existirem) */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {displayDestination && (
          <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
            Destino: {displayDestination}
          </span>
        )}
        {displayDuration && (
          <span className="px-3 py-1 text-sm rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
            Duração: {displayDuration === '1' ? '1 dia' : `${displayDuration} dias`}
          </span>
        )}
      </div>

      {/* Botão para ver timeline (prioriza mobile) */}
      {onViewTimeline && (
        <div className="mt-2">
          <button
            onClick={onViewTimeline}
            className="sm:hidden inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Ver Timeline
          </button>
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">{itinerary.fonteDados}</p>
    </div>
  );
}