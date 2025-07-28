// src/components/Itinerary/DayCard.tsx
import { type ItinerarioDiario } from '../../data/mockItineraryResponse';
import ActivityCard from './ActivityCard';
import MealCard from './MealCard';
import AccommodationLogisticsCard from './AccommodationLogisticsCard';

interface DayCardProps {
  day: ItinerarioDiario;
  iconCalendar: string;
  iconActivity: string;
  iconMeals: string;
  iconBed: string;
  iconBriefcase: string;
}

export default function DayCard({
  day,
  iconCalendar,
  iconActivity,
  iconMeals,
  iconBed,
  iconBriefcase,
}: DayCardProps) {
  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center">
        <span className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-500" dangerouslySetInnerHTML={{ __html: iconCalendar }} />
        Dia {day.dia}: {day.tema}
      </h2>
      <p className="text-gray-600 mb-6 ml-11">{day.condicoesTempo}</p>

      {/* Atividades do Dia */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 ml-11">Atividades:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ml-11">
        {day.atividades.map((activity, index) => (
          <ActivityCard key={index} activity={activity} iconActivity={iconActivity} />
        ))}
      </div>

      {/* Refeições */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 ml-11">Refeições:</h3>
      <MealCard meals={day.refeicoes} iconMeals={iconMeals} />

      {/* Hospedagem e Logística */}
      <AccommodationLogisticsCard
        hospedagem={day.hospedagem}
        logistica={day.logistica}
        iconBed={iconBed}
        iconBriefcase={iconBriefcase}
      />
    </div>
  );
}