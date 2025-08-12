import logger from "./logger.js";

/**
 * Validador de ambiente para garantir configuração adequada
 */
class EnvironmentValidator {
  constructor() {
    this.requiredVars = [
      {
        name: "GEMINI_API_KEY",
        description: "Chave da API Google Gemini (obrigatória)",
        required: true,
        validator: (value) => value && value.length > 10,
      },
    ];

    this.optionalVars = [
      {
        name: "OPENWEATHER_API_KEY",
        description: "Chave da API OpenWeather (opcional)",
        service: "weather",
        validator: (value) => !value || value.length > 10,
      },
      {
        name: "FOURSQUARE_API_KEY",
        description: "Chave da API Foursquare (opcional)",
        service: "places",
        validator: (value) => !value || value.length > 10,
      },
      {
        name: "EXCHANGE_RATE_API_KEY",
        description: "Chave da API ExchangeRate (opcional)",
        service: "exchange",
        validator: (value) => !value || value.length > 10,
      },
    ];

    this.environmentConfig = {
      NODE_ENV: process.env.NODE_ENV || "development",
      PORT: parseInt(process.env.PORT) || 3000,
      LOG_LEVEL: process.env.LOG_LEVEL || "info",
    };
  }

  /**
   * Valida todas as variáveis de ambiente
   */
  validateEnvironment() {
    const results = {
      valid: true,
      errors: [],
      warnings: [],
      availableServices: [],
      config: this.environmentConfig,
    };

    // Valida variáveis obrigatórias
    for (const variable of this.requiredVars) {
      const value = process.env[variable.name];
      
      if (!value) {
        results.valid = false;
        results.errors.push({
          type: "missing_required",
          variable: variable.name,
          message: `${variable.description} não encontrada`,
          solution: `Configure a variável de ambiente ${variable.name}`,
        });
      } else if (!variable.validator(value)) {
        results.valid = false;
        results.errors.push({
          type: "invalid_required",
          variable: variable.name,
          message: `${variable.description} inválida`,
          solution: `Verifique se ${variable.name} está configurada corretamente`,
        });
      } else {
        logger.info(`✅ ${variable.description} configurada`);
      }
    }

    // Valida variáveis opcionais
    for (const variable of this.optionalVars) {
      const value = process.env[variable.name];
      
      if (!value) {
        results.warnings.push({
          type: "missing_optional",
          variable: variable.name,
          service: variable.service,
          message: `${variable.description} não configurada`,
          impact: `Serviço de ${variable.service} não estará disponível`,
        });
      } else if (!variable.validator(value)) {
        results.warnings.push({
          type: "invalid_optional",
          variable: variable.name,
          service: variable.service,
          message: `${variable.description} inválida`,
          impact: `Serviço de ${variable.service} pode não funcionar corretamente`,
        });
      } else {
        results.availableServices.push(variable.service);
        logger.info(`✅ ${variable.description} configurada`);
      }
    }

    // Valida configurações gerais
    this.validateGeneralConfig(results);

    return results;
  }

  /**
   * Valida configurações gerais
   */
  validateGeneralConfig(results) {
    // Valida PORT
    if (this.environmentConfig.PORT < 1024 || this.environmentConfig.PORT > 65535) {
      results.warnings.push({
        type: "config_warning",
        variable: "PORT",
        message: `Porta ${this.environmentConfig.PORT} pode não ser adequada`,
        suggestion: "Use uma porta entre 3000-8000 para desenvolvimento",
      });
    }

    // Valida LOG_LEVEL
    const validLogLevels = ["error", "warn", "info", "debug"];
    if (!validLogLevels.includes(this.environmentConfig.LOG_LEVEL)) {
      results.warnings.push({
        type: "config_warning",
        variable: "LOG_LEVEL",
        message: `Nível de log '${this.environmentConfig.LOG_LEVEL}' inválido`,
        suggestion: `Use um dos níveis: ${validLogLevels.join(", ")}`,
      });
      this.environmentConfig.LOG_LEVEL = "info"; // Fallback
    }

    // Valida NODE_ENV
    const validEnvironments = ["development", "production", "test"];
    if (!validEnvironments.includes(this.environmentConfig.NODE_ENV)) {
      results.warnings.push({
        type: "config_warning",
        variable: "NODE_ENV",
        message: `Ambiente '${this.environmentConfig.NODE_ENV}' não reconhecido`,
        suggestion: `Use: ${validEnvironments.join(", ")}`,
      });
    }
  }

