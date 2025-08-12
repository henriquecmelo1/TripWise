# 🔨 Guia de Build - TripWise

Este documento fornece instruções detalhadas para construir, executar e implantar o sistema TripWise localmente.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Build do Backend](#build-do-backend)
- [Build do Frontend](#build-do-frontend)
- [Configuração de APIs Externas](#configuração-de-apis-externas)
- [Execução Local](#execução-local)
- [Testes](#testes)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

## 📚 Documentação Relacionada

Antes de começar, consulte a documentação técnica completa:

- **[Requisitos do Sistema](docs/REQUIREMENTS.md)** - Especificações funcionais e não-funcionais
- **[Documentação da API](docs/API.md)** - Endpoints e exemplos de uso
- **[Política de Segurança](docs/SECURITY.md)** - Diretrizes de segurança
- **[Guia de Deployment](docs/DEPLOYMENT.md)** - Deploy em produção

## 🛠️ Pré-requisitos

### Software Necessário

| Software | Versão Mínima | Versão Recomendada | Download |
|----------|---------------|-------------------|----------|
| Node.js | 18.0.0 | 20.x.x | [nodejs.org](https://nodejs.org/) |
| npm | 8.0.0 | 10.x.x | Incluído com Node.js |
| Git | 2.30.0 | Latest | [git-scm.com](https://git-scm.com/) |

### Verificação dos Pré-requisitos

```bash
# Verificar versões instaladas
node --version    # Deve ser >= 18.0.0
npm --version     # Deve ser >= 8.0.0
git --version     # Deve ser >= 2.30.0
```

### Ferramentas Opcionais

- **VS Code**: Editor recomendado
- **Postman**: Para testar APIs
- **Docker**: Para containerização (opcional)

## 🌍 Configuração do Ambiente

### 1. Clone do Repositório

```bash
# Clone o repositório
git clone https://github.com/henriquecmelo1/TripWise.git
cd TripWise

# Verifique a estrutura
ls -la
# Deve mostrar: backend/, frontend/, README.md, etc.
```

### 2. Configuração de Variáveis de Ambiente

```bash
# Navegue para o backend
cd backend

# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env
# Windows: notepad .env
# macOS/Linux: nano .env
```

### 3. Estrutura do Arquivo .env

```env
# ===========================================
# CONFIGURAÇÕES OBRIGATÓRIAS
# ===========================================

# Google Gemini AI (OBRIGATÓRIO)
GOOGLE_GEMINI_API_KEY=sua_chave_aqui
# Obtenha em: https://makersuite.google.com/app/apikey

# ===========================================
# CONFIGURAÇÕES OPCIONAIS (APIs Externas)
# ===========================================

# APIs Meteorológicas
OPENWEATHER_API_KEY=sua_chave_aqui
# Gratuita: https://openweathermap.org/api
# Limite: 1.000 chamadas/dia

WEATHER_API_KEY=sua_chave_aqui
# Gratuita: https://www.weatherapi.com/
# Limite: 1M chamadas/mês

# APIs de Locais
FOURSQUARE_API_KEY=sua_chave_aqui
# Gratuita: https://developer.foursquare.com/
# Limite: 50 chamadas/dia

GOOGLE_PLACES_API_KEY=sua_chave_aqui
# $200 crédito: https://developers.google.com/maps
# Limite: ~40.000 chamadas/mês

# APIs de Mapas (nao implementado)
MAPBOX_API_KEY=sua_chave_aqui
# Gratuita: https://www.mapbox.com/
# Limite: 50k carregamentos/mês

# ===========================================
# CONFIGURAÇÕES DO SERVIDOR
# ===========================================

PORT=3000
NODE_ENV=development
```

## 🚀 Build do Backend

### 1. Instalação de Dependências

```bash
# Navegue para o diretório do backend
cd backend

# Instale as dependências
npm install

# Verifique se todas as dependências foram instaladas
npm list --depth=0
```

### 2. Dependências Principais

```json
{
  "dependencies": {
    "@google/genai": "^1.7.0",    // Google Gemini AI
    "amadeus": "^11.0.0",         // API de voos
    "cors": "^2.8.5",             // CORS middleware
    "dotenv": "^16.5.0",          // Variáveis de ambiente
    "express": "^5.1.0",          // Framework web
    "luxon": "^3.6.1"             // Manipulação de datas
  }
}
```

### 3. Verificação da Instalação

```bash
# Teste se o servidor inicia sem erros
npm start

# Deve mostrar:
# 🚀 TripWise Server is running on port: http://localhost:3000
# 📊 Features available:
# ...
# 🤖 Sistema de IA carregado e pronto para uso!
```

### 4. Teste Básico da API

```bash
# Em outro terminal, teste o endpoint de health
curl http://localhost:3000/api/ai/health

# Resposta esperada:
# {
#   "success": true,
#   "message": "Sistema de IA funcionando corretamente",
#   "timestamp": "2024-01-15T10:30:00.000Z"
# }
```

## 🎨 Build do Frontend

> **Nota**: O frontend está em desenvolvimento. Esta seção será atualizada quando estiver disponível.

### Estrutura Planejada

```bash
# Quando disponível:
cd frontend
npm install
npm run build
npm start
```

## 🔌 Configuração de APIs Externas

### APIs Obrigatórias

#### Google Gemini AI

1. **Acesse**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Crie uma conta** Google se necessário
3. **Gere uma API Key**
4. **Adicione ao .env**: `GOOGLE_GEMINI_API_KEY=sua_chave_aqui`

### APIs Opcionais (Recomendadas)

#### OpenWeatherMap

```bash
# 1. Registre-se em: https://openweathermap.org/api
# 2. Confirme seu email
# 3. Obtenha sua API key
# 4. Adicione ao .env:
OPENWEATHER_API_KEY=sua_chave_aqui
```

#### Foursquare Places

```bash
# 1. Registre-se em: https://developer.foursquare.com/
# 2. Crie um novo app
# 3. Obtenha sua API key
# 4. Adicione ao .env:
FOURSQUARE_API_KEY=sua_chave_aqui
```

### Teste das APIs

```bash
# Use o arquivo test_ai_system.http para testar
# Ou teste manualmente:

# Teste com dados reais (APIs configuradas)
curl -X POST http://localhost:3000/api/ai/itinerary/generate \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "destination": "Lisboa, Portugal",
      "start_date": "2025-08-15",
      "end_date": "2025-08-20",
      "travelers_count": 2,
      "trip_type": "cultural"
    }
  }'
```

## 🏃‍♂️ Execução Local

### Modo Desenvolvimento

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend (quando disponível)
cd frontend
npm start

# Terminal 3: Testes (opcional)
cd backend
# Use VS Code com REST Client para executar test_ai_system.http
```

### Modo Produção Local

```bash
# Configure variáveis de produção
export NODE_ENV=production
export PORT=3000

# Execute
cd backend
npm start
```

### Usando Docker (Opcional)

```dockerfile
# Dockerfile (exemplo)
FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/src ./src

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build e execução
docker build -t tripwise-backend .
docker run -p 3000:3000 --env-file backend/.env tripwise-backend
```

## 🧪 Testes

### Testes Manuais

#### 1. Usando VS Code + REST Client

```bash
# 1. Instale a extensão "REST Client" no VS Code
# 2. Abra o arquivo backend/test_ai_system.http
# 3. Clique em "Send Request" acima de cada teste
```

#### 2. Usando curl

```bash
# Teste de health check
curl http://localhost:3000/api/ai/health

# Teste de geração de itinerário
curl -X POST http://localhost:3000/api/ai/itinerary/generate \
  -H "Content-Type: application/json" \
  -d @backend/test_data/sample_request.json
```

#### 3. Usando Postman

1. **Importe** a collection do Postman (se disponível)
2. **Configure** as variáveis de ambiente
3. **Execute** os testes sequencialmente

### Testes Automatizados

> **Nota**: Testes automatizados estão planejados para implementação futura.

```bash
# Quando disponível:
npm test              # Testes unitários
npm run test:integration  # Testes de integração
npm run test:e2e      # Testes end-to-end
```

### Cenários de Teste

#### Teste 1: Geração Básica de Itinerário

```json
{
  "formData": {
    "destination": "Paris, França",
    "start_date": "2025-06-01",
    "end_date": "2025-06-05",
    "travelers_count": 2,
    "trip_type": "romantico",
    "budget_range": "moderado"
  }
}
```

#### Teste 2: Chat Conversacional

```json
{
  "sessionId": "test-session-123",
  "message": "Quero visitar o Japão por 10 dias em abril",
  "userId": "test-user-456"
}
```

## 🚀 Deploy

### Deploy Local (Produção)

```bash
# 1. Configure variáveis de produção
export NODE_ENV=production
export PORT=3000

# 2. Otimize dependências
cd backend
npm ci --only=production

# 3. Execute
npm start
```

### Deploy em Nuvem

#### Vercel (Recomendado)

```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Configure o projeto
vercel

# 3. Configure variáveis de ambiente no dashboard
# 4. Deploy
vercel --prod
```

#### Heroku

```bash
# 1. Instale Heroku CLI
# 2. Crie um app
heroku create tripwise-api

# 3. Configure variáveis
heroku config:set GOOGLE_GEMINI_API_KEY=sua_chave

# 4. Deploy
git push heroku main
```

#### Railway

```bash
# 1. Conecte seu repositório GitHub
# 2. Configure variáveis de ambiente
# 3. Deploy automático via Git
```

### Configuração de Produção

```env
# Variáveis específicas de produção
NODE_ENV=production
PORT=3000

# URLs de produção
FRONTEND_URL=https://tripwise.com
API_BASE_URL=https://api.tripwise.com

# Configurações de segurança
CORS_ORIGIN=https://tripwise.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro: "Cannot find module"

```bash
# Solução: Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

#### 2. Erro: "Port 3000 is already in use"

```bash
# Solução 1: Use outra porta
export PORT=3001
npm start

# Solução 2: Mate o processo na porta 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

#### 3. Erro: "API key not configured"

```bash
# Solução: Verifique o arquivo .env
cat .env | grep GOOGLE_GEMINI_API_KEY

# Se vazio, adicione sua chave:
echo "GOOGLE_GEMINI_API_KEY=sua_chave_aqui" >> .env
```

#### 4. Erro: "Failed to fetch from external API"

```bash
# Solução: Verifique conectividade
curl -I https://api.openweathermap.org/data/2.5/weather

# Verifique se as chaves estão corretas
# Teste com dados mock se necessário
```

### Logs de Debug

```bash
# Ative logs detalhados
export DEBUG=tripwise:*
npm start

# Ou use console.log temporários
console.log('Debug:', variavel);
```

### Performance

#### Monitoramento

```bash
# Monitore uso de CPU e memória
top -p $(pgrep node)

# Ou use ferramentas específicas
npm install -g clinic
clinic doctor -- npm start
```

#### Otimização

```bash
# Use PM2 para produção
npm install -g pm2
pm2 start src/app.js --name tripwise-api
pm2 monit
```

### Backup e Recuperação

```bash
# Backup de configurações
cp .env .env.backup
cp package.json package.json.backup

# Backup do código
git add .
git commit -m "backup: configuração funcional"
git push origin backup-branch
```

## 📊 Métricas de Build

### Tempos Esperados

| Operação | Tempo Esperado |
|----------|----------------|
| npm install | 30-60 segundos |
| Startup do servidor | 2-5 segundos |
| Primeira requisição | 5-10 segundos |
| Requisições subsequentes | 1-3 segundos |

### Recursos Necessários

| Recurso | Mínimo | Recomendado |
|---------|--------|-------------|
| RAM | 512MB | 1GB |
| CPU | 1 core | 2 cores |
| Disco | 100MB | 500MB |
| Rede | 1Mbps | 10Mbps |

## 📞 Suporte

Se encontrar problemas durante o build:

1. **Verifique** este documento primeiro
2. **Consulte** as [issues do GitHub](../../issues)
3. **Crie** uma nova issue com:
   - Versões do software
   - Logs de erro completos
   - Passos para reproduzir
   - Sistema operacional

---

**Build bem-sucedido!** 🎉

Agora você pode começar a desenvolver e contribuir com o TripWise.