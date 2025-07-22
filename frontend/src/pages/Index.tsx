import { useState } from 'react';
import { TripForm, TripFormData } from '@/components/TripForm';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Compass, Calendar } from 'lucide-react';

const Index = () => {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data based on the API response structure for demonstration
  const mockItinerary = {
    tematicaNarrativa: "Lisboa: Sabores, Histórias e Perspectivas – Uma Imersão Sensorial no Coração Lusitano",
    resumoExecutivo: "Este itinerário é uma jornada meticulosamente desenhada para dois entusiastas da cultura e gastronomia, explorando a alma de Lisboa através de suas ruas vibrantes, museus históricos e sabores autênticos.",
    fonteDados: "Simulação baseada em conhecimentos de Lisboa e perfil do viajante",
    itinerarioDiario: [
      {
        dia: 1,
        tema: "Alma Mourisca e Sabor Autêntico de Alfama",
        condicoesTempo: "Agosto em Lisboa: Quente e ensolarado. Previsão de temperatura entre 25-30°C.",
        atividades: [
          {
            horario: "09:00",
            atividade: "Chegada, Check-in e Passeio Matinal por Alfama",
            local: "Bairro de Alfama",
            duracao: "3h",
            motivoPersonalizacao: "Início da imersão cultural no bairro mais antigo e pitoresco de Lisboa, perfeito para fotografia e caminhadas exploratórias.",
            dicas: [
              "Use calçados confortáveis, pois as ruas são íngremes e de paralelepípedos.",
              "Deixe-se perder nas ruelas para encontrar cantos autênticos."
            ],
            alternativas: "Em caso de calor excessivo, inicie mais cedo ou explore o Castelo de São Jorge.",
            custoEstimado: "0 EUR (0 BRL) - Passeio a pé",
            transporteSugerido: "Do aeroporto para o hotel: Metro. Do hotel para Alfama: Caminhada ou elétrico 28E."
          }
        ],
        refeicoes: {
          almoco: "Restaurante 'Pateo 13': Situado em Alfama, oferece pratos portugueses tradicionais em um ambiente acolhedor.",
          jantar: "Restaurante 'A Baiuca': Um clássico para Fado em Alfama, oferece gastronomia portuguesa tradicional com espetáculos de Fado ao vivo."
        },
        hospedagem: "Hotel Lisboa Plaza",
        logistica: "Priorize o transporte a pé para explorar Alfama. Para distâncias maiores, o elétrico 28E é uma experiência em si."
      }
    ],
    recomendacoesHospedagem: {
      hotelPrincipal: "Hotel Lisboa Plaza",
      alternativas: ["Hotel Mundial", "Sana Lisboa Hotel"],
      justificativa: "O Hotel Lisboa Plaza é uma escolha ideal por sua localização central, permitindo fácil acesso às principais atrações."
    },
    experienciasUnicas: [
      "Aula de Culinária Portuguesa: Participe de uma aula prática para aprender a preparar pratos típicos como Bacalhau à Brás.",
      "Passeio de Barco ao Pôr do Sol no Tejo: Desfrute de vistas deslumbrantes da cidade a partir do rio.",
      "Noite de Fado Autêntico: Procure casas de Fado mais intimistas em Alfama ou Bairro Alto."
    ],
    joiasEscondidas: [
      "Jardim Botânico da Ajuda: Um dos jardins botânicos mais antigos de Portugal, oferece tranquilidade e vistas panorâmicas.",
      "Capelas da Rua de São Pedro de Alcântara: Pequenas capelas e miradouros escondidos nas ruas secundárias.",
      "Fábrica da Nata: Oferece pastéis de nata frescos em um ambiente mais moderno e menos lotado."
    ],
    dicasEspecialistas: [
      "Transporte Público: Adquira o cartão 'Viva Viagem' logo na chegada.",
      "Horário das Refeições: Os portugueses almoçam entre 13h e 15h, e jantam entre 20h e 22h.",
      "Calçados Confortáveis: Lisboa é uma cidade de 'sete colinas'. Prepare-se para muitas caminhadas.",
      "Protetor Solar: Em agosto, o sol é forte. Use protetor solar e mantenha-se hidratado."
    ],
    orcamentoDetalhado: {
      transporte: "Aproximadamente 50 EUR (275 BRL) por pessoa",
      hospedagem: "Aproximadamente 120-180 EUR (660-990 BRL) por noite para um hotel de médio porte",
      alimentacao: "Aproximadamente 60-90 EUR (330-495 BRL) por pessoa por dia",
      atividades: "Aproximadamente 80-120 EUR (440-660 BRL) por pessoa",
      total: "Estimativa total para 2 pessoas: 1410 - 2040 EUR (7755 - 11220 BRL)",
      observacao: "Os custos são estimativas baseadas no perfil de 'orçamento moderado'."
    },
    consideracoesEspeciais: "Este itinerário foi desenhado com foco em cultura e gastronomia, ritmo moderado para permitir exploração e fotografia."
  };

  const handleFormSubmit = async (tripData: TripFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, you would call your API here:
      // const response = await fetch('/api/generate-itinerary', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(tripData)
      // });
      // const result = await response.json();
      
      // For demonstration, we'll use the mock data after a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setItinerary(mockItinerary);
      
      toast({
        title: "Itinerário criado com sucesso!",
        description: "Seu itinerário personalizado está pronto para ser explorado.",
      });
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Erro ao criar itinerário",
        description: "Ocorreu um erro ao gerar seu itinerário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setItinerary(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {!itinerary && (
        <div className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Crie Seu Itinerário Perfeito
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Planeje viagens extraordinárias com inteligência artificial. 
              Descubra destinos únicos, experiências autênticas e roteiros personalizados.
            </p>
            
            <div className="flex justify-center gap-8 mt-12">
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                <span>Destinos Únicos</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="h-6 w-6" />
                <span>Roteiros Personalizados</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                <span>Planejamento Inteligente</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!itinerary ? (
          <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={resetForm}
                className="text-primary hover:text-primary-glow underline"
              >
                ← Criar novo itinerário
              </button>
            </div>
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        )}
      </div>

      {/* Features Section */}
      {!itinerary && (
        <div className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Por que escolher nosso planejador?
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center shadow-soft">
                <CardContent className="p-6">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Roteiros Personalizados</h3>
                  <p className="text-muted-foreground">
                    Cada itinerário é único, baseado em suas preferências e estilo de viagem.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-soft">
                <CardContent className="p-6">
                  <Compass className="h-12 w-12 text-travel-orange mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Descobertas Autênticas</h3>
                  <p className="text-muted-foreground">
                    Encontre joias escondidas e experiências únicas que só os locais conhecem.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-soft">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 text-travel-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Planejamento Eficiente</h3>
                  <p className="text-muted-foreground">
                    Otimize seu tempo e orçamento com sugestões inteligentes de logística.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
