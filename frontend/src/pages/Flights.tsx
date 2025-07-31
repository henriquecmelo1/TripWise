// src/pages/Flights.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightList from "../components/FlightSelection/FlightList"; // O componente do passo 1
import { type Flight } from "../data/mockFlights";

export default function Flights() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtendo os dados do estado de navegação
  const { departureFlights, returnFlights } = (location.state ||
    {}) as {
    departureFlights: Flight[];
    returnFlights: Flight[];
  };

  // Usando dados recebidos ou mockados como fallback
  const idaFlights = departureFlights;
  const voltaFlights = returnFlights;
  const destinationCity = idaFlights?.[0]?.destino || "Destino Desconhecido";
  const originCity = idaFlights?.[0]?.origem || "Origem Desconhecida";


  // Estados para gerenciar a seleção de voos de ida e volta
  const [selectedIdaFlight, setSelectedIdaFlight] = useState<Flight | null>(
    null
  );
  const [selectedVoltaFlight, setSelectedVoltaFlight] = useState<Flight | null>(
    null
  );

  // Ícone para o cabeçalho da página (avião de papel)
  const paperPlaneHeaderIcon =
    '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

  const handleConfirmSelection = () => {
    if (selectedIdaFlight && selectedVoltaFlight) {
      console.log("Voo de Ida selecionado:", selectedIdaFlight);
      console.log("Voo de Volta selecionado:", selectedVoltaFlight);
      alert("Voos selecionados! Redirecionando para o roteiro...");

      // Redireciona para a página de roteiro, passando os voos selecionados
      navigate("/itinerary", {
        state: {
          ...location.state, // Mantém os dados de roteiro existentes
          selectedIdaFlight,
          selectedVoltaFlight,
        },
      });
    }
  };

  const handleSkipSelection = () => {
    alert("Você pulou a seleção de voos. Redirecionando para o roteiro...");
    navigate("/itinerary", { state: { ...location.state } });
  };

  if (!idaFlights || !voltaFlights) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Nenhum voo encontrado
        </h2>
        <p className="text-gray-600">
          Por favor, volte e preencha o formulário corretamente.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Cabeçalho da Página de Voo */}
      <div className="bg-white rounded-xl shadow-lg p-6 my-6 text-center max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span
            className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-600"
            dangerouslySetInnerHTML={{ __html: paperPlaneHeaderIcon }}
          />
          Escolha seus voos para {destinationCity}
        </h2>
        <p className="text-gray-600 text-md">
          Encontramos as melhores opções de voo para sua viagem de {originCity} para {destinationCity}
        </p>
      </div>

      {/* Seção de Voos de Ida */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <FlightList
          flights={idaFlights}
          title={`Voos de Ida ${originCity} - ${destinationCity}`}
          selectedFlight={selectedIdaFlight}
          onSelectFlight={setSelectedIdaFlight}
        />
      </div>

      {/* Seção de Voos de Volta */}
      <div className="max-w-4xl mx-auto w-full pb-20">
        <FlightList
          flights={voltaFlights}
          title={`Voos de Volta ${destinationCity} - ${originCity}`}
          selectedFlight={selectedVoltaFlight}
          onSelectFlight={setSelectedVoltaFlight}
        />
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-xl border-t border-gray-200 flex justify-center space-x-4">
        <button
          onClick={handleSkipSelection}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Pular Seleção de Voo
        </button>
        <button
          onClick={handleConfirmSelection}
          disabled={!selectedIdaFlight || !selectedVoltaFlight}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${
              selectedIdaFlight && selectedVoltaFlight
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-300 text-gray-100 cursor-not-allowed"
            }`}
        >
          Confirmar Voos Selecionados
        </button>
      </div>
    </div>
  );
}
