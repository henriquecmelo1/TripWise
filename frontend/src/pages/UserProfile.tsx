// src/pages/UserProfile.tsx
import React, { useState } from 'react';
import { userProfileQuestions } from '../data/userProfileQuestions';
import InputText from '../components/Questionnaire/InputText'; // Reutiliza para username, location
import InputNumber from '../components/Questionnaire/InputNumber'; // Reutiliza para age
import SelectInput from '../components/Questionnaire/SelectInput';
import ScaleInput from '../components/UserProfile/InputScale';
import MultiSelectInput from '../components/UserProfile/InputMultiSelect';
import { useNavigate } from 'react-router-dom';

// Importa todos os ícones necessários
import {
  iconMapMarkerAlt, iconCalendar, iconUserAccount, iconMotivation,
  iconScale, iconChecklist, iconAccommodation, iconPace, iconPlanning,
  iconFoodRestriction, iconFlexibility, iconSustainability, iconAuthentic, iconTechnology,
} from '../assets/icons';


export default function UserProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(''); // Novo estado para username
  const [age, setAge] = useState<number | null>(null); // Novo estado para age
  const [location, setLocation] = useState<string>(''); // Novo estado para location
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mapeamento de IDs de pergunta para ícones
  const questionIcons: { [key: string]: string } = {
    travel_motivation: iconMotivation,
    budget_preference: iconScale,
    accommodation_type: iconAccommodation,
    activity_preferences: iconChecklist,
    travel_pace: iconPace,
    planning_style: iconPlanning,
    group_preference: iconUserAccount, // Usando iconUserAccount para preferência de grupo
    food_restrictions: iconFoodRestriction,
    transport_preference: iconChecklist, // Reutilizando Checklist para transporte
    flexibility_level: iconFlexibility,
    sustainability_importance: iconSustainability,
    authentic_experiences: iconAuthentic,
    technology_comfort: iconTechnology,
  };

  const handleAnswerChange = (questionId: string, value: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Função auxiliar para obter o label de uma escala baseado no valor
  const getScaleLabel = (questionId: string, value: number): string => {
    const question = userProfileQuestions.find(q => q.id === questionId);
    if (question?.type === 'scale' && question.scale) {
      return question.scale.labels[value - question.scale.min];
    }
    return String(value); // Fallback
  };

  // Função auxiliar para mapear o group_preference para número
  const mapGroupPreferenceToNumber = (value: string): number => {
    switch (value) {
      case 'solo': return 1;
      case 'casal': return 2;
      case 'familia_pequena': return 3; // Ou 4, conforme critério
      case 'familia_grande': return 5; // Ou 5+, conforme critério
      case 'amigos_pequeno': return 3; // Ou 4
      case 'amigos_grande': return 5; // Ou 5+
      default: return 0;
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validação básica para campos obrigatórios
    if (!username || !age || !location || age <= 0) {
        setError("Por favor, preencha o nome de usuário, idade e localização corretamente.");
        setIsLoading(false);
        return;
    }
    for (const question of userProfileQuestions) {
        if (!answers[question.id] || (Array.isArray(answers[question.id]) && (answers[question.id] as string[]).length === 0)) {
            // Permite 'nenhuma' para food_restrictions mesmo que seja um array vazio
            if (question.id === 'food_restrictions' && (answers[question.id] as string[])?.includes('nenhuma')) {
                continue;
            }
            setError(`Por favor, responda à pergunta: "${question.question}"`);
            setIsLoading(false);
            return;
        }
    }


    // NOVO: Transformar respostas para o formato onboardingData
    const onboardingData = {
        age: age,
        location: location,
        preferredActivities: answers.activity_preferences as string[],
        budget: getScaleLabel('budget_preference', answers.budget_preference as number), // Converte para label da escala
        accommodationType: answers.accommodation_type as string,
        planningStyle: answers.planning_style as string,
        typicalGroupSize: mapGroupPreferenceToNumber(answers.group_preference as string), // Converte para número
        typicalTripDuration: "5",
        pacePreference: answers.travel_pace as string,
        foodRestrictions: answers.food_restrictions as string[],
        transportPreference: answers.transport_preference as string[],
        flexibilityLevel: getScaleLabel('flexibility_level', answers.flexibility_level as number), // Converte para label da escala
        socialInteraction: "moderate"
    };

    const postData = {
        userId: username, 
        onboardingData: onboardingData,
    };

    console.log("Dados do POST para o backend:", postData);

    try {
      const response = await fetch('http://localhost:3000/api/ai/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar perfil");
      }
      const result = await response.json();
      console.log("Resposta do backend:", result);
      navigate('/forms'); // Navega para o formulário principal após o sucesso

    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError(`Falha ao salvar perfil: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg my-12">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Crie seu Perfil de Viajante</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Novos Inputs para Username, Idade e Localização */}
        <InputText
          label="Nome de Usuário"
          icon={iconUserAccount}
          placeholder="Seu nome de usuário"
          value={username}
          onChange={setUsername}
        />
        <InputNumber
          label="Sua idade"
          icon={iconCalendar} 
          value={age || 18} 
          onChange={setAge}
          min={1}
          max={120}
          placeholder="Sua idade"
        />
        <InputText
          label="Sua localização atual"
          icon={iconMapMarkerAlt}
          placeholder="Ex: Recife, Brasil"
          value={location}
          onChange={setLocation}
        />

        {userProfileQuestions.map(question => {
          const icon = questionIcons[question.id] || iconMotivation;

          if (question.type === "multiple_choice") {
            return (
              <SelectInput
                key={question.id}
                label={question.question}
                icon={icon}
                placeholder={`Selecione ${question.question.toLowerCase().split(' ').slice(0,3).join(' ')}...`}
                options={question.options || []}
                value={(answers[question.id] as string) || ''}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
            );
          } else if (question.type === "scale" && question.scale) {
            return (
              <ScaleInput
                key={question.id}
                question={question.question}
                icon={icon}
                min={question.scale.min}
                max={question.scale.max}
                labels={question.scale.labels}
                value={(answers[question.id] as number) || question.scale.min}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
            );
          } else if (question.type === "multiple_select") {
            return (
              <MultiSelectInput
                key={question.id}
                question={question.question}
                icon={icon}
                options={question.options || []}
                selectedValues={(answers[question.id] as string[]) || []}
                onChange={(values) => handleAnswerChange(question.id, values)}
                maxSelections={question.maxSelections}
              />
            );
          }
          return null;
        })}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-lg text-white text-xl font-bold
                      bg-gradient-to-r from-primary to-accent
                      hover:opacity-90 transition-all duration-300
                      shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mt-8
                      ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Salvando Perfil..." : "Salvar Perfil"}
        </button>
      </form>
    </div>
  );
}