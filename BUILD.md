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

# Google Gemini AI
GEMINI_API_KEY=sua_chave_google_ai_aqui

# ===========================================
# CONFIGURAÇÕES OPCIONAIS (APIs Externas)
# ===========================================

# API de Previsão do Tempo
OPENWEATHER_API_KEY=sua_chave_openweather_aqui

# API de Locais
FOURSQUARE_API_KEY=sua_chave_foursquare_aqui

# API de Cotação de Moedas
EXCHANGE_RATE_API_KEY=sua_chave_exchange_rate_aqui

# APIs de Voos/Viagens da Amadeus
AMADEUS_API_KEY=sua_chave_amadeus_aqui
AMADEUS_API_SECRET=sua_chave_amadeus_secret_aqui

# API de Busca (Pesquisa)
BRAVE_API_KEY=sua_chave_brave_search_aqui

# APIs de Imagens
UNSPLASH_ACCESS_KEY=sua_chave_unsplash_access_aqui
UNSPLASH_SECRET_KEY=sua_chave_unsplash_secret_aqui
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

### 1. Instalação de Dependências

```bash
# Navegue para o diretório do frontend
cd frontend

# Instale as dependências
npm install
```

### 2. Iniciar a Aplicação

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

### 3. Verificação da Instalação
Após executar o comando npm run dev, o terminal deve exibir uma mensagem indicando que a aplicação está disponível.

```bash
# Exemplo de saída esperada:

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help

```

**Acesse o frontend no seu navegador pela URL: `http://localhost:5173`**.



## 🔌 Configuração de APIs Externas

### APIs Obrigatórias

#### Google Gemini AI

1. **Acesse**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Crie uma conta** Google se necessário
3. **Gere uma API Key**
4. **Adicione ao .env**: `GOOGLE_GEMINI_API_KEY=sua_chave_aqui`

### APIs Opcionais (Recomendadas)

#### Amadeus for Developers
```bash
# 1. Acesse: https://developers.amadeus.com/register
# 2. Crie uma conta e confirme seu e-mail.
# 3. Crie um novo projeto e selecione as APIs que você precisa (ex: Flight Offers Search).
# 4. Obtenha suas credenciais (Client ID e Client Secret).
# 5. Adicione ao .env:
AMADEUS_API_KEY=seu_client_id_aqui
AMADEUS_API_SECRET=seu_client_secret_aqui
```

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
#### ExchangeRate-API

```bash
# 1. Registre-se em: https://www.exchangerate-api.com/
# 2. Confirme seu email
# 3. Obtenha sua API key
# 4. Adicione ao .env:
EXCHANGERATE_API_KEY=sua_chave_aqui
```
#### Brave Search API

```bash
# 1. Acesse: https://brave.com/search/api/
# 2. Registre-se e solicite acesso à API.
# 3. Obtenha sua API key
# 4. Adicione ao .env:
BRAVE_API_KEY=sua_chave_aqui
```
#### Unsplash API

```bash
# 1. Acesse: https://unsplash.com/developers
# 2. Crie uma conta e registre uma nova aplicação.
# 3. Obtenha sua Access Key e sua Secret Key
# 4. Adicione ao .env:
UNSPLASH_ACCESS_KEY=sua_chave_aqui
UNSPLASH_SECRET_KEY=sua_chave_aqui
```

### Verificação da Configuração
Ao iniciar o servidor com `npm start`, o console deve exibir logs confirmando que as chaves de API foram carregadas corretamente.

## 🏃‍♂️ Execução Local

### Modo Desenvolvimento

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend 
cd frontend
npm run dev
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

#### Backend
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

#### Frontend
```dockerfile
# Dockerfile (exemplo)
# Use uma imagem base leve do Node para instalar as dependências
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/src ./src
COPY frontend/public ./public
RUN npm run build

# Use uma imagem NGINX para servir a aplicação estática
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
```bash
# Build e execução
docker build -t tripwise-frontend ./frontend
docker run -p 5173:80 tripwise-frontend
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