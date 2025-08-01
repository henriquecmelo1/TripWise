import React, { useState } from "react";
import Header from "../components/Questionnaire/Header";
import InputText from "../components/Questionnaire/InputText";
import InputSelect from "../components/Questionnaire/InputSelect";
import InputMultiSelect from "../components/Questionnaire/InputMultiSelect";
import InputDate from "../components/Questionnaire/InputDate";
import InputNumber from "../components/Questionnaire/InputNumber";
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
      originCode: origem,
      destinationCode: destino,
      dateOfDeparture: dataIda,
      currency: "BRL",
      adults: numAdultos,
      children: numCriancas,
      infants: numBebes,
      max: 3,
    };

    const returnFlightData = {
      originCode: destino,
      destinationCode: origem,
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
    <div className="max-w-xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg my-12">
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
                      bg-gradient-to-r from-primary to-accent
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
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
