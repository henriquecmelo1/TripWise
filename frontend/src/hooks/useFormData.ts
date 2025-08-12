import { useState, useEffect } from 'react';

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  maxSelections?: number;
  options?: Array<{ value: string; label: string }>;
}

interface FormSection {
  section: string;
  title: string;
  fields: FormField[];
}

interface FormResponse {
  success: boolean;
  form: FormSection[];
  instructions: string;
  estimated_time: string;
}

export const useFormData = () => {
  const [formStructure, setFormStructure] = useState<FormSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormStructure = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/ai/itinerary/form');
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar formulário: ${response.status}`);
        }
        
        const data: FormResponse = await response.json();
        
        if (data.success) {
          setFormStructure(data.form);
        } else {
          throw new Error('Resposta inválida do servidor');
        }
      } catch (err) {
        console.error('Erro ao buscar estrutura do formulário:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormStructure();
  }, []);

  return { formStructure, isLoading, error };
};