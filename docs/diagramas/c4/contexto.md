# Diagrama de Contexto - TripWise (C4 Nível 1)

## Visão Geral

Este diagrama mostra o sistema TripWise em seu contexto, incluindo os usuários e sistemas externos com os quais interage.

## Diagrama

```mermaid
graph TB
    %% Usuários
    U1[👤 Viajante Individual<br/>Pessoa planejando viagem pessoal]
    U2[👥 Grupo de Viajantes<br/>Famílias, casais, amigos]
    U3[🏢 Agente de Viagens<br/>Profissional do turismo]
    U4[📱 Usuário Mobile<br/>Acesso via dispositivos móveis]

    %% Sistema Principal
    TRIPWISE[🚀 TripWise<br/>Sistema de Planejamento<br/>de Viagens com IA<br/><br/>• Geração de itinerários hiper-personalizados<br/>• Copiloto conversacional<br/>• Integração com dados reais<br/>• Otimização multidimensional]

    %% Sistemas Externos - IA
    GEMINI[🤖 Google Gemini<br/>Serviço de IA Generativa<br/><br/>• Geração de conteúdo<br/>• Análise de preferências<br/>• Criação de narrativas]

    %% Sistemas Externos - Dados
    WEATHER[🌤️ APIs Meteorológicas<br/>OpenWeather, WeatherAPI<br/><br/>• Condições atuais<br/>• Previsões<br/>• Alertas climáticos]

    PLACES[🍽️ APIs de Locais<br/>Foursquare, Google Places<br/><br/>• Restaurantes<br/>• Atrações turísticas<br/>• Avaliações e preços]

    EXCHANGE[💱 APIs de Câmbio<br/>ExchangeRate-API, Fixer<br/><br/>• Taxas em tempo real<br/>• Conversão de moedas<br/>• Histórico de cotações]

    TRANSPORT[🚇 APIs de Transporte<br/>OpenStreetMap, Transit APIs<br/><br/>• Rotas de transporte público<br/>• Horários<br/>• Mapas e navegação]

    EVENTS[🎭 APIs de Eventos<br/>Eventbrite, APIs Governamentais<br/><br/>• Eventos locais<br/>• Festivais<br/>• Shows e espetáculos]

    FLIGHTS[✈️ APIs de Voos<br/>Amadeus<br/><br/>• Busca de voos<br/>• Preços<br/>• Disponibilidade]

    %% Relacionamentos - Usuários para Sistema
    U1 -.->|Solicita itinerários<br/>personalizados| TRIPWISE
    U2 -.->|Planeja viagens<br/>em grupo| TRIPWISE
    U3 -.->|Usa como ferramenta<br/>profissional| TRIPWISE
    U4 -.->|Acessa via<br/>aplicativo mobile| TRIPWISE

    %% Relacionamentos - Sistema para IA
    TRIPWISE -->|Envia prompts<br/>estruturados| GEMINI
    GEMINI -->|Retorna itinerários<br/>e respostas| TRIPWISE

    %% Relacionamentos - Sistema para APIs Externas
    TRIPWISE -->|Consulta condições<br/>meteorológicas| WEATHER
    TRIPWISE -->|Busca restaurantes<br/>e atrações| PLACES
    TRIPWISE -->|Obtém taxas<br/>de câmbio| EXCHANGE
    TRIPWISE -->|Consulta rotas<br/>de transporte| TRANSPORT
    TRIPWISE -->|Busca eventos<br/>locais| EVENTS
    TRIPWISE -->|Pesquisa voos<br/>disponíveis| FLIGHTS

    %% Relacionamentos - Retorno de dados
    WEATHER -->|Dados meteorológicos<br/>em tempo real| TRIPWISE
    PLACES -->|Informações de locais<br/>verificadas| TRIPWISE
    EXCHANGE -->|Cotações atualizadas| TRIPWISE
    TRANSPORT -->|Opções de transporte| TRIPWISE
    EVENTS -->|Eventos durante<br/>a viagem| TRIPWISE
    FLIGHTS -->|Opções de voos<br/>e preços| TRIPWISE

    %% Estilização
    classDef userClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef systemClass fill:#f3e5f5,stroke:#4a148c,stroke-width:3px,color:#000
    classDef aiClass fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef apiClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#000

    class U1,U2,U3,U4 userClass
    class TRIPWISE systemClass
    class GEMINI aiClass
    class WEATHER,PLACES,EXCHANGE,TRANSPORT,EVENTS,FLIGHTS apiClass
```

## Descrição dos Elementos

