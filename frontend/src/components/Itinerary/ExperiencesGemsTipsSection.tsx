
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
  const MAX_ITEMS_MOBILE = 3;
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;

  const limited = (arr: string[]) => (isMobile ? arr.slice(0, MAX_ITEMS_MOBILE) : arr);

  return (
    <div className="space-y-8">
      {/* Experiências Únicas */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-purple-500 dark:text-purple-400" dangerouslySetInnerHTML={{ __html: iconStar }} />
          Experiências Únicas
        </h3>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20 p-5 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 space-y-2">
          {limited(experienciasUnicas).map((exp, i) => <li key={i} dangerouslySetInnerHTML={{ __html: exp }} />)}
        </ul>
        {isMobile && experienciasUnicas.length > MAX_ITEMS_MOBILE && (
          <details className="mt-2">
            <summary className="text-blue-600 dark:text-blue-400 cursor-pointer">Ver mais</summary>
            <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 p-3 space-y-2">
              {experienciasUnicas.slice(MAX_ITEMS_MOBILE).map((exp, i) => <li key={`more-exp-${i}`} dangerouslySetInnerHTML={{ __html: exp }} />)}
            </ul>
          </details>
        )}
      </div>

      {/* Joias Escondidas */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-orange-500 dark:text-orange-400" dangerouslySetInnerHTML={{ __html: iconDiamond }} />
          Joias Escondidas
        </h3>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 bg-orange-50 dark:bg-orange-900/20 p-5 rounded-lg shadow-sm border border-orange-200 dark:border-orange-700 space-y-2">
          {limited(joiasEscondidas).map((gem, i) => <li key={i} dangerouslySetInnerHTML={{ __html: gem }} />)}
        </ul>
        {isMobile && joiasEscondidas.length > MAX_ITEMS_MOBILE && (
          <details className="mt-2">
            <summary className="text-blue-600 dark:text-blue-400 cursor-pointer">Ver mais</summary>
            <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 p-3 space-y-2">
              {joiasEscondidas.slice(MAX_ITEMS_MOBILE).map((gem, i) => <li key={`more-gem-${i}`} dangerouslySetInnerHTML={{ __html: gem }} />)}
            </ul>
          </details>
        )}
      </div>

      {/* Dicas de Especialistas */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-green-500 dark:text-green-400" dangerouslySetInnerHTML={{ __html: iconLightbulb }} />
          Dicas de Especialistas
        </h3>
        <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-5 rounded-lg shadow-sm border border-green-200 dark:border-green-700 space-y-2">
          {limited(dicasEspecialistas).map((tip, i) => <li key={i} dangerouslySetInnerHTML={{ __html: tip }} />)}
        </ul>
        {isMobile && dicasEspecialistas.length > MAX_ITEMS_MOBILE && (
          <details className="mt-2">
            <summary className="text-blue-600 dark:text-blue-400 cursor-pointer">Ver mais</summary>
            <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 p-3 space-y-2">
              {dicasEspecialistas.slice(MAX_ITEMS_MOBILE).map((tip, i) => <li key={`more-tip-${i}`} dangerouslySetInnerHTML={{ __html: tip }} />)}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}