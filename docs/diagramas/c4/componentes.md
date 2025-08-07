# Diagrama de Componentes - TripWise (C4 Nível 3)

## Visão Geral

Este diagrama detalha os componentes internos dos principais contêineres do sistema TripWise, mostrando como cada serviço é estruturado internamente.

## Diagrama - Servidor API e Serviços Core

```mermaid
graph TB
    %% External Users
    USER[👤 Usuário]
    
    %% API Server Container
    subgraph API_CONTAINER["⚙️ Servidor API (Node.js + Express)"]
        %% Routes
        AI_ROUTES[🛣️ AI Routes<br/>/api/ai/*<br/><br/>• /itinerary/generate<br/>• /itinerary/form<br/>• /chat<br/>• /profile/*]
        
        HEALTH_ROUTES[🛣️ Health Routes<br/>/health, /status<br/><br/>• Health checks<br/>• System status<br/>• Metrics endpoint]
        
        %% Middleware
        AUTH_MIDDLEWARE[🔐 Auth Middleware<br/><br/>• JWT validation<br/>• Rate limiting<br/>• CORS handling<br/>• Request logging]
        
        ERROR_MIDDLEWARE[❌ Error Middleware<br/><br/>• Error handling<br/>• Response formatting<br/>• Logging errors<br/>• Fallback responses]
        
        %% Controllers
        AI_CONTROLLER[🎮 AI Controller<br/><br/>• generateItinerary()<br/>• generateFromForm()<br/>• handleChat()<br/>• createProfile()]
    end
    
    %% AI Engine Container
    subgraph AI_ENGINE_CONTAINER["🤖 Motor de IA"]
        %% Core Components
        ITINERARY_GENERATOR[📋 Itinerary Generator<br/><br/>• generatePersonalizedItinerary()<br/>• buildPromptStructure()<br/>• processAIResponse()<br/>• validateItinerary()]
        
        PROMPT_BUILDER[📝 Prompt Builder<br/><br/>• buildContextualPrompt()<br/>• addUserPreferences()<br/>• includeExternalData()<br/>• optimizePromptLength()]
        
        NARRATIVE_ENGINE[📖 Narrative Engine<br/><br/>• createThematicNarrative()<br/>• generateDayByDay()<br/>• addHiddenGems()<br/>• formatOutput()]
        
        OPTIMIZATION_ENGINE[⚡ Optimization Engine<br/><br/>• optimizeBudget()<br/>• optimizeTime()<br/>• optimizeLogistics()<br/>• balanceInterests()]
    end
    
    %% Chat Service Container
    subgraph CHAT_CONTAINER["💬 Serviço de Chat"]
        %% Chat Components
        INTENT_ANALYZER[🎯 Intent Analyzer<br/><br/>• analyzeUserIntent()<br/>• classifyMessageType()<br/>• extractEntities()<br/>• determineResponse()]
        
        CONTEXT_MANAGER[🧠 Context Manager<br/><br/>• maintainSessionContext()<br/>• trackConversationFlow()<br/>• manageMultiTurn()<br/>• updateUserState()]
        
        RESPONSE_GENERATOR[💭 Response Generator<br/><br/>• generateContextualResponse()<br/>• addSuggestions()<br/>• formatChatResponse()<br/>• handleFollowUp()]
        
        SESSION_MANAGER[🔄 Session Manager<br/><br/>• createSession()<br/>• updateSession()<br/>• expireSession()<br/>• persistSession()]
    end
    
    %% Profile Service Container
    subgraph PROFILE_CONTAINER["👤 Serviço de Perfis"]
        %% Profile Components
        DNA_CALCULATOR[🧬 DNA Calculator<br/><br/>• calculateTravelDNA()<br/>• inferPreferences()<br/>• updateDNAProfile()<br/>• validateDNA()]
        
        LEARNING_ENGINE[📚 Learning Engine<br/><br/>• processUserFeedback()<br/>• updatePreferences()<br/>• identifyPatterns()<br/>• improveRecommendations()]
        
        PROFILE_MANAGER[👥 Profile Manager<br/><br/>• createUserProfile()<br/>• updateProfile()<br/>• getProfile()<br/>• deleteProfile()]
        
        ONBOARDING_ENGINE[🚀 Onboarding Engine<br/><br/>• generateQuestions()<br/>• processAnswers()<br/>• createInitialProfile()<br/>• validateOnboarding()]
    end
    
    %% External API Service Container
    subgraph EXTERNAL_API_CONTAINER["🌐 Serviço de APIs Externas"]
        %% API Integrations
        WEATHER_CLIENT[🌤️ Weather Client<br/><br/>• getCurrentWeather()<br/>• getForecast()<br/>• handleWeatherAPI()<br/>• cacheWeatherData()]
        
        PLACES_CLIENT[🍽️ Places Client<br/><br/>• searchRestaurants()<br/>• getAttractions()<br/>• fetchPlaceDetails()<br/>• cachePlaceData()]
        
        EXCHANGE_CLIENT[💱 Exchange Client<br/><br/>• getCurrentRates()<br/>• convertCurrency()<br/>• getHistoricalRates()<br/>• cacheRates()]
        
        API_ORCHESTRATOR[🎼 API Orchestrator<br/><br/>• coordinateAPICalls()<br/>• aggregateData()<br/>• handleFailures()<br/>• manageRateLimits()]
        
        CACHE_MANAGER[⚡ Cache Manager<br/><br/>• setCacheData()<br/>• getCacheData()<br/>• invalidateCache()<br/>• manageTTL()]
    end
    
    %% External Systems
    GEMINI[🤖 Google Gemini]
    WEATHER_API[🌤️ Weather APIs]
    PLACES_API[🍽️ Places APIs]
    EXCHANGE_API[💱 Exchange APIs]
    
    %% Storage
    USER_DB[(👥 User Database)]
    CACHE_DB[(⚡ Redis Cache)]
    FILE_STORAGE[(📁 File Storage)]
    
    %% User Interactions
    USER -->|HTTPS Requests| AUTH_MIDDLEWARE
    
    %% API Server Internal Flow
    AUTH_MIDDLEWARE --> AI_ROUTES
    AUTH_MIDDLEWARE --> HEALTH_ROUTES
    AI_ROUTES --> AI_CONTROLLER
    AI_CONTROLLER --> ERROR_MIDDLEWARE
    ERROR_MIDDLEWARE --> USER
    
    %% Controller to Services
    AI_CONTROLLER -->|Function Calls| ITINERARY_GENERATOR
    AI_CONTROLLER -->|Function Calls| INTENT_ANALYZER
    AI_CONTROLLER -->|Function Calls| PROFILE_MANAGER
    
    %% AI Engine Internal Flow
    ITINERARY_GENERATOR --> PROMPT_BUILDER
    PROMPT_BUILDER --> NARRATIVE_ENGINE
    NARRATIVE_ENGINE --> OPTIMIZATION_ENGINE
    ITINERARY_GENERATOR -->|Prompts| GEMINI
    GEMINI -->|Responses| ITINERARY_GENERATOR
    
    %% Chat Service Internal Flow
    INTENT_ANALYZER --> CONTEXT_MANAGER
    CONTEXT_MANAGER --> RESPONSE_GENERATOR
    RESPONSE_GENERATOR --> SESSION_MANAGER
    RESPONSE_GENERATOR -->|Chat Prompts| GEMINI
    GEMINI -->|Chat Responses| RESPONSE_GENERATOR
    
    %% Profile Service Internal Flow
    PROFILE_MANAGER --> DNA_CALCULATOR
    DNA_CALCULATOR --> LEARNING_ENGINE
    ONBOARDING_ENGINE --> PROFILE_MANAGER
    LEARNING_ENGINE --> PROFILE_MANAGER
    
    %% External API Service Internal Flow
    API_ORCHESTRATOR --> WEATHER_CLIENT
    API_ORCHESTRATOR --> PLACES_CLIENT
    API_ORCHESTRATOR --> EXCHANGE_CLIENT
    WEATHER_CLIENT --> CACHE_MANAGER
    PLACES_CLIENT --> CACHE_MANAGER
    EXCHANGE_CLIENT --> CACHE_MANAGER
    
    %% External API Calls
    WEATHER_CLIENT -->|HTTP Requests| WEATHER_API
    PLACES_CLIENT -->|HTTP Requests| PLACES_API
    EXCHANGE_CLIENT -->|HTTP Requests| EXCHANGE_API
    
    %% Data Storage Connections
    PROFILE_MANAGER -->|Database Queries| USER_DB
    SESSION_MANAGER -->|Cache Operations| CACHE_DB
    CACHE_MANAGER -->|Cache Operations| CACHE_DB
    ITINERARY_GENERATOR -->|File Operations| FILE_STORAGE
    
    %% Cross-Service Communication
    ITINERARY_GENERATOR -.->|Data Exchange| API_ORCHESTRATOR
    ITINERARY_GENERATOR -.->|Profile Data| DNA_CALCULATOR
    INTENT_ANALYZER -.->|Profile Context| PROFILE_MANAGER
    RESPONSE_GENERATOR -.->|Itinerary Data| ITINERARY_GENERATOR
    
    %% Styling
    classDef userClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef routeClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef middlewareClass fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef controllerClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#000
    classDef aiClass fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000
    classDef chatClass fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#000
    classDef profileClass fill:#e0f2f1,stroke:#004d40,stroke-width:2px,color:#000
    classDef apiClass fill:#fff8e1,stroke:#ff6f00,stroke-width:2px,color:#000
    classDef externalClass fill:#fafafa,stroke:#424242,stroke-width:2px,color:#000
    classDef storageClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    
    class USER userClass
    class AI_ROUTES,HEALTH_ROUTES routeClass
    class AUTH_MIDDLEWARE,ERROR_MIDDLEWARE middlewareClass
    class AI_CONTROLLER controllerClass
    class ITINERARY_GENERATOR,PROMPT_BUILDER,NARRATIVE_ENGINE,OPTIMIZATION_ENGINE aiClass
    class INTENT_ANALYZER,CONTEXT_MANAGER,RESPONSE_GENERATOR,SESSION_MANAGER chatClass
    class DNA_CALCULATOR,LEARNING_ENGINE,PROFILE_MANAGER,ONBOARDING_ENGINE profileClass
    class WEATHER_CLIENT,PLACES_CLIENT,EXCHANGE_CLIENT,API_ORCHESTRATOR,CACHE_MANAGER apiClass
    class GEMINI,WEATHER_API,PLACES_API,EXCHANGE_API externalClass
    class USER_DB,CACHE_DB,FILE_STORAGE storageClass
```