### 👥 Usuários do Sistema

#### Viajante Individual
- **Perfil**: Pessoa planejando viagem pessoal
- **Necessidades**: Itinerários personalizados, recomendações baseadas em preferências
- **Interações**: Formulário de preferências, chat conversacional

#### Grupo de Viajantes
- **Perfil**: Famílias, casais, grupos de amigos
- **Necessidades**: Itinerários que atendam múltiplas preferências, atividades em grupo
- **Interações**: Planejamento colaborativo, consenso de preferências

#### Agente de Viagens
- **Perfil**: Profissional do setor turístico
- **Necessidades**: Ferramenta para criar propostas rapidamente
- **Interações**: Interface profissional, múltiplos clientes

#### Usuário Mobile
- **Perfil**: Acesso via dispositivos móveis
- **Necessidades**: Interface responsiva, agilidade em viagens
- **Interações**: App web

### 🚀 Sistema Principal: TripWise

**Responsabilidades**:
- Orquestrar a geração de itinerários hiper-personalizados
- Fornecer interface conversacional natural
- Integrar dados de múltiplas fontes externas
- Otimizar recomendações baseadas em múltiplos critérios
- Gerenciar perfis de usuário e aprendizado contínuo

**Características Principais**:
- **Hiper-Personalização**: DNA de viagem único para cada usuário
- **Inteligência Conversacional**: Chat natural em português
- **Dados Reais**: Integração com APIs externas para informações atualizadas
- **Otimização Multidimensional**: Equilibra orçamento, tempo, logística e interesses

### 🤖 Sistema de IA: Google Gemini

**Responsabilidades**:
- Processar prompts estruturados do TripWise
- Gerar conteúdo narrativo para itinerários
- Analisar preferências e inferir padrões
- Responder perguntas conversacionais

**Integração**:
- API REST com autenticação por chave
- Prompts otimizados para turismo
- Processamento de contexto em português

### 🌐 Sistemas Externos

#### APIs Meteorológicas
- **OpenWeatherMap**: Dados globais, 1.000 chamadas/dia gratuitas
- **WeatherAPI**: Previsões detalhadas, 1M chamadas/mês gratuitas
- **Dados fornecidos**: Temperatura, condições, previsão 5 dias

#### APIs de Locais
- **Foursquare**: Locais verificados, 50 chamadas/dia gratuitas
- **Google Places**: Dados abrangentes, $200 crédito/mês
- **Dados fornecidos**: Restaurantes, atrações, avaliações, preços

#### APIs de Câmbio
- **ExchangeRate-API**: Totalmente gratuita
- **Dados fornecidos**: Taxas em tempo real, conversões

#### APIs de Voos
- **Amadeus**: API comercial para busca de voos
- **Dados fornecidos**: Voos disponíveis, preços, horários

## Fluxos Principais

### 1. Geração de Itinerário
```
Usuário → TripWise → [APIs Externas] → Google Gemini → TripWise → Usuário
```

### 2. Chat Conversacional
```
Usuário → TripWise → Google Gemini → TripWise → Usuário
```

### 3. Atualização de Dados
```
TripWise → APIs Externas → TripWise (Cache/Processamento)
```

## Benefícios da Arquitetura

### Para Usuários
- **Experiência Unificada**: Uma interface para múltiplas fontes de dados
- **Informações Atualizadas**: Dados reais de clima, preços, eventos
- **Personalização Avançada**: IA que aprende com preferências
- **Conveniência**: Planejamento completo em uma plataforma

### Para o Sistema
- **Escalabilidade**: APIs externas absorvem carga de dados
- **Confiabilidade**: Múltiplas fontes para redundância
- **Flexibilidade**: Fácil adição de novas APIs
- **Custo-Efetividade**: Uso de APIs gratuitas quando possível

## Considerações de Segurança

- **Chaves de API**: Armazenadas como variáveis de ambiente
- **Rate Limiting**: Controle de chamadas para APIs externas
- **Fallback**: Dados genéricos quando APIs falham
- **Privacidade**: Dados do usuário não compartilhados com APIs externas

## Limitações e Restrições

- **Dependência de Internet**: Requer conectividade para funcionalidade completa
- **Limites de API**: Quotas gratuitas podem limitar uso intensivo
- **Latência**: Múltiplas chamadas de API podem afetar performance
- **Disponibilidade**: Falhas em APIs externas afetam funcionalidades específicas

---

**Próximo Nível**: [Diagrama de Contêineres](containers.md) - Detalhamento da arquitetura interna do TripWise