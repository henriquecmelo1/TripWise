// src/components/Questionnaire/InputNumber.tsx
import FormGroup from './FormGroup'; // Reutiliza o FormGroup

interface InputNumberProps {
  label: string;
  placeholder?: string; // Opcional
  icon: string; // SVG string
  value: number;
  onChange: (value: number) => void;
  min?: number; // Valor mínimo permitido
  max?: number; // Valor máximo permitido
}

export default function InputNumber({
  label,
  placeholder,
  icon,
  value,
  onChange,
  min = 0, // Padrão para 0 se não especificado
  max, // Sem máximo padrão
}: InputNumberProps) {
  return (
    <FormGroup label={label} icon={icon}>
      <input
        type="number"
        className="w-full p-3 border border-gray-300 rounded-md text-base
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   text-gray-800 placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
      />
    </FormGroup>
  );
}