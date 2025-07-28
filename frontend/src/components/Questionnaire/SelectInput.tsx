import FormGroup from './FormGroup';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  icon: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectInput({ label, icon, placeholder, options, value, onChange }: SelectInputProps) {
  return (
    <FormGroup label={label} icon={icon}>
      <select
        className="w-full p-3 border border-gray-300 rounded-md text-base bg-white
                   appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}