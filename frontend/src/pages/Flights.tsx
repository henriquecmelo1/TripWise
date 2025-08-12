import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightList from "../components/FlightSelection/FlightList"; // O componente do passo 1
import { type Flight } from "../data/flightInterface";
import { paperPlaneHeaderIcon } from "../assets/icons"; // Ícone do cabeçalho
import { useTheme } from "../contexts/ThemeContext";

export default function Flights() {
  const { isDarkMode, toggleTheme } = useTheme();
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


  const handleConfirmSelection = () => {
    if (selectedIdaFlight && selectedVoltaFlight) {

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
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}>
        {/* Header com toggle de modo escuro */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  Seleção de Voos
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
                  Escolha os melhores voos para sua viagem
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Toggle modo escuro */}
                <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Alternar modo escuro"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-500 pointer-events-none"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700 pointer-events-none"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Nenhum voo encontrado
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Por favor, volte e preencha o formulário corretamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Header com toggle de modo escuro */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Seleção de Voos
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
                Escolha os melhores voos para sua viagem
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Toggle modo escuro */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                aria-label="Alternar modo escuro"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6">
        {/* Cabeçalho da Página de Voo */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 my-6 text-center max-w-4xl mx-auto w-full transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center">
            <span
              className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-600 dark:text-blue-400"
              dangerouslySetInnerHTML={{ __html: paperPlaneHeaderIcon }}
            />
            Escolha seus voos para {destinationCity}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-md">
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
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-xl border-t border-gray-200 dark:border-gray-700 flex justify-center space-x-4 transition-colors duration-300">
          <button
            onClick={handleSkipSelection}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Pular Seleção de Voo
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedIdaFlight || !selectedVoltaFlight}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200
              ${
                selectedIdaFlight && selectedVoltaFlight
                  ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  : "bg-blue-300 dark:bg-blue-800 text-gray-100 dark:text-gray-400 cursor-not-allowed"
              }`}
          >
            Confirmar Voos Selecionados
          </button>
        </div>
      </div>
    </div>
  );
}
