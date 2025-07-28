// src/components/Itinerary/MealCard.tsx
import React from 'react';
import { type Refeicoes } from '../../data/mockItineraryResponse';

interface MealCardProps {
  meals: Refeicoes;
  iconMeals: string;
}

export default function MealCard({ meals, iconMeals }: MealCardProps) {
  return (
    <div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-200 mb-8 ml-11">
      <p className="text-lg font-bold text-gray-800 flex items-center mb-2">
        <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-green-600" dangerouslySetInnerHTML={{ __html: iconMeals }} />
        Almoço:
      </p>
      <p className="text-base text-gray-700 ml-9">{meals.almoco}</p>
      <p className="text-lg font-bold text-gray-800 flex items-center mt-4 mb-2">
        <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-green-600" dangerouslySetInnerHTML={{ __html: iconMeals }} />
        Jantar:
      </p>
      <p className="text-base text-gray-700 ml-9">{meals.jantar}</p>
    </div>
  );
}