## Descrição Detalhada dos Componentes

### ⚙️ Servidor API - Componentes

#### Routes (Roteamento)
- **AI Routes**: Gerencia todos os endpoints relacionados à IA
  - `/api/ai/itinerary/generate`: Geração de itinerários
  - `/api/ai/itinerary/form`: Formulário de preferências
  - `/api/ai/chat`: Interface conversacional
  - `/api/ai/profile/*`: Gestão de perfis

- **Health Routes**: Endpoints de monitoramento
  - `/api/ai/health`: Status básico do sistema


#### Controllers
- **AI Controller**: Orquestra chamadas para serviços de IA
  ```javascript
  class AIController {
    async generateItinerary(req, res) {
      // Coordena geração de itinerário
    }
    
    async handleChat(req, res) {
      // Gerencia chat conversacional
    }
  }
  ```

### 🤖 Motor de IA - Componentes

#### Itinerary Generator
- **Responsabilidades**:
  - Orquestrar todo o processo de geração
  - Validar dados de entrada
  - Coordenar com outros componentes
  - Formatar saída final

- **Métodos Principais**:
  ```javascript
  class ItineraryGenerator {
    async generatePersonalizedItinerary(userData, externalData) {
      const prompt = await this.promptBuilder.build(userData, externalData);
      const aiResponse = await this.callGemini(prompt);
      const narrative = await this.narrativeEngine.process(aiResponse);
      return this.optimizationEngine.optimize(narrative, userData.constraints);
    }
  }
  ```

