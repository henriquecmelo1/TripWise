class UserPersonalizationEngine {
  constructor() {
    this.userProfiles = new Map();
    this.behavioralPatterns = new Map();
    this.travelDNACategories = [
      "explorador_aventureiro",
      "cultural_historico",
      "relaxamento_bem_estar",
      "gastronomico_gourmet",
      "natureza_ecoturismo",
      "urbano_cosmopolita",
      "budget_consciente",
      "luxo_premium",
    ];
  }

  async createUserProfile(userId, onboardingData) {
    try {
      const travelDNA = await this.inferTravelDNA(onboardingData);
      const preferences = this.processPreferences(onboardingData);

      const profile = {
        id: userId,
        travelDNA: travelDNA,
        preferences: preferences,
        demographics: {
          age: onboardingData.age,
          location: onboardingData.location,
          languages: onboardingData.languages || ["pt-BR"],
        },
        budget: this.categorizeBudget(onboardingData.budget),
        accommodationType: onboardingData.accommodationType,
        interests: onboardingData.interests || [],
        sensitivities: onboardingData.sensitivities || [],
        travelStyle: this.determineTravelStyle(onboardingData),
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        interactionCount: 0,
        confidence: 0.6, // Inicialmente baixa, aumenta com interações
      };

      this.userProfiles.set(userId, profile);

      return {
        success: true,
        profile: profile,
        message: "Perfil criado com sucesso",
      };
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      return {
        success: false,
        error: "Erro na criação do perfil",
        details: error.message,
      };
    }
  }

  async inferTravelDNA(data) {
    const scores = {};

    // Inicializa scores
    this.travelDNACategories.forEach((category) => {
      scores[category] = 0;
    });

    // Analisa preferências de atividades
    if (data.preferredActivities) {
      data.preferredActivities.forEach((activity) => {
        switch (activity.toLowerCase()) {
          case "museus":
          case "monumentos":
          case "arte":
            scores.cultural_historico += 2;
            break;
          case "trilhas":
          case "aventura":
          case "esportes":
            scores.explorador_aventureiro += 2;
            break;
          case "spa":
          case "praia":
          case "relaxamento":
            scores.relaxamento_bem_estar += 2;
            break;
          case "restaurantes":
          case "culinaria":
          case "comida":
            scores.gastronomico_gourmet += 2;
            break;
          case "natureza":
          case "parques":
          case "ecoturismo":
            scores.natureza_ecoturismo += 2;
            break;
          case "vida_noturna":
          case "shopping":
          case "cidade":
            scores.urbano_cosmopolita += 2;
            break;
        }
      });
    }

    // Analisa orçamento
    if (data.budget) {
      if (
        data.budget.toLowerCase().includes("econom") ||
        data.budget.toLowerCase().includes("baixo")
      ) {
        scores.budget_consciente += 3;
      } else if (
        data.budget.toLowerCase().includes("luxo") ||
        data.budget.toLowerCase().includes("alto")
      ) {
        scores.luxo_premium += 3;
      }
    }

    // Analisa tipo de acomodação
    if (data.accommodationType) {
      if (
        data.accommodationType.toLowerCase().includes("hostel") ||
        data.accommodationType.toLowerCase().includes("economico")
      ) {
        scores.budget_consciente += 1;
        scores.explorador_aventureiro += 1;
      } else if (
        data.accommodationType.toLowerCase().includes("resort") ||
        data.accommodationType.toLowerCase().includes("5")
      ) {
        scores.luxo_premium += 2;
        scores.relaxamento_bem_estar += 1;
      }
    }

    // Analisa duração típica de viagem
    if (data.typicalTripDuration) {
      const duration = parseInt(data.typicalTripDuration);
      if (duration <= 3) {
        scores.urbano_cosmopolita += 1;
      } else if (duration >= 14) {
        scores.explorador_aventureiro += 1;
        scores.natureza_ecoturismo += 1;
      }
    }

    // Encontra a categoria dominante
    const dominantCategory = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    return {
      primary: dominantCategory,
      scores: scores,
      confidence: Math.max(...Object.values(scores)) / 10, // Normaliza para 0-1
    };
  }

  processPreferences(data) {
    return {
      activities: data.preferredActivities || [],
      foodRestrictions: data.foodRestrictions || [],
      mobilityNeeds: data.mobilityNeeds || [],
      accommodationPrefs: {
        type: data.accommodationType,
        amenities: data.amenitiesImportant || [],
        location: data.locationPreference || "central",
      },
      transportation: {
        preferred: data.transportPreference || [],
        avoided: data.transportAvoided || [],
      },
      timing: {
        preferredTimeToStart: data.preferredStartTime || "09:00",
        pacePreference: data.pacePreference || "moderate",
        flexibilityLevel: data.flexibilityLevel || "medium",
      },
      social: {
        groupSize: data.typicalGroupSize || 1,
        interactionLevel: data.socialInteractionLevel || "moderate",
      },
    };
  }

  categorizeBudget(budgetInput) {
    if (!budgetInput) return "moderado";

    const budget = budgetInput.toString().toLowerCase();

    if (
      budget.includes("baixo") ||
      budget.includes("economico") ||
      budget.includes("mochileiro")
    ) {
      return "economico";
    } else if (
      budget.includes("alto") ||
      budget.includes("luxo") ||
      budget.includes("premium")
    ) {
      return "premium";
    } else if (budget.includes("medio") || budget.includes("moderado")) {
      return "moderado";
    }

    // Tenta inferir por valor numérico se fornecido
    const numericValue = parseFloat(
      budget.replace(/[^\d.,]/g, "").replace(",", ".")
    );
    if (numericValue) {
      if (numericValue < 1000) return "economico";
      if (numericValue > 5000) return "premium";
      return "moderado";
    }

    return "moderado";
  }

  determineTravelStyle(data) {
    const indicators = {
      structured: 0,
      flexible: 0,
      spontaneous: 0,
    };

    // Analisa preferências de planejamento
    if (data.planningStyle) {
      if (
        data.planningStyle.includes("detalhado") ||
        data.planningStyle.includes("estruturado")
      ) {
        indicators.structured += 2;
      } else if (
        data.planningStyle.includes("flexivel") ||
        data.planningStyle.includes("adaptavel")
      ) {
        indicators.flexible += 2;
      } else if (
        data.planningStyle.includes("espontaneo") ||
        data.planningStyle.includes("improviso")
      ) {
        indicators.spontaneous += 2;
      }
    }

    // Analisa tolerância a mudanças
    if (data.changeToleranceLevel) {
      const tolerance = data.changeToleranceLevel.toLowerCase();
      if (tolerance.includes("baixa")) {
        indicators.structured += 1;
      } else if (tolerance.includes("alta")) {
        indicators.spontaneous += 1;
      } else {
        indicators.flexible += 1;
      }
    }

    const dominantStyle = Object.entries(indicators).reduce((a, b) =>
      indicators[a[0]] > indicators[b[0]] ? a : b
    )[0];

    return dominantStyle;
  }

  async updateProfileFromInteraction(userId, interactionData) {
    try {
      const profile = this.userProfiles.get(userId);
      if (!profile) {
        throw new Error("Perfil não encontrado");
      }

      // Incrementa contador de interações
      profile.interactionCount += 1;

      // Atualiza preferências baseado no feedback
      if (interactionData.feedback) {
        this.updatePreferencesFromFeedback(profile, interactionData.feedback);
      }

      // Refina DNA de viagem baseado em escolhas
      if (interactionData.choices) {
        this.refineTravelDNA(profile, interactionData.choices);
      }

      // Aumenta confiança do perfil
      profile.confidence = Math.min(1.0, profile.confidence + 0.05);
      profile.lastUpdated = new Date().toISOString();

      this.userProfiles.set(userId, profile);

      return {
        success: true,
        updatedProfile: profile,
        message: "Perfil atualizado com sucesso",
      };
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return {
        success: false,
        error: "Erro na atualização do perfil",
      };
    }
  }

  /**
   * Atualiza preferências baseado em feedback explícito
   */
  updatePreferencesFromFeedback(profile, feedback) {
    // Feedback positivo - reforça preferências
    if (feedback.liked) {
      feedback.liked.forEach((item) => {
        if (item.category) {
          if (!profile.preferences.activities.includes(item.category)) {
            profile.preferences.activities.push(item.category);
          }
        }
      });
    }

    // Feedback negativo - adiciona às restrições
    if (feedback.disliked) {
      feedback.disliked.forEach((item) => {
        if (item.category) {
          if (!profile.sensitivities.includes(item.category)) {
            profile.sensitivities.push(item.category);
          }
        }
      });
    }

    // Ajusta orçamento baseado em escolhas
    if (feedback.budgetFeedback) {
      if (feedback.budgetFeedback === "too_expensive") {
        // Ajusta para categoria mais econômica
        if (profile.budget === "premium") profile.budget = "moderado";
        else if (profile.budget === "moderado") profile.budget = "economico";
      } else if (feedback.budgetFeedback === "can_spend_more") {
        // Ajusta para categoria mais alta
        if (profile.budget === "economico") profile.budget = "moderado";
        else if (profile.budget === "moderado") profile.budget = "premium";
      }
    }
  }

  /**
   * Refina DNA de viagem baseado em escolhas feitas
   */
  refineTravelDNA(profile, choices) {
    choices.forEach((choice) => {
      if (choice.selectedOption && choice.category) {
        // Aumenta score da categoria escolhida
        if (profile.travelDNA.scores[choice.category]) {
          profile.travelDNA.scores[choice.category] += 0.5;
        }
      }
    });

    // Recalcula categoria primária
    const dominantCategory = Object.entries(profile.travelDNA.scores).reduce(
      (a, b) =>
        profile.travelDNA.scores[a[0]] > profile.travelDNA.scores[b[0]] ? a : b
    )[0];

    profile.travelDNA.primary = dominantCategory;
  }

  /**
   * Obtém perfil de usuário
   */
  getUserProfile(userId) {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return {
        success: false,
        error: "Perfil não encontrado",
      };
    }

    return {
      success: true,
      profile: profile,
    };
  }

  generatePersonalizedRecommendations(profile, context) {
    const recommendations = {
      destinations: [],
      activities: [],
      accommodations: [],
      restaurants: [],
    };

    // Recomendações baseadas no DNA de viagem
    switch (profile.travelDNA.primary) {
      case "cultural_historico":
        recommendations.activities.push(
          "Visitas a museus e monumentos históricos",
          "Tours guiados culturais",
          "Espetáculos de arte local"
        );
        break;
      case "explorador_aventureiro":
        recommendations.activities.push(
          "Trilhas e caminhadas",
          "Esportes de aventura",
          "Exploração de áreas remotas"
        );
        break;
      case "gastronomico_gourmet":
        recommendations.restaurants.push(
          "Restaurantes locais autênticos",
          "Tours gastronômicos",
          "Aulas de culinária regional"
        );
        break;
    }

    // Filtra por orçamento
    this.filterByBudget(recommendations, profile.budget);

    // Considera restrições e sensibilidades
    this.applyRestrictions(recommendations, profile.sensitivities);

    return recommendations;
  }

  /**
   * Aplica restrições e sensibilidades
   */
  applyRestrictions(recommendations, sensitivities) {
    sensitivities.forEach((sensitivity) => {
      // Remove recomendações que conflitam com sensibilidades do usuário
      Object.keys(recommendations).forEach((category) => {
        recommendations[category] = recommendations[category].filter(
          (item) => !item.toLowerCase().includes(sensitivity.toLowerCase())
        );
      });
    });
  }
}

export default UserPersonalizationEngine;
