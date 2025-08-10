class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.apiLimits = new Map();
    
    this.endpointLimits = {
      "/api/ai/itinerary/generate": 5,
      "/api/ai/chat": 20,
      "/api/ai/profile/create": 10,
      "default": 30
    };
    
    this.externalApiLimits = {
      "weather": 10,
      "foursquare": 8,
      "exchange": 5
    };

    setInterval(() => this.cleanup(), 60000);
  }

  createEndpointLimiter(endpoint) {
    return (req, res, next) => {
      try {
        const clientIP = req.ip || req.connection.remoteAddress || "unknown";
        const key = `${clientIP}:${endpoint}`;
        const limit = this.endpointLimits[endpoint] || this.endpointLimits.default;
        
        if (this.isRateLimited(key, limit)) {
          return res.status(429).json({
            success: false,
            error: "Rate limit excedido",
            message: `Máximo ${limit} requisições por minuto para este endpoint`,
            retryAfter: this.getRetryAfter(key),
            timestamp: new Date().toISOString(),
          });
        }

        this.recordRequest(key);
        next();
      } catch (error) {
        console.error("Erro no rate limiting:", error);
        next();
      }
    };
  }

  checkApiLimit(apiName) {
    const limit = this.externalApiLimits[apiName] || 10;
    const key = `api:${apiName}`;
    
    if (this.isRateLimited(key, limit)) {
      throw new Error(`Rate limit excedido para API ${apiName}. Limite: ${limit}/min`);
    }
    
    this.recordRequest(key);
    return true;
  }

  isRateLimited(key, limit) {
    const now = Date.now();
    const windowStart = now - 60000;
    
    if (!this.requests.has(key)) {
      return false;
    }
    
    const userRequests = this.requests.get(key);
    const recentRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    return recentRequests.length >= limit;
  }

  recordRequest(key) {
    const now = Date.now();
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    this.requests.get(key).push(now);
  }

  getRetryAfter(key) {
    if (!this.requests.has(key)) {
      return 60;
    }
    
    const userRequests = this.requests.get(key);
    if (userRequests.length === 0) {
      return 60;
    }
    
    const oldestRequest = Math.min(...userRequests);
    const retryAfter = Math.max(0, 60 - Math.floor((Date.now() - oldestRequest) / 1000));
    
    return retryAfter;
  }

  cleanup() {
    const now = Date.now();
    const windowStart = now - 60000;

    for (const [key, timestamps] of this.requests.entries()) {
      const recentRequests = timestamps.filter(timestamp => timestamp > windowStart);
      
      if (recentRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, recentRequests);
      }
    }
  }

  globalRateLimit(req, res, next) {
    try {
      const clientIP = req.ip || req.connection.remoteAddress || "unknown";
      const globalKey = `global:${clientIP}`;
      const globalLimit = 100;
      
      if (this.isRateLimited(globalKey, globalLimit)) {
        return res.status(429).json({
          success: false,
          error: "Rate limit global excedido",
          message: "Muitas requisições. Tente novamente em alguns minutos.",
          retryAfter: this.getRetryAfter(globalKey),
          timestamp: new Date().toISOString(),
        });
      }

      this.recordRequest(globalKey);
      next();
    } catch (error) {
      console.error("Erro no rate limiting global:", error);
      next();
    }
  }

  getStats() {
    const stats = {
      activeKeys: this.requests.size,
      totalRequests: 0,
      apiCalls: {},
    };

    for (const [key, timestamps] of this.requests.entries()) {
      stats.totalRequests += timestamps.length;
      
      if (key.startsWith("api:")) {
        const apiName = key.replace("api:", "");
        stats.apiCalls[apiName] = timestamps.length;
      }
    }

    return stats;
  }
}

const rateLimiter = new RateLimiter();

export default rateLimiter;