// src/components/Itinerary/SpecialConsiderationsSection.tsx

interface SpecialConsiderationsSectionProps {
  considerations: string;
  iconLightbulb: string; // Reutilizando a lâmpada para "Considerações"
}

export default function SpecialConsiderationsSection({ considerations, iconLightbulb }: SpecialConsiderationsSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-teal-500" dangerouslySetInnerHTML={{ __html: iconLightbulb }} />
        Considerações Especiais
      </h3>
      <div className="bg-teal-50 p-5 rounded-lg shadow-sm border border-teal-200">
        <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: considerations }} />
      </div>
    </div>
  );
}