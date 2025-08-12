import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  iconMapMarkerAlt,
  iconUsers,
  iconCalendar,
  iconStar,
} from "../assets/icons";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  gradient: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Planejar Nova Viagem",
      description: "Crie um roteiro personalizado para sua próxima aventura",
      icon: iconMapMarkerAlt,
      route: "/forms",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      id: "2",
      title: "Buscar Voos",
      description: "Encontre as melhores ofertas de passagens aéreas",
      icon: iconCalendar,
      route: "/flights",
      gradient: "from-green-600 to-teal-600",
    },
    {
      id: "3",
      title: "Explorar Destinos",
      description: "Descubra novos lugares incríveis para visitar",
      icon: iconStar,
      route: "/destinations",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "4",
      title: "Dicas de Viagem",
      description: "Conselhos úteis para tornar sua viagem perfeita",
      icon: iconUsers,
      route: "/tips",
      gradient: "from-orange-600 to-red-600",
    },
  ];

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Theme toggle is now handled by the context

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
      <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  );

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      {/* Header com toggle de modo escuro */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center group">
              <button
                onClick={() => navigate("/")}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                TripWise
              </button>
              <div className="hidden md:flex items-center text-gray-600 dark:text-gray-300 text-sm lg:text-base transition-colors duration-300 ml-4">
                <span
                  className="inline-flex justify-center items-center w-5 h-5 mr-2 text-blue-500 group-hover:animate-bounce"
                  dangerouslySetInnerHTML={{ __html: iconMapMarkerAlt }}
                />
                <span className="font-medium">Sua plataforma inteligente para planejar viagens</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Toggle modo escuro */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                aria-label="Alternar modo escuro"
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5 text-yellow-500 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-700 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => navigate("/forms")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Nova Viagem
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção de Boas-vindas */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bem-vindo ao TripWise! ✈️
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sua plataforma inteligente para planejar viagens incríveis. Comece
            criando seu primeiro roteiro personalizado.
          </p>
        </div>

        {/* Cards de Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => navigate(action.route)}
                  className={`bg-gradient-to-r ${action.gradient} hover:scale-105 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left`}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-full">
                      <span
                        className="text-white text-xl"
                        dangerouslySetInnerHTML={{ __html: action.icon }}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </button>
              ))}
        </div>

        {/* Seção de Recursos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Como o TripWise pode te ajudar?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span
                  className="text-white text-2xl"
                  dangerouslySetInnerHTML={{ __html: iconMapMarkerAlt }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Roteiros Personalizados
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Criamos itinerários únicos baseados nas suas preferências e
                orçamento
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span
                  className="text-white text-2xl"
                  dangerouslySetInnerHTML={{ __html: iconCalendar }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Busca de Voos
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Encontramos as melhores ofertas de passagens para seu destino
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span
                  className="text-white text-2xl"
                  dangerouslySetInnerHTML={{ __html: iconStar }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Experiências Únicas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Descobrimos joias escondidas e experiências autênticas em cada
                destino
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
