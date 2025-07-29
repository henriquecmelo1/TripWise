// src/pages/Questionnaire.tsx
import React, { useState, useEffect } from "react";
import Header from "../components/Questionnaire/Header";
import InputText from "../components/Questionnaire/InputText";
// import SliderInput from "../components/Questionnaire/SliderInput"; // Manter para o input de duração, se for reintroduzido ou para referência
import SelectInput from "../components/Questionnaire/SelectInput";
import DateInput from "../components/Questionnaire/InputDate";
import InputNumber from "../components/Questionnaire/InputNumber"; // NOVO: Importa o InputNumber

import {
  dailyBudgetRanges,
  budgetOptions,
  companionshipOptions,
  transportationOptions,
  vibeOptions,
} from "../data/questionnaireOptions";
import { Link } from "react-router-dom";


export default function Questionnaire() {
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

  // Definições de SVGs
  const iconMapMarkerAlt = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';
  // const iconClock = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1V7h-1zm0 2h1v4h-1z"/></svg>';
  // NOVO: Ícone para Adultos (pessoa única)
  const iconAdult = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
  // NOVO: Ícone para Crianças (figura de criança ou pequena)
  const iconChild = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.87 0-3.4 1.15-4.05 2.76.71.53 1.57.9 2.55 1.09V18h3.38v-3.15c.98-.19 1.84-.56 2.55-1.09-.65-1.61-2.18-2.76-4.05-2.76zM18.25 6.27c-.9-.9-2.07-2.07-3.41-2.7C13.2 2.76 11.51 2 10 2c-1.92 0-3.32.96-4.22 1.86-.9.9-1.46 2.1-1.69 3.55-.23 1.45.14 2.87.8 4.2.66 1.33 1.54 2.54 2.65 3.55 1.11 1.01 2.37 1.77 3.78 2.29C8.36 21 10.15 21 12 21c1.85 0 3.64-.09 5.25-.66 1.4-.48 2.56-1.34 3.48-2.5.92-1.16 1.43-2.6 1.57-4.14.14-1.54-.2-3.03-.86-4.4C20.65 8.23 19.53 7.08 18.25 6.27z"/></svg>';
  // NOVO: Ícone para Bebês (carrinho de bebê)
  const iconBaby = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18 6c-1.1 0-2 .9-2 2v4c0 .55.45 1 1 1s1-.45 1-1V9h2v3c0 .55.45 1 1 1s1-.45 1-1V8c0-1.1-.9-2-2-2h-2zM10 6c-1.1 0-2 .9-2 2v4c0 .55.45 1 1 1s1-.45 1-1V9h2v3c0 .55.45 1 1 1s1-.45 1-1V8c0-1.1-.9-2-2-2h-2zM4 6h-2v15h2v-5h2v5h2V6H4zm8 11.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zM20 17.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>';
  // iconUsers original (para 'Com quem você vai viajar?' - grupo de pessoas)
  const iconUsers = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 12c-2.49 0-4.5 2.01-4.5 4.5S14.01 21 16.5 21 21 18.99 21 16.5 18.99 12 16.5 12zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h9c-2.22-.5-4-1.92-4-3.5 0-1.58 1.78-3 4-3z"/></svg>';
  const iconDollarSign = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
  const iconCarSide = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>';
  const iconStar = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L6 21z"/></svg>';
  const iconCalendar = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>';


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