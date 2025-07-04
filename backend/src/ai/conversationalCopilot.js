import AIEngine from "./aiEngine.js";

class ConversationalCopilot {
  constructor() {
    this.aiEngine = new AIEngine();
    this.conversationHistory = new Map(); // Armazena histórico por sessão
    this.sessionTimeout = 3600000; // 1 hora
  }

  /**
   * Processa mensagem conversacional do usuário
   * @param {string} sessionId - ID da sessão
   * @param {string} message - Mensagem do usuário
   * @param {Object} userProfile - Perfil do usuário
   * @param {Object} context - Contexto atual (localização, viagem, etc.)
   * @returns {Object} Resposta do copiloto
   */
  async processMessage(sessionId, message, userProfile, context = {}) {
    try {
      // Recupera ou cria histórico da conversa
      const conversation = this.getConversationHistory(sessionId);

      // Adiciona mensagem do usuário ao histórico
      conversation.messages.push({
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      });

      // Analisa a intenção da mensagem
      const intent = await this.analyzeIntent(message, conversation, context);

      // Gera resposta baseada na intenção
      const response = await this.generateResponse(
        intent,
        message,
        conversation,
        userProfile,
        context
      );

      // Adiciona resposta ao histórico
      conversation.messages.push({
        role: "assistant",
        content: response.content,
        intent: intent.type,
        timestamp: new Date().toISOString(),
      });

      // Atualiza histórico
      this.conversationHistory.set(sessionId, conversation);

      return {
        success: true,
        response: response.content,
        intent: intent.type,
        suggestions: response.suggestions || [],
        actions: response.actions || [],
        sessionId: sessionId,
      };
    } catch (error) {
      console.error("Erro no processamento da mensagem:", error);
      return {
        success: false,
        error: "Erro interno do copiloto",
        fallbackResponse:
          "Desculpe, não consegui processar sua solicitação. Pode reformular sua pergunta?",
      };
    }
  }

  /**
   * Analisa a intenção da mensagem do usuário
   */
  async analyzeIntent(message, conversation, context) {
    try {
      const prompt = `
Analise a seguinte mensagem de um usuário de aplicativo de viagens e identifique a intenção:

MENSAGEM: "${message}"

CONTEXTO DA CONVERSA:
${conversation.messages
  .slice(-3)
  .map((m) => `${m.role}: ${m.content}`)
  .join("\n")}

CONTEXTO ATUAL:
- Localização: ${context.currentLocation || "Não especificada"}
- Etapa da viagem: ${context.travelPhase || "Planejamento"}
- Itinerário ativo: ${context.hasActiveItinerary || false}

INTENÇÕES POSSÍVEIS:
1. PLANEJAMENTO_INICIAL - Usuário quer criar um novo itinerário
2. MODIFICACAO_ITINERARIO - Usuário quer alterar plano existente
3. BUSCA_INFORMACOES - Usuário quer informações sobre destino/atividade
4. RESERVAS_BOOKINGS - Usuário quer fazer reservas
5. NAVEGACAO_DURANTE_VIAGEM - Usuário está viajando e precisa de orientação
6. RECOMENDACAO_CONTEXTUAL - Usuário quer sugestões para situação atual
7. PROBLEMA_SUPORTE - Usuário tem um problema ou reclamação
8. CONVERSA_CASUAL - Conversa geral sobre viagens

RESPOSTA (JSON):
{
    "type": "TIPO_DA_INTENCAO",
    "confidence": 0.95,
    "entities": {
        "destino": "cidade/país mencionado",
        "datas": "datas mencionadas",
        "atividades": "atividades mencionadas",
        "restricoes": "restrições ou preferências"
    },
    "context_needed": ["informações adicionais necessárias"],
    "urgency": "baixa|media|alta"
}`;

      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.aiEngine.model,
      });

