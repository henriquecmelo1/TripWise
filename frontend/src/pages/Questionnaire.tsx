// src/pages/Questionnaire.tsx
import React, { useState, useEffect } from "react";
import Header from "../components/Questionnaire/Header";
import InputText from "../components/Questionnaire/InputText";
// import SliderInput from "../components/Questionnaire/SliderInput"; // Manter para o input de duração, se for reintroduzido ou para referência
import SelectInput from "../components/Questionnaire/SelectInput";
import DateInput from "../components/Questionnaire/InputDate";
import InputNumber from "../components/Questionnaire/InputNumber"; // NOVO: Importa o InputNumber
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
} from "../assets/icons";

import {
  dailyBudgetRanges,
  budgetOptions,
  companionshipOptions,
  transportationOptions,
  vibeOptions,
} from "../data/questionnaireOptions";
import { Link } from "react-router-dom";


export default function Questionnaire() {
  const [origem, setOrigem] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  // REMOVIDO: const [duracaoViagem, setDuracaoViagem] = useState<number>(7);
  // REMOVIDO: const [numeroPessoas, setNumeroPessoas] = useState<number>(1);

  // NOVO: Estados para o número de adultos, crianças e bebês
  const [numAdultos, setNumAdultos] = useState<number>(1); // Padrão: pelo menos 1 adulto
  const [numCriancas, setNumCriancas] = useState<number>(0);
  const [numBebes, setNumBebes] = useState<number>(0);

  const [orcamento, setOrcamento] = useState<string>("");
  const [companhia, setCompanhia] = useState<string>("");
  const [transporte, setTransporte] = useState<string>("");
  const [vibe, setVibe] = useState<string>("");

  const [dataIda, setDataIda] = useState<string | null>(null);
  const [dataVolta, setDataVolta] = useState<string | null>(null);

  const [custoEstimado, setCustoEstimado] = useState<{ min: number; avg: number; max: number } | null>(null);

  const [roteirosGerados, setRoteirosGerados] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const calculateDurationInDays = (start: string | null, end: string | null): number | null => {
    if (!start || !end) return null;
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return null;
    }

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Inclusive duration
  };

  useEffect(() => {
    const calculatedDuration = calculateDurationInDays(dataIda, dataVolta);

    // O custo é geralmente calculado por adulto para o orçamento por pessoa/dia
    if (calculatedDuration !== null && calculatedDuration > 0 && numAdultos > 0 && orcamento && dailyBudgetRanges[orcamento]) {
      const budget = dailyBudgetRanges[orcamento];
      const minDaily = budget.min;
      const maxDaily = budget.max;

      const minTotal = calculatedDuration * numAdultos * minDaily; // Usando numAdultos
      const maxTotal = calculatedDuration * numAdultos * maxDaily;
      const avgTotal = (minTotal + maxTotal) / 2;

      setCustoEstimado({ min: minTotal, avg: avgTotal, max: maxTotal });
    } else {
      setCustoEstimado(null);
    }
  }, [dataIda, dataVolta, numAdultos, orcamento]); // Dependências atualizadas

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const formData = {
      origem,
      destino,
      // Removido duracaoViagem e numeroPessoas
      numAdultos, // NOVO
      numCriancas, // NOVO
      numBebes, // NOVO
      orcamento,
      companhia,
      transporte,
      vibe,
      dataIda, 
      dataVolta, 
    };

    console.log("Dados do formulário para envio:", formData);

    try {
      const response = await fetch("http://localhost:3001/api/roteiros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Erro do servidor: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Resposta do backend:", data);
      setRoteirosGerados(data);

      // Você pode navegar para outra página aqui se desejar
      // navigate('/flights'); 

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
          label="Para onde quer ir?"
          placeholder="Ex: Paris, Tóquio, Rio de Janeiro..."
          icon={iconMapMarkerAlt}
          value={destino}
          onChange={setDestino}
        />

        <DateInput
          label="Data de ida"
          icon={iconCalendar}
          selectedDate={dataIda}
          onChange={setDataIda}
          placeholderText="Selecione a data de ida"
          minDate={new Date().toISOString().split('T')[0]}
        />

        <DateInput
          label="Data de volta"
          icon={iconCalendar}
          selectedDate={dataVolta}
          onChange={setDataVolta}
          placeholderText="Selecione a data de volta"
          minDate={dataIda || new Date().toISOString().split('T')[0]}
        />

        {/* NOVO: Inputs para Adultos, Crianças e Bebês */}
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

        <SelectInput
          label="Qual seu orçamento por pessoa por dia?"
          icon={iconDollarSign}
          placeholder="Selecione seu orçamento por pessoa/dia"
          options={budgetOptions}
          value={orcamento}
          onChange={setOrcamento}
        />

        {custoEstimado && (
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-md mt-6">
            <h3 className="flex items-center text-blue-800 font-bold text-lg mb-4">
              <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-600" dangerouslySetInnerHTML={{ __html: iconDollarSign }} />
              Custo Total Estimado da Viagem
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-md">
                <p className="text-gray-600 text-sm">Mínimo</p>
                <p className="text-green-600 font-bold text-lg">{formatCurrency(custoEstimado.min)}</p>
              </div>
              <div className="p-3 bg-white rounded-md">
                <p className="text-gray-600 text-sm">Média</p>
                <p className="text-blue-600 font-bold text-lg">{formatCurrency(custoEstimado.avg)}</p>
              </div>
              <div className="p-3 bg-white rounded-md">
                <p className="text-gray-600 text-sm">Máximo</p>
                <p className="text-orange-600 font-bold text-lg">{formatCurrency(custoEstimado.max)}</p>
              </div>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              {calculateDurationInDays(dataIda, dataVolta)} dias × {numAdultos} adulto{numAdultos !== 1 ? 's' : ''} {numCriancas > 0 ? `× ${numCriancas} criança${numCriancas !== 1 ? 's' : ''} ` : ''} {numBebes > 0 ? `× ${numBebes} bebê${numBebes !== 1 ? 's' : ''} ` : ''} × orçamento por dia
            </p>
          </div>
        )}

        <SelectInput
          label="Com quem você vai viajar?"
          icon={iconUsers}
          placeholder="Selecione sua companhia"
          options={companionshipOptions}
          value={companhia}
          onChange={setCompanhia}
        />

        <SelectInput
          label="Como prefere se locomover?"
          icon={iconCarSide}
          placeholder="Selecione o meio de transporte"
          options={transportationOptions}
          value={transporte}
          onChange={setTransporte}
        />

        <SelectInput
          label="Qual é a vibe da viagem?"
          icon={iconStar}
          placeholder="Selecione a vibe da viagem"
          options={vibeOptions}
          value={vibe}
          onChange={setVibe}
        />

        <Link
          to="/flights"
          type="submit"
          // disabled={isLoading}
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
        </Link>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {roteirosGerados && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Seus Roteiros Personalizados:
            </h2>
            <pre className="bg-blue-100 p-4 rounded-md overflow-auto text-sm text-blue-900">
              {JSON.stringify(roteirosGerados, null, 2)}
            </pre>
            <p className="mt-4 text-blue-700">
              Aqui você pode formatar os roteiros de forma mais amigável!
            </p>
          </div>
        )}
      </form>
    </div>
  );
}