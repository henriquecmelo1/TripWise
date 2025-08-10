import { DateTime } from "luxon";

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || "info";
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
  }

  formatLog(level, message, context = {}) {
    return {
      timestamp: DateTime.now().toISO(),
      level: level.toUpperCase(),
      message,
      context,
      service: "tripwise-api",
      version: "1.0.0",
    };
  }

  /**
   * Verifica se deve logar o nível especificado
   */
  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  /**
   * Log de erro com contexto completo
   */
  error(message, error = null, context = {}) {
    if (!this.shouldLog("error")) return;

    const logEntry = this.formatLog("error", message, {
      ...context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : null,
    });

    console.error(JSON.stringify(logEntry, null, 2));
  }

  warn(message, context = {}) {
    if (!this.shouldLog("warn")) return;

    const logEntry = this.formatLog("warn", message, context);
    console.warn(JSON.stringify(logEntry, null, 2));
  }

  info(message, context = {}) {
    if (!this.shouldLog("info")) return;

    const logEntry = this.formatLog("info", message, context);
    console.log(JSON.stringify(logEntry, null, 2));
  }

  debug(message, context = {}) {
    if (!this.shouldLog("debug")) return;

    const logEntry = this.formatLog("debug", message, context);
    console.log(JSON.stringify(logEntry, null, 2));
  }

  logRequest(req, res, responseTime) {
    const context = {
      method: req.method,
      url: req.url,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
    };

    if (res.statusCode >= 400) {
      this.warn(`HTTP ${res.statusCode} - ${req.method} ${req.url}`, context);
    } else {
      this.info(`HTTP ${res.statusCode} - ${req.method} ${req.url}`, context);
    }
  }

  logExternalApiCall(apiName, endpoint, success, responseTime, error = null) {
    const context = {
      api: apiName,
      endpoint,
      success,
      responseTime: `${responseTime}ms`,
    };

    if (success) {
      this.info(`API Externa: ${apiName} - Sucesso`, context);
    } else {
      this.error(`API Externa: ${apiName} - Falha`, error, context);
    }
  }

  logAiOperation(operation, success, tokens = null, cost = null, context = {}) {
    const logContext = {
      operation,
      success,
      tokens,
      cost,
      ...context,
    };

    if (success) {
      this.info(`IA: ${operation} - Concluída`, logContext);
    } else {
      this.error(`IA: ${operation} - Falha`, null, logContext);
    }
  }

  logRateLimit(ip, endpoint, limit, current) {
    this.warn("Rate limit atingido", {
      ip,
      endpoint,
      limit,
      current,
      action: "request_blocked",
    });
  }

  logValidationError(endpoint, errors, context = {}) {
    this.warn("Erro de validação", {
      endpoint,
      errors,
      ...context,
    });
  }

  logSystemStart(config = {}) {
    this.info("Sistema inicializado", {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development",
      port: config.port,
      apisConfigured: config.apisConfigured || [],
    });
  }

  logHealthCheck(status, checks = {}) {
    const context = {
      status,
      checks,
    };

    if (status === "healthy") {
      this.info("Health check - Sistema saudável", context);
    } else {
      this.warn("Health check - Problemas detectados", context);
    }
  }

  requestLogger() {
    return (req, res, next) => {
      const startTime = Date.now();

      const originalEnd = res.end;
      res.end = function (...args) {
        const responseTime = Date.now() - startTime;
        logger.logRequest(req, res, responseTime);
        originalEnd.apply(this, args);
      };

      next();
    };
  }

  errorLogger() {
    return (error, req, res, next) => {
      this.error("Erro não tratado capturado", error, {
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next(error);
    };
  }

  logSlowOperation(operation, duration, threshold = 5000) {
    if (duration > threshold) {
      this.warn("Operação lenta detectada", {
        operation,
        duration: `${duration}ms`,
        threshold: `${threshold}ms`,
      });
    }
  }

  logMetrics(metrics) {
    this.info("Métricas do sistema", {
      ...metrics,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
    });
  }
}

const logger = new Logger();

export default logger;