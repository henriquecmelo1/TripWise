// src/pages/FlightSelection.tsx (NOVA PÁGINA)
import { useState } from "react";
import FlightCard from "../components/FlightSelection/FlightCard";
import {
  type Flight,
  mockFlights,
} from "../data/mockFlights"; // Importa dados e ícones
import{Link} from 'react-router-dom';
import {paperPlaneHeaderIcon} from '../assets/icons'; // Ícone de avião de papel para o cabeçalho
import { useLocation } from 'react-router-dom'; // NOVO: Importa useLocation


export default function FlightSelection() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  // NOVO: Obtém os dados da viagem da localização
  const location = useLocation();
  const {departureFlights, itineraries, returnFlights} = location.state as {
    departureFlights: Flight[]; 
    itineraries: object; 
    returnFlights: Flight[];
  }; 
  
   // Log para verificar os dados recebidos

  const handleConfirmSelection = (flight: Flight) => {
    console.log("Voo selecionado:", flight);
    alert(
      `Voo selecionado: ${flight.companhiaAerea} para ${flight.destino} por ${flight.precoTotal}`
    );
    // Lógica para o que acontece após confirmar o voo (ex: redirecionar, salvar no estado global)
  };

  const handleSkipSelection = () => {
    console.log("Seleção de voo pulada.");
    alert("Você pulou a seleção de voo.");
    // Lógica para o que acontece após pular (ex: redirecionar para outra página)
  };
  const flight1 = departureFlights[0];



  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Cabeçalho da Página de Voo */}
      <div className="bg-white rounded-xl shadow-lg p-6 my-6 text-center max-w-4xl mx-auto w-full">
        {" "}
        {/* Adicionado max-w-xl e mx-auto para centralizar */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span
            className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-600"
            dangerouslySetInnerHTML={{ __html: paperPlaneHeaderIcon }}
          />
          Escolha seu voo para {flight1.destino}
        </h2>
        <p className="text-gray-600 text-md">
          Encontramos as melhores opções de voo para sua viagem de {"*TODO* ida ou volta"}
        </p>
        {/* Lista de Voos */}
        <div className="flex-grow max-w-3xl mx-auto w-full pb-20">
          {" "}
          {/* pb-20 para dar espaço ao footer fixo */}
          {mockFlights.length > 0 ? ( // Usando mockFlights diretamente para teste
            departureFlights.map((flight) => (
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
                  // planeIcon={planeIcon} // Ícone de avião genérico do mockFlights
                  // clockIcon={clockIcon} // Ícone de relógio do mockFlights
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
