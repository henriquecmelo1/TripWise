# 🤝 Guia de Contribuição - TripWise

Obrigado por seu interesse em contribuir com o TripWise! Este documento fornece diretrizes para colaboradores e novos membros da equipe.

## 📚 Documentação Essencial

Antes de contribuir, familiarize-se com a documentação técnica:

- **[Requisitos do Sistema](docs/REQUIREMENTS.md)** - Especificações funcionais e não-funcionais
- **[Documentação da API](docs/API.md)** - Endpoints e padrões de API
- **[Política de Segurança](docs/SECURITY.md)** - Diretrizes de segurança
- **[Guia de Testes](TESTING.md)** - Estratégias e ferramentas de teste
- **[Guia de Build](BUILD.md)** - Configuração e execução local
- **[Guia de Deployment](docs/DEPLOYMENT.md)** - Deploy em produção

## 📋 Índice

- [Configuração do Ambiente](#configuração-do-ambiente)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Submissão de Código](#submissão-de-código)
- [Revisão de Código](#revisão-de-código)
- [Metodologia AIDesign](#metodologia-aidesign)
- [Comunicação](#comunicação)

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- **Node.js**: Versão 18 ou superior
- **Git**: Para controle de versão
- **Editor**: VS Code recomendado com extensões:
  - ES6 String HTML
  - Prettier
  - ESLint
  - REST Client (para testar APIs)

### Configuração Inicial

1. **Fork do Repositório**
```bash
# Clone seu fork
git clone https://github.com/SEU_USUARIO/TripWise.git
cd TripWise

# Adicione o repositório original como upstream
git remote add upstream https://github.com/REPO_ORIGINAL/TripWise.git
```

2. **Configuração do Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configure suas chaves de API no arquivo .env
```

3. **Teste a Instalação**
```bash
npm start
# Acesse http://localhost:3000 para verificar se está funcionando
```

4. **Execute os Testes**
```bash
# Use o arquivo test_ai_system.http no VS Code com REST Client
# Ou use curl/Postman para testar os endpoints
```

## 🔄 Processo de Contribuição

### 1. Escolha uma Issue

- Verifique as [issues abertas](../../issues)
- Procure por labels como `good first issue` para iniciantes
- Comente na issue que deseja trabalhar
- Aguarde aprovação do mantenedor

### 2. Crie uma Branch

```bash
# Atualize seu fork
git checkout main
git pull upstream main

# Crie uma nova branch
git checkout -b feature/nome-da-funcionalidade
# ou
git checkout -b fix/nome-do-bug
# ou
git checkout -b docs/nome-da-documentacao
```

### 3. Desenvolva

- Siga os [padrões de código](#padrões-de-código)
- Faça commits pequenos e frequentes
- Teste suas mudanças
- Documente novas funcionalidades

### 4. Submeta um Pull Request

- Push sua branch para seu fork
- Abra um Pull Request no repositório original
- Preencha o template de PR completamente
- Aguarde revisão

## 📝 Padrões de Código

### JavaScript/Node.js

```javascript
// ✅ Bom: Use ES6+ modules
import express from 'express';

// ✅ Bom: Nomes descritivos
const generatePersonalizedItinerary = async (userData) => {
  // implementação
};

// ✅ Bom: Comentários em português para lógica complexa
// Calcula o DNA de viagem baseado nas preferências do usuário
const calculateTravelDNA = (preferences) => {
  // implementação
};

// ✅ Bom: Tratamento de erros
try {
  const result = await aiEngine.generate(prompt);
  return result;
} catch (error) {
  console.error('Erro na geração de itinerário:', error);
  throw new Error('Falha na geração do itinerário');
}
```

### Estrutura de Arquivos

```
src/
├── ai/                                 # Módulos de IA
│   ├── aiEngine.js                     # Motor principal
│   ├── conversationalCopilot.js        # Chat conversacional
│   └── userPersonalization.js # Personalização
├── controllers/                        # Controladores da API
├── routes/                             # Definição de rotas
├── services/                           # Serviços externos
└── constants/                          # Constantes e configurações
```

### Convenções de Nomenclatura

- **Arquivos**: camelCase (`aiEngine.js`)
- **Funções**: camelCase (`generateItinerary`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Classes**: PascalCase (`TravelPersonalizer`)

### Documentação de Código

```javascript
/**
 * Gera um itinerário personalizado baseado no perfil do usuário
 * @param {Object} userData - Dados do usuário
 * @param {string} userData.destination - Destino da viagem
 * @param {number} userData.duration - Duração em dias
 * @param {Array} userData.interests - Interesses do usuário
 * @returns {Promise<Object>} Itinerário gerado
 */
const generateItinerary = async (userData) => {
  // implementação
};
```

## 📤 Submissão de Código

### Commits

Use o padrão de commits semânticos:

```bash
# Tipos de commit
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção

# Exemplos
git commit -m "feat: adiciona geração de itinerário via formulário"
git commit -m "fix: corrige erro na validação de datas"
git commit -m "docs: atualiza README com novas APIs"
```

### Pull Request Template

```markdown
## Descrição
Descreva brevemente as mudanças implementadas.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Execute `npm start`
2. Teste o endpoint X
3. Verifique se Y funciona

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes foram executados
- [ ] Documentação foi atualizada
- [ ] Não há conflitos de merge
```

## 🔍 Revisão de Código

### Para Revisores

- **Funcionalidade**: O código faz o que deveria fazer?
- **Legibilidade**: O código é claro e bem documentado?
- **Performance**: Há otimizações óbvias?
- **Segurança**: Não expõe dados sensíveis?
- **Testes**: As mudanças foram testadas?

### Para Autores

- Responda aos comentários construtivamente
- Faça as correções solicitadas
- Teste novamente após mudanças
- Marque conversas como resolvidas quando apropriado

## 🎨 Metodologia AIDesign

O TripWise segue a metodologia AIDesign. Contribuições devem considerar:

### Fases da Metodologia

1. **Imersão**: Entendimento do problema
2. **Ideação**: Geração de soluções
3. **Produção**: Implementação
4. **Validação**: Testes e feedback

### Artefatos Obrigatórios

- **Canvas de Identificação do Domínio**: Para novos problemas
- **Canvas de Objetivos**: Para definir metas
- **Canvas de Ideação**: Para soluções
- **Canvas de Design de Prompts**: Para funcionalidades de IA
- **Documentação C4**: Para mudanças arquiteturais
- **Canvas de Testes**: Para validações

### Documentação de Decisões

```markdown
## Decisão Arquitetural: [Título]

### Contexto
Descreva o problema ou necessidade.

### Decisão
Descreva a solução escolhida.

### Consequências
- Positivas: ...
- Negativas: ...
- Riscos: ...

### Alternativas Consideradas
1. Opção A: ...
2. Opção B: ...
```

## 💬 Comunicação

### Canais de Comunicação

- **Issues**: Para bugs e solicitações de funcionalidades
- **Pull Requests**: Para discussões de código
- **Discussions**: Para perguntas gerais
- **Email**: Para questões sensíveis

### Diretrizes de Comunicação

- **Seja respeitoso**: Trate todos com cortesia
- **Seja claro**: Use linguagem objetiva
- **Seja construtivo**: Ofereça soluções, não apenas críticas
- **Seja paciente**: Nem todos têm o mesmo nível de experiência

### Reuniões

- **Daily Standups**: Segundas, quartas e sextas às 9h
- **Sprint Planning**: Início de cada sprint
- **Retrospectivas**: Final de cada sprint
- **Code Reviews**: Conforme necessário

## 🚀 Tipos de Contribuição

### 🐛 Correção de Bugs

1. Reproduza o bug
2. Identifique a causa raiz
3. Implemente a correção
4. Adicione testes para prevenir regressão
5. Documente a correção

### ✨ Novas Funcionalidades

1. Discuta a funcionalidade em uma issue
2. Crie o Canvas de Ideação
3. Implemente seguindo os padrões
4. Adicione testes abrangentes
5. Documente a funcionalidade

### 📚 Documentação

1. Identifique lacunas na documentação
2. Escreva conteúdo claro e útil
3. Use exemplos práticos
4. Mantenha consistência com o estilo existente

### 🧪 Testes

1. Identifique áreas sem cobertura
2. Escreva testes unitários e de integração
3. Use dados realistas nos testes
4. Documente cenários de teste

## 📊 Métricas de Qualidade

### Cobertura de Código
- Meta: 80% de cobertura mínima
- Ferramentas: Jest, NYC

### Performance
- Tempo de resposta da API: < 2s
- Tempo de geração de itinerário: < 10s

### Qualidade de Código
- ESLint: Zero warnings
- Prettier: Formatação consistente
- Complexidade ciclomática: < 10

## 🎯 Roadmap de Contribuições

### Curto Prazo (1-2 meses)
- [ ] Implementação do frontend React
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Documentação de API com Swagger

### Médio Prazo (3-6 meses)
- [ ] Integração com mais APIs de transporte
- [ ] Sistema de avaliações e feedback
- [ ] Otimização de performance
- [ ] Internacionalização

### Longo Prazo (6+ meses)
- [ ] Aplicativo mobile
- [ ] Integração com redes sociais
- [ ] Sistema de recomendações avançado
- [ ] Análise preditiva de tendências

## ❓ Dúvidas Frequentes

### Como configurar as chaves de API?
Veja o arquivo `.env.example` e a documentação em `APIS_EXTERNAS_README.md`.

### Como testar mudanças na IA?
Use o arquivo `test_ai_system.http` com diferentes cenários de entrada.

### Como contribuir sem conhecimento técnico?
Você pode ajudar com documentação, testes manuais, tradução e feedback de usabilidade.

### Como reportar problemas de segurança?
Envie um email para [security@tripwise.com] com detalhes do problema.

---

**Obrigado por contribuir com o TripWise!** 🚀

Sua colaboração ajuda a tornar o planejamento de viagens mais inteligente e acessível para todos.