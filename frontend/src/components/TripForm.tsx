import { useState } from 'react';
import { Calendar, MapPin, Users, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TripFormProps {
  onSubmit: (tripData: TripFormData) => void;
  isLoading?: boolean;
}

export interface TripFormData {
  userId: string;
  tripDetails: {
    destination: string;
    duration: number;
    startDate: string;
    endDate: string;
    travelers: number;
    tripType: string;
  };
}

const tripTypes = [
  { value: 'lazer', label: 'Lazer' },
  { value: 'negocios', label: 'Negócios' },
  { value: 'aventura', label: 'Aventura' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'gastronomico', label: 'Gastronômico' },
  { value: 'romantico', label: 'Romântico' },
];

export function TripForm({ onSubmit, isLoading = false }: TripFormProps) {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 5,
    startDate: '',
    endDate: '',
    travelers: 2,
    tripType: 'lazer'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tripData: TripFormData = {
      userId: `user_${Date.now()}`,
      tripDetails: formData
    };
    
    onSubmit(tripData);
  };

  const handleStartDateChange = (startDate: string) => {
    setFormData(prev => {
      const newData = { ...prev, startDate };
      
      // Auto-calculate end date based on duration
      if (startDate && prev.duration) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + prev.duration - 1);
        newData.endDate = end.toISOString().split('T')[0];
      }
      
      return newData;
    });
  };

  const handleDurationChange = (duration: number) => {
    setFormData(prev => {
      const newData = { ...prev, duration };
      
      // Auto-calculate end date if start date exists
      if (prev.startDate && duration) {
        const start = new Date(prev.startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + duration - 1);
        newData.endDate = end.toISOString().split('T')[0];
      }
      
      return newData;
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center bg-gradient-hero text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-2 justify-center">
          <Plane className="h-6 w-6" />
          Planeje sua Viagem
        </CardTitle>
        <CardDescription className="text-white/90">
          Preencha os detalhes para criar seu itinerário personalizado
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                Destino
              </Label>
              <Input
                id="destination"
                type="text"
                placeholder="Ex: Lisboa, Portugal"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="startDate" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                Data de Início
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium mb-2 block">
                Duração (dias)
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                value={formData.duration}
                onChange={(e) => handleDurationChange(parseInt(e.target.value) || 5)}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate" className="text-sm font-medium mb-2 block">
                Data de Término
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                readOnly
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="travelers" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Users className="h-4 w-4 text-primary" />
                Número de Viajantes
              </Label>
              <Input
                id="travelers"
                type="number"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) || 2 }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="tripType" className="text-sm font-medium mb-2 block">
                Tipo de Viagem
              </Label>
              <Select 
                value={formData.tripType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, tripType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tripTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-primary-glow transition-all duration-300 shadow-soft hover:shadow-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Criando Itinerário...
              </div>
            ) : (
              'Criar Itinerário Personalizado'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}