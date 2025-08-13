# 🌍 TripWise - Planejamento Inteligente de Viagens com IA

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](https://github.com/tripwise/tripwise)
[![Metodologia](https://img.shields.io/badge/Metodologia-AIDesign-blue)](docs/metodologia/)
[![Licença](https://img.shields.io/badge/Licença-MIT-green)](LICENSE)
[![Contribuições](https://img.shields.io/badge/Contribuições-Bem%20vindas-brightgreen)](CONTRIBUTING.md)

## 📋 Sobre o Projeto

O **TripWise** é uma solução inovadora de planejamento de viagens que utiliza Inteligência Artificial para criar itinerários personalizados e experiências únicas. Desenvolvido seguindo a metodologia **AIDesign**, o projeto combina tecnologia de ponta com design centrado no usuário para revolucionar a forma como planejamos nossas viagens.

### 🎯 Objetivos Principais

- **Personalização Inteligente**: Criar itinerários únicos baseados no perfil individual de cada viajante
- **Experiências Autênticas**: Descobrir destinos e atividades fora do roteiro tradicional
- **Eficiência no Planejamento**: Reduzir drasticamente o tempo necessário para planejar uma viagem
- **Narrativas Envolventes**: Transformar itinerários em histórias cativantes

## ✨ Funcionalidades Principais

### 🤖 Motor de IA Generativa
- Geração de itinerários narrativos temáticos
- Classificação automática em 8 tipos de "DNA de Viagem"
- Otimização multidimensional (orçamento, tempo, logística, interesses)
- Inclusão de "joias escondidas" e experiências locais autênticas
- Aprendizado contínuo baseado em feedback

### 💬 Copiloto Conversacional (Backlog)
- Interface de chat natural em português
- Análise de intenções com 8 categorias identificadas
- Suporte multi-turno com manutenção de contexto
- Sugestões proativas baseadas no perfil do usuário
- Assistência em tempo real durante a viagem

### 🌐 Integração com APIs Externas
- **Clima**: OpenWeatherMap e WeatherAPI para condições meteorológicas
- **Restaurantes**: Foursquare e Google Places para estabelecimentos verificados
- **Câmbio**: ExchangeRate-API para cotações em tempo real
- **Transporte**: OpenStreetMap para rotas e transporte público
- **Eventos**: Eventbrite para eventos locais durante a viagem

### 📝 Geração via Formulário
- Criação de itinerários sem necessidade de cadastro
- Formulário estruturado com preferências detalhadas
- Perfis temporários para personalização imediata
- Compatibilidade com sistema de perfis permanentes

## 🏗️ Arquitetura do Sistema

### Diagrama de Contexto (C4 - Nível 1)
```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     Usuário     │───────│     TripWise    │───────│  APIs Externas  │
│                 │       │                 │       │                 │
│ • Viajante      │       │ • Sistema de IA │       │ • OpenWeather   │
│ • Planejador    │       │ • Assistente    │       │ • Foursquare    │
│                 │       │                 │       │ • ExchangeRate  │
│                 │       │                 │       │ • Amadeus       │
│                 │       │                 │       │ • Brave Search  │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Diagrama de Contêineres (C4 - Nível 2)
```
┌─────────────────────────────────────────────────────────────┐
│                        TripWise Sistema                     │
│ ┌───────────────┐     ┌───────────────┐    ┌───────────────┐│
│ │   Frontend    │────>│   Backend     │───>│  IA Engine    ││
│ │ (Web App)     │     │ (API Server)  │    │ (Gemini API)  ││
│ │ • React.js    │     │ • Node.js/Exp │    │               ││
│ └───────────────┘     └───────────────┘    └───────────────┘│
│                                 │                           │
│                                 ▼                           │
│                          ┌──────────────────┐               │
│                          │ APIs Externas    │               │
│                          │ (OpenWeather,etc)│               │
│                          └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### Diagrama de Componentes (C4 - Nível 3)
```
┌─────────────────────────────────────────────────────────────┐
│                         Backend Container                   │
│ ┌───────────────┐    ┌───────────────┐    ┌───────────────┐ │
│ │ AI Controller │───>│   Routes      │<───│   Services    │ │
│ │               │    │               │    │               │ │
│ │ • Generate    │    │ • /itinerary  │    │ • External    │ │
│ └───────────────┘    └───────────────┘    │   APIs        │ │
│        │                                  └───────────────┘ │
│        ▼                                                    │
│ ┌───────────────┐    ┌───────────────┐    ┌───────────────┐ │
│ │   AI Engine   │<───│   Copiloto    │<───│ Personalização│ │
│ │               │    │               │    │               │ │
│ │ • Itinerary   │    │ • Intent      │    │ • DNA Viagem  │ │
│ └───────────────┘    └───────────────┘    └───────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Guia de Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Chaves de API (opcionais para funcionalidade completa)

### Configuração do Backend

1. **Clone o repositório**
```bash
git clone https://github.com/henriquecmelo1/TripWise.git
cd TripWise/backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas chaves de API:
```env
# IA
GOOGLE_GEMINI_API_KEY=sua_chave_aqui

# APIs Meteorológicas (Opcionais)
OPENWEATHER_API_KEY=sua_chave_aqui
WEATHER_API_KEY=sua_chave_aqui

# APIs de Locais (Opcionais)
FOURSQUARE_API_KEY=sua_chave_aqui
GOOGLE_PLACES_API_KEY=sua_chave_aqui

# APIs de Câmbio (Opcionais)
EXCHANGE_RATE_API_KEY=sua_chave_aqui
```

4. **Execute o servidor**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`


### Configuração do Frontend

1.  **Navegue para o diretório do frontend**

    ```bash
    cd ../frontend
    ```

2.  **Instale as dependências**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**
    Crie um arquivo `.env` na pasta `frontend` e adicione a URL da sua API backend.

    ```env
    VITE_API_URL=http://localhost:3000
    ```

4.  **Execute o servidor de desenvolvimento**

    ```bash
    npm run dev
    ```

    O frontend estará disponível em `http://localhost:5173` ou na porta especificada no seu terminal.

## 📚 Documentação da API

### Endpoints Principais

#### 🎯 Geração de Itinerários
```http
POST /api/ai/itinerary/generate
Content-Type: application/json

{
  "formData": {
    "destination": "Lisboa, Portugal",
    "start_date": "2025-08-15",
    "end_date": "2025-08-20",
    "travelers_count": 2,
    "trip_type": "romantico",
    "budget_range": "moderado",
    "activity_interests": ["cultura", "gastronomia"]
  }
}
```

#### 💬 Chat Conversacional
```http
POST /api/ai/chat
Content-Type: application/json

{
  "sessionId": "session123",
  "message": "Quero visitar Portugal por 5 dias",
  "userId": "user123"
}
```

#### 👤 Gestão de Perfis
```http
POST /api/ai/profile/create
GET /api/ai/profile/:userId
GET /api/ai/onboarding/questions
```

#### 🔧 Utilitários
```http
GET /api/ai/health
POST /api/ai/itinerary/optimize
POST /api/ai/recommendations/contextual
```

## 📁 Estrutura do Projeto

```
TripWise/
├── README.md                 # Este arquivo
├── CONTRIBUTING.md           # Guia de contribuição
├── BUILD.md                  # Instruções de build
├── docs/                     # Documentação adicional
│   ├── diagramas/           # Diagramas C4 e ER
│   └── metodologia/         # Documentação AIDesign
├── backend/                 # Servidor Node.js
│   ├── src/
│   │   ├── ai/             # Módulos de IA
│   │   ├── controllers/    # Controladores da API
│   │   ├── routes/         # Definição de rotas
│   │   ├── services/       # Serviços externos
│   │   └── constants/      # Constantes e configurações
│   ├── package.json
│   ├── .env.example
│   └── test_ai_system.http # Testes da API
└── frontend/               # Interface do usuário (em desenvolvimento)
```

## 📖 Documentação Completa

### 📋 Especificações Técnicas
- **[Requisitos do Sistema](docs/REQUIREMENTS.md)** - Especificações funcionais e não-funcionais
- **[Documentação da API](docs/API.md)** - Endpoints, autenticação e exemplos
- **[Política de Segurança](docs/SECURITY.md)** - Diretrizes de segurança e proteção

### 🔧 Documentação Técnica
- **[Sistema de IA](backend/AI_SYSTEM_README.md)** - Arquitetura e funcionamento da IA
- **[APIs Externas](backend/APIS_EXTERNAS_README.md)** - Integração com serviços externos
- **[Nova Funcionalidade](backend/NOVA_FUNCIONALIDADE_FORMULARIO.md)** - Geração via formulário
- **[Testes da API](backend/test_ai_system.http)** - Casos de teste HTTP

### 🏗️ Metodologia e Arquitetura
- **[Diagramas C4](docs/diagramas/)** - Arquitetura do sistema
- **[Metodologia AIDesign](docs/metodologia/)** - Canvas e processo de desenvolvimento

## 🐛 Issues e Contribuições

### Issues Abertas
- [ ] Implementação do frontend React/Next.js
- [ ] Sistema de autenticação JWT
- [ ] Persistência de dados (MongoDB/PostgreSQL)
- [ ] Testes automatizados (Jest/Supertest)
- [ ] Cache com Redis
- [ ] Integração com mais APIs de transporte
- [ ] Sistema de notificações
- [ ] Modo offline para aplicativo móvel

### Recentemente Concluído
- ✅ Documentação de requisitos consolidada
- ✅ Especificação completa da API
- ✅ Política de segurança definida
- ✅ Guia de deployment criado

### Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📊 Status do Projeto

- ✅ **Backend API**: Funcional e testado
- ✅ **Sistema de IA**: Implementado com Gemini
- ✅ **APIs Externas**: Integradas e funcionais
- ✅ **Chat Conversacional**: Operacional
- ✅ **Geração via Formulário**: Implementada
- 🚧 **Frontend**: Em desenvolvimento
- 🚧 **Testes Automatizados**: Planejado
- 🚧 **Deploy em Produção**: Planejado

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

## 👥 Equipe

- **Desenvolvimento Backend**: Sistema de IA e APIs
- **Integração Externa**: APIs de terceiros
- **Documentação**: Metodologia AIDesign

---

**TripWise** - Transformando o planejamento de viagens através da Inteligência Artificial 🚀✈️