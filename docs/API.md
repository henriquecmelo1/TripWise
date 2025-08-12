# Documentação da API - TripWise

## 📋 Informações da API

- **Versão**: 1.0
- **Base URL**: `http://localhost:3000/api`
- **Protocolo**: HTTP/HTTPS
- **Formato**: JSON
- **Autenticação**: JWT (planejado)

## 🚀 Visão Geral

A API TripWise fornece endpoints para geração de itinerários personalizados, gerenciamento de perfis de usuário e interação conversacional com IA.

## 📡 Endpoints Disponíveis

### 🏠 Root

#### GET `/`
Retorna informações gerais da API e links para documentação.

**Resposta:**
```json
{
  "message": "🌍 TripWise API - Planejamento Inteligente de Viagens com IA",
  "version": "1.0.0",
  "features": [
    "🤖 Geração de itinerários com IA",
    "💬 Copiloto conversacional",
    "👤 Perfis personalizados",
    "🌍 Recomendações contextuais"
  ],
  "documentation": {
    "readme": "https://github.com/tripwise/tripwise/blob/main/README.md",
    "build": "https://github.com/tripwise/tripwise/blob/main/BUILD.md"
  }
}
```

### 🤖 IA e Itinerários

#### GET `/api/ai/health`
Verifica o status do sistema de IA.

