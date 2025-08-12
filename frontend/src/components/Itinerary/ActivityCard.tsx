import { type Atividade } from '../../data/itineraryInterface';

interface ActivityCardProps {
  activity: Atividade;
  iconActivity: string;
}

export default function ActivityCard({ activity, iconActivity }: ActivityCardProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg shadow-sm border border-blue-200 dark:border-blue-700">
      <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center mb-2">
        <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" dangerouslySetInnerHTML={{ __html: iconActivity }} />
        {activity.horario} - {activity.atividade}
      </p>
      <p className="text-base text-gray-700 dark:text-gray-300 ml-9">Local: {activity.local} ({activity.duracao})</p>
      <p className="text-base text-gray-700 dark:text-gray-300 ml-9 mt-2">{activity.motivoPersonalizacao}</p>
      {activity.dicas.length > 0 && (
        <div className="ml-9 mt-3">
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">Dicas:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {activity.dicas.map((dica, i) => <li key={i}>{dica}</li>)}
          </ul>
        </div>
      )}
      <p className="text-base text-gray-600 dark:text-gray-400 ml-9 mt-3">Alternativas: {activity.alternativas}</p>
      <p className="text-base text-gray-600 dark:text-gray-400 ml-9">Custo Estimado: {activity.custoEstimado}</p>
      <p className="text-base text-gray-600 dark:text-gray-400 ml-9">Transporte: {activity.transporteSugerido}</p>
    </div>
  );
}