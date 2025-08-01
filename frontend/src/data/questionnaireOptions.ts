// Interface para as opções dos dropdowns
export interface Option {
  value: string;
  label: string;
}

export interface BudgetRange {
  min: number;
  max: number;
}

export const tripTypeOptions: Option[] = [
  { value: "lazer", label: "Lazer/Turismo" },
  { value: "romantico", label: "Romântica" },
  { value: "aventura", label: "Aventura" },
  { value: "negócios", label: "Negócios" },
  { value: "família", label: "Família" },
  { value: "solo", label: "Solo" },
];


export const budgetOptions: Option[] = [
  {value: "economico", label: "Econômico - Até R$ 2.000"},
  {value: "moderado", label: "Moderado - R$ 2.000 a R$ 5.000"},
  {value: "confortavel", label: "Confortável - R$ 5.000 a R$ 10.000"},
  {value: "premium", label: "Premium - Acima de R$ 10.000"},
];

export const accommodationOptions: Option[] = [
  { value: "hostel", label: "Hostel/Albergue" },
  { value: "hotel_economico", label: "Hotel Econômico" },
  { value: "hotel_medio", label: "Hotel Categoria Média" },
  { value: "hotel_luxo", label: "Hotel de Luxo" },
  { value: "pousada", label: "Pousada" },
  { value: "airbnb", label: "Airbnb/Casa" },
  { value: "resort", label: "Resort" },
];

export const activityInterestsOptions: Option[] = [
  //multiselect
  { value: "cultura", label: "Cultura e História" },
  { value: "gastronomia", label: "Gastronomia" },
  { value: "aventura", label: "Aventura e Esportes" },
  { value: "natureza", label: "Natureza e Paisagens" },
  { value: "relaxamento", label: "Relaxamento e Bem-estar" },
  { value: "vida_noturna", label: "Vida Noturna" },
  { value: "shopping", label: "Compras" },
  { value: "arte", label: "Arte e Museus" },
  { value: "fotografia", label: "Fotografia" },
  { value: "festivais", label: "Festivais e Eventos" },
];

export const travelPaceOptions: Option[] = [
  { value: "relaxado", label: "Relaxado - Poucas atividades por dia" },
  { value: "moderado", label: "Moderado - Equilíbrio" },
  { value: "ativo", label: "Ativo - Muitas atividades" },
  { value: "intensivo", label: "Intensivo - Máximo aproveitamento" },
];

export const foodRestrictionsOptions: Option[] = [
  // multiselect
  { value: "nenhuma", label: "Nenhuma restrição" },
  { value: "vegetariano", label: "Vegetariano" },
  { value: "vegano", label: "Vegano" },
  { value: "sem_gluten", label: "Sem glúten" },
  { value: "sem_lactose", label: "Sem lactose" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
];


export const transportationOptions: Option[] = [
  // multiselect
  { value: "caminhada", label: "Caminhada" },
  { value: "transporte_publico", label: "Transporte Público" },
  { value: "taxi_uber", label: "Táxi/Uber" },
  { value: "carro_alugado", label: "Carro Alugado" },
  { value: "bicicleta", label: "Bicicleta" },
  { value: "trem", label: "Trem" },
];

export const experienceTypeOptions: Option[] = [
  { value: "turistico", label: "Pontos turísticos principais" },
  { value: "autentico", label: "Experiências autênticas locais" },
  { value: "misto", label: "Mistura de ambos" },
  { value: "off_beaten", label: "Locais pouco conhecidos" },
];


