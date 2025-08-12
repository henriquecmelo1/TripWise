import express from "express";
import cors from "cors";
import { getFlights } from "./flights/flights.js";
import aiRoutes from "./routes/ai.routes.js";
import externalRoutes from "./routes/external.routes.js";
import logger from "./utils/logger.js";
import EnvironmentValidator from "./utils/environmentValidator.js";
import ValidationMiddleware from "./middleware/validation.js";
import rateLimiter from "./middleware/rateLimiting.js";

const envValidator = new EnvironmentValidator();
if (!envValidator.canStart()) {
  console.log(
    "\n❌ Sistema não pode iniciar. Corrija os problemas acima e tente novamente.\n"
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger.requestLogger());

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(rateLimiter.globalRateLimit.bind(rateLimiter));

app.use(ValidationMiddleware.sanitizeInputs);

app.post("/flights/search", getFlights);
app.use("/api/ai", aiRoutes);
app.use("/api/external", externalRoutes);

app.get("/", (req, res) => {
  const validationResults = envValidator.validateEnvironment();
  const statusReport = envValidator.generateStatusReport(validationResults);

  res.json({
    message: "TripWise API - Sistema de Planejamento de Viagens com IA",
    status: statusReport.status,
    environment: statusReport.environment,
    services: statusReport.services,
    features: {
      "Itinerários Hiper-Personalizados": "/api/ai/itinerary/generate",
      "Copiloto Conversacional": "/api/ai/chat",
      "Perfil de Usuário": "/api/ai/profile/create",
      "Recomendações Contextuais": "/api/ai/recommendations/contextual",
      "Busca de Voos": "/flights/search",
      "Fotos de Destinos": "/api/external/photos",
    },
    documentation: {
      "Health Check da IA": "/api/ai/health",
      "Status APIs Externas": "/api/external/health",
      "Status Unsplash": "/api/external/photos/status",
      "Rate Limit Status": "/api/ai/status",
    },
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.use(logger.errorLogger());
app.use((error, req, res, next) => {
  logger.error("Erro interno não tratado", error, {
    method: req.method,
    url: req.url,
    userAgent: req.get("User-Agent"),
    ip: req.ip,
  });

  res.status(500).json({
    success: false,
    error: "Erro interno do servidor",
    requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
  });
});

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
  const validationResults = envValidator.validateEnvironment();
  const statusReport = envValidator.generateStatusReport(validationResults);

  logger.logSystemStart({
    port: PORT,
    environment: statusReport.environment,
    apisConfigured: Object.keys(statusReport.services).filter(
      (service) => statusReport.services[service]
    ),
  });

  console.log(`\n🚀 TripWise Server iniciado com sucesso!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Ambiente: ${statusReport.environment}`);
  console.log(
    `📊 Serviços ativos: ${
      Object.keys(statusReport.services).filter((s) => statusReport.services[s])
        .length
    }/4`
  );

  if (statusReport.services.weather) console.log(`   ✅ Dados meteorológicos`);
  if (statusReport.services.places) console.log(`   ✅ Restaurantes e hotéis`);
  if (statusReport.services.exchange) console.log(`   ✅ Taxas de câmbio`);
  console.log(`   ✅ Sistema de IA (Gemini)`);

  console.log(`\n🎯 Endpoints principais:`);
  console.log(`   • POST /api/ai/itinerary/generate - Gerar itinerário`);
  console.log(`   • POST /api/ai/chat - Chat conversacional`);
  console.log(`   • GET /api/ai/health - Health check`);
  console.log(`   • GET / - Status do sistema\n`);

  if (statusReport.environment === "development") {
    envValidator.watchEnvironment((newResults) => {
      logger.info("Configuração de ambiente atualizada", { newResults });
    });
  }
});
