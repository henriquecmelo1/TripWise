import { type ItineraryData } from '../../data/itineraryInterface'; // Importa a interface

interface ItineraryHeaderProps {
  itinerary: ItineraryData;
}

export default function ItineraryHeader({ itinerary }: ItineraryHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{itinerary.tematicaNarrativa}</h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{itinerary.resumoExecutivo}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic">{itinerary.fonteDados}</p>
    </div>
  );
}