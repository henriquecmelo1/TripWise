import express from "express";
import AIController from "../controllers/ai.controller.js";
import ValidationMiddleware from "../middleware/validation.js";
import rateLimiter from "../middleware/rateLimiting.js";

const router = express.Router();
const aiController = new AIController();

// Endpoint com validação e rate limiting específico
router.post("/itinerary/generate", 
  rateLimiter.createEndpointLimiter("/api/ai/itinerary/generate"),
  ValidationMiddleware.validateItineraryForm,
  async (req, res) => {
    await aiController.generateItineraryFromForm(req, res);
  }
);

router.post("/itinerary/generate-with-profile", 
  rateLimiter.createEndpointLimiter("/api/ai/itinerary/generate"),
  async (req, res) => {
    await aiController.generateHyperPersonalizedItinerary(req, res);
  }
);

router.post("/chat", 
  rateLimiter.createEndpointLimiter("/api/ai/chat"),
  ValidationMiddleware.validateChatMessage,
  async (req, res) => {
    await aiController.conversationalInterface(req, res);
  }
);

router.post("/profile/create", 
  rateLimiter.createEndpointLimiter("/api/ai/profile/create"),
  ValidationMiddleware.validateProfileCreation,
  async (req, res) => {
    await aiController.createUserProfile(req, res);
  }
);

router.get("/profile/:userId", async (req, res) => {
  await aiController.getUserProfile(req, res);
});

router.post("/recommendations/contextual", async (req, res) => {
  await aiController.getContextualRecommendations(req, res);
});

router.post("/itinerary/optimize", async (req, res) => {
  await aiController.optimizeItinerary(req, res);
});

router.get("/health", async (req, res) => {
  await aiController.healthCheck(req, res);
});

router.get("/status", (req, res) => {
  const rateLimitStats = rateLimiter.getStats();
  res.json({
    success: true,
    rateLimitStats,
    timestamp: new Date().toISOString(),
  });
});

router.get("/itinerary/form", (req, res) => {
  const form = [
    {
      section: "trip_details",
      title: "Detalhes da Viagem",
      fields: [
        {
          id: "departure_location",
          type: "text",
          label: "Local de partida",
          placeholder: "Ex: São Paulo, Brasil",
          required: true,
        },
        {
          id: "destination",
          type: "text",
          label: "Destino",
          placeholder: "Ex: Lisboa, Portugal",
          required: true,
        },
        {
          id: "start_date",
          type: "date",
          label: "Data de início",
          required: true,
        },
        {
          id: "end_date",
          type: "date",
          label: "Data de fim",
          required: true,
        },
        {
          id: "travelers_count",
          type: "number",
          label: "Número de viajantes",
          min: 1,
          max: 20,
          required: true,
        },
        {
          id: "trip_type",
          type: "select",
          label: "Tipo de viagem",
          options: [
            { value: "lazer", label: "Lazer/Turismo" },
            { value: "romantico", label: "Romântica" },
            { value: "aventura", label: "Aventura" },
            { value: "negocios", label: "Negócios" },
            { value: "familia", label: "Família" },
            { value: "solo", label: "Solo" },
          ],
          required: true,
        },
      ],
    },
    {
      section: "preferences",
      title: "Suas Preferências",
      fields: [
        {
          id: "budget_range",
          type: "select",
          label: "Faixa de orçamento para esta viagem",
          options: [
            { value: "economico", label: "Econômico - Até R$ 2.000" },
            { value: "moderado", label: "Moderado - R$ 2.000 a R$ 5.000" },
            {
              value: "confortavel",
              label: "Confortável - R$ 5.000 a R$ 10.000",
            },
            { value: "premium", label: "Premium - Acima de R$ 10.000" },
          ],
          required: true,
        },
        {
          id: "accommodation_preference",
          type: "select",
          label: "Preferência de hospedagem",
          options: [
            { value: "hostel", label: "Hostel/Albergue" },
            { value: "hotel_economico", label: "Hotel Econômico" },
            { value: "hotel_medio", label: "Hotel Categoria Média" },
            { value: "hotel_luxo", label: "Hotel de Luxo" },
            { value: "pousada", label: "Pousada" },
            { value: "airbnb", label: "Airbnb/Casa" },
            { value: "resort", label: "Resort" },
          ],
          required: true,
        },
        {
          id: "activity_interests",
          type: "multi_select",
          label: "Atividades de interesse (selecione até 5)",
          maxSelections: 5,
          options: [
            { value: "cultura", label: "Cultura e História" },
            { value: "gastronomia", label: "Gastronomia" },
            { value: "aventura", label: "Aventura e Esportes" },
            { value: "natureza", label: "Natureza e Paisagens" },
            { value: "relaxamento", label: "Relaxamento e Bem-estar" },
            { value: "vida_noturna", label: "Vida Noturna" },
            { value: "shopping", label: "Compras" },
            { value: "arte", label: "Arte e Museus" },
            { value: "fotografia", label: "Fotografia" },
            { value: "festivais", label: "Festivais e Eventos" },
          ],
          required: true,
        },
        {
          id: "travel_pace",
          type: "select",
          label: "Ritmo de viagem preferido",
          options: [
            {
              value: "relaxado",
              label: "Relaxado - Poucas atividades por dia",
            },
            { value: "moderado", label: "Moderado - Equilíbrio" },
            { value: "ativo", label: "Ativo - Muitas atividades" },
            { value: "intensivo", label: "Intensivo - Máximo aproveitamento" },
          ],
          required: true,
        },
        {
          id: "food_restrictions",
          type: "multi_select",
          label: "Restrições alimentares",
          options: [
            { value: "nenhuma", label: "Nenhuma restrição" },
            { value: "vegetariano", label: "Vegetariano" },
            { value: "vegano", label: "Vegano" },
            { value: "sem_gluten", label: "Sem glúten" },
            { value: "sem_lactose", label: "Sem lactose" },
          ],
        },
        {
          id: "transport_preferences",
          type: "multi_select",
          label: "Meios de transporte preferidos",
          options: [
            { value: "caminhada", label: "Caminhada" },
            { value: "transporte_publico", label: "Transporte Público" },
            { value: "taxi_uber", label: "Táxi/Uber" },
            { value: "carro_alugado", label: "Carro Alugado" },
            { value: "bicicleta", label: "Bicicleta" },
            { value: "trem", label: "Trem" },
          ],
        },
        {
          id: "experience_type",
          type: "select",
          label: "Tipo de experiência desejada",
          options: [
            { value: "turistico", label: "Pontos turísticos principais" },
            { value: "autentico", label: "Experiências autênticas locais" },
            { value: "misto", label: "Mistura de ambos" },
            { value: "off_beaten", label: "Locais pouco conhecidos" },
          ],
          required: true,
        },
      ],
    },
  ];

  res.json({
    success: true,
    form: form,
    instructions:
      "Preencha o formulário para gerar seu itinerário personalizado",
    estimated_time: "2-3 minutos",
  });
});

export default router;
