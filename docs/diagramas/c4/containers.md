# Diagrama de Contêineres - TripWise (C4 Nível 2)

## Visão Geral

Este diagrama detalha a arquitetura interna do sistema TripWise, mostrando os contêineres (aplicações, serviços, bancos de dados) que compõem o sistema e como eles interagem.

## Diagrama

```mermaid
graph TB
    %% Usuários
    USER[👤 Usuário<br/>Viajantes, Agentes, etc.]
    
    %% Boundary do Sistema TripWise
    subgraph TRIPWISE_SYSTEM["🚀 Sistema TripWise"]
        %% Frontend
        WEB_APP[🌐 Aplicação Web<br/>React/Vue.js<br/><br/>• Interface de usuário<br/>• Formulários de preferências<br/>• Chat conversacional<br/>• Visualização de itinerários]
        
        MOBILE_APP[📱 Aplicação Mobile<br/>React Native/Flutter<br/><br/>• Interface mobile<br/>• Notificações push<br/>• Modo offline<br/>• Geolocalização]
        
        %% Backend API
        API_SERVER[⚙️ Servidor API<br/>Node.js + Express<br/><br/>• Endpoints REST<br/>• Autenticação<br/>• Rate limiting<br/>• Middleware de logging]
        
        %% Core Services
        AI_ENGINE[🤖 Motor de IA<br/>Node.js Service<br/><br/>• Geração de itinerários<br/>• Processamento de prompts<br/>• Análise de preferências<br/>• Otimização multidimensional]
        
        CHAT_SERVICE[💬 Serviço de Chat<br/>Node.js Service<br/><br/>• Copiloto conversacional<br/>• Análise de intenções<br/>• Gestão de sessões<br/>• Contexto multi-turno]
        
        PROFILE_SERVICE[👤 Serviço de Perfis<br/>Node.js Service<br/><br/>• Gestão de usuários<br/>• DNA de viagem<br/>• Aprendizado contínuo<br/>• Histórico de preferências]
        
        EXTERNAL_API_SERVICE[🌐 Serviço de APIs Externas<br/>Node.js Service<br/><br/>• Integração com APIs<br/>• Cache de dados<br/>• Fallback handling<br/>• Rate limiting]
        
        %% Data Storage
        USER_DB[(👥 Base de Dados<br/>de Usuários<br/>MongoDB/PostgreSQL<br/><br/>• Perfis de usuário<br/>• Preferências<br/>• Histórico de viagens<br/>• Sessões de chat)]
        
        CACHE_DB[(⚡ Cache<br/>Redis<br/><br/>• Dados de APIs externas<br/>• Sessões ativas<br/>• Resultados frequentes<br/>• Rate limiting)]
        
        ITINERARY_STORAGE[(📋 Armazenamento<br/>de Itinerários<br/>File System/S3<br/><br/>• Itinerários gerados<br/>• Imagens e mídia<br/>• Documentos PDF<br/>• Backups)]
    end
    
    %% Sistemas Externos
    GEMINI[🤖 Google Gemini<br/>IA Generativa]
    WEATHER_API[🌤️ APIs Meteorológicas<br/>OpenWeather, WeatherAPI]
    PLACES_API[🍽️ APIs de Locais<br/>Foursquare, Google Places]
    EXCHANGE_API[💱 APIs de Câmbio<br/>ExchangeRate, Fixer]
    TRANSPORT_API[🚇 APIs de Transporte<br/>OpenStreetMap, Transit]
    EVENTS_API[🎭 APIs de Eventos<br/>Eventbrite, Gov APIs]
    FLIGHTS_API[✈️ APIs de Voos<br/>Amadeus]
    
    %% Relacionamentos - Usuário para Frontend
    USER -.->|HTTPS<br/>Requests| WEB_APP
    USER -.->|Mobile<br/>Requests| MOBILE_APP
    
    %% Relacionamentos - Frontend para Backend
    WEB_APP -->|REST API<br/>JSON/HTTPS| API_SERVER
    MOBILE_APP -->|REST API<br/>JSON/HTTPS| API_SERVER
    
    %% Relacionamentos - API Server para Services
    API_SERVER -->|Function Calls<br/>JavaScript| AI_ENGINE
    API_SERVER -->|Function Calls<br/>JavaScript| CHAT_SERVICE
    API_SERVER -->|Function Calls<br/>JavaScript| PROFILE_SERVICE
    API_SERVER -->|Function Calls<br/>JavaScript| EXTERNAL_API_SERVICE
    
    %% Relacionamentos - Services entre si
    AI_ENGINE -->|Data Exchange<br/>JSON| PROFILE_SERVICE
    AI_ENGINE -->|Data Exchange<br/>JSON| EXTERNAL_API_SERVICE
    CHAT_SERVICE -->|Data Exchange<br/>JSON| PROFILE_SERVICE
    CHAT_SERVICE -->|Data Exchange<br/>JSON| AI_ENGINE
    
    %% Relacionamentos - Services para Storage
    PROFILE_SERVICE -->|SQL/NoSQL<br/>Queries| USER_DB
    AI_ENGINE -->|File I/O<br/>JSON/PDF| ITINERARY_STORAGE
    CHAT_SERVICE -->|Redis<br/>Commands| CACHE_DB
    EXTERNAL_API_SERVICE -->|Redis<br/>Commands| CACHE_DB
    
    %% Relacionamentos - Services para IA
    AI_ENGINE -->|HTTPS<br/>JSON Prompts| GEMINI
    CHAT_SERVICE -->|HTTPS<br/>JSON Prompts| GEMINI
    
    %% Relacionamentos - External API Service para APIs
    EXTERNAL_API_SERVICE -->|HTTPS<br/>REST Calls| WEATHER_API
    EXTERNAL_API_SERVICE -->|HTTPS<br/>REST Calls| PLACES_API
    EXTERNAL_API_SERVICE -->|HTTPS<br/>REST Calls| EXCHANGE_API
    EXTERNAL_API_SERVICE -->|HTTPS<br/>REST Calls| TRANSPORT_API
    EXTERNAL_API_SERVICE -->|HTTPS<br/>REST Calls| EVENTS_API
    EXTERNAL_API_SERVICE -->|HTTPS<br/>REST Calls| FLIGHTS_API
    
    %% Estilização
    classDef userClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef frontendClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef backendClass fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef serviceClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#000
    classDef storageClass fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000
    classDef externalClass fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#000
    
    class USER userClass
    class WEB_APP,MOBILE_APP frontendClass
    class API_SERVER backendClass
    class AI_ENGINE,CHAT_SERVICE,PROFILE_SERVICE,EXTERNAL_API_SERVICE serviceClass
    class USER_DB,CACHE_DB,ITINERARY_STORAGE storageClass
    class GEMINI,WEATHER_API,PLACES_API,EXCHANGE_API,TRANSPORT_API,EVENTS_API,FLIGHTS_API externalClass
```

