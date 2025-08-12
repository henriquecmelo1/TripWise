import { type Refeicoes } from '../../data/itineraryInterface';

interface MealCardProps {
  meals: Refeicoes;
  iconMeals: string;
}

export default function MealCard({ meals, iconMeals }: MealCardProps) {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg shadow-sm border border-green-200 dark:border-green-700 mb-8 ml-11">
      <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center mb-2">
        <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-green-600 dark:text-green-400" dangerouslySetInnerHTML={{ __html: iconMeals }} />
        Almoço:
      </p>
      <p className="text-base text-gray-700 dark:text-gray-300 ml-9">{meals.almoco}</p>
      <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center mt-4 mb-2">
        <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-green-600 dark:text-green-400" dangerouslySetInnerHTML={{ __html: iconMeals }} />
        Jantar:
      </p>
      <p className="text-base text-gray-700 dark:text-gray-300 ml-9">{meals.jantar}</p>
    </div>
  );
}