  /**
   * Gera relatório de status do ambiente
   */
  generateStatusReport(validationResults) {
    const report = {
      status: validationResults.valid ? "ready" : "error",
      timestamp: new Date().toISOString(),
      environment: validationResults.config.NODE_ENV,
      port: validationResults.config.PORT,
      services: {
        core: validationResults.valid,
        weather: validationResults.availableServices.includes("weather"),
        places: validationResults.availableServices.includes("places"),
        exchange: validationResults.availableServices.includes("exchange"),
      },
      summary: {
        totalErrors: validationResults.errors.length,
        totalWarnings: validationResults.warnings.length,
        availableServices: validationResults.availableServices.length,
      },
    };

    return report;
  }

  /**
   * Imprime relatório formatado no console
   */
  printValidationReport(validationResults) {
    console.log("\n" + "=".repeat(60));
    console.log("🔍 VALIDAÇÃO DE AMBIENTE - TripWise");
    console.log("=".repeat(60));

    if (validationResults.valid) {
      console.log("✅ AMBIENTE VÁLIDO - Sistema pronto para iniciar");
    } else {
      console.log("❌ PROBLEMAS CRÍTICOS DETECTADOS");
    }

    // Mostra configuração
    console.log(`\n📋 Configuração:`);
    console.log(`   • Ambiente: ${validationResults.config.NODE_ENV}`);
    console.log(`   • Porta: ${validationResults.config.PORT}`);
    console.log(`   • Log Level: ${validationResults.config.LOG_LEVEL}`);

    // Mostra serviços disponíveis
    if (validationResults.availableServices.length > 0) {
      console.log(`\n🌐 Serviços Externos Disponíveis:`);
      validationResults.availableServices.forEach(service => {
        console.log(`   • ${service.charAt(0).toUpperCase() + service.slice(1)}`);
      });
    }

    // Mostra erros críticos
    if (validationResults.errors.length > 0) {
      console.log(`\n🚨 ERROS CRÍTICOS (${validationResults.errors.length}):`);
      validationResults.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.message}`);
        console.log(`      💡 ${error.solution}`);
      });
    }

    // Mostra avisos
    if (validationResults.warnings.length > 0) {
      console.log(`\n⚠️  AVISOS (${validationResults.warnings.length}):`);
      validationResults.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning.message}`);
        if (warning.impact) {
          console.log(`      📍 Impacto: ${warning.impact}`);
        }
        if (warning.suggestion) {
          console.log(`      💡 Sugestão: ${warning.suggestion}`);
        }
      });
    }

    console.log("\n" + "=".repeat(60) + "\n");

    return validationResults.valid;
  }

  /**
   * Cria arquivo .env.example se não existir
   */
  createExampleEnv() {
    const exampleContent = `# TripWise Backend Environment Configuration

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

# APIs de Locais
FOURSQUARE_API_KEY=sua_chave_aqui
# Gratuita: https://developer.foursquare.com/

# APIs de Câmbio
EXCHANGE_RATE_API_KEY=sua_chave_aqui
# Gratuita: https://exchangerate-api.com/

# ===========================================
# CONFIGURAÇÕES DO SERVIDOR
# ===========================================

PORT=3000
NODE_ENV=development
LOG_LEVEL=info
`;

    return exampleContent;
  }

  /**
   * Verifica se o sistema pode iniciar
   */
  canStart() {
    const results = this.validateEnvironment();
    const canStart = this.printValidationReport(results);
    
    if (!canStart) {
      logger.error("Sistema não pode iniciar devido a problemas de configuração", null, {
        errors: results.errors,
        suggestions: results.errors.map(e => e.solution)
      });
    }

    return canStart;
  }

  /**
   * Monitora mudanças nas variáveis de ambiente (para desenvolvimento)
   */
  watchEnvironment(callback) {
    if (this.environmentConfig.NODE_ENV !== "development") {
      return;
    }

    // Monitora mudanças a cada 30 segundos em desenvolvimento
    const interval = setInterval(() => {
      const currentResults = this.validateEnvironment();
      const currentConfig = JSON.stringify(currentResults.config);
      const storedConfig = JSON.stringify(this.environmentConfig);

      if (currentConfig !== storedConfig) {
        logger.info("Mudanças no ambiente detectadas", {
          oldConfig: this.environmentConfig,
          newConfig: currentResults.config
        });
        
        if (callback) {
          callback(currentResults);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }
}

export default EnvironmentValidator;