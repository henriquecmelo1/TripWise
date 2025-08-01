// src/components/Itinerary/ActivityCard.tsx
import { type Atividade } from '../../data/itineraryInterface';

interface ActivityCardProps {
  activity: Atividade;
  iconActivity: string;
}

export default function ActivityCard({ activity, iconActivity }: ActivityCardProps) {
  return (
    <div className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-200">
      <p className="text-lg font-bold text-gray-800 flex items-center mb-2">
        <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-600" dangerouslySetInnerHTML={{ __html: iconActivity }} />
        {activity.horario} - {activity.atividade}
      </p>
      <p className="text-base text-gray-700 ml-9">Local: {activity.local} ({activity.duracao})</p>
      <p className="text-base text-gray-700 ml-9 mt-2">{activity.motivoPersonalizacao}</p>
      {activity.dicas.length > 0 && (
        <div className="ml-9 mt-3">
          <p className="text-base font-semibold text-gray-700">Dicas:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {activity.dicas.map((dica, i) => <li key={i}>{dica}</li>)}
          </ul>
        </div>
      )}
      <p className="text-base text-gray-600 ml-9 mt-3">Alternativas: {activity.alternativas}</p>
      <p className="text-base text-gray-600 ml-9">Custo Estimado: {activity.custoEstimado}</p>
      <p className="text-base text-gray-600 ml-9">Transporte: {activity.transporteSugerido}</p>
    </div>
  );
}