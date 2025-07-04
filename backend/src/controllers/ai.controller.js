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
