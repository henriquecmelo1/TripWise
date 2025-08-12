import { type ItinerarioDiario } from '../../data/itineraryInterface'; // Importa a interface
import DayCard from './DayCard'; 

interface DailyItinerarySectionProps {
  itinerarioDiario: ItinerarioDiario[];
  // Ícones necessários para DayCard
  iconCalendar: string;
  iconActivity: string;
  iconMeals: string;
  iconHotel: string;
  iconBriefcase: string;
}

export default function DailyItinerarySection({
  itinerarioDiario,
  iconCalendar,
  iconActivity,
  iconMeals,
  iconHotel,
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
          iconHotel={iconHotel}
          iconBriefcase={iconBriefcase}
        />
      ))}
    </div>
  );
}