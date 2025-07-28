// src/data/mockItineraryResponse.ts

export interface Atividade {
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

export interface BackendItineraryResponse {
  success: boolean;
  itinerary: ItineraryData;
  personalizedFor: {
    userId: string;
    travelDNA: string;
    confidence: number;
  };
  generatedAt: string;
  recommendation: string;
}

// O JSON fornecido na sua pergunta
export const mockItineraryResponse: BackendItineraryResponse = {
  "success": true,
  "itinerary": {
    "tematicaNarrativa": "Lisboa: Sabores, Histórias e Perspectivas – Uma Imersão Sensorial no Coração Lusitano",
    "resumoExecutivo": "Este itinerário é uma jornada meticulosamente desenhada para dois entusiastas da cultura e gastronomia, explorando a alma de Lisboa através de suas ruas vibrantes, museus históricos e sabores autênticos. Com um ritmo moderado e foco na fotografia e caminhadas, cada dia revela uma faceta única da cidade, otimizando o tempo e o orçamento com experiências locais e 'joias' escondidas.",
    "fonteDados": "Simulação baseada em conhecimentos de Lisboa e perfil do viajante, devido à ausência de dados 'reais' de Foursquare/Google Places e Eventbrite no prompt. Taxa de Câmbio Estimada: 1 EUR = 5.50 BRL.",
    "itinerarioDiario": [
      {
        "dia": 1,
        "tema": "Alma Mourisca e Sabor Autêntico de Alfama",
        "condicoesTempo": "Agosto em Lisboa: Quente e ensolarado. Previsão de temperatura entre 25-30°C. Ideal para caminhadas matinais e finais de tarde.",
        "atividades": [
          {
            "horario": "09:00",
            "atividade": "Chegada, Check-in e Passeio Matinal por Alfama",
            "local": "Bairro de Alfama",
            "duracao": "3h",
            "motivoPersonalizacao": "Início da imersão cultural no bairro mais antigo e pitoresco de Lisboa, perfeito para fotografia e caminhadas exploratórias, atendendo ao interesse em cultura e fotografia.",
            "dicas": [
              "Use calçados confortáveis, pois as ruas são íngremes e de paralelepípedos.",
              "Deixe-se perder nas ruelas para encontrar cantos autênticos."
            ],
            "alternativas": "Em caso de calor excessivo, inicie mais cedo ou explore o Castelo de São Jorge (entrada paga) para sombra e vistas panorâmicas.",
            "custoEstimado": "0 EUR (0 BRL) - Passeio a pé",
            "transporteSugerido": "Do aeroporto para o hotel: Metro (linha vermelha até São Sebastião ou Saldanha, depois linha azul/verde dependendo do hotel). Do hotel para Alfama: Caminhada ou elétrico 28E."
          },
          {
            "horario": "15:00",
            "atividade": "Visita ao Castelo de São Jorge e Miradouro de Santa Luzia",
            "local": "Castelo de São Jorge e Miradouro de Santa Luzia (Alfama)",
            "duracao": "2.5h",
            "motivoPersonalizacao": "Combina história, vistas espetaculares (ótimo para fotografia) e um mergulho na herança mourisca da cidade, alinhado aos interesses culturais e fotográficos.",
            "dicas": [
              "Compre ingressos online para evitar filas no Castelo.",
              "Aprecie a vista do Miradouro de Santa Luzia, um dos mais belos de Lisboa."
            ],
            "alternativas": "Se o Castelo estiver muito lotado, explore mais miradouros em Alfama (ex: Miradouro das Portas do Sol) e a Sé de Lisboa.",
            "custoEstimado": "10 EUR (55 BRL) por pessoa (Castelo de São Jorge)",
            "transporteSugerido": "Caminhada a partir do centro de Alfama, ou elétrico 28E."
          }
        ],
        "refeicoes": {
          "almoco": "Restaurante 'Pateo 13' (simulado): Situado em Alfama, oferece pratos portugueses tradicionais em um ambiente acolhedor, com uma esplanada charmosa. Perfeito para uma refeição autêntica após as caminhadas matinais, alinhado ao interesse em gastronomia e atmosfera local.",
          "jantar": "Restaurante 'A Baiuca' (simulado): Um clássico para Fado em Alfama, oferece gastronomia portuguesa tradicional enquanto os clientes desfrutam de espetáculos de Fado ao vivo. Experiência cultural e gastronômica imperdível, embora com custo um pouco mais elevado devido ao show."
        },
        "hospedagem": "Hotel Lisboa Plaza (simulado): Ver seção 'Recomendações de Hospedagem' para justificativa detalhada.",
        "logistica": "Priorize o transporte a pé para explorar Alfama. Para distâncias maiores, o elétrico 28E é uma experiência em si, mas pode ser concorrido. Use apps de ride-sharing para mais conforto à noite. Considere comprar o 'Viva Viagem' card recarregável para transporte público."
      },
      {
        "dia": 2,
        "tema": "A Glória Marítima de Belém e a Arte à Beira Tejo",
        "condicoesTempo": "Manhã fresca, esquentando ao longo do dia. Previsão de brisa do rio Tejo à tarde, tornando a exploração agradável.",
        "atividades": [
          {
            "horario": "09:00",
            "atividade": "Torre de Belém e Padrão dos Descobrimentos",
            "local": "Belém",
            "duracao": "2.5h",
            "motivoPersonalizacao": "Exploração dos ícones marítimos de Portugal, perfeito para fotografia e para entender a história das grandes navegações, satisfazendo os interesses culturais e fotográficos.",
            "dicas": [
              "Chegue cedo para evitar as multidões, especialmente na Torre de Belém.",
              "Reserve tempo para apreciar a arquitetura e as esculturas detalhadas."
            ],
            "alternativas": "Se a Torre de Belém estiver com filas muito longas, passe mais tempo no Padrão e nos jardins circundantes, ou faça um passeio de barco no Tejo para vistas diferentes.",
            "custoEstimado": "8 EUR (44 BRL) por pessoa (Torre de Belém)",
            "transporteSugerido": "Elétrico 15E (partindo da Praça da Figueira) ou autocarro (ônibus) para Belém. Cerca de 30-40 minutos de trajeto."
          },
          {
            "horario": "14:00",
            "atividade": "Mosteiro dos Jerónimos e Pastel de Belém",
            "local": "Belém",
            "duracao": "3h",
            "motivoPersonalizacao": "Continuação da imersão histórica e arquitetônica com um dos mais belos exemplares do estilo manuelino, culminando com a degustação do icônico doce português, alinhando cultura, fotografia e gastronomia.",
            "dicas": [
              "A entrada na igreja do Mosteiro é gratuita; para o claustro, há uma taxa. A fila para o claustro pode ser longa.",
              "Não deixe de provar o Pastel de Belém quentinho na confeitaria original, mesmo que a fila seja grande (vale a pena!)."
            ],
            "alternativas": "Em vez do Mosteiro (se lotado), visite o Museu Nacional de Arqueologia ou o Museu da Marinha, ambos próximos.",
            "custoEstimado": "10 EUR (55 BRL) por pessoa (Mosteiro - Claustro) + 2 EUR (11 BRL) por Pastel de Belém.",
            "transporteSugerido": "Caminhada em Belém, as atrações são próximas umas das outras."
          }
        ],
        "refeicoes": {
          "almoco": "Restaurante 'Feitoria' (simulado - fine dining, mas com opções de almoço mais acessíveis): Embora seja um restaurante de luxo, muitos oferecem menus de almoço executivos mais acessíveis. Permite uma experiência gastronômica de alto nível em Belém. Perfeito para o interesse em culinária sofisticada, mesmo dentro de um orçamento moderado para o almoço.",
          "jantar": "Restaurante 'Solar dos Presuntos' (simulado): Um clássico lisboeta que serve pratos portugueses autênticos e de alta qualidade, famoso por seus embutidos e bacalhau. Embora um pouco mais caro, é um investimento na gastronomia local, ideal para um jantar memorável e que os viajantes apreciam gastronomia."
        },
        "hospedagem": "Hotel Lisboa Plaza (simulado).",
        "logistica": "O elétrico 15E é eficiente para chegar a Belém. Dentro de Belém, é tudo a pé. Considere comprar um 'Lisboa Card' se planejar visitar muitos museus e usar transporte público intensivamente, mas para 5 dias e ritmo moderado, pode não compensar totalmente."
      },
      {
        "dia": 3,
        "tema": "A Elegância do Centro e a Autenticidade do Bairro Alto",
        "condicoesTempo": "Quente e ensolarado. Perfeito para explorar as praças abertas e ruas movimentadas do centro.",
        "atividades": [
          {
            "horario": "09:00",
            "atividade": "Praça do Comércio, Rua Augusta e Elevador de Santa Justa",
            "local": "Baixa e Chiado",
            "duracao": "3h",
            "motivoPersonalizacao": "Exploração do coração vibrante de Lisboa, com arquitetura pombalina, vistas panorâmicas (Elevador) e oportunidades para fotografia, alinhando-se aos interesses em cultura, caminhadas e fotografia.",
            "dicas": [
              "Suba ao topo do Arco da Rua Augusta para vistas incríveis da Praça do Comércio.",
              "A fila para o Elevador de Santa Justa pode ser longa; considere subir e descer a pé ou usar o acesso pela Rua do Carmo (mais rápido para a plataforma de vista)."
            ],
            "alternativas": "Em vez do Elevador, suba a pé pela Calçada do Carmo até o Largo do Carmo e as ruínas da igreja, igualmente interessante e com menos fila.",
            "custoEstimado": "3 EUR (16.5 BRL) (Arco da Rua Augusta) ou 5.30 EUR (29.15 BRL) (Elevador Sta. Justa - ida e volta, incluído no passe Viva Viagem se usar).",
            "transporteSugerido": "Caminhada a partir do hotel (se central) ou Metro para as estações Rossio/Baixa-Chiado."
          },
          {
            "horario": "14:30",
            "atividade": "Museu Nacional de Arte Antiga (MNAA)",
            "local": "Santos",
            "duracao": "3h",
            "motivoPersonalizacao": "Uma imersão profunda na arte portuguesa e europeia, ideal para os amantes de museus, oferecendo uma coleção rica e um ambiente mais tranquilo, longe das multidões do centro.",
            "dicas": [
              "Verifique os horários de funcionamento e dias de encerramento (geralmente segundas-feiras).",
              "Aproveite o jardim e a vista do Tejo do café do museu."
            ],
            "alternativas": "Se preferir uma experiência de arte mais moderna, visite o Museu Coleção Berardo em Belém ou o MAAT (Museu de Arte, Arquitetura e Tecnologia).",
            "custoEstimado": "10 EUR (55 BRL) por pessoa",
            "transporteSugerido": "Autocarro (ônibus) da Praça do Comércio ou ride-sharing até Santos."
          }
        ],
        "refeicoes": {
          "almoco": "Restaurante 'Cantinho do Avillez' (simulado): Do chef José Avillez, oferece cozinha portuguesa contemporânea em um ambiente descontraído. Excelente para os amantes da culinária que buscam algo além do tradicional, mas ainda autêntico, com opções para um orçamento moderado no almoço.",
          "jantar": "Restaurante 'Taberna da Rua das Flores' (simulado): Um restaurante pequeno e autêntico no Chiado, que serve pratos portugueses com um toque moderno. Menu focado em produtos frescos e da estação. Perfeito para uma experiência gastronômica íntima e de alta qualidade, sem ser excessivamente formal."
        },
        "hospedagem": "Hotel Lisboa Plaza (simulado).",
        "logistica": "O centro da cidade é altamente caminhável. O Metro é a melhor opção para se deslocar entre as áreas da Baixa, Chiado e o museu. À noite, o Bairro Alto é facilmente acessível a pé ou por elevadores (Bica, Glória) ou funiculares."
      },
      {
        "dia": 4,
        "tema": "Vistas Panorâmicas, Arte Urbana e Vibe Alternativa",
        "condicoesTempo": "Quente e ensolarado. Perfeito para explorar miradouros e a área ribeirinha.",
        "atividades": [
          {
            "horario": "09:30",
            "atividade": "Miradouros de Graça e Senhora do Monte",
            "local": "Graça e São Vicente de Fora",
            "duracao": "2.5h",
            "motivoPersonalizacao": "Oferecem algumas das vistas mais espetaculares de Lisboa, ideais para fotografia e para ter uma perspectiva abrangente da cidade. Ótimas oportunidades para caminhadas em bairros históricos.",
            "dicas": [
              "O Miradouro da Senhora do Monte é conhecido por ter a melhor vista panorâmica, e é mais calmo.",
              "Suba de elétrico 28E ou ride-sharing para poupar as pernas, ou desfrute da caminhada desafiadora."
            ],
            "alternativas": "Se preferir menos subidas, explore os miradouros mais acessíveis no centro, como o de São Pedro de Alcântara ou o do Jardim do Torel.",
            "custoEstimado": "0 EUR (0 BRL) - Miradouros, apenas custo de transporte se não for a pé.",
            "transporteSugerido": "Elétrico 28E (se não muito lotado), Autocarro 734, ou ride-sharing até o topo da colina."
          },
          {
            "horario": "14:00",
            "atividade": "LX Factory e Arte Urbana",
            "local": "Alcântara",
            "duracao": "3h",
            "motivoPersonalizacao": "Uma experiência contrastante com a Lisboa histórica, a LX Factory é um polo de criatividade, arte urbana, lojas independentes e gastronomia, perfeita para fotografia e exploração de um lado mais moderno e alternativo da cidade. Ideal para o perfil que aprecia o lado criativo e urbano.",
            "dicas": [
              "Explore as lojas e galerias de arte únicas.",
              "Suba ao topo da Livraria Ler Devagar para uma vista do espaço."
            ],
            "alternativas": "Se o ambiente industrial não agradar, visite o Museu Calouste Gulbenkian, com uma vasta coleção de arte e jardins tranquilos.",
            "custoEstimado": "0 EUR (0 BRL) - Entrada na LX Factory, apenas gastos com compras/consumo.",
            "transporteSugerido": "Autocarro (ônibus) 714, 727, 732, ou comboio (trem) até a estação Alcântara-Mar. Ride-sharing é conveniente."
          }
        ],
        "refeicoes": {
          "almoco": "Restaurante 'Rio Maravilha' (simulado): Localizado na LX Factory, oferece pratos variados e criativos com uma vista espetacular da Ponte 25 de Abril e do Cristo Rei. Ambiente descontraído e fotogênico, perfeito para a atmosfera do dia.",
          "jantar": "Restaurante 'Cervejaria Ramiro' (simulado): Famosa marisqueira em Lisboa, um ícone da gastronomia local. Ambiente animado e frutos do mar frescos de alta qualidade. Essencial para os amantes da culinária que desejam experimentar os melhores mariscos de Lisboa, uma experiência gastronômica autêntica e inesquecível."
        },
        "hospedagem": "Hotel Lisboa Plaza (simulado).",
        "logistica": "Use transporte público (autocarros) ou ride-sharing para se deslocar para os miradouros e para a LX Factory, que estão em áreas mais distantes. O comboio é rápido para a LX Factory a partir de Cais do Sodré."
      },
      {
        "dia": 5,
        "tema": "Modernidade, Jardins e Despedida com Sabor",
        "condicoesTempo": "Quente e ensolarado. Ideal para explorar áreas abertas e relaxar antes da partida.",
        "atividades": [
          {
            "horario": "09:30",
            "atividade": "Parque das Nações e Oceanário de Lisboa",
            "local": "Parque das Nações",
            "duracao": "4h",
            "motivoPersonalizacao": "Exploração da Lisboa moderna, com arquitetura contemporânea e um dos maiores aquários da Europa, alinhado aos interesses culturais (modernidade), caminhadas (pela orla do Tejo) e uma experiência única de museu (Oceanário).",
            "dicas": [
              "O Oceanário é imperdível, um dos melhores do mundo. Compre ingressos online.",
              "Passeie pela orla, aprecie as obras de arte pública e o teleférico para vistas elevadas."
            ],
            "alternativas": "Se não for fã de aquários, passe mais tempo explorando os jardins do Parque das Nações, o Centro Vasco da Gama (compras) ou faça um passeio de teleférico para vistas panorâmicas do rio.",
            "custoEstimado": "22 EUR (121 BRL) por pessoa (Oceanário) + 6 EUR (33 BRL) por pessoa (Teleférico, opcional).",
            "transporteSugerido": "Metro (linha vermelha) até a estação Oriente. Rápido e eficiente."
          },
          {
            "horario": "15:00",
            "atividade": "Últimas Compras e Despedida na Baixa-Chiado",
            "local": "Baixa e Chiado",
            "duracao": "2.5h",
            "motivoPersonalizacao": "Oportunidade para comprar lembranças, desfrutar de um último café ou pastelaria e revisitar um local favorito, ideal para encerrar a viagem com calma e um toque final de sabor.",
            "dicas": [
              "Explore as lojas de produtos portugueses (conservas, cortiça, cerâmica).",
              "Experimente mais um 'Pastel de Nata' ou 'Bolo de Arroz' em uma pastelaria local."
            ],
            "alternativas": "Se o voo for muito cedo, ou preferir relaxar, reserve este tempo para um SPA ou uma sessão de fotos final em um miradouro favorito.",
            "custoEstimado": "Variável, conforme compras e lanches.",
            "transporteSugerido": "Metro da Estação Oriente para Baixa-Chiado."
          }
        ],
        "refeicoes": {
          "almoco": "Restaurante 'Honorato Chiado' (simulado): Um restaurante com conceito de 'brasserie' moderna, com pratos portugueses e internacionais em um ambiente descontraído. Bom para um almoço variado e rápido antes do Oceanário.",
          "jantar": "Restaurante 'O Prado' (simulado): Focado em 'farm-to-table', oferece pratos criativos com ingredientes sazonais e orgânicos. Ótima opção para uma despedida gastronômica que valoriza a qualidade e a sustentabilidade, perfeito para um paladar mais refinado e que aprecia a inovação na culinária."
        },
        "hospedagem": "Hotel Lisboa Plaza (simulado).",
        "logistica": "O Metro é o meio mais eficiente para se deslocar entre o Parque das Nações e o centro. Mantenha os bilhetes 'Viva Viagem' carregados para facilitar os deslocamentos. Programe o transporte para o aeroporto com antecedência."
      }
    ],
    "recomendacoesHospedagem": {
      "hotelPrincipal": "Hotel Lisboa Plaza (simulado)",
      "alternativas": [
        "Hotel Mundial (simulado)",
        "Sana Lisboa Hotel (simulado)"
      ],
      "justificativa": "O **Hotel Lisboa Plaza** (simulado) é uma escolha ideal por sua localização central (próximo à Av. da Liberdade/Chiado), permitindo fácil acesso a pé e via transporte público às principais atrações. É um hotel de médio porte, com serviço de qualidade, quartos confortáveis e uma atmosfera charmosa que se alinha perfeitamente ao perfil de hóspede que busca conforto e boa localização. O **Hotel Mundial** (simulado) é outra ótima opção central na Praça do Rossio, conhecido por suas vistas panorâmicas do rooftop. O **Sana Lisboa Hotel** (simulado) oferece modernidade e conforto, um pouco mais afastado do centro histórico mas com excelente acesso por metro, e pode oferecer uma melhor relação custo-benefício para quem não se importa em usar o transporte público. Todos se encaixam no orçamento moderado e oferecem comodidades adequadas para lazer."
    },
    "experienciasUnicas": [
      "**Aula de Culinária Portuguesa:** Participe de uma aula prática para aprender a preparar pratos típicos como Bacalhau à Brás ou Cataplana, culminando na degustação. Existem várias escolas que oferecem isso no centro de Lisboa.",
      "**Passeio de Barco ao Pôr do Sol no Tejo:** Desfrute de vistas deslumbrantes da cidade a partir do rio, com a Ponte 25 de Abril e o Cristo Rei iluminados, uma experiência fotográfica e relaxante.",
      "**Noite de Fado Autêntico:** Além dos restaurantes turísticos, procure casas de Fado mais intimistas em Alfama ou Bairro Alto, onde a música é a verdadeira estrela e a experiência é mais genuína (ex: Mesa de Frades, Tasca do Chico)."
    ],
    "joiasEscondidas": [
      "**Jardim Botânico da Ajuda:** Um dos jardins botânicos mais antigos de Portugal, menos visitado que outros, oferece tranquilidade e vistas panorâmicas sobre o Tejo, ótimo para fotografia.",
      "**Capelas da Rua de São Pedro de Alcântara:** Pequenas capelas e miradouros escondidos nas ruas secundárias do Príncipe Real/Bairro Alto, que oferecem vistas inesperadas e fotos únicas.",
      "**Fábrica da Nata (em vez de só Pastel de Belém):** Embora o Pastel de Belém seja icônico, a Fábrica da Nata oferece pastéis de nata frescos e deliciosos em um ambiente mais moderno e menos lotado, com a possibilidade de ver a produção."
    ],
    "dicasEspecialistas": [
      "**Transporte Público:** Adquira o cartão 'Viva Viagem' logo na chegada e carregue-o com dinheiro ou passes diários. É válido para metro, autocarros, elétricos e comboios.",
      "**Horário das Refeições:** Os portugueses almoçam entre 13h e 15h, e jantam entre 20h e 22h. Se quiser evitar filas nos restaurantes populares, tente ir um pouco antes ou depois.",
      "**Calçados Confortáveis:** Lisboa é uma cidade de 'sete colinas'. Prepare-se para muitas caminhadas e subidas, então sapatos confortáveis são essenciais.",
      "**Protetor Solar e Hidratação:** Em agosto, o sol é forte. Use protetor solar, óculos de sol, chapéu e mantenha-se hidratado bebendo bastante água.",
      "**Gorjetas:** Não é obrigatório dar gorjeta em Portugal, mas arredondar a conta ou deixar 5-10% é comum em restaurantes se o serviço for bom. Em cafés, umas moedas são apreciadas."
    ],
    "orcamentoDetalhado": {
      "transporte": "Aproximadamente 50 EUR (275 BRL) por pessoa (incluindo cartão Viva Viagem e algumas viagens de ride-sharing, excluindo voos intercontinentais).",
      "hospedagem": "Aproximadamente 120-180 EUR (660-990 BRL) por noite para um hotel de médio porte central (240-360 EUR para duas pessoas), totalizando 600-900 EUR (3300-4950 BRL) para 5 noites para 2 pessoas.",
      "alimentacao": "Aproximadamente 60-90 EUR (330-495 BRL) por pessoa por dia, incluindo café da manhã, almoço, jantar e lanches (média de 120-180 EUR para 2 pessoas/dia). Total 600-900 EUR (3300-4950 BRL) para 2 pessoas em 5 dias.",
      "atividades": "Aproximadamente 80-120 EUR (440-660 BRL) por pessoa, dependendo dos museus e shows (160-240 EUR para 2 pessoas).",
      "total": "Estimativa total para 2 pessoas (excluindo voos): 1410 - 2040 EUR (7755 - 11220 BRL).",
      "observacao": "Os custos de alimentação e atividades são flexíveis e podem variar significativamente com as escolhas pessoais. Os valores são estimativas baseadas no perfil de 'orçamento moderado'."
    },
    "consideracoesEspeciais": "Este itinerário foi desenhado com o perfil do viajante em mente: foco em cultura e gastronomia, ritmo moderado para permitir exploração e fotografia, e preferência por caminhadas e transporte público. A escolha dos 'restaurantes' e 'hotéis' simulados reflete o desejo por experiências autênticas e de qualidade dentro de um orçamento moderado e localização central. As sugestões de transporte priorizam a otimização do tempo e a imersão na cidade. Em agosto, Lisboa é vibrante mas quente e com muitos turistas; a estratégia de iniciar cedo algumas atividades e priorizar interiores nos horários de pico de calor é fundamental. A ausência de 'dados em tempo real' ou 'listas reais' de hotéis/restaurantes no prompt foi contornada com simulações baseadas no meu conhecimento de Lisboa e no perfil do viajante, buscando representar o tipo de local que o usuário apreciaria, o que foi explicitado nas seções relevantes."
  },
  "personalizedFor": {
    "userId": "user_teste_123",
    "travelDNA": "gastronomico_gourmet",
    "confidence": 0.65
  },
  "generatedAt": "2025-07-20T22:09:11.146Z",
  "recommendation": "Itinerário otimizado baseado no seu perfil único de viagem"
};