## Descrição dos Contêineres

### 🌐 Camada de Apresentação

#### Aplicação Web
- **Tecnologia**: React.js
- **Responsabilidades**:
  - Interface de usuário responsiva
  - Formulários de coleta de preferências
  - Chat conversacional em tempo real
  - Visualização de itinerários gerados
  - Gestão de estado da aplicação
- **Características**:
  - SPA (Single Page Application)
  - PWA (Progressive Web App) capabilities
  - Otimizada para SEO
  - Suporte a múltiplos idiomas

#### Aplicação Mobile
- **Tecnologia**: React Native ou Flutter
- **Responsabilidades**:
  - Interface mobile nativa
  - Notificações push
  - Funcionalidades offline
  - Integração com GPS/geolocalização
- **Características**:
  - Cross-platform (iOS/Android)
  - Sincronização com versão web
  - Cache local para modo offline
  - Integração com calendário do dispositivo

### ⚙️ Camada de API

#### Servidor API
- **Tecnologia**: Node.js + Express.js
- **Responsabilidades**:
  - Endpoints REST para todas as funcionalidades
  - Autenticação e autorização
  - Rate limiting e throttling
  - Middleware de logging e monitoramento
  - Validação de dados de entrada
- **Características**:
  - Arquitetura RESTful
  - Documentação OpenAPI/Swagger
  - CORS configurado
  - Compressão gzip
  - Health checks

### 🔧 Camada de Serviços

#### Motor de IA
- **Tecnologia**: Node.js com módulos especializados
- **Responsabilidades**:
  - Orquestração da geração de itinerários
  - Construção de prompts estruturados
  - Processamento de respostas da IA
  - Otimização multidimensional
  - Validação de conteúdo gerado
- **Características**:
  - Modular e extensível
  - Cache de prompts frequentes
  - Fallback para dados estáticos
  - Métricas de qualidade

#### Serviço de Chat
- **Tecnologia**: Node.js com WebSocket support
- **Responsabilidades**:
  - Análise de intenções do usuário
  - Gestão de sessões conversacionais
  - Manutenção de contexto multi-turno
  - Geração de respostas contextuais
- **Características**:
  - Real-time messaging
  - Análise de sentimento
  - Histórico de conversas
  - Sugestões proativas

#### Serviço de Perfis
- **Tecnologia**: Node.js com ORM/ODM
- **Responsabilidades**:
  - Gestão de perfis de usuário
  - Cálculo do DNA de viagem
  - Aprendizado contínuo baseado em feedback
  - Análise de padrões comportamentais
- **Características**:
  - Machine learning integrado
  - Versionamento de perfis
  - Privacidade por design
  - Exportação de dados (GDPR)

