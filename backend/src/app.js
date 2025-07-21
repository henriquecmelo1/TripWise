import express from "express";
import cors from "cors";
// import { getFlights } from "./flights/flights.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware de logging para debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas existentes
// app.post("/flights/search", getFlights);

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "TripWise API - Sistema de Planejamento de Viagens com IA",
    features: {
      "Itinerários Hiper-Personalizados": "/api/ai/itinerary/generate",
      "Copiloto Conversacional": "/api/ai/chat",
      "Perfil de Usuário": "/api/ai/profile/create",
      "Recomendações Contextuais": "/api/ai/recommendations/contextual",
      "Busca de Voos": "/flights/search",
    },
    documentation: {
      "Questionário de Integração": "/api/ai/onboarding/questions",
      "Health Check da IA": "/api/ai/health",
    },
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error("Erro interno:", error);
  res.status(500).json({
    success: false,
    error: "Erro interno do servidor",
    timestamp: new Date().toISOString(),
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
    availableRoutes: [
      "POST /flights/search",
      "POST /api/ai/itinerary/generate",
      "POST /api/ai/chat",
      "POST /api/ai/profile/create",
      "GET /api/ai/profile/:userId",
      "POST /api/ai/recommendations/contextual",
      "POST /api/ai/itinerary/optimize",
      "GET /api/ai/onboarding/questions",
      "GET /api/ai/health",
    ],
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 TripWise Server is running on port: http://localhost:${PORT}`
  );
  console.log(`📊 Features available:`);
  console.log(
    `   • Hiper-Personalização de Itinerários: /api/ai/itinerary/generate`
  );
  console.log(`   • Copiloto Conversacional: /api/ai/chat`);
  console.log(`   • Busca de Voos: /flights/search`);
  console.log(`   • Health Check: /api/ai/health`);
  console.log(`🤖 Sistema de IA carregado e pronto para uso!`);
});
