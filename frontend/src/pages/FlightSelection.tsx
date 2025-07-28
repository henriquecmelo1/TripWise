// src/pages/FlightSelection.tsx (NOVA PÁGINA)
import { useState } from "react";
import FlightCard from "../components/FlightSelection/FlightCard";
import {
  type Flight,
  mockFlights,
  planeIcon,
  clockIcon,
} from "../data/mockFlights"; // Importa dados e ícones
import{Link} from 'react-router-dom';

interface FlightSelectionProps {
  // Para testar a página isoladamente, essas props podem ter valores padrão
  // Em uma aplicação real, elas seriam passadas via router ou contexto
  destinationCity?: string;
  tripDuration?: number;
}

export default function FlightSelection({
  destinationCity = "Rio de Janeiro", // Valor padrão para teste
  tripDuration = 10, // Valor padrão para teste
}: FlightSelectionProps) {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // Ícone para o cabeçalho da página (avião de papel)
  const paperPlaneHeaderIcon =    '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
  // const iconMapMarkerAlt =    '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

  const handleConfirmSelection = (flight: Flight) => {
    console.log("Voo selecionado:", flight);
    alert(
      `Voo selecionado: ${flight.airline} para ${
        flight.destination
      } por ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(flight.price)}`
    );
    // Lógica para o que acontece após confirmar o voo (ex: redirecionar, salvar no estado global)
  };

  const handleSkipSelection = () => {
    console.log("Seleção de voo pulada.");
    alert("Você pulou a seleção de voo.");
    // Lógica para o que acontece após pular (ex: redirecionar para outra página)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Cabeçalho da Página de Voo */}
      <div className="bg-white rounded-xl shadow-lg p-6 my-6 text-center max-w-xl mx-auto w-full">
        {" "}
        {/* Adicionado max-w-xl e mx-auto para centralizar */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span
            className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-600"
            dangerouslySetInnerHTML={{ __html: paperPlaneHeaderIcon }}
          />
          Escolha seu voo para {destinationCity}
        </h2>
        <p className="text-gray-600 text-md">
          Encontramos as melhores opções de voo para sua viagem de{" "}
          {tripDuration} dias
        </p>
        {/* Lista de Voos */}
        <div className="flex-grow max-w-xl mx-auto w-full pb-20">
          {" "}
          {/* pb-20 para dar espaço ao footer fixo */}
          {mockFlights.length > 0 ? ( // Usando mockFlights diretamente para teste
            mockFlights.map((flight) => (
              <div
                key={flight.id}
                onClick={() => setSelectedFlight(flight)}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedFlight?.id === flight.id
                    ? "border-2 border-blue-500 shadow-lg"
                    : "border border-transparent"
                }`}
              >
                <FlightCard
                  flight={flight}
                  planeIcon={planeIcon} // Ícone de avião genérico do mockFlights
                  clockIcon={clockIcon} // Ícone de relógio do mockFlights
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 p-8 bg-white rounded-lg shadow-md">
              Nenhuma opção de voo encontrada para este destino.
            </div>
          )}
        </div>
        {/* Footer Fixo */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-xl border-t border-gray-200 flex justify-center space-x-4">
          <Link to="/itinerary"
            onClick={handleSkipSelection}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Pular Seleção de Voo
          </Link>
          <Link to="/itinerary"
            onClick={() =>
              selectedFlight && handleConfirmSelection(selectedFlight)
            }
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${
              selectedFlight
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-300 text-gray-100 cursor-not-allowed"
            }`}
          >
            Confirmar Voo Selecionado
          </Link>
        </div>
      </div>
    </div>
  );
}
