import AIEngine from "../ai/aiEngine.js";
import ConversationalCopilot from "../ai/conversationalCopilot.js";
import UserPersonalizationEngine from "../ai/userPersonalization.js";

class AIController {
  constructor() {
    this.aiEngine = new AIEngine();
    this.copilot = new ConversationalCopilot();
    this.personalization = new UserPersonalizationEngine();

    // Inicia limpeza automática de sessões
    setInterval(() => {
      this.copilot.cleanupExpiredSessions();
    }, 300000); // A cada 5 minutos
  }

  /**
   * Gera itinerário diretamente dos dados do formulário (sem salvar perfil)
   */
  async generateItineraryFromForm(req, res) {
    try {
      const { formData } = req.body;

      if (!formData) {
        return res.status(400).json({
          success: false,
          error: "formData é obrigatório",
        });
      }

      const tripDetails = {
        departureLocation: formData.departure_location,
        destination: formData.destination,
        duration: this.calculateDuration(
          formData.start_date,
          formData.end_date
        ),
        startDate: formData.start_date,
        endDate: formData.end_date,
        travelers: formData.travelers_count,
        tripType: formData.trip_type,
      };

      const temporaryProfile = this.createTemporaryProfile(formData);

      const itineraryResult = await this.aiEngine.generatePersonalizedItinerary(
        temporaryProfile,
        tripDetails,
        null
      );

      if (!itineraryResult.success) {
        return res.status(500).json({
          success: false,
          error: "Erro na geração do itinerário",
          details: itineraryResult.error,
        });
      }

      res.json({
        success: true,
        itinerary: itineraryResult.itinerary,
        tripDetails: tripDetails,
        preferences: {
          budget: formData.budget_range,
          accommodation: formData.accommodation_preference,
          activities: formData.activity_interests,
          pace: formData.travel_pace,
        },
        generatedAt: itineraryResult.generatedAt,
        message: "Itinerário gerado com sucesso para sua viagem!",
      });
    } catch (error) {
      console.error("Erro ao gerar itinerário do formulário:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do sistema de IA",
        message: "Tente novamente em alguns momentos",
      });
    }
  }

  /**
   * Calcula duração da viagem em dias
   */
  calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  }

  /**
   * Cria perfil temporário baseado nos dados do formulário
   */
  createTemporaryProfile(formData) {
    return {
      id: `temp_${Date.now()}`,
      travelDNA: this.inferTravelDNAFromForm(formData),
      preferences: {
        activities: formData.activity_interests || [],
        foodRestrictions: formData.food_restrictions || [],
        accommodationPrefs: {
          type: formData.accommodation_preference,
          location: "central",
        },
        transportation: {
          preferred: formData.transport_preferences || [],
        },
        timing: {
          pacePreference: formData.travel_pace,
          flexibilityLevel: "medium",
        },
      },
      budget: formData.budget_range,
      accommodationType: formData.accommodation_preference,
      interests: formData.activity_interests || [],
      sensitivities: [],
      travelStyle: this.determineTravelStyleFromForm(formData),
      experienceType: formData.experience_type,
      isTemporary: true,
      confidence: 0.8,
    };
  }

  /**
   * Infere DNA de viagem baseado no formulário
   */
  inferTravelDNAFromForm(formData) {
    const scores = {
      explorador_aventureiro: 0,
      cultural_historico: 0,
      relaxamento_bem_estar: 0,
      gastronomico_gourmet: 0,
      natureza_ecoturismo: 0,
      urbano_cosmopolita: 0,
      budget_consciente: 0,
      luxo_premium: 0,
    };

    // Analisa atividades de interesse
    if (formData.activity_interests) {
      formData.activity_interests.forEach((activity) => {
        switch (activity) {
          case "cultura":
            scores.cultural_historico += 3;
            break;
          case "gastronomia":
            scores.gastronomico_gourmet += 3;
            break;
          case "aventura":
            scores.explorador_aventureiro += 3;
            break;
          case "natureza":
            scores.natureza_ecoturismo += 3;
            break;
          case "relaxamento":
            scores.relaxamento_bem_estar += 3;
            break;
          case "vida_noturna":
          case "shopping":
            scores.urbano_cosmopolita += 2;
            break;
          case "arte":
            scores.cultural_historico += 2;
            break;
          case "fotografia":
            scores.natureza_ecoturismo += 1;
            scores.cultural_historico += 1;
            break;
        }
      });
    }

    // Analisa orçamento
    switch (formData.budget_range) {
      case "economico":
        scores.budget_consciente += 3;
        break;
      case "premium":
        scores.luxo_premium += 3;
        break;
    }

    // Analisa tipo de experiência
    switch (formData.experience_type) {
      case "autentico":
        scores.cultural_historico += 2;
        break;
      case "off_beaten":
        scores.explorador_aventureiro += 2;
        break;
    }

    // Encontra categoria dominante
    const dominantCategory = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    return {
      primary: dominantCategory,
      scores: scores,
      confidence: 0.8,
    };
  }

  /**
   * Determina estilo de viagem baseado no formulário
   */
  determineTravelStyleFromForm(formData) {
    switch (formData.travel_pace) {
      case "relaxado":
        return "flexible";
      case "intensivo":
        return "structured";
      default:
        return "moderate";
    }
  }

  async generateHyperPersonalizedItinerary(req, res) {
    try {
      const { userId, tripDetails, realTimeData } = req.body;

      // Validação básica
      if (!userId || !tripDetails) {
        return res.status(400).json({
          success: false,
          error: "userId e tripDetails são obrigatórios",
        });
      }

      // Obtém perfil do usuário
      const profileResult = this.personalization.getUserProfile(userId);
      if (!profileResult.success) {
        return res.status(404).json({
          success: false,
          error: "Perfil de usuário não encontrado",
          suggestion: "Complete o questionário de integração primeiro",
        });
      }

      const userProfile = profileResult.profile;

      const itineraryResult = await this.aiEngine.generatePersonalizedItinerary(
        userProfile,
        tripDetails,
        realTimeData
      );

      if (!itineraryResult.success) {
        return res.status(500).json({
          success: false,
          error: "Erro na geração do itinerário",
          details: itineraryResult.error,
        });
      }

      // Atualiza perfil baseado na interação
      await this.personalization.updateProfileFromInteraction(userId, {
        interaction_type: "itinerary_generation",
        trip_details: tripDetails,
        timestamp: new Date().toISOString(),
      });

      res.json({
        success: true,
        itinerary: itineraryResult.itinerary,
        personalizedFor: {
          userId: userId,
          travelDNA: userProfile.travelDNA.primary,
          confidence: userProfile.confidence,
        },
        generatedAt: itineraryResult.generatedAt,
        recommendation:
          "Itinerário otimizado baseado no seu perfil único de viagem",
      });
    } catch (error) {
      console.error("Erro no controlador de IA:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do sistema de IA",
        message: "Tente novamente em alguns momentos",
      });
    }
  }

  async conversationalInterface(req, res) {
    try {
      const { sessionId, message, userId, context } = req.body;

      if (!sessionId || !message || !userId) {
        return res.status(400).json({
          success: false,
          error: "sessionId, message e userId são obrigatórios",
        });
      }

      const profileResult = this.personalization.getUserProfile(userId);
      const userProfile = profileResult.success ? profileResult.profile : null;

      const response = await this.copilot.processMessage(
        sessionId,
        message,
        userProfile,
        context || {}
      );

      if (!response.success) {
        return res.status(500).json({
          success: false,
          error: "Erro no processamento da mensagem",
          fallback: response.fallbackResponse,
        });
      }

      if (userProfile) {
        await this.personalization.updateProfileFromInteraction(userId, {
          interaction_type: "chat",
          message: message,
          intent: response.intent,
          timestamp: new Date().toISOString(),
        });
      }

      res.json({
        success: true,
        response: response.response,
        intent: response.intent,
        suggestions: response.suggestions,
        actions: response.actions,
        sessionId: response.sessionId,
        conversationContext: {
          userProfileAvailable: !!userProfile,
          personalizationLevel: userProfile ? userProfile.confidence : 0,
        },
      });
    } catch (error) {
      console.error("Erro no copiloto conversacional:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do copiloto",
        fallback:
          "Desculpe, estou com dificuldades técnicas. Como posso ajudar de forma diferente?",
      });
    }
  }

  async createUserProfile(req, res) {
    try {
      const { userId, onboardingData } = req.body;

      if (!userId || !onboardingData) {
        return res.status(400).json({
          success: false,
          error: "userId e onboardingData são obrigatórios",
        });
      }

      const result = await this.personalization.createUserProfile(
        userId,
        onboardingData
      );

      if (!result.success) {
        return res.status(500).json({
          success: false,
          error: "Erro na criação do perfil",
          details: result.error,
        });
      }

      res.json({
        success: true,
        profile: {
          id: result.profile.id,
          travelDNA: result.profile.travelDNA,
          budget: result.profile.budget,
          interests: result.profile.interests,
          confidence: result.profile.confidence,
        },
        message: "Perfil criado com sucesso",
        nextSteps: [
          "Comece a planejar sua primeira viagem",
          "Converse com o copiloto para recomendações",
          "Explore destinos baseados no seu perfil",
        ],
      });
    } catch (error) {
      console.error("Erro na criação do perfil:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno na criação do perfil",
      });
    }
  }

  async getContextualRecommendations(req, res) {
    try {
      const { userId, context } = req.body;

      if (!userId || !context) {
        return res.status(400).json({
          success: false,
          error: "userId e context são obrigatórios",
        });
      }

      // Obtém perfil do usuário
      const profileResult = this.personalization.getUserProfile(userId);
      if (!profileResult.success) {
        return res.status(404).json({
          success: false,
          error: "Perfil não encontrado",
        });
      }

      const userProfile = profileResult.profile;

      // Gera recomendações contextuais
      const recommendations =
        await this.aiEngine.generateContextualRecommendations(
          context,
          userProfile
        );

      if (!recommendations.success) {
        return res.status(500).json({
          success: false,
          error: "Erro na geração de recomendações",
        });
      }

      res.json({
        success: true,
        recommendations: recommendations.recommendations,
        context: recommendations.context,
        personalizedFor: userProfile.travelDNA.primary,
        generatedAt: recommendations.generatedAt,
      });
    } catch (error) {
      console.error("Erro nas recomendações contextuais:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno nas recomendações",
      });
    }
  }

  async optimizeItinerary(req, res) {
    try {
      const { userId, currentItinerary, feedback, constraints } = req.body;

      if (!userId || !currentItinerary || !feedback) {
        return res.status(400).json({
          success: false,
          error: "userId, currentItinerary e feedback são obrigatórios",
        });
      }

      // Otimiza itinerário baseado no feedback
      const optimizationResult = await this.aiEngine.optimizeItinerary(
        currentItinerary,
        feedback,
        constraints || {}
      );

      if (!optimizationResult.success) {
        return res.status(500).json({
          success: false,
          error: "Erro na otimização do itinerário",
        });
      }

      // Atualiza perfil baseado no feedback
      await this.personalization.updateProfileFromInteraction(userId, {
        interaction_type: "itinerary_optimization",
        feedback: feedback,
        constraints: constraints,
        timestamp: new Date().toISOString(),
      });

      res.json({
        success: true,
        optimizedItinerary: optimizationResult.optimizedItinerary,
        changesApplied: optimizationResult.changesApplied,
        optimizedAt: optimizationResult.optimizedAt,
        message: "Itinerário otimizado baseado no seu feedback",
      });
    } catch (error) {
      console.error("Erro na otimização:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno na otimização",
      });
    }
  }

  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "userId é obrigatório",
        });
      }

      const result = this.personalization.getUserProfile(userId);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          error: "Perfil não encontrado",
        });
      }

      // Retorna versão pública do perfil (sem dados sensíveis)
      const publicProfile = {
        id: result.profile.id,
        travelDNA: result.profile.travelDNA,
        budget: result.profile.budget,
        interests: result.profile.interests,
        travelStyle: result.profile.travelStyle,
        confidence: result.profile.confidence,
        interactionCount: result.profile.interactionCount,
      };

      res.json({
        success: true,
        profile: publicProfile,
      });
    } catch (error) {
      console.error("Erro ao obter perfil:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno",
      });
    }
  }

  async analyzeBehavioralPatterns(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "userId é obrigatório",
        });
      }

      const patterns = this.personalization.analyzeBehavioralPatterns(userId);

      if (!patterns) {
        return res.status(404).json({
          success: false,
          error: "Usuário não encontrado ou dados insuficientes",
        });
      }

      res.json({
        success: true,
        patterns: patterns,
        message: "Padrões comportamentais analisados com sucesso",
      });
    } catch (error) {
      console.error("Erro na análise de padrões:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno na análise",
      });
    }
  }

  /**
   * Previsão de Preços Inteligente
   */
  async predictOptimalBookingTime(req, res) {
    try {
      const { tripDetails, preferences } = req.body;

      if (!tripDetails) {
        return res.status(400).json({
          success: false,
          error: "Detalhes da viagem são obrigatórios",
        });
      }

      const prediction = await this.aiEngine.predictOptimalBookingTime(
        tripDetails,
        preferences
      );

      if (!prediction.success) {
        return res.status(500).json(prediction);
      }

      res.json({
        success: true,
        predictions: prediction.predictions,
        insights: "Análise baseada em dados históricos e tendências de mercado",
        generatedAt: prediction.generatedAt,
      });
    } catch (error) {
      console.error("Erro na previsão de preços:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno na análise preditiva",
      });
    }
  }

  /**
   * Previsão de Multidões
   */
  async predictCrowdLevels(req, res) {
    try {
      const { destinations, timeframe } = req.body;

      if (!destinations || !timeframe) {
        return res.status(400).json({
          success: false,
          error: "Destinos e período são obrigatórios",
        });
      }

      const prediction = await this.aiEngine.predictCrowdLevels(
        destinations,
        timeframe
      );

      if (!prediction.success) {
        return res.status(500).json(prediction);
      }

      res.json({
        success: true,
        crowdData: prediction.crowdPredictions,
        insights: "Previsões baseadas em padrões históricos de visitação",
        generatedAt: prediction.generatedAt,
      });
    } catch (error) {
      console.error("Erro na previsão de multidões:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno na análise de multidões",
      });
    }
  }

  /**
   * Gestão Proativa de Perturbações
   */
  async handleEmergencySupport(req, res) {
    try {
      const { disruption, currentItinerary, userId } = req.body;

      if (!disruption || !currentItinerary) {
        return res.status(400).json({
          success: false,
          error:
            "Informações sobre a perturbação e itinerário são obrigatórias",
        });
      }

      // Obtém perfil do usuário para personalizar a solução
      const profileResult = this.personalization.getUserProfile(userId);
      const userProfile = profileResult.success ? profileResult.profile : {};

      const solution = await this.aiEngine.handleTravelDisruption(
        disruption,
        currentItinerary,
        userProfile
      );

      if (!solution.success) {
        return res.status(500).json(solution);
      }

      res.json({
        success: true,
        emergencyResponse: solution.solutions,
        disruption: solution.disruption,
        priority: "ALTA - Resposta imediata",
        resolvedAt: solution.resolvedAt,
      });
    } catch (error) {
      console.error("Erro na gestão de emergência:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno na gestão de emergências",
      });
    }
  }

  async healthCheck(req, res) {
    try {
      const status = {
        aiEngine: "operational",
        copilot: "operational",
        personalization: "operational",
        activeSessions: this.copilot.conversationHistory.size,
        activeProfiles: this.personalization.userProfiles.size,
        timestamp: new Date().toISOString(),
      };

      res.json({
        success: true,
        status: status,
        message: "Sistema de IA funcionando normalmente",
      });
    } catch (error) {
      console.error("Erro no health check:", error);
      res.status(500).json({
        success: false,
        error: "Erro no sistema de IA",
      });
    }
  }
}

export default AIController;
