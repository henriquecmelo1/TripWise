# TripWise AI - Seção 4: Núcleo de IA para Hiper-Personalização e Inteligência

## Visão Geral

Este sistema implementa as funcionalidades descritas na **Seção 4** do projeto TripWise, oferecendo:

1. **Motor de IA Generativa para Hiper-Personalização** (Seção 4.1)
2. **Copiloto Conversacional** (Seção 4.2)

## Arquitetura do Sistema

### Componentes Principais

1. **AIEngine** (`ai/aiEngine.js`)

   - Motor principal de geração de itinerários
   - Utiliza Google Gemini 1.5 Flash
   - Gera narrativas temáticas coerentes
   - Otimização multidimensional (orçamento, tempo, interesses, logística)

2. **ConversationalCopilot** (`ai/conversationalCopilot.js`)

   - Interface conversacional natural
   - Análise de intenções
   - Múltiplas estratégias de resposta
   - Gestão de sessões e contexto

3. **UserPersonalizationEngine** (`ai/userPersonalization.js`)

   - Criação e gestão de perfis dinâmicos
   - Inferência de "DNA de Viagem"
   - Aprendizado contínuo baseado em interações
   - Análise de padrões comportamentais

4. **AIController** (`ai/ai.controller.js`)
   - Orquestração de todos os componentes
   - Endpoints REST para integração
   - Tratamento de erros e validações

## APIs Disponíveis

### 1. Geração de Itinerários Hiper-Personalizados

```http
POST /api/ai/itinerary/generate
Content-Type: application/json

{
    "userId": "user123",
    "tripDetails": {
        "destination": "Lisboa, Portugal",
        "duration": 5,
        "startDate": "2025-07-15",
        "endDate": "2025-07-20",
        "travelers": 2,
        "tripType": "lazer"
    },
    "realTimeData": {
        "weather": "Ensolarado, 25°C",
        "events": "Festival de Fado no Alfama"
    }
}
```

**Resposta:**

```json
{
    "success": true,
    "itinerary": {
        "tematicaNarrativa": "Uma Sinfonia Gastronômica e Cultural em Lisboa",
        "resumoExecutivo": "5 dias explorando a alma lisboeta através de sua rica culinária e herança cultural...",
        "itinerarioDiario": [...],
        "experienciasUnicas": [...],
        "joiasEscondidas": [...],
        "orcamentoDetalhado": {...}
    },
    "personalizedFor": {
        "userId": "user123",
        "travelDNA": "gastronomico_gourmet",
        "confidence": 0.85
    }
}
```

### 2. Interface Conversacional do Copiloto

```http
POST /api/ai/chat
Content-Type: application/json

{
    "sessionId": "session456",
    "message": "Planeia uma viagem de 7 dias à Escócia em maio, focada em castelos e destilarias de whisky.",
    "userId": "user123",
    "context": {
        "currentLocation": "Lisboa",
        "travelPhase": "planejamento"
    }
}
```

**Resposta:**

```json
{
  "success": true,
  "response": "Que experiência incrível você terá na Escócia! Baseado no seu perfil gastronômico, posso criar um roteiro perfeito combinando castelos históricos com as melhores destilarias...",
  "intent": "PLANEJAMENTO_INICIAL",
  "suggestions": [
    "Definir orçamento da viagem",
    "Escolher datas específicas",
    "Ver itinerários similares"
  ],
  "actions": [
    {
      "type": "start_planning",
      "label": "Começar planejamento detalhado"
    }
  ]
}
```

### 3. Criação de Perfil de Usuário

```http
POST /api/ai/profile/create
Content-Type: application/json

{
    "userId": "user123",
    "onboardingData": {
        "age": 28,
        "location": "São Paulo, BR",
        "preferredActivities": ["culinaria", "museus", "caminhadas"],
        "budget": "moderado",
        "accommodationType": "hotel_medio",
        "planningStyle": "flexivel",
        "typicalGroupSize": 2
    }
}
```

### 4. Questionário de Integração

```http
GET /api/ai/onboarding/questions
```

Retorna um questionário estruturado para criação do perfil personalizado.

### 5. Otimização de Itinerários

