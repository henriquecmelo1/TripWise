import FormGroup from './FormGroup';

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  label: string;
  icon: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function InputSelect({ label, icon, placeholder, options, value, onChange }: InputSelectProps) {
  return (
    <FormGroup label={label} icon={icon}>
      <select
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md text-base
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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