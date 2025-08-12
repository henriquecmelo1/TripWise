import { z } from "zod";

// Schema de validação para geração de itinerário
export const itineraryFormSchema = z
  .object({
    departure_location: z
      .string()
      .min(1, "Local de partida é obrigatório")
      .min(2, "Local de partida deve ter pelo menos 2 caracteres")
      .max(100, "Local de partida deve ter no máximo 100 caracteres")
      .trim(),

    destination: z
      .string()
      .min(1, "Destino é obrigatório")
      .min(2, "Destino deve ter pelo menos 2 caracteres")
      .max(100, "Destino deve ter no máximo 100 caracteres")
      .trim(),

    start_date: z
      .string()
      .min(1, "Data de início é obrigatória")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data de início deve estar no formato YYYY-MM-DD"
      )
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "Data de início deve ser hoje ou uma data futura"),

    end_date: z
      .string()
      .min(1, "Data de fim é obrigatória")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data de fim deve estar no formato YYYY-MM-DD"
      ),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      return endDate > startDate;
    },
    {
      message: "Data de fim deve ser posterior à data de início",
      path: ["end_date"],
    }
  )
  .refine(
    (data) => {
      // Validação adicional: destino deve ser diferente do local de partida
      return (
        data.departure_location.toLowerCase().trim() !==
        data.destination.toLowerCase().trim()
      );
    },
    {
      message: "O destino deve ser diferente do local de partida",
      path: ["destination"],
    }
  );

export type ItineraryFormData = z.infer<typeof itineraryFormSchema>;

// Função para validar apenas os campos obrigatórios
export const validateRequiredFields = (formData: any) => {
  const requiredFields = {
    departure_location: formData?.departure_location || "",
    destination: formData?.destination || "",
    start_date: formData?.start_date || "",
    end_date: formData?.end_date || "",
  };

  return itineraryFormSchema.safeParse(requiredFields);
};

export const getValidationErrors = (errors: z.ZodError) => {
  const errorMap: Record<string, string> = {};
  
  if (errors?.issues && Array.isArray(errors.issues)) {
    errors.issues.forEach((error) => {
      const field = error.path[0] as string;
      if (!errorMap[field]) {
        errorMap[field] = error.message;
      }
    });
  }

  return errorMap;
};
