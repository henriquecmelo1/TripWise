import { DateTime } from "luxon";

class ValidationMiddleware {
  static validateItineraryForm(req, res, next) {
    try {
      const { formData } = req.body;

      if (!formData || typeof formData !== "object") {
        return res.status(400).json({
          success: false,
          error: "formData é obrigatório e deve ser um objeto",
          timestamp: new Date().toISOString(),
        });
      }

      const errors = [];

      if (!formData.destination || typeof formData.destination !== "string") {
        errors.push("destination é obrigatório e deve ser uma string");
      } else if (formData.destination.length < 2 || formData.destination.length > 100) {
        errors.push("destination deve ter entre 2 e 100 caracteres");
      }

      if (!formData.start_date) {
        errors.push("start_date é obrigatório");
      } else if (!DateTime.fromISO(formData.start_date).isValid) {
        errors.push("start_date deve estar no formato válido (YYYY-MM-DD)");
      }

      if (!formData.end_date) {
        errors.push("end_date é obrigatório");
      } else if (!DateTime.fromISO(formData.end_date).isValid) {
        errors.push("end_date deve estar no formato válido (YYYY-MM-DD)");
      }

      if (formData.start_date && formData.end_date) {
        const startDate = DateTime.fromISO(formData.start_date);
        const endDate = DateTime.fromISO(formData.end_date);
        
        if (startDate.isValid && endDate.isValid) {
          if (endDate <= startDate) {
            errors.push("end_date deve ser posterior a start_date");
          }
          
          const diffDays = endDate.diff(startDate, 'days').days;
          if (diffDays > 365) {
            errors.push("Viagem não pode exceder 365 dias");
          }
          
          const today = DateTime.now();
          if (startDate < today.minus({ days: 1 })) {
            errors.push("start_date não pode ser no passado");
          }
        }
      }

      if (!formData.travelers_count) {
        errors.push("travelers_count é obrigatório");
      } else {
        const travelers = parseInt(formData.travelers_count);
        if (isNaN(travelers) || travelers < 1 || travelers > 50) {
          errors.push("travelers_count deve ser um número entre 1 e 50");
        }
      }

      const validTripTypes = ["lazer", "romantico", "aventura", "negocios", "familia", "solo", "cultural"];
      if (formData.trip_type && !validTripTypes.includes(formData.trip_type)) {
        errors.push(`trip_type deve ser um dos valores: ${validTripTypes.join(", ")}`);
      }

      const validBudgetRanges = ["economico", "moderado", "confortavel", "premium"];
      if (formData.budget_range && !validBudgetRanges.includes(formData.budget_range)) {
        errors.push(`budget_range deve ser um dos valores: ${validBudgetRanges.join(", ")}`);
      }

      if (formData.activity_interests && Array.isArray(formData.activity_interests)) {
        if (formData.activity_interests.length > 10) {
          errors.push("activity_interests não pode ter mais de 10 itens");
        }
        
        const invalidInterests = formData.activity_interests.filter(
          interest => typeof interest !== "string" || interest.length > 50
        );
        if (invalidInterests.length > 0) {
          errors.push("Todos os activity_interests devem ser strings válidas (máx 50 caracteres)");
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          error: "Dados de entrada inválidos",
          details: errors,
          timestamp: new Date().toISOString(),
        });
      }

      formData.destination = formData.destination.trim();
      if (formData.trip_type) formData.trip_type = formData.trip_type.toLowerCase();
      if (formData.budget_range) formData.budget_range = formData.budget_range.toLowerCase();

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Erro interno na validação",
        timestamp: new Date().toISOString(),
      });
    }
  }

  static validateChatMessage(req, res, next) {
    try {
      const { sessionId, message, userId } = req.body;
      const errors = [];

      if (!sessionId || typeof sessionId !== "string") {
        errors.push("sessionId é obrigatório e deve ser uma string");
      } else if (sessionId.length < 3 || sessionId.length > 100) {
        errors.push("sessionId deve ter entre 3 e 100 caracteres");
      }

      if (!message || typeof message !== "string") {
        errors.push("message é obrigatório e deve ser uma string");
      } else if (message.length < 1 || message.length > 2000) {
        errors.push("message deve ter entre 1 e 2000 caracteres");
      }

      if (userId && (typeof userId !== "string" || userId.length > 100)) {
        errors.push("userId deve ser uma string válida (máx 100 caracteres)");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          error: "Dados de entrada inválidos",
          details: errors,
          timestamp: new Date().toISOString(),
        });
      }

      req.body.message = message.trim();
      if (req.body.sessionId) req.body.sessionId = req.body.sessionId.trim();
      if (req.body.userId) req.body.userId = req.body.userId.trim();

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Erro interno na validação",
        timestamp: new Date().toISOString(),
      });
    }
  }

  static validateProfileCreation(req, res, next) {
    try {
      const { userId, userData } = req.body;
      const errors = [];

      if (!userId || typeof userId !== "string") {
        errors.push("userId é obrigatório e deve ser uma string");
      } else if (userId.length < 3 || userId.length > 100) {
        errors.push("userId deve ter entre 3 e 100 caracteres");
      }

      if (!userData || typeof userData !== "object") {
        errors.push("userData é obrigatório e deve ser um objeto");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          error: "Dados de entrada inválidos",
          details: errors,
          timestamp: new Date().toISOString(),
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Erro interno na validação",
        timestamp: new Date().toISOString(),
      });
    }
  }

  static sanitizeString(input) {
    if (typeof input !== "string") return input;
    
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/[<>'"]/g, "");
  }

  static sanitizeInputs(req, res, next) {
    try {
      // Sanitiza recursivamente o body apenas se existir
      if (req.body && typeof req.body === "object" && Object.keys(req.body).length > 0) {
        req.body = ValidationMiddleware.sanitizeObject(req.body);
      }

      if (req.query && typeof req.query === "object" && Object.keys(req.query).length > 0) {
        req.query = ValidationMiddleware.sanitizeObject(req.query);
      }

      next();
    } catch (error) {
      console.error("Erro na sanitização:", error);
      next();
    }
  }

  static sanitizeObject(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => ValidationMiddleware.sanitizeObject(item));
    }
    
    if (obj && typeof obj === "object") {
      const sanitized = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = ValidationMiddleware.sanitizeObject(value);
      }
      return sanitized;
    }
    
    if (typeof obj === "string") {
      return ValidationMiddleware.sanitizeString(obj);
    }
    
    return obj;
  }
}

export default ValidationMiddleware;