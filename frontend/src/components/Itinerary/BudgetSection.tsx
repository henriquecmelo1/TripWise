import { type OrcamentoDetalhado } from '../../data/itineraryInterface';

interface BudgetSectionProps {
  budget: OrcamentoDetalhado;
  iconDollarSign: string;
}

export default function BudgetSection({ budget, iconDollarSign }: BudgetSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
        <span className="inline-flex justify-center items-center w-7 h-7 mr-3 text-pink-500 dark:text-pink-400" dangerouslySetInnerHTML={{ __html: iconDollarSign }} />
        Orçamento Detalhado
      </h3>
      <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-lg shadow-sm border border-pink-200 dark:border-pink-700 space-y-2">
        <p className="text-lg text-gray-700 dark:text-gray-300">Transporte: <span className="font-semibold">{budget.transporte}</span></p>
        <p className="text-lg text-gray-700 dark:text-gray-300">Hospedagem: <span className="font-semibold">{budget.hospedagem}</span></p>
        <p className="text-lg text-gray-700 dark:text-gray-300">Alimentação: <span className="font-semibold">{budget.alimentacao}</span></p>
        <p className="text-lg text-gray-700 dark:text-gray-300">Atividades: <span className="font-semibold">{budget.atividades}</span></p>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4">Total: <span className="text-blue-700 dark:text-blue-400">{budget.total}</span></p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">{budget.observacao}</p>
      </div>
    </div>
  );
}