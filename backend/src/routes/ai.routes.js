import express from "express";
import AIController from "../controllers/ai.controller.js";

const router = express.Router();
const aiController = new AIController();

router.post("/itinerary/generate", async (req, res) => {
  await aiController.generateHyperPersonalizedItinerary(req, res);
});

router.post("/chat", async (req, res) => {
  await aiController.conversationalInterface(req, res);
});

router.post("/profile/create", async (req, res) => {
  await aiController.createUserProfile(req, res);
});

router.get("/profile/:userId", async (req, res) => {
  await aiController.getUserProfile(req, res);
});

router.post("/recommendations/contextual", async (req, res) => {
  await aiController.getContextualRecommendations(req, res);
});

router.post("/itinerary/optimize", async (req, res) => {
  await aiController.optimizeItinerary(req, res);
});

router.get("/patterns/:userId", async (req, res) => {
  await aiController.analyzeBehavioralPatterns(req, res);
});

router.get("/health", async (req, res) => {
  await aiController.healthCheck(req, res);
});

router.post("/predictions/pricing", async (req, res) => {
  await aiController.predictOptimalBookingTime(req, res);
});

router.post("/predictions/crowds", async (req, res) => {
  await aiController.predictCrowdLevels(req, res);
});

router.post("/emergency/support", async (req, res) => {
  await aiController.handleEmergencySupport(req, res);
});

router.get("/onboarding/questions", (req, res) => {
  const questions = [
    {
      id: "travel_motivation",
      type: "multiple_choice",
      question: "O que mais te motiva a viajar?",
      options: [
        { value: "relaxamento", label: "Relaxar e descansar" },
        { value: "aventura", label: "Viver aventuras e experiências únicas" },
        { value: "cultura", label: "Conhecer culturas e história" },
        { value: "gastronomia", label: "Explorar a culinária local" },
        { value: "natureza", label: "Conectar-se com a natureza" },
        { value: "social", label: "Conhecer pessoas e socializar" },
      ],
    },
    {
      id: "budget_preference",
      type: "scale",
      question: "Como você classifica seu orçamento típico para viagens?",
      scale: {
        min: 1,
        max: 5,
        labels: [
          "Muito econômico",
          "Econômico",
          "Moderado",
          "Confortável",
          "Luxuoso",
        ],
      },
    },
    {
      id: "accommodation_type",
      type: "multiple_choice",
      question: "Que tipo de acomodação você prefere?",
      options: [
        { value: "hostel", label: "Hostel ou albergue" },
        { value: "hotel_economico", label: "Hotel econômico" },
        { value: "hotel_medio", label: "Hotel de categoria média" },
        { value: "hotel_luxo", label: "Hotel de luxo" },
        { value: "pousada", label: "Pousada local" },
        { value: "airbnb", label: "Airbnb ou casa alugada" },
        { value: "resort", label: "Resort all-inclusive" },
      ],
    },
    {
      id: "activity_preferences",
      type: "multiple_select",
      question: "Que tipos de atividades mais te interessam? (selecione até 5)",
      maxSelections: 5,
      options: [
        { value: "museus", label: "Museus e galerias" },
        { value: "monumentos", label: "Monumentos históricos" },
        { value: "trilhas", label: "Trilhas e caminhadas" },
        { value: "praias", label: "Praias e atividades aquáticas" },
        { value: "vida_noturna", label: "Vida noturna e entretenimento" },
        { value: "shopping", label: "Shopping e compras" },
        { value: "esportes", label: "Esportes e atividades físicas" },
        { value: "spa", label: "Spa e bem-estar" },
        { value: "fotografia", label: "Fotografia e paisagens" },
        { value: "culinaria", label: "Experiências gastronômicas" },
        { value: "festivais", label: "Festivais e eventos culturais" },
        { value: "natureza", label: "Parques naturais e vida selvagem" },
      ],
    },
    {
      id: "travel_pace",
      type: "multiple_choice",
      question: "Qual seu ritmo preferido de viagem?",
      options: [
        { value: "relaxed", label: "Relaxado - poucas atividades por dia" },
        {
          value: "moderate",
          label: "Moderado - equilíbrio entre atividades e descanso",
        },
        { value: "active", label: "Ativo - muitas atividades e experiências" },
        {
          value: "intensive",
          label: "Intensivo - aproveitar ao máximo cada momento",
        },
      ],
    },
    {
      id: "planning_style",
      type: "multiple_choice",
      question: "Como você prefere planejar suas viagens?",
      options: [
        {
          value: "detalhado",
          label: "Planejamento detalhado com horários fixos",
        },
        { value: "estruturado", label: "Estrutura básica com flexibilidade" },
        { value: "flexivel", label: "Planejamento flexível e adaptável" },
        { value: "espontaneo", label: "Espontâneo - decidir na hora" },
      ],
    },
    {
      id: "group_preference",
      type: "multiple_choice",
      question: "Com quantas pessoas você costuma viajar?",
      options: [
        { value: "solo", label: "Sozinho(a)" },
        { value: "casal", label: "Em casal" },
        { value: "familia_pequena", label: "Família pequena (3-4 pessoas)" },
        { value: "familia_grande", label: "Família grande (5+ pessoas)" },
        { value: "amigos_pequeno", label: "Grupo pequeno de amigos (2-4)" },
        { value: "amigos_grande", label: "Grupo grande de amigos (5+)" },
      ],
    },
    {
      id: "food_restrictions",
      type: "multiple_select",
      question: "Você tem alguma restrição alimentar?",
      options: [
        { value: "nenhuma", label: "Nenhuma restrição" },
        { value: "vegetariano", label: "Vegetariano" },
        { value: "vegano", label: "Vegano" },
        { value: "sem_gluten", label: "Sem glúten" },
        { value: "sem_lactose", label: "Sem lactose" },
        {
          value: "alergias",
          label: "Alergias específicas (especificar depois)",
        },
      ],
    },
    {
      id: "transport_preference",
      type: "multiple_select",
      question: "Que meios de transporte você prefere?",
      options: [
        { value: "aviao", label: "Avião" },
        { value: "carro_proprio", label: "Carro próprio" },
        { value: "carro_alugado", label: "Carro alugado" },
        { value: "transporte_publico", label: "Transporte público" },
        { value: "uber_taxi", label: "Uber/Táxi" },
        { value: "bicicleta", label: "Bicicleta" },
        { value: "caminhada", label: "Caminhada" },
        { value: "trem", label: "Trem" },
        { value: "onibus", label: "Ônibus" },
      ],
    },
    {
      id: "authentic_experiences",
      type: "multiple_choice",
      question: "Que tipo de experiências autênticas mais te atrai?",
      options: [
        {
          value: "locais_escondidos",
          label: "Locais escondidos e menos conhecidos",
        },
        {
          value: "interacao_locais",
          label: "Interação genuína com moradores locais",
        },
        {
          value: "tradicoes_culturais",
          label: "Tradições e festivais culturais",
        },
        {
          value: "artesanato_local",
          label: "Artesanato e produtos locais únicos",
        },
        {
          value: "culinaria_tradicional",
          label: "Culinária tradicional e familiar",
        },
        { value: "historia_oral", label: "História oral e narrativas locais" },
      ],
    },
  ];

  res.json({
    success: true,
    questions: questions,
    instructions:
      "Complete este questionário para criarmos seu perfil personalizado de viagem",
    estimated_time: "4-5 minutos",
  });
});

export default router;