#### Prompt Builder
- **Funcionalidades**:
  - Construção de prompts estruturados
  - Inclusão de dados contextuais
  - Otimização de tamanho do prompt
  - Templates reutilizáveis

#### Narrative Engine
- **Características**:
  - Criação de narrativas temáticas
  - Estruturação de itinerários por dia
  - Inclusão de "joias escondidas"
  - Formatação consistente

#### Optimization Engine
- **Algoritmos**:
  - Otimização de orçamento
  - Otimização de tempo de deslocamento
  - Balanceamento de interesses
  - Considerações logísticas

### 💬 Serviço de Chat - Componentes

#### Intent Analyzer
- **Tipos de Intenção Identificados**:
  ```javascript
  const INTENT_TYPES = {
    PLANEJAMENTO_INICIAL: 'planning_start',
    MODIFICACAO_ITINERARIO: 'itinerary_modify',
    PERGUNTA_DESTINO: 'destination_question',
    PERGUNTA_ORCAMENTO: 'budget_question',
    PERGUNTA_ATIVIDADE: 'activity_question',
    FEEDBACK_POSITIVO: 'positive_feedback',
    FEEDBACK_NEGATIVO: 'negative_feedback',
    AJUDA_GERAL: 'general_help'
  };
  ```

#### Context Manager
- **Gestão de Contexto**:
  - Histórico de conversas
  - Estado atual da sessão
  - Preferências temporárias
  - Contexto de itinerário ativo

#### Response Generator
- **Estratégias de Resposta**:
  - Respostas diretas
  - Perguntas de esclarecimento
  - Sugestões proativas
  - Redirecionamento para funcionalidades

### 👤 Serviço de Perfis - Componentes

#### DNA Calculator
- **Categorias de DNA de Viagem**:
  ```javascript
  const TRAVEL_DNA_TYPES = {
    AVENTUREIRO_RADICAL: 'adventurous_extreme',
    EXPLORADOR_CULTURAL: 'cultural_explorer',
    RELAXAMENTO_LUXO: 'luxury_relaxation',
    GASTRONOMICO_GOURMET: 'gourmet_foodie',
    HISTORICO_EDUCATIVO: 'historical_educational',
    NATUREZA_ECOTURISMO: 'nature_ecotourism',
    URBANO_COSMOPOLITA: 'urban_cosmopolitan',
    ECONOMICO_MOCHILEIRO: 'budget_backpacker'
  };
  ```

