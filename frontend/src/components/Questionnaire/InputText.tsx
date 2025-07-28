import FormGroup from './FormGroup';

interface InputTextProps {
  label: string;
  placeholder: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputText({ label, placeholder, icon, value, onChange }: InputTextProps) {
  return (
    <FormGroup label={label} icon={icon}>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md text-base
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormGroup>
  );
}