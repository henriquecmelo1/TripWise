import React, { useState } from 'react';
import { useFormData } from '../../hooks/useFormData';
import { useTheme } from '../../contexts/ThemeContext';
import InputText from '../Questionnaire/InputText';
import InputSelect from '../Questionnaire/InputSelect';
import InputMultiSelect from '../Questionnaire/InputMultiSelect';
import InputDate from '../Questionnaire/InputDate';
import InputNumber from '../Questionnaire/InputNumber';
import Header from '../Questionnaire/Header';
import {
  iconMapMarkerAlt,
  iconUsers,
  iconDollarSign,
  iconCarSide,
  iconStar,
  iconCalendar,
  iconClock,
} from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../Questionnaire/ToggleSwitch';
// removed unused API constants after redirecting generation logic to loading page

interface FormData {
  [key: string]: string | string[] | number | null;
}

const iconMap: { [key: string]: any } = {
  departure_location: iconMapMarkerAlt,
  destination: iconMapMarkerAlt,
  start_date: iconCalendar,
  end_date: iconCalendar,
  travelers_count: iconUsers,
  trip_type: iconUsers,
  budget_range: iconDollarSign,
  accommodation_preference: iconStar,
  activity_interests: iconStar,
  travel_pace: iconCalendar,
  food_restrictions: iconStar,
  transport_preferences: iconCarSide,
  experience_type: iconStar,
};

export default function DynamicForm() {
  const { formStructure, isLoading: formLoading, error: formError } = useFormData();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agendarVoo, setAgendarVoo] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFieldChange = (fieldId: string, value: string | string[] | number | null) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const calculateTravelersData = () => {
    const adults = (formData.num_adults as number) || 1;
    const children = (formData.num_children as number) || 0;
    const infants = (formData.num_infants as number) || 0;
    
    return {
      adults,
      children,
      infants,
      total: adults + children + infants
    };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setIsLoading(true);
    setError(null);

    const adaptedFormData = {
      departure_location: formData.departure_location,
      destination: formData.destination,
      start_date: formData.start_date,
      end_date: formData.end_date,
      travelers_count: formData.travelers_count || 1,
      trip_type: formData.trip_type,
      budget_range: formData.budget_range,
      accommodation_preference: formData.accommodation_preference,
      activity_interests: formData.activity_interests,
      travel_pace: formData.travel_pace,
      food_restrictions: formData.food_restrictions,
      transport_preferences: formData.transport_preferences,
      experience_type: formData.experience_type,
    };

    const dataToSend = { formData: adaptedFormData };

    try {
      if (agendarVoo) {
        const travelersData = calculateTravelersData();
        
        const departureFlightData = {
          originCity: formData.departure_location,
          destinationCity: formData.destination,
          dateOfDeparture: formData.start_date,
          currency: "BRL",
          adults: travelersData.adults,
          children: travelersData.children,
          infants: travelersData.infants,
          max: 3,
        };

        const returnFlightData = {
          originCity: formData.destination,
          destinationCity: formData.departure_location,
          dateOfDeparture: formData.end_date,
          currency: "BRL",
          adults: travelersData.adults,
          children: travelersData.children,
          infants: travelersData.infants,
          max: 3,
        };

        // Redirect to loading/generating page which will handle requests and navigation
        navigate("/generating", {
          state: {
            agendarVoo: true,
            dataToSend,
            departureFlightData,
            returnFlightData,
          },
        });
      } else {
        // Only itinerary generation
        navigate("/generating", {
          state: {
            agendarVoo: false,
            dataToSend,
          },
        });
      }
    } catch (err) {
      console.error("Erro ao iniciar a geração do roteiro:", err);
      setError(`Falha ao iniciar a geração: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: any) => {
    const icon = iconMap[field.id] || iconStar;
    
    switch (field.type) {
      case 'text':
        return (
          <InputText
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            icon={icon}
            value={formData[field.id] as string || ''}
            onChange={(value) => handleFieldChange(field.id, value)}
          />
        );
        
      case 'date':
        return (
          <InputDate
            key={field.id}
            label={field.label}
            icon={icon}
            selectedDate={formData[field.id] as string || null}
            onChange={(value) => handleFieldChange(field.id, value)}
            placeholderText={field.placeholder || 'Selecione uma data'}
            minDate={field.id === 'end_date' ? (formData.start_date as string) || new Date().toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
          />
        );
        
      case 'number':
        return (
          <InputNumber
            key={field.id}
            label={field.label}
            icon={icon}
            value={formData[field.id] as number || field.min || 0}
            onChange={(value) => handleFieldChange(field.id, value)}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
          />
        );
        
      case 'select':
        return (
          <InputSelect
            key={field.id}
            label={field.label}
            icon={icon}
            placeholder={field.placeholder || 'Selecione uma opção'}
            options={field.options || []}
            value={formData[field.id] as string || ''}
            onChange={(value) => handleFieldChange(field.id, value)}
          />
        );
        
      case 'multi_select':
        return (
          <InputMultiSelect
            key={field.id}
            question={field.label}
            icon={icon}
            options={field.options || []}
            selectedValues={formData[field.id] as string[] || []}
            onChange={(value) => handleFieldChange(field.id, value)}
            maxSelections={field.maxSelections}
          />
        );
        
      default:
        return null;
    }
  };

  if (formLoading) {
    return (
      <div className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Carregando formulário...</p>
          </div>
        </div>
      </div>
    );
  }

  if (formError) {
    return (
      <div className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Erro ao carregar formulário: {formError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    }`}>
      {/* Header com toggle de modo escuro */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Questionário de Viagem
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
                Conte-nos sobre sua viagem dos sonhos
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                aria-label="Alternar modo escuro"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-12 transition-colors duration-300">
        <Header />
        <form onSubmit={handleSubmit} className="space-y-6">
          {formStructure.map((section) => (
            <div key={section.section}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                {section.title}
              </h3>
              {section.fields.map(renderField)}
            </div>
          ))}

          <ToggleSwitch
            label="Deseja agendar voo?"
            value={agendarVoo}
            onToggle={setAgendarVoo}
            icon={iconClock}
          />

          <button
            type="submit"
            className={`w-full py-4 px-6 rounded-lg text-white text-xl font-bold
                      bg-gradient-to-r from-blue-600 to-purple-600
                      hover:opacity-90 transition-all duration-300
                      shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mt-8
                      ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Gerando Roteiros..." : "Criar Meus Roteiros"}
            {!isLoading && (
              <span role="img" aria-label="rocket">🚀</span>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}