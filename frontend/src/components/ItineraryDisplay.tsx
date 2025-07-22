import { Calendar, Clock, MapPin, Euro, Users, Camera, Utensils, Star, Compass } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Atividade {
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

interface DiaItinerario {
  dia: number;
  tema: string;
  condicoesTempo: string;
  atividades: Atividade[];
  refeicoes: {
    almoco: string;
    jantar: string;
  };
  hospedagem: string;
  logistica: string;
}

interface Itinerario {
  tematicaNarrativa: string;
  resumoExecutivo: string;
  fonteDados: string;
  itinerarioDiario: DiaItinerario[];
  recomendacoesHospedagem: {
    hotelPrincipal: string;
    alternativas: string[];
    justificativa: string;
  };
  experienciasUnicas: string[];
  joiasEscondidas: string[];
  dicasEspecialistas: string[];
  orcamentoDetalhado: {
    transporte: string;
    hospedagem: string;
    alimentacao: string;
    atividades: string;
    total: string;
    observacao: string;
  };
  consideracoesEspeciais: string;
}

interface ItineraryDisplayProps {
  itinerary: Itinerario;
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-medium bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {itinerary.tematicaNarrativa}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {itinerary.resumoExecutivo}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="itinerario" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="itinerario">Itinerário</TabsTrigger>
          <TabsTrigger value="hospedagem">Hospedagem</TabsTrigger>
          <TabsTrigger value="dicas">Dicas & Segredos</TabsTrigger>
          <TabsTrigger value="orcamento">Orçamento</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerario" className="space-y-6">
          {itinerary.itinerarioDiario.map((dia) => (
            <Card key={dia.dia} className="shadow-soft">
              <CardHeader className="bg-travel-blue text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Dia {dia.dia}: {dia.tema}
                </CardTitle>
                <CardDescription className="text-white/90">
                  {dia.condicoesTempo}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  {dia.atividades.map((atividade, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <div className="flex items-start gap-4">
                        <Badge variant="outline" className="text-primary border-primary">
                          <Clock className="h-3 w-3 mr-1" />
                          {atividade.horario}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{atividade.atividade}</h4>
                          <p className="text-muted-foreground flex items-center gap-1 mb-2">
                            <MapPin className="h-4 w-4" />
                            {atividade.local} • {atividade.duracao}
                          </p>
                          
                          <p className="text-sm mb-3">{atividade.motivoPersonalizacao}</p>
                          
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <h5 className="font-medium text-travel-green">Dicas:</h5>
                              <ul className="text-sm space-y-1">
                                {atividade.dicas.map((dica, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Star className="h-3 w-3 text-travel-orange mt-0.5 flex-shrink-0" />
                                    {dica}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-2">
                              <h5 className="font-medium text-travel-purple">Alternativa:</h5>
                              <p className="text-sm">{atividade.alternativas}</p>
                              
                              <div className="flex items-center gap-2 text-sm text-travel-green">
                                <Euro className="h-4 w-4" />
                                {atividade.custoEstimado}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm">
                              <strong>Transporte:</strong> {atividade.transporteSugerido}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-travel-orange" />
                        Almoço
                      </h4>
                      <p className="text-sm">{dia.refeicoes.almoco}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-travel-orange" />
                        Jantar
                      </h4>
                      <p className="text-sm">{dia.refeicoes.jantar}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium mb-1">Logística do Dia:</h5>
                    <p className="text-sm">{dia.logistica}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hospedagem">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-travel-blue" />
                Recomendações de Hospedagem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Hotel Principal:</h4>
                <Badge variant="default" className="mb-2">{itinerary.recomendacoesHospedagem.hotelPrincipal}</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Alternativas:</h4>
                <div className="flex flex-wrap gap-2">
                  {itinerary.recomendacoesHospedagem.alternativas.map((hotel, index) => (
                    <Badge key={index} variant="outline">{hotel}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Justificativa:</h4>
                <p className="text-sm">{itinerary.recomendacoesHospedagem.justificativa}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dicas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-travel-orange" />
                  Experiências Únicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {itinerary.experienciasUnicas.map((exp, index) => (
                    <li key={index} className="text-sm border-l-2 border-travel-orange pl-3">
                      {exp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-travel-green" />
                  Joias Escondidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {itinerary.joiasEscondidas.map((joia, index) => (
                    <li key={index} className="text-sm border-l-2 border-travel-green pl-3">
                      {joia}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-travel-purple" />
                Dicas de Especialistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {itinerary.dicasEspecialistas.map((dica, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{dica}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orcamento">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-travel-green" />
                Orçamento Detalhado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Transporte:</span>
                    <span>{itinerary.orcamentoDetalhado.transporte}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Hospedagem:</span>
                    <span>{itinerary.orcamentoDetalhado.hospedagem}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Alimentação:</span>
                    <span>{itinerary.orcamentoDetalhado.alimentacao}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Atividades:</span>
                    <span>{itinerary.orcamentoDetalhado.atividades}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="text-center">
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  <h3 className="font-bold text-lg">Total Estimado</h3>
                  <p className="text-2xl font-bold">{itinerary.orcamentoDetalhado.total}</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-center">{itinerary.orcamentoDetalhado.observacao}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}