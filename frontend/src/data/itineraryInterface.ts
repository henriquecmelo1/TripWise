export interface Atividade {
  nome: string;
  descricao: string;
  horario: string;
  atividade: string;
  local: string;
  duracao: string;
  motivoPersonalizacao: string;
  dicas: string[];
  alternativas: string;
  custoEstimado: string;
  transporteSugerido: string;
}

export interface Refeicoes {
  almoco: string;
  jantar: string;
}

export interface ItinerarioDiario {
  dia: number;
  tema: string;
  condicoesTempo: string;
  atividades: Atividade[];
  refeicoes: Refeicoes;
  hospedagem: string;
  logistica: string;
}

export interface RecomendacoesHospedagem {
  hotelPrincipal: string;
  alternativas: string[];
  justificativa: string;
}

export interface OrcamentoDetalhado {
  transporte: string;
  hospedagem: string;
  alimentacao: string;
  atividades: string;
  total: string;
  observacao: string;
}

export interface ItineraryData {
  destino: string;
  duracao: string;
  tematicaNarrativa: string;
  resumoExecutivo: string;
  fonteDados: string;
  itinerarioDiario: ItinerarioDiario[];
  recomendacoesHospedagem: RecomendacoesHospedagem;
  experienciasUnicas: string[];
  joiasEscondidas: string[];
  dicasEspecialistas: string[];
  orcamentoDetalhado: OrcamentoDetalhado;
  consideracoesEspeciais: string;
}

export interface PersonalizedFor {
  userId: string;
  travelDNA: string;
  confidence: number;
}

interface TripDetails {
  destination: string;
  departureLocation: string;
  duration: number;
  startDate: string;
  endDate: string;
  tripType: string;
}

export interface BackendItineraryResponse {
  preferences: any;
  success: boolean;
  itinerary: ItineraryData;
  tripDetails: TripDetails;
  personalizedFor: PersonalizedFor;
  generatedAt: string; // ISO string, e.g., "2025-07-31T23:59:00Z"
  recommendation: string;
}

