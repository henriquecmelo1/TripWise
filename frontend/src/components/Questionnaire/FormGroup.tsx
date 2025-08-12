import React from "react";

interface FormGroupProps {
  label: string;
  icon: string;
  children: React.ReactNode;
}

export default function FormGroup({ label, icon, children }: FormGroupProps) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
      <label className="flex items-center font-bold mb-3 text-gray-700 dark:text-gray-200 text-lg">
        <span
          className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-600 dark:text-blue-400 text-xl"
          dangerouslySetInnerHTML={{ __html: icon }}
        />

        {label}
      </label>
      {children}
    </div>
  );
}
