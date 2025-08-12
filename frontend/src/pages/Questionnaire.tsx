import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Questionnaire/Header";
import InputText from "../components/Questionnaire/InputText";
import InputSelect from "../components/Questionnaire/InputSelect";
import InputMultiSelect from "../components/Questionnaire/InputMultiSelect";
import InputDate from "../components/Questionnaire/InputDate";
import InputNumber from "../components/Questionnaire/InputNumber";
import { useTheme } from "../contexts/ThemeContext";
import {
  iconMapMarkerAlt,
  iconAdult,
  iconChild,
  iconBaby,
  iconUsers,
  iconDollarSign,
  iconCarSide,
  iconStar,
  iconCalendar,
  iconClock,
} from "../assets/icons";

import {
  tripTypeOptions,
  // dailyBudgetRanges,
  budgetOptions,
  // companionshipOptions,
  accommodationOptions,
  activityInterestsOptions,
  travelPaceOptions,
  foodRestrictionsOptions,
  transportationOptions,
  // vibeOptions,
  experienceTypeOptions,
} from "../data/questionnaireOptions";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../components/Questionnaire/ToggleSwitch";

export default function Questionnaire() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [origem, setOrigem] = useState<string>("");
  const [destino, setDestino] = useState<string>("");

  const [numAdultos, setNumAdultos] = useState<number>(1);
  const [numCriancas, setNumCriancas] = useState<number>(0);
  const [numBebes, setNumBebes] = useState<number>(0);

  const [tipoViagem, setTipoViagem] = useState<string>("");
  const [orcamento, setOrcamento] = useState<string>("");
  const [acomodacao, setAcomodacao] = useState<string>("");
  const [interessesAtividades, setInteressesAtividades] = useState<string[]>(
    []
  );
  const [ritmoViagem, setRitmoViagem] = useState<string>("");
  const [restricoesAlimentares, setRestricoesAlimentares] = useState<string[]>(
    []
  );
  const [transporte, setTransporte] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState<string>("");
  const [dataIda, setDataIda] = useState<string | null>(null);
  const [dataVolta, setDataVolta] = useState<string | null>(null);
  const [agendarVoo, setAgendarVoo] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Capturar dados pré-selecionados de outras páginas
  useEffect(() => {
    const preselectedData = location.state as any;
    if (preselectedData) {
      if (preselectedData.preselectedDestination) {
        setDestino(preselectedData.preselectedDestination);
      }
      if (preselectedData.suggestedBudget) {
        // Mapear budget do mockdata para os valores do questionário
        const budgetMap: { [key: string]: string } = {
          'low': 'economico',
          'medium': 'moderado', 
          'high': 'alto'
        };
        setOrcamento(budgetMap[preselectedData.suggestedBudget] || '');
      }
      if (preselectedData.suggestedTravelType) {
        // Mapear tipo de viagem
        const typeMap: { [key: string]: string } = {
          'cultural': 'cultural',
          'adventure': 'aventura',
          'leisure': 'lazer',
          'business': 'negocios'
        };
        setTipoViagem(typeMap[preselectedData.suggestedTravelType] || '');
      }
    }
  }, [location.state]);

  const calculateTravelersCount = (
    numAdultos: number,
    numCriancas: number,
    numBebes: number
  ): number => {
    return numAdultos + numCriancas + numBebes;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const totalViajantes = calculateTravelersCount(
      numAdultos,
      numCriancas,
      numBebes
    );

    const formData = {
      // origem,
      destination: destino,
      start_date: dataIda,
      end_date: dataVolta,
      // numAdultos,
      // numCriancas,
      // numBebes,
      travelers_count: totalViajantes,
      trip_type: tipoViagem,
      budget_range: orcamento,
      accommodation_type: acomodacao,
      activity_interests: interessesAtividades,
      travel_pace: ritmoViagem,
      food_restrictions: restricoesAlimentares,
      transport_preferences: transporte,
      experience_type: experiencia,
    };

    const dataToSend = { formData: formData };

    const departureFlightData = {
      originCity: origem,
      destinationCity: destino,
      dateOfDeparture: dataIda,
      currency: "BRL",
      adults: numAdultos,
      children: numCriancas,
      infants: numBebes,
      max: 3,
    };

    const returnFlightData = {
      originCity: destino,
      destinationCity: origem,
      dateOfDeparture: dataVolta,
      currency: "BRL",
      adults: numAdultos,
      children: numCriancas,
      infants: numBebes,
      max: 3,
    };

    try {
      if (agendarVoo) {
        const [departureResponse, returnResponse, itineraryResponse] =
          await Promise.all([
            fetch("http://localhost:3000/flights/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(departureFlightData),
            }),
            fetch("http://localhost:3000/flights/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(returnFlightData),
            }),
            fetch("http://localhost:3000/api/ai/itinerary/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToSend),
            }),
          ]);
        if (
          !departureResponse.ok ||
          !returnResponse.ok ||
          !itineraryResponse.ok
        ) {
          const errorData = await itineraryResponse.json();
          throw new Error(
            errorData.message || `Erro do servidor: ${itineraryResponse.status}`
          );
        }
        const departureData = await departureResponse.json();
        const returnData = await returnResponse.json();
        const itineraryData = await itineraryResponse.json();

        navigate("/flights", {
          state: {
            departureFlights: departureData,
            returnFlights: returnData,
            itinerary: itineraryData,
          },
        });
      } else {
        const itineraryResponse = await fetch(
          "http://localhost:3000/api/ai/itinerary/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        if (!itineraryResponse.ok) {
          const errorData = await itineraryResponse.json();
          throw new Error(
            errorData.message || `Erro do servidor: ${itineraryResponse.status}`
          );
        }
        const itineraryData = await itineraryResponse.json();
        navigate("/itinerary", {
          state: {
            itinerary: itineraryData,
          },
        });
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      setError(
        `Falha ao gerar roteiros: ${
          err instanceof Error ? err.message : "Erro desconhecido"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      {/* Header com toggle de modo escuro */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Questionário de Viagem
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
                Conte-nos sobre sua viagem dos sonhos
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

      {/* Indicador de dados pré-selecionados */}
      {location.state && (
        <div className="max-w-xl mx-auto mt-8 mb-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-200 flex items-center justify-center">
              ✅ <strong className="ml-2">Formulário preenchido automaticamente</strong> 
              <span className="ml-2">com dados do destino selecionado!</span>
            </p>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-12 transition-colors duration-300">
        <Header />
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputText
            label="De onde você está saindo?"
            placeholder="Ex: São Paulo, Rio de Janeiro..."
            icon={iconMapMarkerAlt}
            value={origem}
            onChange={setOrigem}
          />

          <InputText
            label="Para onde quer ir?"
            placeholder="Ex: Paris, Tóquio, Rio de Janeiro..."
            icon={iconMapMarkerAlt}
            value={destino}
            onChange={setDestino}
          />

          <InputDate
            label="Data de ida"
            icon={iconCalendar}
            selectedDate={dataIda}
            onChange={setDataIda}
            placeholderText="Selecione a data de ida"
            minDate={new Date().toISOString().split("T")[0]}
          />

          <InputDate
            label="Data de volta"
            icon={iconCalendar}
            selectedDate={dataVolta}
            onChange={setDataVolta}
            placeholderText="Selecione a data de volta"
            minDate={dataIda || new Date().toISOString().split("T")[0]}
          />

          <InputNumber
            label="Quantos adultos?"
            icon={iconAdult} // Ícone de adulto
            value={numAdultos}
            onChange={setNumAdultos}
            min={1} // Mínimo 1 adulto
            placeholder="Nº de adultos"
          />

          <InputNumber
            label="Quantas crianças?"
            icon={iconChild} // Ícone de criança
            value={numCriancas}
            onChange={setNumCriancas}
            min={0}
            placeholder="Nº de crianças"
          />

          <InputNumber
            label="Quantos bebês?"
            icon={iconBaby} // Ícone de bebê
            value={numBebes}
            onChange={setNumBebes}
            min={0}
            placeholder="Nº de bebês"
          />

          <InputSelect
            label="Qual é o tipo da sua viagem?"
            icon={iconUsers}
            placeholder="Selecione o tipo de viagem"
            options={tripTypeOptions}
            value={tipoViagem}
            onChange={setTipoViagem}
          />

          <InputSelect
            label="Qual é o seu orçamento?"
            icon={iconDollarSign}
            placeholder="Selecione o orçamento"
            options={budgetOptions}
            value={orcamento}
            onChange={setOrcamento}
          />

          <InputSelect
            label="Qual é o tipo de acomodação preferida?"
            icon={iconStar}
            placeholder="Selecione o tipo de acomodação"
            options={accommodationOptions}
            value={acomodacao}
            onChange={setAcomodacao}
          />

          <InputMultiSelect
            question="Quais atividades você mais gosta?"
            icon={iconStar}
            options={activityInterestsOptions}
            selectedValues={interessesAtividades}
            onChange={setInteressesAtividades}
            maxSelections={5} // Limite de 5 seleções
          />

          <InputSelect
            label="Qual é o ritmo da sua viagem?"
            icon={iconCalendar}
            placeholder="Selecione o ritmo da viagem"
            options={travelPaceOptions}
            value={ritmoViagem}
            onChange={setRitmoViagem}
          />

          <InputMultiSelect
            question="Você tem alguma restrição alimentar?"
            icon={iconStar}
            options={foodRestrictionsOptions}
            selectedValues={restricoesAlimentares}
            onChange={setRestricoesAlimentares}
            maxSelections={3} // Limite de 3 seleções
          />

          <InputMultiSelect
            question="Quais meios de transporte você prefere?"
            icon={iconCarSide}
            options={transportationOptions}
            selectedValues={transporte}
            onChange={setTransporte}
            maxSelections={3} // Limite de 3 seleções
          />

          <InputSelect
            label="Qual é o tipo de experiência que você busca?"
            icon={iconStar}
            placeholder="Selecione o tipo de experiência"
            options={experienceTypeOptions}
            value={experiencia}
            onChange={setExperiencia}
          />

          <ToggleSwitch
            label="Deseja agendar voo?"
            value={agendarVoo}
            onToggle={setAgendarVoo}
            icon={iconClock}
          />

          <button
            type="submit"
            className={`w-full py-4 px-6 rounded-lg text-white text-xl font-bold
                      bg-gradient-to-r from-blue-600 to-purple-600
                      hover:opacity-90 transition-all duration-300
                      shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mt-8
                      ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Gerando Roteiros..." : "Criar Meus Roteiros"}
            {!isLoading && (
              <span role="img" aria-label="rocket">
                🚀
              </span>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
