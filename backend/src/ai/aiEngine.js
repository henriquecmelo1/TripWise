import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import ExternalAPIsService from "../services/externalAPIs.js";

class AIEngine {
  constructor() {
    this.genAI = new GoogleGenAI({});
    this.model = "gemini-2.5-flash";
    this.externalAPIs = new ExternalAPIsService();
  }

  /**
   * Gera itinerários hiper-personalizados baseados no perfil do usuário
   * @param {Object} userProfile - Perfil do usuário
   * @param {Object} tripDetails - Detalhes da viagem
   * @param {Array} realTimeData - Dados em tempo real (voos, hotéis, atividades)
   * @returns {Object} Itinerário personalizado com narrativa coerente
   */
  async generatePersonalizedItinerary(
    userProfile,
    tripDetails,
    realTimeData = null
  ) {
    try {
      const enrichedData = await this.collectRealTimeData(
        tripDetails,
        userProfile
      );

      const prompt = this.buildItineraryPrompt(
        userProfile,
        tripDetails,
        enrichedData
      );

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.model,
      });
      const itinerary = response.text;

      return {
        success: true,
        itinerary: this.parseItineraryResponse(itinerary),
        personalizedFor: userProfile.id,
        dataEnrichment: enrichedData.sources, // Mostra quais APIs foram usadas
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro ao gerar itinerário:", error);
      return {
        success: false,
        error: "Erro interno do sistema de IA",
        details: error.message,
      };
    }
  }

  /**
   * Constrói o prompt otimizado para geração de itinerários
   */
  buildItineraryPrompt(userProfile, tripDetails, enrichedData) {
    // Processa dados reais coletados das APIs
    const weatherInfo = enrichedData?.weather
      ? `
DADOS METEOROLÓGICOS ATUAIS (${enrichedData.weather.source}):
- Temperatura atual: ${enrichedData.weather.currentWeather?.temperature}°C
- Condições: ${enrichedData.weather.currentWeather?.description}
- Previsão: ${enrichedData.weather.forecast
          ?.map(
            (day) =>
              `${day.date}: ${day.temp}°C, ${day.description}${
                day.rain > 0 ? ` (chuva: ${day.rain}mm)` : ""
              }`
          )
          .join("\n  ")}
- Recomendações meteorológicas: ${enrichedData.weather.recommendations?.join(
          ", "
        )}`
      : "";

    const restaurantInfo = enrichedData?.restaurants
      ? `
RESTAURANTES LOCAIS REAIS (${enrichedData.restaurants.source}):
${enrichedData.restaurants.restaurants
  ?.slice(0, 5)
  .map(
    (rest) =>
      `- ${rest.name} (⭐ ${rest.rating}) - ${rest.priceRange} - ${rest.recommendedFor}`
  )
  .join("\n")}`
      : "";

    const hotelInfo = enrichedData?.hotels
      ? `
HOTÉIS E ACOMODAÇÕES REAIS (${enrichedData.hotels.source}):
${enrichedData.hotels.hotels
  ?.slice(0, 5)
  .map(
    (hotel) =>
      `- ${hotel.name} (⭐ ${hotel.rating}) - ${hotel.priceRange} - ${hotel.hotelType} - ${hotel.recommendedFor}`
  )
  .join("\n")}`
      : "";

    const exchangeInfo = enrichedData?.exchange
      ? `
TAXAS DE CÂMBIO ATUAIS (${enrichedData.exchange.source}):
${Object.entries(enrichedData.exchange.rates)
  .map(
    ([currency, info]) =>
      `- 1 BRL = ${info.rate.toFixed(4)} ${currency} ${info.symbol}`
  )
  .join("\n")}
- Última atualização: ${enrichedData.exchange.lastUpdate}`
      : "";

    const transportInfo = enrichedData?.transport
      ? `
TRANSPORTE LOCAL DISPONÍVEL:
- Opções: ${enrichedData.transport.recommendations?.join(", ")}`
      : "";

    const eventsInfo = enrichedData?.events
      ? `
EVENTOS LOCAIS NO PERÍODO:
${enrichedData.events.events
  ?.slice(0, 3)
  .map((event) => `- ${event.name}: ${event.description}`)
  .join("\n")}`
      : "";

    return `
Você é um especialista em planejamento de viagens com conhecimento profundo sobre destinos globais. 
Sua tarefa é criar um itinerário HIPER-PERSONALIZADO que transcende listas básicas e oferece uma experiência narrativa coerente.

PERFIL DO VIAJANTE:
- DNA de Viagem: ${userProfile.travelDNA || "Explorador curioso"}
- Preferências: ${JSON.stringify(userProfile.preferences)}
- Orçamento: ${userProfile.budget || "Moderado"}
- Tipo de Acomodação: ${userProfile.accommodationType || "Conforto padrão"}
- Interesses: ${userProfile.interests?.join(", ") || "Cultura, gastronomia"}
- Sensibilidades: ${
      userProfile.sensitivities?.join(", ") || "Nenhuma especificada"
    }

DETALHES DA VIAGEM:
- Destino: ${tripDetails.destination}
- Duração: ${tripDetails.duration} dias
- Período: ${tripDetails.startDate} a ${tripDetails.endDate}
- Viajantes: ${tripDetails.travelers} pessoas
- Tipo: ${tripDetails.tripType || "Lazer"}

🔥 DADOS EM TEMPO REAL COLETADOS:
${weatherInfo}
${restaurantInfo}
${hotelInfo}
${exchangeInfo}
${transportInfo}
${eventsInfo}

DIRETRIZES PARA CRIAÇÃO (AGORA COM DADOS REAIS):
1. Crie uma NARRATIVA TEMÁTICA coerente, não apenas uma lista
2. Equilibre PERFEITAMENTE orçamento, tempo, logística e interesses
3. USE OS RESTAURANTES REAIS listados acima nas recomendações
4. RECOMENDE OS HOTÉIS REAIS baseado no perfil e orçamento do usuário
5. CONSIDERE AS CONDIÇÕES METEOROLÓGICAS para sugerir atividades apropriadas
6. INCLUA OS PREÇOS EM MOEDA LOCAL usando as taxas de câmbio atuais
7. OTIMIZE o transporte usando as opções locais disponíveis
8. MENCIONE os eventos locais quando relevantes
9. Inclua "joias escondidas" e experiências autênticas locais
9. Sugira alternativas para diferentes cenários (chuva, lotação, etc.)
10. Inclua dicas práticas e contexto cultural
11. Personalize cada recomendação ao perfil específico

FORMATO DE RESPOSTA (JSON):
{
    "tematicaNarrativa": "Título temático do itinerário",
    "resumoExecutivo": "Resumo em 2-3 frases do que torna esta viagem única",
    "fonteDados": "${enrichedData?.sources?.join(", ") || "Dados básicos"}",
    "itinerarioDiario": [
        {
            "dia": 1,
            "tema": "Tema do dia",
            "condicoesTempo": "Baseado na previsão real",
            "atividades": [
                {
                    "horario": "09:00",
                    "atividade": "Nome da atividade",
                    "local": "Local específico",
                    "duracao": "2h",
                    "motivoPersonalizacao": "Por que esta atividade é perfeita para este viajante",
                    "dicas": ["Dica prática 1", "Dica prática 2"],
                    "alternativas": "O que fazer se chover/estiver lotado",
                    "custoEstimado": "Valor em moeda local com conversão BRL",
                    "transporteSugerido": "Como chegar usando transporte local"
                }
            ],
            "refeicoes": {
                "almoco": "Restaurante REAL da lista com justificativa",
                "jantar": "Restaurante REAL da lista com justificativa"
            },
            "hospedagem": "Hotel REAL da lista adequado ao perfil e orçamento",
            "logistica": "Como se deslocar, onde se hospedar, etc."
        }
    ],
    "recomendacoesHospedagem": {
        "hotelPrincipal": "Hotel REAL mais adequado ao perfil",
        "alternativas": ["Hotel alternativo 1", "Hotel alternativo 2"],
        "justificativa": "Por que este hotel é ideal para este viajante"
    },
    "experienciasUnicas": ["Experiência 1", "Experiência 2"],
    "joiasEscondidas": ["Local secreto 1", "Local secreto 2"],
    "dicasEspecialistas": ["Dica 1", "Dica 2"],
    "orcamentoDetalhado": {
        "transporte": "Valor em moeda local (BRL)",
        "hospedagem": "Valor em moeda local (BRL)",
        "alimentacao": "Valor em moeda local (BRL)",
        "atividades": "Valor em moeda local (BRL)",
        "total": "Valor em moeda local (BRL)"
    },
    "consideracoesEspeciais": "Adaptações baseadas no perfil do usuário e dados reais coletados"
}

Crie agora o itinerário hiper-personalizado usando os DADOS REAIS coletados:`;
  }

  /**
   * Processa e valida a resposta do modelo de IA
   */
  parseItineraryResponse(rawResponse) {
    try {
      // Remove markdown formatting se presente
      const cleanResponse = rawResponse
        .replace(/```json\n?/g, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error("Erro ao processar resposta da IA:", error);
      return {
        error: "Formato de resposta inválido",
        rawResponse: rawResponse,
      };
    }
  }

  /**
   * Gera recomendações dinâmicas baseadas em contexto
   */
  async generateContextualRecommendations(context, userProfile) {
    try {
      const prompt = `
Como especialista em viagens, forneça recomendações contextuais para:

CONTEXTO ATUAL: ${context.situation}
LOCALIZAÇÃO: ${context.currentLocation || "Não especificada"}
HORA: ${context.currentTime || new Date().toLocaleTimeString()}
CONDIÇÕES: ${context.conditions || "Normais"}

PERFIL DO USUÁRIO: ${JSON.stringify(userProfile)}

Forneça 3-5 recomendações específicas para esta situação, considerando:
- Horário atual e disponibilidade
- Proximidade geográfica
- Preferências do usuário
- Condições atuais (clima, multidões, etc.)

Formato: Lista numerada com justificativa para cada recomendação.`;

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.model,
      });

      return {
        success: true,
        recommendations: response.text,
        context: context,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro ao gerar recomendações contextuais:", error);
      return {
        success: false,
        error: "Erro ao processar recomendações",
      };
    }
  }

  /**
   * Otimiza itinerários existentes baseado em feedback
   */
  async optimizeItinerary(currentItinerary, feedback, constraints) {
    try {
      const prompt = `
Você é um especialista em otimização de itinerários. Analise o itinerário atual e otimize baseado no feedback:

ITINERÁRIO ATUAL:
${JSON.stringify(currentItinerary)}

FEEDBACK DO USUÁRIO:
${feedback}

NOVAS RESTRIÇÕES:
${JSON.stringify(constraints)}

TAREFA: Otimize o itinerário mantendo a coerência narrativa, mas incorporando o feedback e restrições.

Retorne o itinerário otimizado no mesmo formato JSON, destacando as mudanças feitas e a justificativa.`;

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.model,
      });

      return {
        success: true,
        optimizedItinerary: this.parseItineraryResponse(response.text),
        changesApplied: feedback,
        optimizedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro ao otimizar itinerário:", error);
      return {
        success: false,
        error: "Erro na otimização do itinerário",
      };
    }
  }

  /**
   * Inteligência Preditiva para Preços
   * Analisa dados históricos e tendências para prever melhor momento de reserva
   */
  async predictOptimalBookingTime(tripDetails, preferences) {
    try {
      const prompt = `
Você é um especialista em análise de preços de viagens. Baseado nos dados históricos e tendências do mercado:

DETALHES DA VIAGEM:
- Destino: ${tripDetails.destination}
- Datas: ${tripDetails.startDate} a ${tripDetails.endDate}
- Tipo: ${tripDetails.tripType}
- Flexibilidade: ${preferences.flexibility || "Média"}

TAREFA: Forneça recomendações sobre:
1. Melhor momento para reservar voos (antecedência ideal)
2. Tendência de preços para o período
3. Alternativas de datas que podem economizar
4. Alertas de preço recomendados

Formato de resposta JSON:
{
  "recommendations": {
    "flightBooking": "Recomendação para voos",
    "hotelBooking": "Recomendação para hotéis", 
    "priceAlert": "Configuração de alerta",
    "alternativeDates": ["data1", "data2"],
    "savings": "Economia estimada seguindo as recomendações"
  }
}`;

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.model,
      });

      return {
        success: true,
        predictions: this.parseItineraryResponse(response.text),
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro na previsão de preços:", error);
      return {
        success: false,
        error: "Erro na análise preditiva de preços",
      };
    }
  }

  /**
   * Previsão de Multidões em Atrações
   * Fornece insights sobre os melhores horários para visitar locais
   */
  async predictCrowdLevels(destinations, timeframe) {
    try {
      const prompt = `
Como especialista em fluxos turísticos, analise as seguintes atrações e forneça previsões de multidões:

DESTINOS/ATRAÇÕES: ${destinations.join(", ")}
PERÍODO: ${timeframe.startDate} a ${timeframe.endDate}
ÉPOCA DO ANO: ${new Date(timeframe.startDate).toLocaleDateString("pt-BR", {
        month: "long",
      })}

TAREFA: Para cada atração, forneça:
1. Horários com menos movimento
2. Dias da semana ideais  
3. Períodos a evitar
4. Alternativas menos conhecidas
5. Dicas para evitar filas

Formato JSON:
{
  "crowdPredictions": [
    {
      "location": "Nome do local",
      "bestTimes": ["horário1", "horário2"],
      "worstTimes": ["horário1", "horário2"], 
      "weekdayTrends": "Análise semanal",
      "alternatives": ["alternativa1", "alternativa2"],
      "tips": ["dica1", "dica2"]
    }
  ],
  "generalAdvice": "Conselhos gerais para o período"
}`;

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.model,
      });

      return {
        success: true,
        crowdPredictions: this.parseItineraryResponse(response.text),
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro na previsão de multidões:", error);
      return {
        success: false,
        error: "Erro na análise preditiva de multidões",
      };
    }
  }

  /**
   * Gestão Proativa de Perturbações
   * Monitora e sugere alternativas para problemas durante a viagem
   */
  async handleTravelDisruption(disruption, currentItinerary, userProfile) {
    try {
      const prompt = `
SITUAÇÃO DE EMERGÊNCIA/PERTURBAÇÃO DETECTADA:

TIPO DE PROBLEMA: ${disruption.type}
DETALHES: ${disruption.details}
IMPACTO: ${disruption.impact}
LOCALIZAÇÃO ATUAL: ${disruption.currentLocation}

ITINERÁRIO AFETADO:
${JSON.stringify(currentItinerary)}

PERFIL DO VIAJANTE:
${JSON.stringify(userProfile)}

TAREFA URGENTE: Forneça soluções imediatas e alternativas viáveis:

1. SOLUÇÃO IMEDIATA: O que fazer agora
2. ALTERNATIVAS VIÁVEIS: Opções para reorganizar o plano
3. COMPENSAÇÕES: Como minimizar o impacto na experiência
4. CONTATOS ÚTEIS: Informações importantes para a situação
5. PLANO B: Itinerário alternativo se necessário

Seja prático, empático e focado em soluções acionáveis.

Formato JSON:
{
  "immediateSolution": "Ação imediata recomendada",
  "alternatives": ["alternativa1", "alternativa2"],
  "compensation": "Como compensar a experiência perdida", 
  "contacts": ["contato1", "contato2"],
  "revisedItinerary": "Itinerário modificado se necessário",
  "mood": "Mensagem encorajadora para o viajante"
}`;

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.model,
      });

      return {
        success: true,
        solutions: this.parseItineraryResponse(response.text),
        disruption: disruption,
        resolvedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro na gestão de perturbações:", error);
      return {
        success: false,
        error: "Erro na gestão de emergências de viagem",
      };
    }
  }

  /**
   * 🔥 NOVA FUNCIONALIDADE: Coleta dados reais via APIs externas
   * Enriquece as recomendações com informações precisas e atualizadas
   */
  async collectRealTimeData(tripDetails, userProfile) {
    const dataCollectionPromises = [];
    const collectedData = {
      weather: null,
      restaurants: null,
      events: null,
      exchange: null,
      transport: null,
      sources: [],
    };

    try {
      // 🌤️ Dados meteorológicos
      dataCollectionPromises.push(
        this.externalAPIs
          .getWeatherData(tripDetails.destination, {
            startDate: tripDetails.startDate,
            endDate: tripDetails.endDate,
          })
          .then((data) => {
            if (data.success) {
              collectedData.weather = data;
              collectedData.sources.push("OpenWeather/WeatherAPI");
            }
            return data;
          })
          .catch((err) => console.log("Weather API falhou:", err.message))
      );

      // 🍽️ Restaurantes locais
      if (
        userProfile.interests?.includes("gastronomia") ||
        userProfile.interests?.includes("culinaria")
      ) {
        dataCollectionPromises.push(
          this.externalAPIs
            .getRestaurantData(tripDetails.destination, userProfile.preferences)
            .then((data) => {
              if (data.success) {
                collectedData.restaurants = data;
                collectedData.sources.push("Foursquare/Google Places");
              }
              return data;
            })
            .catch((err) => console.log("Restaurant API falhou:", err.message))
        );
      }

      // 🏨 Hotéis e acomodações
      if (tripDetails.duration > 1) {
        dataCollectionPromises.push(
          this.externalAPIs
            .getHotelData(tripDetails.destination, userProfile.preferences)
            .then((data) => {
              if (data.success) {
                collectedData.hotels = data;
                collectedData.sources.push("Foursquare Hotels");
              }
              return data;
            })
            .catch((err) => console.log("Hotel API falhou:", err.message))
        );
      }

      // 💱 Taxas de câmbio
      if (
        tripDetails.destination.includes("international") ||
        tripDetails.isInternational
      ) {
        dataCollectionPromises.push(
          this.externalAPIs
            .getExchangeRates("BRL", ["USD", "EUR", "GBP"])
            .then((data) => {
              if (data.success) {
                collectedData.exchange = data;
                collectedData.sources.push("ExchangeRate-API");
              }
              return data;
            })
            .catch((err) => console.log("Exchange API falhou:", err.message))
        );
      }

      // Aguarda todas as APIs (com timeout de 5 segundos)
      await Promise.allSettled(dataCollectionPromises);

      console.log(
        `✅ Dados coletados de ${collectedData.sources.length} fontes:`,
        collectedData.sources
      );

      return collectedData;
    } catch (error) {
      console.error("Erro na coleta de dados externos:", error);
      return {
        ...collectedData,
        sources: ["Fallback - Dados básicos apenas"],
      };
    }
  }
}

export default AIEngine;