#### Serviço de APIs Externas
- **Tecnologia**: Node.js com HTTP clients
- **Responsabilidades**:
  - Integração com múltiplas APIs externas
  - Cache inteligente de dados
  - Handling de falhas e timeouts
  - Rate limiting distribuído
- **Características**:
  - Circuit breaker pattern
  - Retry logic com backoff
  - Agregação de dados
  - Monitoramento de SLA

### 💾 Camada de Dados

#### Base de Dados de Usuários
- **Tecnologia**: MongoDB ou PostgreSQL
- **Responsabilidades**:
  - Armazenamento de perfis de usuário
  - Histórico de preferências e viagens
  - Sessões de chat persistentes
  - Configurações de conta
- **Características**:
  - Backup automático
  - Replicação para alta disponibilidade
  - Índices otimizados
  - Criptografia em repouso

#### Cache
- **Tecnologia**: Redis
- **Responsabilidades**:
  - Cache de dados de APIs externas
  - Sessões ativas de usuários
  - Rate limiting distribuído
  - Resultados de consultas frequentes
- **Características**:
  - TTL configurável
  - Clustering para escalabilidade
  - Persistência opcional
  - Pub/Sub para eventos

#### Armazenamento de Itinerários
- **Tecnologia**: File System local ou AWS S3
- **Responsabilidades**:
  - Armazenamento de itinerários gerados
  - Imagens e conteúdo multimídia
  - Documentos PDF exportados
  - Backups e versionamento
- **Características**:
  - CDN para distribuição global
  - Compressão automática
  - Lifecycle policies
  - Acesso controlado

## Fluxos de Dados Principais

### 1. Geração de Itinerário via Formulário
```
Web App → API Server → AI Engine → External API Service → [APIs] → AI Engine → Gemini → AI Engine → Itinerary Storage → API Server → Web App
```

### 2. Chat Conversacional
```
Web App → API Server → Chat Service → Profile Service → Chat Service → Gemini → Chat Service → Cache → API Server → Web App
```

### 3. Criação de Perfil
```
Web App → API Server → Profile Service → User DB → Profile Service → API Server → Web App
```

### 4. Atualização de Dados Externos
```
External API Service → [APIs Externas] → External API Service → Cache → [Outros Serviços]
```

## Padrões Arquiteturais Aplicados

### Microserviços
- **Separação de responsabilidades**: Cada serviço tem uma função específica
- **Independência de deploy**: Serviços podem ser atualizados independentemente
- **Escalabilidade granular**: Escalar apenas os serviços necessários

### API Gateway
- **Ponto único de entrada**: API Server atua como gateway
- **Cross-cutting concerns**: Autenticação, logging, rate limiting centralizados
- **Roteamento inteligente**: Direcionamento para serviços apropriados

### Cache-Aside Pattern
- **Performance**: Dados frequentes em cache
- **Redução de latência**: Menos chamadas para APIs externas
- **Fallback**: Dados em cache quando APIs falham

### Circuit Breaker
- **Resiliência**: Proteção contra falhas em cascata
- **Graceful degradation**: Funcionalidade reduzida quando serviços falham
- **Auto-recovery**: Tentativas automáticas de reconexão

## Considerações de Deployment

### Containerização
```dockerfile
# Exemplo para API Server
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
```

### Orquestração
- **Docker Compose**: Para desenvolvimento local
- **Kubernetes**: Para produção em nuvem
- **Health checks**: Monitoramento de saúde dos contêineres

### Escalabilidade
- **Horizontal scaling**: Múltiplas instâncias dos serviços
- **Load balancing**: Distribuição de carga
- **Auto-scaling**: Baseado em métricas de CPU/memória

## Segurança

### Autenticação e Autorização
- **JWT tokens**: Para autenticação stateless
- **OAuth 2.0**: Para integração com provedores externos
- **RBAC**: Role-based access control

### Comunicação Segura
- **HTTPS**: Todas as comunicações externas
- **TLS**: Comunicação entre serviços
- **API Keys**: Armazenadas como secrets

### Proteção de Dados
- **Criptografia**: Dados sensíveis em repouso
- **Sanitização**: Validação de entrada
- **Rate limiting**: Proteção contra ataques

## Monitoramento e Observabilidade

### Logging
- **Structured logging**: JSON format
- **Correlation IDs**: Rastreamento de requests
- **Log aggregation**: Centralização de logs

### Métricas
- **Application metrics**: Performance dos serviços
- **Business metrics**: KPIs do negócio
- **Infrastructure metrics**: Recursos do sistema

### Tracing
- **Distributed tracing**: Rastreamento de requests
- **Performance profiling**: Identificação de gargalos
- **Error tracking**: Monitoramento de erros

---

**Próximo Nível**: [Diagrama de Componentes](componentes.md) - Detalhamento interno dos serviços