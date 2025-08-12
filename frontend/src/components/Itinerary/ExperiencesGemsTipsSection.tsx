
interface ExperiencesGemsTipsSectionProps {
  experienciasUnicas: string[];
  joiasEscondidas: string[];
  dicasEspecialistas: string[];
  iconStar: string;
  iconDiamond: string;
  iconLightbulb: string;
}

export default function ExperiencesGemsTipsSection({
  experienciasUnicas,
  joiasEscondidas,
  dicasEspecialistas,
  iconStar,
  iconDiamond,
  iconLightbulb,
}: ExperiencesGemsTipsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Experiências Únicas */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-purple-500 dark:text-purple-400" dangerouslySetInnerHTML={{ __html: iconStar }} />
          Experiências Únicas
        </h3>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20 p-5 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 space-y-2">
          {experienciasUnicas.map((exp, i) => <li key={i} dangerouslySetInnerHTML={{ __html: exp }} />)}
        </ul>
      </div>

      {/* Joias Escondidas */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-orange-500 dark:text-orange-400" dangerouslySetInnerHTML={{ __html: iconDiamond }} />
          Joias Escondidas
        </h3>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 bg-orange-50 dark:bg-orange-900/20 p-5 rounded-lg shadow-sm border border-orange-200 dark:border-orange-700 space-y-2">
          {joiasEscondidas.map((gem, i) => <li key={i} dangerouslySetInnerHTML={{ __html: gem }} />)}
        </ul>
      </div>

      {/* Dicas de Especialistas */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-green-500 dark:text-green-400" dangerouslySetInnerHTML={{ __html: iconLightbulb }} />
          Dicas de Especialistas
        </h3>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-5 rounded-lg shadow-sm border border-green-200 dark:border-green-700 space-y-2">
          {dicasEspecialistas.map((tip, i) => <li key={i} dangerouslySetInnerHTML={{ __html: tip }} />)}
        </ul>
      </div>
    </div>
  );
}