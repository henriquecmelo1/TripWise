// src/components/Questionnaire/InputDate.tsx
import FormGroup from './FormGroup'; // Reutiliza o FormGroup, assim como InputText faz

interface DateInputProps {
  label: string;
  icon: string; // SVG string para o ícone (calendário)
  selectedDate: string | null; // A data será uma string no formato YYYY-MM-DD
  onChange: (dateString: string) => void; // A função de callback receberá a string da data
  placeholderText?: string;
  minDate?: string; // Data mínima permitida no formato YYYY-MM-DD
  maxDate?: string; // Data máxima permitida no formato YYYY-MM-DD
}

export default function InputDate({
  label,
  icon,
  selectedDate,
  onChange,
  placeholderText,
  minDate,
  maxDate,
}: DateInputProps) {
  // Nota: o placeholder pode não ser exibido de forma consistente em todos os navegadores para input type="date"
  // A aparência do calendário pop-up é controlada pelo navegador e não é estilzável por CSS.
  return (
    <FormGroup label={label} icon={icon}>
      <input
        type="date"
        value={selectedDate || ''} // O valor deve ser uma string YYYY-MM-DD ou vazio
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        placeholder={placeholderText} // Pode não ser totalmente funcional no type="date"
        // Classes Tailwind idênticas às do InputText para consistência visual
        className="w-full p-3 border border-gray-300 rounded-md text-base
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   text-gray-800 placeholder:text-gray-400"
      />
    </FormGroup>
  );
}