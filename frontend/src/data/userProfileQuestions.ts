// src/data/userProfileQuestions.ts

// Interfaces para os diferentes tipos de pergunta
export interface QuestionOption {
  value: string;
  label: string;
}

export interface ScaleDetails {
  min: number;
  max: number;
  labels: string[];
}

export interface Question {
  id: string;
  type: "multiple_choice" | "scale" | "multiple_select";
  question: string;
  options?: QuestionOption[]; // Para multiple_choice e multiple_select
  scale?: ScaleDetails;       // Para scale
  maxSelections?: number;     // Para multiple_select
}

export const userProfileQuestions: Question[] = [
  {
    "id": "travel_motivation",
    "type": "multiple_choice",
    "question": "O que mais te motiva a viajar?",
    "options": [
      {
        "value": "relaxamento",
        "label": "Relaxar e descansar"
      },
      {
        "value": "aventura",
        "label": "Viver aventuras e experiências únicas"
      },
      {
        "value": "cultura",
        "label": "Conhecer culturas e história"
      },
      {
        "value": "gastronomia",
        "label": "Explorar a culinária local"
      },
      {
        "value": "natureza",
        "label": "Conectar-se com a natureza"
      },
      {
        "value": "social",
        "label": "Conhecer pessoas e socializar"
      }
    ]
  },
  {
    "id": "budget_preference",
    "type": "scale",
    "question": "Como você classifica seu orçamento típico para viagens?",
    "scale": {
      "min": 1,
      "max": 5,
      "labels": [
        "Muito econômico",
        "Econômico",
        "Moderado",
        "Confortável",
        "Luxuoso"
      ]
    }
  },
  {
    "id": "accommodation_type",
    "type": "multiple_choice",
    "question": "Que tipo de acomodação você prefere?",
    "options": [
      {
        "value": "hostel",
        "label": "Hostel ou albergue"
      },
      {
        "value": "hotel_economico",
        "label": "Hotel econômico"
      },
      {
        "value": "hotel_medio",
        "label": "Hotel de categoria média"
      },
      {
        "value": "hotel_luxo",
        "label": "Hotel de luxo"
      },
      {
        "value": "pousada",
        "label": "Pousada local"
      },
      {
        "value": "airbnb",
        "label": "Airbnb ou casa alugada"
      },
      {
        "value": "resort",
        "label": "Resort all-inclusive"
      }
    ]
  },
  {
    "id": "activity_preferences",
    "type": "multiple_select",
    "question": "Que tipos de atividades mais te interessam? (selecione até 5)",
    "maxSelections": 5,
    "options": [
      {
        "value": "museus",
        "label": "Museus e galerias"
      },
      {
        "value": "monumentos",
        "label": "Monumentos históricos"
      },
      {
        "value": "trilhas",
        "label": "Trilhas e caminhadas"
      },
      {
        "value": "praias",
        "label": "Praias e atividades aquáticas"
      },
      {
        "value": "vida_noturna",
        "label": "Vida noturna e entretenimento"
      },
      {
        "value": "shopping",
        "label": "Shopping e compras"
      },
      {
        "value": "esportes",
        "label": "Esportes e atividades físicas"
      },
      {
        "value": "spa",
        "label": "Spa e bem-estar"
      },
      {
        "value": "fotografia",
        "label": "Fotografia e paisagens"
      },
      {
        "value": "culinaria",
        "label": "Experiências gastronômicas"
      },
      {
        "value": "festivais",
        "label": "Festivais e eventos culturais"
      },
      {
        "value": "natureza",
        "label": "Parques naturais e vida selvagem"
      }
    ]
  },
  {
    "id": "travel_pace",
    "type": "multiple_choice",
    "question": "Qual seu ritmo preferido de viagem?",
    "options": [
      {
        "value": "relaxed",
        "label": "Relaxado - poucas atividades por dia"
      },
      {
        "value": "moderate",
        "label": "Moderado - equilíbrio entre atividades e descanso"
      },
      {
        "value": "active",
        "label": "Ativo - muitas atividades e experiências"
      },
      {
        "value": "intensive",
        "label": "Intensivo - aproveitar ao máximo cada momento"
      }
    ]
  },
  {
    "id": "planning_style",
    "type": "multiple_choice",
    "question": "Como você prefere planejar suas viagens?",
    "options": [
      {
        "value": "detalhado",
        "label": "Planejamento detalhado com horários fixos"
      },
      {
        "value": "estruturado",
        "label": "Estrutura básica com flexibilidade"
      },
      {
        "value": "flexivel",
        "label": "Planejamento flexível e adaptável"
      },
      {
        "value": "espontaneo",
        "label": "Espontâneo - decidir na hora"
      }
    ]
  },
  {
    "id": "group_preference",
    "type": "multiple_choice",
    "question": "Com quantas pessoas você costuma viajar?",
    "options": [
      {
        "value": "solo",
        "label": "Sozinho(a)"
      },
      {
        "value": "casal",
        "label": "Em casal"
      },
      {
        "value": "familia_pequena",
        "label": "Família pequena (3-4 pessoas)"
      },
      {
        "value": "familia_grande",
        "label": "Família grande (5+ pessoas)"
      },
      {
        "value": "amigos_pequeno",
        "label": "Grupo pequeno de amigos (2-4)"
      },
      {
        "value": "amigos_grande",
        "label": "Grupo grande de amigos (5+)"
      }
    ]
  },
  {
    "id": "food_restrictions",
    "type": "multiple_select",
    "question": "Você tem alguma restrição alimentar?",
    "options": [
      {
        "value": "nenhuma",
        "label": "Nenhuma restrição"
      },
      {
        "value": "vegetariano",
        "label": "Vegetariano"
      },
      {
        "value": "vegano",
        "label": "Vegano"
      },
      {
        "value": "sem_gluten",
        "label": "Sem glúten"
      },
      {
        "value": "sem_lactose",
        "label": "Sem lactose"
      },
      {
        "value": "halal",
        "label": "Halal"
      },
      {
        "value": "kosher",
        "label": "Kosher"
      },
      {
        "value": "hindu",
        "label": "Hindu/Jainista"
      },
      {
        "value": "budista",
        "label": "Budista"
      },
      {
        "value": "alergias",
        "label": "Alergias específicas (especificar depois)"
      }
    ]
  },
  {
    "id": "transport_preference",
    "type": "multiple_select",
    "question": "Que meios de transporte você prefere?",
    "options": [
      {
        "value": "aviao",
        "label": "Avião"
      },
      {
        "value": "carro_proprio",
        "label": "Carro próprio"
      },
      {
        "value": "carro_alugado",
        "label": "Carro alugado"
      },
      {
        "value": "transporte_publico",
        "label": "Transporte público"
      },
      {
        "value": "uber_taxi",
        "label": "Uber/Táxi"
      },
      {
        "value": "bicicleta",
        "label": "Bicicleta"
      },
      {
        "value": "caminhada",
        "label": "Caminhada"
      },
      {
        "value": "trem",
        "label": "Trem"
      },
      {
        "value": "onibus",
        "label": "Ônibus"
      }
    ]
  },
  {
    "id": "flexibility_level",
    "type": "scale",
    "question": "Quão flexível você é com mudanças de planos?",
    "scale": {
      "min": 1,
      "max": 5,
      "labels": [
        "Nada flexível",
        "Pouco flexível",
        "Moderadamente flexível",
        "Muito flexível",
        "Totalmente flexível"
      ]
    }
  },
  {
    "id": "sustainability_importance",
    "type": "scale",
    "question": "Qual a importância da sustentabilidade em suas viagens?",
    "scale": {
      "min": 1,
      "max": 5,
      "labels": [
        "Não é importante",
        "Pouco importante",
        "Moderadamente importante",
        "Muito importante",
        "Extremamente importante"
      ]
    }
  },
  {
    "id": "authentic_experiences",
    "type": "multiple_choice",
    "question": "Que tipo de experiências autênticas mais te atrai?",
    "options": [
      {
        "value": "locais_escondidos",
        "label": "Locais escondidos e menos conhecidos"
      },
      {
        "value": "interacao_locais",
        "label": "Interação genuína com moradores locais"
      },
      {
        "value": "tradicoes_culturais",
        "label": "Tradições e festivais culturais"
      },
      {
        "value": "artesanato_local",
        "label": "Artesanato e produtos locais únicos"
      },
      {
        "value": "culinaria_tradicional",
        "label": "Culinária tradicional e familiar"
      },
      {
        "value": "historia_oral",
        "label": "História oral e narrativas locais"
      }
    ]
  },
  {
    "id": "technology_comfort",
    "type": "scale",
    "question": "Quão confortável você é com tecnologia durante viagens?",
    "scale": {
      "min": 1,
      "max": 5,
      "labels": [
        "Prefiro métodos tradicionais",
        "Uso básico de tecnologia",
        "Confortável com apps essenciais",
        "Usuário avançado de tecnologia",
        "Early adopter - adoro novidades"
      ]
    }
  }
];