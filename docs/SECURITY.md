# Política de Segurança - TripWise

## 📋 Informações do Documento

- **Data de Criação**: Junho 2025
- **Última Atualização**: Junho 2025
- **Versão**: 1.0
- **Status**: 🟡 Em Desenvolvimento

## 🛡️ Visão Geral de Segurança

Este documento define as políticas, práticas e implementações de segurança do sistema TripWise, garantindo proteção de dados, privacidade dos usuários e integridade do sistema.

## 🔐 Autenticação e Autorização

### Autenticação JWT (Planejado)

#### Configuração
```javascript
// Configuração JWT
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '24h',
  algorithm: 'HS256',
  issuer: 'tripwise-api',
  audience: 'tripwise-users'
};
```

#### Fluxo de Autenticação
1. **Login**: Usuário fornece credenciais
2. **Validação**: Sistema valida credenciais
3. **Token**: JWT é gerado e retornado
4. **Acesso**: Token é incluído em requisições subsequentes
5. **Validação**: Middleware valida token em cada requisição

#### Estrutura do Token
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "iat": 1640995200,
    "exp": 1641081600,
    "iss": "tripwise-api",
    "aud": "tripwise-users",
    "roles": ["user"],
    "permissions": ["read:profile", "write:itinerary"]
  }
}
```

### Autorização RBAC

#### Roles Definidos
```yaml
roles:
  guest:
    permissions:
      - read:public_content
      - create:temporary_itinerary
  
  user:
    permissions:
      - read:profile
      - write:profile
      - create:itinerary
      - read:itinerary
      - update:itinerary
      - delete:itinerary
  
  premium_user:
    inherits: user
    permissions:
      - access:premium_features
      - unlimited:api_calls
  
  admin:
    permissions:
      - read:all_data
      - write:system_config
      - manage:users
      - access:analytics
```

## 🔒 Criptografia e Proteção de Dados

### Dados em Trânsito
- **HTTPS Obrigatório**: Todas as comunicações via TLS 1.3
- **HSTS**: HTTP Strict Transport Security habilitado
- **Certificate Pinning**: Para APIs críticas

### Dados em Repouso
- **Senhas**: Bcrypt com salt rounds ≥ 12
- **Dados Sensíveis**: AES-256-GCM
- **Chaves de API**: Armazenadas em variáveis de ambiente
- **Tokens**: Armazenamento seguro com expiração

### Implementação de Criptografia
```javascript
// Exemplo de hash de senha
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

// Exemplo de criptografia de dados sensíveis
const crypto = require('crypto');
const algorithm = 'aes-256-gcm';

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}
```

## 🚫 Proteção Contra Ataques

### Rate Limiting
```javascript
// Configuração de rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requisições por IP
  message: {
    error: 'Muitas requisições, tente novamente em 15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting específico para IA
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 gerações de itinerário por minuto
  keyGenerator: (req) => req.user?.id || req.ip
});
```

### Proteção CSRF
```javascript
const csrf = require('csurf');

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});
```

### Validação de Input
```javascript
const Joi = require('joi');

// Schema de validação para geração de itinerário
const itinerarySchema = Joi.object({
  destination: Joi.string().min(2).max(100).required(),
  duration: Joi.string().valid('1-3 dias', '4-7 dias', '1-2 semanas', 'Mais de 2 semanas').required(),
  budget: Joi.string().valid('Econômico', 'Moderado', 'Confortável', 'Luxo').required(),
  interests: Joi.array().items(Joi.string()).min(1).max(10),
  additional_preferences: Joi.string().max(500)
});

// Middleware de validação
function validateInput(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message
        }
      });
    }
    next();
  };
}
```

### Sanitização de Dados
```javascript
const DOMPurify = require('isomorphic-dompurify');
const validator = require('validator');

function sanitizeInput(input) {
  if (typeof input === 'string') {
    // Remove scripts maliciosos
    input = DOMPurify.sanitize(input);
    // Escapa caracteres especiais
    input = validator.escape(input);
  }
  return input;
}
```

## 🔍 Auditoria e Monitoramento

### Logs de Segurança
```javascript
const winston = require('winston');

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/security.log' }),
    new winston.transports.Console()
  ]
});

// Eventos de segurança para log
const securityEvents = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  UNAUTHORIZED_ACCESS: 'unauthorized_access',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  DATA_ACCESS: 'data_access',
  ADMIN_ACTION: 'admin_action'
};

function logSecurityEvent(event, userId, details) {
  securityLogger.info({
    event,
    userId,
    timestamp: new Date().toISOString(),
    ip: details.ip,
    userAgent: details.userAgent,
    details
  });
}
```

### Monitoramento de Anomalias
- **Tentativas de login falhadas**: > 5 em 15 minutos
- **Requisições suspeitas**: Padrões anômalos de uso
- **Acesso a dados sensíveis**: Log completo de acessos
- **Alterações de configuração**: Auditoria de mudanças

## 🛡️ Proteção de APIs Externas

### Gerenciamento de Chaves
```javascript
// Rotação automática de chaves
class APIKeyManager {
  constructor() {
    this.keys = new Map();
    this.rotationInterval = 24 * 60 * 60 * 1000; // 24 horas
  }

