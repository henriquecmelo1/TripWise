import FormGroup from '../Questionnaire/FormGroup';
import { type Option } from '../../data/questionnaireOptions';
interface InputMultiSelect {
  question: string;
  icon: string; // Ícone SVG
  options: Option[];
  selectedValues: string[]; // Array de valores selecionados
  onChange: (newSelectedValues: string[]) => void;
  maxSelections?: number; // Número máximo de seleções permitidas
}

export default function InputMultiSelect({ question, icon, options, selectedValues, onChange, maxSelections }: InputMultiSelect) {
  const handleToggle = (value: string) => {
    const isSelected = selectedValues.includes(value);
    let newSelection: string[];

    if (isSelected) {
      newSelection = selectedValues.filter(val => val !== value);
    } else {
      if (maxSelections && selectedValues.length >= maxSelections) {
        // Se já atingiu o máximo e tenta selecionar mais, não faz nada
        alert(`Você pode selecionar no máximo ${maxSelections} opções.`);
        return;
      }
      newSelection = [...selectedValues, value];
    }
    onChange(newSelection);
  };

  return (
    <FormGroup label={question} icon={icon}>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map(option => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <button
              key={option.value}
              type="button" // Importante para não submeter o formulário
              onClick={() => handleToggle(option.value)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm
                ${isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {maxSelections && selectedValues.length > 0 && (
        <p className="text-xs text-gray-500 mt-2 text-right">
          {selectedValues.length} de {maxSelections} selecionado{selectedValues.length !== 1 ? 's' : ''}
        </p>
      )}
    </FormGroup>
  );
}