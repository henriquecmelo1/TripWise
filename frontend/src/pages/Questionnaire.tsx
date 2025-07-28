// src/components/Questionnaire.tsx
import React, { useState, useEffect } from "react";
import Header from "../components/Questionnaire/Header";
import InputText from "../components/Questionnaire/InputText";
import SliderInput from "../components/Questionnaire/SliderInput";
import SelectInput from "../components/Questionnaire/SelectInput";

// Importa as opções e a interface do novo arquivo de dados
import {
  dailyBudgetRanges,
  budgetOptions,
  companionshipOptions,
  transportationOptions,
  vibeOptions,
} from "../data/questionnaireOptions"; // Ajuste o caminho se sua pasta 'data' estiver em outro lugar
import { Link } from "react-router-dom";

// Opcional: Se você instalou react-icons, pode importar aqui
// import { FaMapMarkerAlt, FaClock, FaUsers, FaDollarSign, FaUserFriends, FaCarSide, FaCloudSun } from 'react-icons/fa';

export default function Questionnaire() {
  const [destino, setDestino] = useState<string>("");
  const [duracaoViagem, setDuracaoViagem] = useState<number>(7);
  const [numeroPessoas, setNumeroPessoas] = useState<number>(1);
  const [orcamento, setOrcamento] = useState<string>("");
  const [companhia, setCompanhia] = useState<string>("");
  const [transporte, setTransporte] = useState<string>("");
  const [vibe, setVibe] = useState<string>("");

  const [custoEstimado, setCustoEstimado] = useState<{ min: number; avg: number; max: number } | null>(null);

  const [roteirosGerados, setRoteirosGerados] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // NOVO useEffect para calcular o custo estimado quando as dependências mudam
  useEffect(() => {
    
    // Só calcula se todos os campos necessários estiverem preenchidos
    if (duracaoViagem > 0 && numeroPessoas > 0 && orcamento && dailyBudgetRanges[orcamento]) {
      const budget = dailyBudgetRanges[orcamento];
      const minDaily = budget.min;
      const maxDaily = budget.max;

      const minTotal = duracaoViagem * numeroPessoas * minDaily;
      const maxTotal = duracaoViagem * numeroPessoas * maxDaily;
      const avgTotal = (minTotal + maxTotal) / 2; // Simples média entre min e max

      setCustoEstimado({ min: minTotal, avg: avgTotal, max: maxTotal });
    } else {
      setCustoEstimado(null); // Reseta se os campos não estiverem completos
    }
  }, [duracaoViagem, numeroPessoas, orcamento]); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const formData = {
      destino,
      duracaoViagem,
      numeroPessoas,
      orcamento,
      companhia,
      transporte,
      vibe,
    };

    console.log("Dados do formulário para envio:", formData);

    try {
      const response = await fetch("http://localhost:3001/api/roteiros", {
        // SUBSTITUA PELA URL REAL DO SEU BACKEND
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
          icon='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg>'
          value={destino}
          onChange={setDestino}
        />

        <SliderInput
          label="Duração da viagem"
          icon='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1V7h-1zm0 2h1v4h-1z" fill="currentColor"/></svg>'
          value={duracaoViagem}
          min={1}
          max={30}
          unit="dias"
          onChange={setDuracaoViagem}
        />

        <SliderInput
          label="Número de pessoas"
          icon='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#007bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="5" cy="9" r="2.25"></circle><circle cx="11" cy="4" r="2.25"></circle><path d="m7.75 9.25c0-1 .75-3 3.25-3s3.25 2 3.25 3m-12.5 5c0-1 .75-3 3.25-3s3.25 2 3.25 3"></path></g></svg>'
          value={numeroPessoas}
          min={1}
          max={10}
          unit="pessoas"
          onChange={setNumeroPessoas}
        />

        <SelectInput
          label="Qual seu orçamento por pessoa por dia?"
          icon='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#007bff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
          placeholder="Selecione seu orçamento por pessoa/dia"
          options={budgetOptions} // Usando o importado
          value={orcamento}
          onChange={setOrcamento}
        />



      {custoEstimado && ( // Condicionalmente renderiza se houver cálculo
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-md mt-6">
            <h3 className="flex items-center text-blue-800 font-bold text-lg mb-4">
              {/* Ícone de dinheiro ou documento, você pode escolher outro SVG aqui */}
              <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-600" dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#007bff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' }} />
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
              {duracaoViagem} dias × {numeroPessoas} pessoa{numeroPessoas > 1 ? 's' : ''} × orçamento por dia
            </p>
          </div>
        )}



        <SelectInput
          label="Com quem você vai viajar?"
          icon='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#007bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="5" cy="9" r="2.25"></circle><circle cx="11" cy="4" r="2.25"></circle><path d="m7.75 9.25c0-1 .75-3 3.25-3s3.25 2 3.25 3m-12.5 5c0-1 .75-3 3.25-3s3.25 2 3.25 3"></path></g></svg>'
          placeholder="Selecione sua companhia"
          options={companionshipOptions} // Usando o importado
          value={companhia}
          onChange={setCompanhia}
        />

        <SelectInput
          label="Como prefere se locomover?"
          icon='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/></svg>'
          placeholder="Selecione o meio de transporte"
          options={transportationOptions} // Usando o importado
          value={transporte}
          onChange={setTransporte}
        />

        <SelectInput
          label="Qual é a vibe da viagem?"
          icon='<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L6 21z"/></svg>'
          placeholder="Selecione a vibe da viagem"
          options={vibeOptions} // Usando o importado
          value={vibe}
          onChange={setVibe}
        />

        <Link
          to="/flights"
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
