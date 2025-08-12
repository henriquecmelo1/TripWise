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
    <div className="mt-12 space-y-6">
      {/* Carrossel de atalhos por dia (mobile) */}
      <div className="sm:hidden -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2">
          {itinerarioDiario.map((day) => (
            <a
              key={day.dia}
              href={`#day-${day.dia}`}
              className="shrink-0 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 text-sm"
            >
              Dia {day.dia}
            </a>
          ))}
        </div>
      </div>

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