  async getKey(service) {
    const keyData = this.keys.get(service);
    if (!keyData || this.isExpired(keyData)) {
      await this.rotateKey(service);
    }
    return this.keys.get(service).key;
  }

  isExpired(keyData) {
    return Date.now() - keyData.created > this.rotationInterval;
  }

  async rotateKey(service) {
    // Implementar rotação específica por serviço
    const newKey = await this.generateNewKey(service);
    this.keys.set(service, {
      key: newKey,
      created: Date.now()
    });
  }
}
```

### Rate Limiting para APIs Externas
```javascript
class ExternalAPILimiter {
  constructor() {
    this.limits = {
      'gemini': { requests: 60, window: 60000 }, // 60 req/min
      'weather': { requests: 1000, window: 86400000 }, // 1000 req/day
      'foursquare': { requests: 500, window: 3600000 } // 500 req/hour
    };
    this.usage = new Map();
  }

  async checkLimit(service) {
    const limit = this.limits[service];
    const usage = this.usage.get(service) || { count: 0, resetTime: Date.now() + limit.window };
    
    if (Date.now() > usage.resetTime) {
      usage.count = 0;
      usage.resetTime = Date.now() + limit.window;
    }
    
    if (usage.count >= limit.requests) {
      throw new Error(`Rate limit exceeded for ${service}`);
    }
    
    usage.count++;
    this.usage.set(service, usage);
  }
}
```

## 🔒 Configurações de Segurança

### Variáveis de Ambiente
```bash
# .env.example
# Chaves de criptografia
JWT_SECRET=your-super-secret-jwt-key-here
ENCRYPTION_KEY=your-256-bit-encryption-key

# APIs externas
GEMINI_API_KEY=your-gemini-api-key
WEATHER_API_KEY=your-weather-api-key
FOURSQUARE_API_KEY=your-foursquare-api-key

# Configurações de segurança
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your-session-secret

# Banco de dados
DB_ENCRYPTION_KEY=your-db-encryption-key

# Monitoramento
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info
```

### Headers de Segurança
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.gemini.google.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 🚨 Resposta a Incidentes

### Plano de Resposta
1. **Detecção**: Monitoramento automático e alertas
2. **Contenção**: Isolamento imediato da ameaça
3. **Investigação**: Análise do escopo e impacto
4. **Erradicação**: Remoção da vulnerabilidade
5. **Recuperação**: Restauração dos serviços
6. **Lições Aprendidas**: Documentação e melhorias

### Contatos de Emergência
```yaml
security_contacts:
  primary: security@tripwise.com
  backup: admin@tripwise.com
  phone: +55-11-99999-9999

escalation_matrix:
  level_1: "Desenvolvedor responsável"
  level_2: "Tech Lead"
  level_3: "CTO"
  level_4: "CEO"
```

## 📋 Checklist de Segurança

### Desenvolvimento
- [ ] Validação de input implementada
- [ ] Sanitização de dados ativa
- [ ] Rate limiting configurado
- [ ] HTTPS obrigatório
- [ ] Headers de segurança configurados
- [ ] Logs de segurança implementados

### Deploy
- [ ] Variáveis de ambiente seguras
- [ ] Chaves de API rotacionadas
- [ ] Certificados SSL válidos
- [ ] Firewall configurado
- [ ] Monitoramento ativo
- [ ] Backup de segurança

### Operação
- [ ] Logs de segurança monitorados
- [ ] Alertas de anomalias ativos
- [ ] Atualizações de segurança aplicadas
- [ ] Testes de penetração realizados
- [ ] Plano de resposta a incidentes atualizado

## 🔄 Atualizações de Segurança

### Cronograma
- **Dependências**: Verificação semanal
- **Patches de Segurança**: Aplicação imediata
- **Revisão de Políticas**: Trimestral
- **Testes de Penetração**: Semestral
- **Auditoria Completa**: Anual

### Ferramentas de Segurança
```json
{
  "dependencies": {
    "npm-audit": "Verificação de vulnerabilidades",
    "snyk": "Monitoramento contínuo",
    "eslint-plugin-security": "Análise estática"
  },
  "monitoring": {
    "sentry": "Monitoramento de erros",
    "datadog": "Métricas de segurança",
    "cloudflare": "Proteção DDoS"
  }
}
```

## 📞 Reportar Vulnerabilidades

### Processo
1. **Email**: security@tripwise.com
2. **Assunto**: [SECURITY] Descrição breve
3. **Conteúdo**: Detalhes técnicos, steps to reproduce
4. **Resposta**: Confirmação em 24h, resolução em 7 dias

### Recompensas
- **Crítica**: $500-1000
- **Alta**: $200-500
- **Média**: $50-200
- **Baixa**: Reconhecimento público

---

**Nota**: Esta política de segurança é um documento vivo e deve ser atualizada regularmente conforme evolução das ameaças e do sistema.