import { type ItinerarioDiario } from '../../data/itineraryInterface';
import ActivityCard from './ActivityCard';
import MealCard from './MealCard';
import AccommodationLogisticsCard from './AccommodationLogisticsCard';
import { useState } from 'react';

interface DayCardProps {
  day: ItinerarioDiario;
  iconCalendar: string;
  iconActivity: string;
  iconMeals: string;
  iconHotel: string;
  iconBriefcase: string;
}

export default function DayCard({
  day,
  iconCalendar,
  iconActivity,
  iconMeals,
  iconHotel,
  iconBriefcase,
}: DayCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id={`day-${day.dia}`} className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left"
        aria-expanded={expanded}
        aria-controls={`day-${day.dia}-content`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
          <span
            className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-500 dark:text-blue-400"
            dangerouslySetInnerHTML={{ __html: iconCalendar }}
          />
          Dia {day.dia}: {day.tema}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 ml-11">{day.condicoesTempo}</p>
      </button>

      {/* Conteúdo colapsável no mobile, expandido por padrão no desktop */}
      <div
        id={`day-${day.dia}-content`}
        className={`${expanded ? 'block' : 'hidden'} sm:block`}
      >
        {/* Atividades do Dia */}
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 ml-11">Atividades:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 sm:mb-8 ml-11">
          {day.atividades.map((activity, index) => (
            <ActivityCard key={index} activity={activity} iconActivity={iconActivity} />
          ))}
        </div>

        {/* Refeições */}
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 ml-11">Refeições:</h3>
        <MealCard meals={day.refeicoes} iconMeals={iconMeals} />

        {/* Hospedagem e Logística */}
        <AccommodationLogisticsCard
          hospedagem={day.hospedagem}
          logistica={day.logistica}
          iconHotel={iconHotel}
          iconBriefcase={iconBriefcase}
        />
      </div>

      {/* CTA de ver detalhes no mobile */}
      <div className="sm:hidden mt-2 ml-11">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {expanded ? 'Ver menos' : 'Ver detalhes'}
        </button>
      </div>
    </div>
  );
}