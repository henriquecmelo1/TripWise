// src/components/Itinerary/ItineraryFooter.tsx
import { type BackendItineraryResponse } from '../../data/mockItineraryResponse';

interface ItineraryFooterProps {
  personalizedFor: BackendItineraryResponse['personalizedFor'];
  generatedAt: string;
  recommendation: string;
}

export default function ItineraryFooter({ personalizedFor, generatedAt, recommendation }: ItineraryFooterProps) {
  return (
    <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
      <p>Roteiro personalizado para: {personalizedFor.travelDNA} (confiança: {(personalizedFor.confidence * 100).toFixed(0)}%)</p>
      <p>Gerado em: {new Date(generatedAt).toLocaleString()}</p>
      <p className="font-semibold mt-1">{recommendation}</p>
    </div>
  );
}