#### Learning Engine
- **Algoritmos de Aprendizado**:
  - Análise de feedback implícito
  - Detecção de padrões comportamentais
  - Atualização incremental de preferências
  - Validação de mudanças de perfil

### 🌐 Serviço de APIs Externas - Componentes

#### Weather Client
- **Funcionalidades**:
  ```javascript
  class WeatherClient {
    async getCurrentWeather(location) {
      // Implementação com fallback entre APIs
    }
    
    async getForecast(location, days) {
      // Previsão com cache inteligente
    }
  }
  ```

#### API Orchestrator
- **Padrões Implementados**:
  - Circuit Breaker
  - Retry com Exponential Backoff
  - Timeout Management
  - Parallel API Calls

#### Cache Manager
- **Estratégias de Cache**:
  ```javascript
  const CACHE_STRATEGIES = {
    WEATHER: { ttl: 1800 }, // 30 minutos
    PLACES: { ttl: 86400 }, // 24 horas
    EXCHANGE: { ttl: 3600 }, // 1 hora
    EVENTS: { ttl: 7200 }   // 2 horas
  };
  ```

## Padrões de Design Implementados

### 1. Factory Pattern
```javascript
class PromptFactory {
  static createPrompt(type, data) {
    switch(type) {
      case 'ITINERARY': return new ItineraryPrompt(data);
      case 'CHAT': return new ChatPrompt(data);
      case 'OPTIMIZATION': return new OptimizationPrompt(data);
    }
  }
}
```

### 2. Strategy Pattern
```javascript
class ResponseStrategy {
  constructor(intentType) {
    this.strategy = this.getStrategy(intentType);
  }
  
  getStrategy(intentType) {
    const strategies = {
      'PLANEJAMENTO_INICIAL': new PlanningStrategy(),
      'PERGUNTA_DESTINO': new DestinationStrategy(),
      'FEEDBACK_NEGATIVO': new FeedbackStrategy()
    };
    return strategies[intentType];
  }
}
```

### 3. Observer Pattern
```javascript
class ProfileUpdateObserver {
  update(userId, changes) {
    // Notifica outros serviços sobre mudanças no perfil
    this.notifyLearningEngine(userId, changes);
    this.notifyRecommendationEngine(userId, changes);
  }
}
```

### 4. Command Pattern
```javascript
class APICommand {
  constructor(apiClient, method, params) {
    this.apiClient = apiClient;
    this.method = method;
    this.params = params;
  }
  
  async execute() {
    return await this.apiClient[this.method](this.params);
  }
}
```

## Fluxos de Dados Detalhados

### Fluxo de Geração de Itinerário
```
1. User Request → AI Controller
2. AI Controller → Profile Manager (get user profile)
3. AI Controller → API Orchestrator (get external data)
4. AI Controller → Itinerary Generator
5. Itinerary Generator → Prompt Builder
6. Prompt Builder → Narrative Engine
7. Narrative Engine → Google Gemini
8. Google Gemini → Optimization Engine
9. Optimization Engine → File Storage
10. Result → User
```

### Fluxo de Chat Conversacional (backlog)
```
1. User Message → Intent Analyzer
2. Intent Analyzer → Context Manager
3. Context Manager → Profile Manager (if needed)
4. Context Manager → Response Generator
5. Response Generator → Google Gemini (if needed)
6. Response Generator → Session Manager
7. Session Manager → Cache
8. Response → User
```

## Métricas e Monitoramento

### Métricas por Componente
```javascript
const COMPONENT_METRICS = {
  ITINERARY_GENERATOR: {
    'generation_time': 'histogram',
    'success_rate': 'counter',
    'prompt_length': 'histogram'
  },
  INTENT_ANALYZER: {
    'classification_accuracy': 'gauge',
    'processing_time': 'histogram',
    'intent_distribution': 'counter'
  },
  API_ORCHESTRATOR: {
    'api_response_time': 'histogram',
    'api_error_rate': 'counter',
    'cache_hit_rate': 'gauge'
  }
};
```

### Health Checks
```javascript
class ComponentHealthCheck {
  async checkAIEngine() {
    // Verifica se Gemini está respondendo
    // Verifica se prompts estão sendo processados
  }
  
  async checkExternalAPIs() {
    // Verifica conectividade com APIs externas
    // Verifica rate limits
  }
}
```

---

**Próximo Nível**: [Diagrama de Código](codigo.md) - Detalhes de implementação específicos (opcional)