**Resposta:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-XX",
  "services": {
    "gemini_ai": "operational",
    "external_apis": "operational"
  }
}
```

#### GET `/api/ai/itinerary/form`
Retorna o formulário dinâmico para geração de itinerários.

**Resposta:**
```json
{
  "form": {
    "destination": {
      "type": "text",
      "required": true,
      "placeholder": "Ex: Paris, França"
    },
    "duration": {
      "type": "select",
      "options": ["1-3 dias", "4-7 dias", "1-2 semanas", "Mais de 2 semanas"]
    },
    "budget": {
      "type": "select",
      "options": ["Econômico", "Moderado", "Confortável", "Luxo"]
    },
    "interests": {
      "type": "multiselect",
      "options": ["Cultura", "Gastronomia", "Aventura", "Relaxamento", "História", "Arte", "Natureza", "Vida Noturna"]
    },
    "experience_type": {
      "type": "select",
      "options": ["Primeira vez", "Retornando", "Explorador experiente"]
    }
  }
}
```

#### POST `/api/ai/itinerary/generate`
Gera um itinerário personalizado baseado no formulário.

**Parâmetros:**
```json
{
  "destination": "Paris, França",
  "duration": "4-7 dias",
  "budget": "Moderado",
  "interests": ["Cultura", "Gastronomia", "Arte"],
  "experience_type": "Primeira vez",
  "additional_preferences": "Prefiro evitar multidões"
}
```

**Resposta:**
```json
{
  "success": true,
  "itinerary": {
    "destination": "Paris, França",
    "duration": "5 dias",
    "title": "Paris: Uma Sinfonia de Arte, Cultura e Sabores",
    "narrative": "Bem-vindo a Paris, a Cidade Luz...",
    "daily_plans": [
      {
        "day": 1,
        "theme": "Chegada e Primeiras Impressões",
        "activities": [
          {
            "time": "09:00",
            "activity": "Café da manhã no Café de Flore",
            "description": "Comece seu dia parisiense...",
            "location": "Saint-Germain-des-Prés",
            "duration": "1h",
            "cost_estimate": "€15-25"
          }
        ]
      }
    ],
    "user_profile": {
      "travel_dna": "Explorador Cultural",
      "preferences": ["Arte", "Gastronomia", "História"]
    },
    "metadata": {
      "generated_at": "2025-01-XX",
      "ai_confidence": 0.95,
      "personalization_level": "high"
    }
  }
}
```

#### POST `/api/ai/itinerary/hyper-personalized`
Gera itinerário hiper-personalizado com perfil de usuário.

**Parâmetros:**
```json
{
  "user_profile": {
    "travel_dna": "Explorador Cultural",
    "preferences": ["Arte", "Gastronomia"],
    "past_trips": ["Roma", "Barcelona"]
  },
  "destination": "Paris, França",
  "context": {
    "travel_dates": "2025-03-15 to 2025-03-20",
    "group_size": 2,
    "special_occasions": "Aniversário"
  }
}
```

### 💬 Chat Conversacional

#### POST `/api/ai/chat`
Interação conversacional com o copiloto de viagens.

**Parâmetros:**
```json
{
  "message": "Quais são os melhores restaurantes em Paris?",
  "context": {
    "current_destination": "Paris",
    "user_preferences": ["Gastronomia", "Cultura"],
    "conversation_history": []
  }
}
```

**Resposta:**
```json
{
  "response": "Baseado no seu interesse em gastronomia...",
  "suggestions": [
    "Le Comptoir du Relais",
    "L'As du Fallafel",
    "Pierre Hermé"
  ],
  "context_updated": true
}
```

### 👤 Perfis de Usuário

#### POST `/api/ai/profile/create`
Cria um perfil de usuário baseado em preferências.

**Parâmetros:**
```json
{
  "preferences": {
    "interests": ["Cultura", "Gastronomia"],
    "budget_range": "Moderado",
    "travel_style": "Explorador"
  },
  "travel_history": [
    {
      "destination": "Roma",
      "satisfaction": 9,
      "highlights": ["Coliseu", "Comida local"]
    }
  ]
}
```

**Resposta:**
```json
{
  "profile_id": "user_123",
  "travel_dna": "Explorador Cultural",
  "personality_traits": {
    "curiosity": 0.9,
    "adventure": 0.7,
    "comfort": 0.6
  },
  "recommendations": {
    "destinations": ["Paris", "Barcelona", "Florença"],
    "activities": ["Museus", "Tours gastronômicos", "Caminhadas históricas"]
  }
}
```

#### GET `/api/ai/profile/{profile_id}`
Retorna dados do perfil do usuário.

### 🎯 Recomendações Contextuais

#### POST `/api/ai/recommendations`
Gera recomendações baseadas em contexto atual.

**Parâmetros:**
```json
{
  "location": "Paris, França",
  "time_of_day": "evening",
  "weather": "rainy",
  "user_profile": {
    "travel_dna": "Explorador Cultural"
  }
}
```

### 🔧 Otimização e Análise

#### POST `/api/ai/itinerary/optimize`
Otimiza itinerário baseado em feedback.

#### POST `/api/ai/analysis/behavioral-patterns`
Analisa padrões comportamentais do usuário.

#### POST `/api/ai/predictions/pricing`
Previsões de preços para destinos.

#### POST `/api/ai/predictions/crowds`
Previsões de multidões em atrações.

### 🆘 Suporte de Emergência

#### POST `/api/ai/emergency-support`
Suporte de emergência durante viagens.

## 🔒 Autenticação (Planejado)

### JWT Token
```http
Authorization: Bearer <jwt_token>
```

### Rate Limiting
- **Limite**: 100 requisições por minuto por IP
- **Headers de resposta**:
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requisições restantes
  - `X-RateLimit-Reset`: Timestamp do reset

## 📊 Códigos de Status

| Código | Descrição |
|--------|----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 403 | Proibido |
| 404 | Não encontrado |
| 429 | Muitas requisições |
| 500 | Erro interno do servidor |
| 503 | Serviço indisponível |

## 🚨 Tratamento de Erros

### Formato de Erro Padrão
```json
{
  "error": {
    "code": "INVALID_DESTINATION",
    "message": "Destino não encontrado ou inválido",
    "details": {
      "field": "destination",
      "value": "XYZ123"
    },
    "timestamp": "2025-01-XX",
    "request_id": "req_123456"
  }
}
```

### Códigos de Erro Específicos

| Código | Descrição |
|--------|----------|
| `AI_SERVICE_UNAVAILABLE` | Serviço de IA indisponível |
| `INVALID_DESTINATION` | Destino inválido |
| `EXTERNAL_API_ERROR` | Erro em API externa |
| `RATE_LIMIT_EXCEEDED` | Limite de requisições excedido |
| `INVALID_USER_PROFILE` | Perfil de usuário inválido |

## 🧪 Testando a API

### Usando curl
```bash
# Health check
curl -X GET http://localhost:3000/api/ai/health

# Gerar itinerário
curl -X POST http://localhost:3000/api/ai/itinerary/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Paris, França",
    "duration": "4-7 dias",
    "budget": "Moderado",
    "interests": ["Cultura", "Gastronomia"]
  }'
```

### Usando arquivo HTTP
Utilize o arquivo `backend/test_ai_system.http` para testes completos.

## 📈 Monitoramento

### Métricas Disponíveis
- Tempo de resposta por endpoint
- Taxa de erro por endpoint
- Uso de APIs externas
- Performance da IA

### Logs
- Todas as requisições são logadas
- Erros incluem stack trace
- Logs estruturados em JSON

## 🔄 Versionamento

- **Versão Atual**: v1
- **Estratégia**: Semantic Versioning
- **Compatibilidade**: Backward compatibility mantida
- **Deprecação**: Aviso de 6 meses antes da remoção

---

**Nota**: Esta documentação é atualizada automaticamente conforme evolução da API. Para versão mais recente, consulte o repositório oficial.