```http
POST /api/ai/itinerary/optimize
Content-Type: application/json

{
    "userId": "user123",
    "currentItinerary": {...},
    "feedback": "No dia 4, em vez de visitar aquele castelo, podes encontrar uma caminhada cénica com menos de 3 horas?",
    "constraints": {
        "budget": "manter_atual",
        "duration": "max_3_hours"
    }
}
```

## Características Inovadoras

### 1. Hiper-Personalização (Seção 4.1)

- **DNA de Viagem**: Sistema classifica usuários em 8 categorias principais
- **Narrativas Temáticas**: Itinerários como histórias coerentes, não listas
- **Otimização Multidimensional**: Equilibra orçamento, tempo, logística e interesses
- **Joias Escondidas**: Inclui experiências locais autênticas
- **Aprendizado Contínuo**: Perfil evolui com cada interação

### 2. Copiloto Conversacional (Seção 4.2)

- **Interface Natural**: Conversa como com agente de viagens humano
- **Análise de Intenções**: 8 tipos de intenção identificados
- **Multi-turno**: Mantém contexto ao longo da conversa
- **Proativo**: Oferece sugestões baseadas no contexto
- **Tempo Real**: Suporte durante a viagem

## Exemplos de Uso

### Caso 1: Criação de Perfil e Primeiro Itinerário

```bash
# 1. Obter questionário
curl -X GET http://localhost:3000/api/ai/onboarding/questions

# 2. Criar perfil
curl -X POST http://localhost:3000/api/ai/profile/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "onboardingData": {
      "preferredActivities": ["culinaria", "cultura"],
      "budget": "moderado",
      "planningStyle": "flexivel"
    }
  }'

# 3. Gerar itinerário personalizado
curl -X POST http://localhost:3000/api/ai/itinerary/generate \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "tripDetails": {
      "destination": "Lisboa",
      "duration": 5,
      "startDate": "2025-07-15"
    }
  }'
```

### Caso 2: Conversa com Copiloto

```bash
# Iniciar conversa
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session456",
    "message": "Olá! Quero planejar uma viagem romântica para Paris",
    "userId": "user123"
  }'

# Continuar conversa
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session456",
    "message": "Pode sugerir restaurantes com vista para a Torre Eiffel?",
    "userId": "user123"
  }'
```

## Configuração e Execução

### Pré-requisitos

1. Node.js 18+
2. Chave da API do Google Gemini
3. NPM packages instalados

### Instalação

```bash
# No diretório backend
npm install

# Configurar variáveis de ambiente
echo "GEMINI_API_KEY=sua_chave_aqui" > .env

# Executar servidor
npm start
```

### Teste do Sistema

```bash
# Health check
curl http://localhost:3000/api/ai/health

# Deve retornar:
{
  "success": true,
  "status": {
    "aiEngine": "operational",
    "copilot": "operational",
    "personalization": "operational"
  }
}
```

## Diferenciação Tecnológica

### Sem RAG (Conforme Solicitado)

Esta implementação **não utiliza RAG** (Retrieval-Augmented Generation), focando na:

1. **Inteligência do Prompt**: Prompts elaborados que extraem máximo valor do modelo base
2. **Personalização Algorítmica**: Lógica própria para inferir preferências
3. **Contexto Estruturado**: Organização inteligente de informações no prompt
4. **Aprendizado Incremental**: Sistema próprio de refinamento de perfis

### Vantagens desta Abordagem

- **Simplicidade**: Menos dependências externas
- **Velocidade**: Respostas mais rápidas sem consultas a bases externas
- **Controle**: Maior controle sobre a lógica de personalização
- **Escalabilidade**: Menos recursos computacionais necessários

## Próximos Passos

1. **Integração com APIs Externas**: Voos, hotéis, atividades
2. **Base de Dados Persistente**: MongoDB/PostgreSQL para perfis
3. **Interface Frontend**: Componentes React para chat e perfis
4. **Analytics**: Métricas de uso e satisfação
5. **Testes A/B**: Otimização de prompts e estratégias

## Monitoramento e Logs

O sistema inclui logging detalhado para:

- Interações do usuário
- Performance da IA
- Erros e exceções
- Padrões de uso

```javascript
// Exemplo de log
console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
```

Este sistema representa uma implementação robusta e escalável da visão descrita na Seção 4, oferecendo uma experiência de planejamento de viagens verdadeiramente inteligente e personalizada.
