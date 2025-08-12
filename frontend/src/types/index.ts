// Interfaces para Travel Tips
export interface TravelTip {
  id: string;
  title: string;
  description: string;
  category: string;
  important: boolean;
}

export interface TipCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

// Interfaces para Explore Destinations
export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  bestTime: string;
  budget: "low" | "medium" | "high";
  type: string[];
  highlights: string[];
  climate: string;
  image: string;
  rating: number;
  popularActivities: string[];
}

export interface FilterOption {
  id: string;
  name: string;
  icon?: string;
}

// Types para filtros de orçamento
export type BudgetType = "low" | "medium" | "high";

// Types para continentes
export type ContinentType = "europe" | "asia" | "africa" | "america-north" | "america-south" | "oceania";

// Types para tipos de viagem
export type TravelType = "culture" | "beach" | "adventure" | "nature" | "city" | "relaxation";

// Interface para informações de orçamento
export interface BudgetInfo {
  label: string;
  color: string;
}

// Interface para props de componentes de filtro
export interface FilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label: string;
  placeholder?: string;
}

// Interface para estado de busca e filtros
export interface SearchFilters {
  searchTerm: string;
  selectedContinent: string;
  selectedBudget: string;
  selectedType: string;
  selectedCategory: string;
}

// Constantes para mapeamento de dados
export const BUDGET_LABELS: Record<BudgetType, BudgetInfo> = {
  low: { label: "Econômico", color: "text-green-600 dark:text-green-400" },
  medium: { label: "Moderado", color: "text-yellow-600 dark:text-yellow-400" },
  high: { label: "Premium", color: "text-red-600 dark:text-red-400" },
};

export const CONTINENT_LABELS: Record<ContinentType, string> = {
  europe: "Europa",
  asia: "Ásia",
  africa: "África",
  "america-north": "América do Norte",
  "america-south": "América do Sul",
  oceania: "Oceania",
};

export const TRAVEL_TYPE_LABELS: Record<TravelType, string> = {
  culture: "Cultural",
  beach: "Praia",
  adventure: "Aventura",
  nature: "Natureza",
  city: "Cidade",
  relaxation: "Relaxamento",
};