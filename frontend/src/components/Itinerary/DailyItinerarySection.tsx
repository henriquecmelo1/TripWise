// src/components/Itinerary/DailyItinerarySection.tsx
import { type ItinerarioDiario } from '../../data/mockItineraryResponse'; // Importa a interface
import DayCard from './DayCard'; 

interface DailyItinerarySectionProps {
  itinerarioDiario: ItinerarioDiario[];
  // Ícones necessários para DayCard
  iconCalendar: string;
  iconActivity: string;
  iconMeals: string;
  iconBed: string;
  iconBriefcase: string;
}

export default function DailyItinerarySection({
  itinerarioDiario,
  iconCalendar,
  iconActivity,
  iconMeals,
  iconBed,
  iconBriefcase,
}: DailyItinerarySectionProps) {
  return (
    <div className="mt-12 space-y-12">
      {itinerarioDiario.map((day) => (
        <DayCard
          key={day.dia}
          day={day}
          iconCalendar={iconCalendar}
          iconActivity={iconActivity}
          iconMeals={iconMeals}
          iconBed={iconBed}
          iconBriefcase={iconBriefcase}
        />
      ))}
    </div>
  );
}