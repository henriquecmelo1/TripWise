import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

class AIEngine {
  constructor() {
    this.genAI = new GoogleGenAI({});
    this.model = "gemini-2.5-flash";
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
      const prompt = this.buildItineraryPrompt(
        userProfile,
        tripDetails,
        realTimeData
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
  buildItineraryPrompt(userProfile, tripDetails, realTimeData) {
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

${
  realTimeData
    ? `DADOS EM TEMPO REAL:
- Voos disponíveis: ${JSON.stringify(realTimeData.flights || [])}
- Condições meteorológicas: ${
        realTimeData.weather || "Informação não disponível"
      }
- Eventos especiais: ${
        realTimeData.events || "Nenhum evento especial identificado"
      }`
    : ""
}

DIRETRIZES PARA CRIAÇÃO:
1. Crie uma NARRATIVA TEMÁTICA coerente, não apenas uma lista
2. Equilibre PERFEITAMENTE orçamento, tempo, logística e interesses
3. Inclua "joias escondidas" e experiências autênticas locais
4. Otimize logística (deslocamentos, horários, reservas)
5. Sugira alternativas para diferentes cenários (chuva, lotação, etc.)
6. Inclua dicas práticas e contexto cultural
7. Personalize cada recomendação ao perfil específico

FORMATO DE RESPOSTA (JSON):
{
    "tematicaNarrativa": "Título temático do itinerário",
    "resumoExecutivo": "Resumo em 2-3 frases do que torna esta viagem única",
    "itinerarioDiario": [
        {
            "dia": 1,
            "tema": "Tema do dia",
            "atividades": [
                {
                    "horario": "09:00",
                    "atividade": "Nome da atividade",
                    "local": "Local específico",
                    "duracao": "2h",
                    "motivoPersonalizacao": "Por que esta atividade é perfeita para este viajante",
                    "dicas": ["Dica prática 1", "Dica prática 2"],
                    "alternativas": "O que fazer se chover/estiver lotado",
                    "custoEstimado": "R$ 50-80"
                }
            ],
            "refeicoes": {
                "almoco": "Restaurante específico com justificativa",
                "jantar": "Restaurante específico com justificativa"
            },
            "logistica": "Como se deslocar, onde se hospedar, etc."
        }
    ],
    "experienciasUnicas": ["Experiência 1", "Experiência 2"],
    "joiasEscondidas": ["Local secreto 1", "Local secreto 2"],
    "dicasEspecialistas": ["Dica 1", "Dica 2"],
    "orcamentoDetalhado": {
        "transporte": "R$ X",
        "hospedagem": "R$ X",
        "alimentacao": "R$ X",
        "atividades": "R$ X",
        "total": "R$ X"
    },
    "consideracoesEspeciais": "Adaptações baseadas no perfil do usuário"
}

Crie agora o itinerário hiper-personalizado:`;
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
}

export default AIEngine;
