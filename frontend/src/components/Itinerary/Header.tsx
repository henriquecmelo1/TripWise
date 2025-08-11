// src/components/Itinerary/ItineraryHeader.tsx
import { type ItineraryData } from '../../data/itineraryInterface'; // Importa a interface

interface ItineraryHeaderProps {
  itinerary: ItineraryData;
}

export default function ItineraryHeader({ itinerary }: ItineraryHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{itinerary.tematicaNarrativa}</h1>
      <p className="text-gray-600 text-lg mb-4">{itinerary.resumoExecutivo}</p>
      <p className="text-sm text-gray-500 italic">{itinerary.fonteDados}</p>
    </div>
  );
}