      return JSON.parse(
        response.text
          .replace(/```json\n?/g, "")
          .replace(/```/g, "")
          .trim()
      );
    } catch (error) {
      console.error("Erro na análise de intenção:", error);
      return {
        type: "CONVERSA_CASUAL",
        confidence: 0.5,
        entities: {},
        context_needed: [],
        urgency: "baixa",
      };
    }
  }

  /**
   * Gera resposta baseada na intenção identificada
   */
  async generateResponse(intent, message, conversation, userProfile, context) {
    const responseStrategy = this.getResponseStrategy(intent.type);

    try {
      switch (intent.type) {
        case "PLANEJAMENTO_INICIAL":
          return await this.handleInitialPlanning(
            message,
            intent,
            userProfile,
            context
          );

        case "MODIFICACAO_ITINERARIO":
          return await this.handleItineraryModification(
            message,
            intent,
            userProfile,
            context
          );

        case "BUSCA_INFORMACOES":
          return await this.handleInformationRequest(
            message,
            intent,
            userProfile,
            context
          );

        case "NAVEGACAO_DURANTE_VIAGEM":
          return await this.handleTravelNavigation(
            message,
            intent,
            userProfile,
            context
          );

        case "RECOMENDACAO_CONTEXTUAL":
          return await this.handleContextualRecommendations(
            message,
            intent,
            userProfile,
            context
          );

        default:
          return await this.handleGeneralConversation(
            message,
            intent,
            userProfile,
            context
          );
      }
    } catch (error) {
      console.error("Erro na geração de resposta:", error);
      return {
        content:
          "Desculpe, estou com dificuldades para processar sua solicitação. Pode tentar de forma diferente?",
        suggestions: ["Reformular pergunta", "Falar com suporte"],
        actions: [],
      };
    }
  }

  /**
   * Manipula planejamento inicial de viagem
   */
  async handleInitialPlanning(message, intent, userProfile, context) {
    const prompt = `
Você é um agente de viagens especialista. Um cliente quer planejar uma viagem:

SOLICITAÇÃO: "${message}"
PERFIL DO CLIENTE: ${JSON.stringify(userProfile)}
ENTIDADES IDENTIFICADAS: ${JSON.stringify(intent.entities)}

Como um agente experiente, responda de forma conversacional e amigável:
1. Confirme o entendimento da solicitação
2. Faça perguntas estratégicas para personalizar melhor
3. Ofereça sugestões iniciais baseadas no perfil
4. Explique próximos passos

Mantenha tom profissional, mas amigável e entusiasmado sobre a viagem.
Resposta em português brasileiro, máximo 200 palavras.`;

    const response = await this.genAI.models.generateContent({
      contents: prompt,
      model: this.aiEngine.model,
    });

    return {
      content: response.text,
      suggestions: [
        "Definir orçamento da viagem",
        "Escolher datas específicas",
        "Especificar interesses principais",
        "Ver itinerários similares",
      ],
      actions: [
        { type: "start_planning", label: "Começar planejamento detalhado" },
        { type: "view_suggestions", label: "Ver sugestões de destinos" },
      ],
    };
  }

  /**
   * Manipula modificações em itinerário existente
   */
  async handleItineraryModification(message, intent, userProfile, context) {
    const prompt = `
Um cliente quer modificar seu itinerário de viagem:

SOLICITAÇÃO DE MUDANÇA: "${message}"
ITINERÁRIO ATUAL: ${JSON.stringify(context.currentItinerary || {})}
PERFIL: ${JSON.stringify(userProfile)}

Como agente especialista:
1. Confirme o entendimento da mudança desejada
2. Explique as implicações (custos, logística, etc.)
3. Sugira alternativas se necessário
4. Ofereça fazer a modificação

Tom amigável e solucionador de problemas. Máximo 150 palavras.`;

    const response = await this.genAI.models.generateContent({
      contents: prompt,
      model: this.aiEngine.model,
    });

    return {
      content: response.text,
      suggestions: [
        "Ver alternativas similares",
        "Calcular impacto no orçamento",
        "Verificar disponibilidade",
        "Manter opção original",
      ],
      actions: [
        { type: "modify_itinerary", label: "Aplicar modificação" },
        { type: "show_alternatives", label: "Ver alternativas" },
      ],
    };
  }

  /**
   * Manipula solicitações de informação
   */
  async handleInformationRequest(message, intent, userProfile, context) {
    const prompt = `
Cliente solicita informações sobre viagem:

PERGUNTA: "${message}"
CONTEXTO: ${JSON.stringify(context)}
ENTIDADES: ${JSON.stringify(intent.entities)}

Forneça informação útil, prática e atualizada como um especialista local.
Inclua dicas específicas e considerações importantes.
Tom informativo mas acessível. Máximo 180 palavras.`;

    const response = await this.genAI.models.generateContent({
      contents: prompt,
      model: this.aiEngine.model,
    });
    return {
      content: response.text,
      suggestions: [
        "Mais detalhes sobre o local",
        "Dicas de segurança",
        "Melhor época para visitar",
        "Orçamento necessário",
      ],
      actions: [
        { type: "add_to_itinerary", label: "Adicionar ao itinerário" },
        { type: "save_info", label: "Salvar informação" },
      ],
    };
  }

  /**
   * Manipula navegação durante a viagem
   */
  async handleTravelNavigation(message, intent, userProfile, context) {
    const prompt = `
Viajante precisa de orientação durante a viagem:

SITUAÇÃO: "${message}"
LOCALIZAÇÃO ATUAL: ${context.currentLocation || "Não especificada"}
ITINERÁRIO: ${JSON.stringify(context.currentItinerary || {})}

Como copiloto de viagem em tempo real:
1. Forneça orientação prática imediata
2. Considere horário e localização atual
3. Sugira alternativas se necessário
4. Mantenha o viajante informado sobre próximos passos

Tom útil e reassegurador. Máximo 120 palavras.`;

    const response = await this.genAI.models.generateContent({
      contents: prompt,
      model: this.aiEngine.model,
    });

    return {
      content: response.text,
      suggestions: [
        "Ver mapa e direções",
        "Ligar para local",
        "Encontrar alternativa próxima",
        "Verificar horário de funcionamento",
      ],
      actions: [
        { type: "open_maps", label: "Abrir mapa" },
        { type: "call_venue", label: "Ligar para local" },
        { type: "find_nearby", label: "Encontrar por perto" },
      ],
    };
  }

  /**
   * Manipula recomendações contextuais
   */
  async handleContextualRecommendations(message, intent, userProfile, context) {
    const recommendations =
      await this.aiEngine.generateContextualRecommendations(
        context,
        userProfile
      );

    return {
      content: recommendations.success
        ? recommendations.recommendations
        : "Não consegui gerar recomendações no momento.",
      suggestions: [
        "Mais opções similares",
        "Filtrar por orçamento",
        "Ver avaliações",
        "Adicionar ao itinerário",
      ],
      actions: [
        { type: "explore_options", label: "Explorar opções" },
        { type: "filter_results", label: "Filtrar resultados" },
      ],
    };
  }

  /**
   * Manipula conversa geral
   */
  async handleGeneralConversation(message, intent, userProfile, context) {
    const prompt = `
Como assistente de viagens amigável, responda a:

MENSAGEM: "${message}"
PERFIL DO USUÁRIO: ${JSON.stringify(userProfile)}

Mantenha conversa natural sobre viagens, ofereça ajuda relevante.
Tom conversacional e útil. Máximo 100 palavras.`;

    const response = await this.genAI.models.generateContent({
      contents: prompt,
      model: this.aiEngine.model,
    });

    return {
      content: response.text,
      suggestions: [
        "Planejar nova viagem",
        "Ver destinos populares",
        "Dicas de viagem",
        "Falar com especialista",
      ],
      actions: [
        { type: "start_planning", label: "Planejar viagem" },
        { type: "explore_destinations", label: "Explorar destinos" },
      ],
    };
  }

  /**
   * Recupera ou cria histórico de conversa
   */
  getConversationHistory(sessionId) {
    if (!this.conversationHistory.has(sessionId)) {
      this.conversationHistory.set(sessionId, {
        sessionId,
        messages: [],
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      });
    }

    const conversation = this.conversationHistory.get(sessionId);
    conversation.lastActivity = new Date().toISOString();

    return conversation;
  }

  /**
   * Define estratégia de resposta baseada na intenção
   */
  getResponseStrategy(intentType) {
    const strategies = {
      PLANEJAMENTO_INICIAL: { tone: "enthusiastic", length: "detailed" },
      MODIFICACAO_ITINERARIO: { tone: "helpful", length: "concise" },
      BUSCA_INFORMACOES: { tone: "informative", length: "comprehensive" },
      NAVEGACAO_DURANTE_VIAGEM: { tone: "urgent", length: "brief" },
      RECOMENDACAO_CONTEXTUAL: { tone: "advisory", length: "medium" },
      CONVERSA_CASUAL: { tone: "friendly", length: "brief" },
    };

    return strategies[intentType] || { tone: "friendly", length: "medium" };
  }

  /**
   * Limpa sessões expiradas
   */
  cleanupExpiredSessions() {
    const now = Date.now();

    for (const [sessionId, conversation] of this.conversationHistory) {
      const lastActivity = new Date(conversation.lastActivity).getTime();
      if (now - lastActivity > this.sessionTimeout) {
        this.conversationHistory.delete(sessionId);
      }
    }
  }
}

export default ConversationalCopilot;
