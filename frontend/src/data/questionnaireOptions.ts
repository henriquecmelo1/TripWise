// Interface para as opções dos dropdowns
export interface Option {
  value: string;
  label: string;
}

export interface BudgetRange {
  min: number;
  max: number;
}

export const dailyBudgetRanges: { [key: string]: BudgetRange } = {
  'economico': { min: 50, max: 200 },     
  'moderado': { min: 200, max: 500 },    
  'confortavel': { min: 500, max: 800 }, 
  'luxo': { min: 800, max: 2500 },       
};

export const budgetOptions: Option[] = [
  { value: 'economico', label: 'Econômico (R$ 50-200/dia por pessoa)' }, 
  { value: 'moderado', label: 'Moderado (R$ 200-500/dia por pessoa)' },   
  { value: 'confortavel', label: 'Confortável (R$ 500-800/dia por pessoa)' },
  { value: 'luxo', label: 'Luxo (R$ 800+/dia por pessoa)' },
];

export const companionshipOptions: Option[] = [
  { value: 'sozinho', label: 'Sozinho(a)' },
  { value: 'familia', label: 'Com a família' },
  { value: 'amigos', label: 'Com amigos' },
  { value: 'parceiro', label: 'Com parceiro(a)' },
];

export const transportationOptions: Option[] = [
  { value: 'carro', label: 'Carro' },
  { value: 'aviao', label: 'Avião' },
  { value: 'trem', label: 'Trem' },
  { value: 'onibus', label: 'Ônibus' },
];

export const vibeOptions: Option[] = [
  { value: 'romantico', label: 'Romântico' },
  { value: 'animado', label: 'Animado' },
  { value: 'divertido', label: 'Divertido' },
  { value: 'descanso', label: 'Para descanso' },
  { value: 'aventura', label: 'Aventura' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'gastronomico', label: 'Gastronômico' },
];