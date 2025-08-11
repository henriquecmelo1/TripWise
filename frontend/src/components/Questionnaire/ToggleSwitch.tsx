// src/components/Questionnaire/ToggleSwitch.tsx
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  value: boolean; // true para 'Sim', false para 'Não'
  onToggle: (newValue: boolean) => void;
  icon?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, value, onToggle, icon }) => {
  return (
    <div
      className="p-4 bg-white rounded-xl shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg"
      onClick={() => onToggle(!value)}
    >
      <div className="flex items-center">
        {icon && (
          <span
            className="inline-flex justify-center items-center w-6 h-6 mr-3 text-gray-500"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        )}
        <label className="text-gray-700 font-semibold">{label}</label>
      </div>

      <div
        className={`w-14 h-8 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
          value ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            value ? 'translate-x-7' : 'translate-x-1'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;