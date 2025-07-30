// src/components/UserProfile/ScaleInput.tsx
import FormGroup from '../Questionnaire/FormGroup'; // Reutiliza FormGroup

interface ScaleInputProps {
  question: string; // O texto da pergunta
  icon: string;     // Ícone SVG
  min: number;
  max: number;
  labels: string[]; // Rótulos para cada ponto da escala
  value: number;
  onChange: (value: number) => void;
}

export default function ScaleInput({ question, icon, min, max, labels, value, onChange }: ScaleInputProps) {
  const currentLabel = labels[value - min]; // Mapeia o valor para o rótulo correspondente

  return (
    <FormGroup label={question} icon={icon}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary
                   focus:outline-none focus:ring-2 focus:ring-primary mt-2"
      />
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        {labels.map((label, index) => (
          <span key={index} className="flex-1 text-center last:text-right first:text-left">
            {index === 0 && label}
            {index === labels.length - 1 && label}
          </span>
        ))}
      </div>
      <div className="text-center mt-2">
        <span className="text-lg font-semibold text-gray-800">{currentLabel}</span>
      </div>
    </FormGroup>
  );
}