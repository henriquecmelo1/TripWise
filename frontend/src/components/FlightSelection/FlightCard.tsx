// src/components/FlightSelection/FlightCard.tsx
import type { Flight } from '../../data/mockFlights'; // Importa a interface Flight
 // Importa a interface Flight

interface FlightCardProps {
  flight: Flight;
  // Ícones SVG para uso interno do card
  planeIcon: string;
  clockIcon: string;
}

export default function FlightCard({ flight, clockIcon }: FlightCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 flex items-center">
      {/* Coluna da Esquerda: Companhia e Horários */}
      <div className="flex-shrink-0 mr-4 text-center">
        {/* Logo da Companhia / Ícone de Avião */}
        <span className="inline-flex justify-center items-center w-8 h-8 text-blue-600 mb-1" dangerouslySetInnerHTML={{ __html: flight.airlineLogoIcon }} />
        <p className="text-sm font-semibold text-gray-700">{flight.airline}</p>
      </div>

      {/* Coluna Central: Detalhes do Voo (Horários, Duração, Destino) */}
      <div className="flex-grow flex flex-col items-center justify-center mx-4">
        {/* Horários e Origem */}
        <div className="flex items-center w-full justify-between">
          <p className="text-lg font-bold text-gray-800">{flight.departureTime}</p>
          <p className="text-sm text-gray-500">{flight.originAirport}</p>
        </div>

        {/* Linha de Duração e Seta */}
        <div className="flex items-center w-full my-2">
          <span className="text-gray-400 text-xl mx-2">→</span>
          <div className="flex items-center text-gray-500 text-xs">
            <span className="inline-flex justify-center items-center w-4 h-4 mr-1" dangerouslySetInnerHTML={{ __html: clockIcon }} />
            {flight.duration}
          </div>
          <div className="flex-grow border-t border-gray-300 mx-2"></div>
        </div>

        {/* Horário de Chegada e Destino */}
        <div className="flex items-center w-full justify-between">
          <p className="text-lg font-bold text-gray-800">{flight.arrivalTime}</p>
          <p className="text-sm text-gray-500">{flight.destination}</p>
        </div>
      </div>

      {/* Coluna da Direita: Preço e Tipo de Voo */}
      <div className="flex-shrink-0 ml-4 text-right">
        <p className="text-xl font-bold text-green-600">{formatCurrency(flight.price)}</p>
        <p className="text-xs text-gray-500">por pessoa</p>
        <span className={`inline-block px-2 py-1 mt-1 rounded text-xs font-semibold
          ${flight.type === 'Direto' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
          {flight.type}
        </span>
      </div>
    </div>
  );
}