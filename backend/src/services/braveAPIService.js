import "dotenv/config";
import { search_lang } from "../constants/brave.constants.js";

class BraveAPIService {
  constructor() {
    this.apiKey = process.env.BRAVE_API_KEY;
    this.baseUrl = "https://api.search.brave.com/res/v1";

    if (!this.apiKey) {
      console.warn(
        "⚠️ BRAVE_API_KEY não configurada. Enrichment contextual ficará limitado."
      );
    } else {
      console.log("✅ Brave API Service inicializado com sucesso");
    }
  }

  async searchWeb(query, count = 10, retries = 3) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (!this.apiKey) {
          throw new Error("Brave API Key não configurada");
        }

        // Delay entre requisições para evitar rate limiting
        if (attempt > 0) {
          const delay = Math.min(Math.pow(2, attempt) * 500, 3000); // Backoff exponencial limitado a 3s
          console.log(
            `⏳ Aguardando ${delay}ms antes da tentativa ${
              attempt + 1
            } (web)...`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        const searchParams = new URLSearchParams({
          q: query,
          count: count.toString(),
          safesearch: "moderate",
          search_lang: search_lang,
        });

        const response = await fetch(
          `${this.baseUrl}/web/search?${searchParams}`,
          {
            headers: {
              Accept: "application/json",
              "X-Subscription-Token": this.apiKey,
            },
          }
        );

        if (response.status === 429) {
          if (attempt < retries) {
            console.warn(
              `⚠️ Rate limit atingido (429). Tentativa ${attempt + 1}/${
                retries + 1
              }`
            );
            continue;
          }
          throw new Error(`Rate limit excedido após ${retries + 1} tentativas`);
        }

        if (response.status === 422) {
          let errorDetails = "";
          try {
            const errorBody = await response.text();
            errorDetails = errorBody ? ` - Detalhes: ${errorBody}` : "";
          } catch (e) {
            // Ignore error reading response body
          }
          console.warn(
            `⚠️ API rejeitou a requisição web (422) - possivelmente parâmetros inválidos ou endpoint não disponível${errorDetails}`
          );
          console.warn(`Query que causou o erro: "${query}"`);
          return [];
        }

        if (!response.ok) {
          throw new Error(
            `Brave API Error: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        return data.web?.results || [];
      } catch (error) {
        if (attempt === retries) {
          console.error("Erro na busca web Brave:", error);
          throw error;
        }
        console.warn(`⚠️ Tentativa ${attempt + 1} falhou:`, error.message);
      }
    }
  }


  async getSecurityAlerts(destination) {
    try {
      const queries = [
        `${destination} alertas de segurança`,
        `${destination} avisos de viagem`,
        `${destination} segurança turista`,
        `${destination} criminalidade estatísticas recentes`,
      ];

      const searchResults = [];

      // Executa buscas sequencialmente com delay para evitar rate limiting
      for (const query of queries) {
        try {
          const result = await this.searchWeb(query, 5);
          searchResults.push(result);
        } catch (err) {
          console.warn(
            `Falha na busca de segurança para "${query}":`,
            err.message
          );
          searchResults.push([]);
        }

        // Delay de 1000ms entre buscas (limite de 1 req/s)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      const allResults = searchResults.flat();

      // Filtra resultados relevantes de fontes confiáveis
      const securityInfo = allResults
        .filter((result) => {
          const url = result.url?.toLowerCase() || "";
          const title = result.title?.toLowerCase() || "";
          const snippet = result.description?.toLowerCase() || "";

          // Prioriza fontes governamentais e de viagem confiáveis
          const trustedSources = [
            "gov",
            "state.gov",
            "fco.gov.uk",
            "smartraveller.gov.au",
            "travel.gc.ca",
            "auswaertiges-amt.de",
          ];
          const isTrustedSource = trustedSources.some((source) =>
            url.includes(source)
          );

          // Verifica se contém palavras-chave de segurança
          const securityKeywords = [
            "safety",
            "security",
            "warning",
            "alert",
            "advisory",
            "crime",
            "danger",
          ];
          const hasSecurityKeywords = securityKeywords.some(
            (keyword) => title.includes(keyword) || snippet.includes(keyword)
          );

          return isTrustedSource || hasSecurityKeywords;
        })
        .slice(0, 10);

      return {
        success: true,
        alerts: securityInfo.map((result) => ({
          title: result.title,
          description: result.description,
          url: result.url,
          source: this.extractDomain(result.url),
          date: result.age || "Recente",
        })),
        total: securityInfo.length,
      };
    } catch (error) {
      console.error("Erro ao obter alertas de segurança:", error);
      return {
        success: false,
        error: "Não foi possível carregar alertas de segurança",
        alerts: [],
      };
    }
  }


  async getCurrentEvents(destination) {
    try {
      const queries = [
        `${destination} eventos esta semana`,
        `${destination} festivais shows 2024`,
        `${destination} o que está acontecendo agora`,
        `${destination} eventos culturais atuais`,
      ];

      const searchResults = [];

      // Executa buscas sequencialmente com delay para evitar rate limiting
      for (const query of queries) {
        try {
          const result = await this.searchWeb(query, 5);
          searchResults.push(result);
        } catch (err) {
          console.warn(
            `Falha na busca de eventos para "${query}":`,
            err.message
          );
          searchResults.push([]);
        }

        // Delay de 1000ms entre buscas (limite de 1 req/s)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      const allResults = searchResults.flat();

      const events = allResults
        .filter((result) => {
          const title = result.title?.toLowerCase() || "";
          const snippet = result.description?.toLowerCase() || "";

          const eventKeywords = [
            "event",
            "festival",
            "concert",
            "exhibition",
            "show",
            "performance",
            "happening",
            "celebration",
          ];
          return eventKeywords.some(
            (keyword) => title.includes(keyword) || snippet.includes(keyword)
          );
        })
        .slice(0, 10);

      return {
        success: true,
        events: events.map((result) => ({
          title: result.title,
          description: result.description,
          url: result.url,
          source: this.extractDomain(result.url),
          category: this.categorizeEvent(
            result.title + " " + result.description
          ),
        })),
        total: events.length,
      };
    } catch (error) {
      console.error("Erro ao obter eventos atuais:", error);
      return {
        success: false,
        error: "Não foi possível carregar eventos atuais",
        events: [],
      };
    }
  }


  // Métodos auxiliares
  extractDomain(url) {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "Fonte desconhecida";
    }
  }


  categorizeEvent(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("concert") || lowerText.includes("music"))
      return "Música";
    if (lowerText.includes("festival")) return "Festival";
    if (lowerText.includes("exhibition") || lowerText.includes("museum"))
      return "Arte/Cultura";
    if (lowerText.includes("sport")) return "Esporte";
    if (lowerText.includes("food")) return "Gastronomia";
    return "Evento";
  }

  formatDatesForQuery(travelDates) {
    if (!travelDates) return "2024";
    
    try {
      const startDate = new Date(travelDates.startDate || travelDates.departureDate);
      const month = startDate.toLocaleDateString('pt-BR', { month: 'long' });
      const year = startDate.getFullYear();
      return `${month} ${year}`;
    } catch {
      return "2024";
    }
  }

  assessTrustLevel(url) {
    if (!url) return "unknown";
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes("gov")) return "high";
    if (lowerUrl.includes("org") || lowerUrl.includes("edu")) return "medium";
    return "low";
  }


  // Método principal para enrichment contextual de itinerários
  async getContextualEnrichment(destination, travelDates = null) {
    try {
      console.log(`🔍 Coletando enrichment contextual para: ${destination}`);
      
      const [events, security] = await Promise.all([
        this.getCurrentEvents(destination, travelDates).catch((err) => {
          console.warn("Falha nos eventos:", err.message);
          return { success: false, events: [] };
        }),
        this.getSecurityAlerts(destination).catch((err) => {
          console.warn("Falha nos alertas:", err.message);
          return { success: false, alerts: [] };
        })
      ]);

      const relevantItems = [];
      
      // Adiciona eventos relevantes
      if (events.success && events.events.length > 0) {
        relevantItems.push(...events.events.map(event => ({
          type: 'event',
          ...event
        })));
      }
      
      // Adiciona alertas de segurança relevantes
      if (security.success && security.alerts.length > 0) {
        relevantItems.push(...security.alerts.map(alert => ({
          type: 'security',
          ...alert
        })));
      }

      return {
        success: true,
        destination,
        travelDates,
        enrichment: relevantItems,
        total: relevantItems.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro ao obter enrichment contextual:", error);
      return {
        success: false,
        error: "Erro ao carregar enrichment contextual",
        destination,
        enrichment: [],
      };
    }
  }

  // WebFetch para obter conteúdo completo dos URLs relevantes
  async fetchContentFromUrls(enrichmentItems) {
    if (!enrichmentItems || enrichmentItems.length === 0) {
      return [];
    }

    const contentPromises = enrichmentItems
      .filter(item => item.url && this.isValidUrl(item.url))
      .slice(0, 3) // Limita a 3 URLs para evitar timeout
      .map(async (item) => {
        try {
          const response = await fetch(item.url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; TripWise/1.0)'
            },
            timeout: 10000 // 10 segundos timeout
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const content = await response.text();
          
          // Extração simples de texto do HTML
          const textContent = this.extractTextFromHtml(content);
          
          return {
            ...item,
            fullContent: textContent.substring(0, 2000), // Limita conteúdo
            contentFetched: true
          };
        } catch (error) {
          console.warn(`Falha ao buscar conteúdo de ${item.url}:`, error.message);
          return {
            ...item,
            fullContent: item.description || '',
            contentFetched: false,
            fetchError: error.message
          };
        }
      });

    const contentResults = await Promise.allSettled(contentPromises);
    
    return contentResults
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
  }

  // Utilitários para WebFetch
  isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  extractTextFromHtml(html) {
    // Extração básica de texto HTML sem dependências
    return html
      .replace(/<script[^>]*>.*?<\/script>/gis, '') // Remove scripts
      .replace(/<style[^>]*>.*?<\/style>/gis, '') // Remove CSS
      .replace(/<[^>]*>/g, ' ') // Remove tags HTML
      .replace(/\s+/g, ' ') // Normaliza espaços
      .trim();
  }
}

export default BraveAPIService;
