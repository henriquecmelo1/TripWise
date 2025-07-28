import FormGroup from './FormGroup';

interface SliderInputProps {
  label: string;
  icon: string;
  min: number;
  max: number;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}

export default function SliderInput({ label, icon, max, min, unit, value, onChange }: SliderInputProps) {
  return (
    <FormGroup label={label} icon={icon}>
      <input
        type="range"
        className="w-full py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
        <div className="flex justify-between text-sm mt-2">
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
        </div>
        <div className="text-center mt-2">
            <span className="text-lg font-semibold">{value} {unit}</span>
        </div>
    </FormGroup>
  );
}