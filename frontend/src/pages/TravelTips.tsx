import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  iconLightbulb,
  iconChecklist,
  iconDiamond,
  iconBriefcase,
  iconUserAccount,
} from "../assets/icons";

interface TravelTip {
  id: string;
  title: string;
  description: string;
  category: string;
  important: boolean;
}

interface TipCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

const TravelTips: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories: TipCategory[] = [
    {
      id: "all",
      name: "Todas as Dicas",
      icon: iconLightbulb,
      color: "from-blue-600 to-indigo-600",
      gradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
    {
      id: "security",
      name: "Segurança",
      icon: iconChecklist,
      color: "from-red-600 to-pink-600",
      gradient: "bg-gradient-to-r from-red-600 to-pink-600",
    },
    {
      id: "baggage",
      name: "Bagagem",
      icon: iconBriefcase,
      color: "from-purple-600 to-violet-600",
      gradient: "bg-gradient-to-r from-purple-600 to-violet-600",
    },
    {
      id: "documentation",
      name: "Documentação",
      icon: iconUserAccount,
      color: "from-green-600 to-teal-600",
      gradient: "bg-gradient-to-r from-green-600 to-teal-600",
    },
    {
      id: "health",
      name: "Saúde",
      icon: iconDiamond,
      color: "from-orange-600 to-red-600",
      gradient: "bg-gradient-to-r from-orange-600 to-red-600",
    },
    {
      id: "culture",
      name: "Cultura Local",
      icon: iconLightbulb,
      color: "from-yellow-600 to-orange-600",
      gradient: "bg-gradient-to-r from-yellow-600 to-orange-600",
    },
  ];

  const tips: TravelTip[] = [
    // Segurança
    {
      id: "1",
      title: "Guarde cópias dos documentos",
      description: "Sempre tenha cópias físicas e digitais dos seus documentos importantes guardadas separadamente.",
      category: "security",
      important: true,
    },
    {
      id: "2",
      title: "Informe alguém sobre seus planos",
      description: "Deixe um cronograma detalhado da viagem com familiares ou amigos de confiança.",
      category: "security",
      important: true,
    },
    {
      id: "3",
      title: "Use cofres do hotel",
      description: "Utilize os cofres disponíveis no hotel para guardar objetos de valor e documentos.",
      category: "security",
      important: false,
    },
    {
      id: "4",
      title: "Evite exibir objetos de valor",
      description: "Não use joias caras ou dispositivos eletrônicos chamativos em locais públicos.",
      category: "security",
      important: false,
    },

    // Bagagem
    {
      id: "5",
      title: "Lista de bagagem",
      description: "Faça uma lista do que está levando e tire fotos da bagagem antes de despachar.",
      category: "baggage",
      important: true,
    },
    {
      id: "6",
      title: "Medicamentos na bagagem de mão",
      description: "Sempre carregue medicamentos essenciais na bagagem de mão, nunca despache.",
      category: "baggage",
      important: true,
    },
    {
      id: "7",
      title: "Roupas extras no carry-on",
      description: "Leve uma muda de roupa completa na bagagem de mão em caso de extravio.",
      category: "baggage",
      important: false,
    },
    {
      id: "8",
      title: "Peso e dimensões",
      description: "Verifique sempre os limites de peso e dimensões da companhia aérea antes de fazer as malas.",
      category: "baggage",
      important: false,
    },

    // Documentação
    {
      id: "9",
      title: "Validade do passaporte",
      description: "Verifique se seu passaporte tem pelo menos 6 meses de validade a partir da data da viagem.",
      category: "documentation",
      important: true,
    },
    {
      id: "10",
      title: "Vistos necessários",
      description: "Pesquise e providencie todos os vistos necessários com antecedência suficiente.",
      category: "documentation",
      important: true,
    },
    {
      id: "11",
      title: "Cartão de vacinação",
      description: "Mantenha seu cartão de vacinação atualizado e verifique se precisa de vacinas específicas.",
      category: "documentation",
      important: false,
    },
    {
      id: "12",
      title: "Seguro viagem",
      description: "Contrate um seguro viagem que cubra emergências médicas e cancelamentos.",
      category: "documentation",
      important: true,
    },

    // Saúde
    {
      id: "13",
      title: "Kit de primeiros socorros",
      description: "Monte um kit básico com band-aids, analgésicos, termômetro e medicamentos pessoais.",
      category: "health",
      important: false,
    },
    {
      id: "14",
      title: "Hidratação constante",
      description: "Beba muita água, especialmente em voos longos e destinos com clima quente.",
      category: "health",
      important: false,
    },
    {
      id: "15",
      title: "Fuso horário",
      description: "Comece a ajustar seu horário de sono alguns dias antes da viagem para minimizar o jet lag.",
      category: "health",
      important: false,
    },
    {
      id: "16",
      title: "Cuidados com alimentação",
      description: "Tenha cuidado com comida de rua e água não tratada em alguns destinos.",
      category: "health",
      important: true,
    },

    // Cultura Local
    {
      id: "17",
      title: "Pesquise costumes locais",
      description: "Aprenda sobre tradições, códigos de vestimenta e etiqueta social do destino.",
      category: "culture",
      important: false,
    },
    {
      id: "18",
      title: "Aprenda frases básicas",
      description: "Memorize cumprimentos, agradecimentos e pedidos de ajuda no idioma local.",
      category: "culture",
      important: false,
    },
    {
      id: "19",
      title: "Respeite locais sagrados",
      description: "Siga as regras de comportamento e vestimenta em templos e locais religiosos.",
      category: "culture",
      important: true,
    },
    {
      id: "20",
      title: "Gorjetas e negociação",
      description: "Entenda as práticas locais sobre gorjetas e pechinchação em mercados.",
      category: "culture",
      important: false,
    },
  ];

  const filteredTips = tips.filter((tip) => {
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const importantTips = filteredTips.filter(tip => tip.important);
  const regularTips = filteredTips.filter(tip => !tip.important);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      {/* Header */}
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
                  dangerouslySetInnerHTML={{ __html: iconLightbulb }}
                />
                <span className="font-medium">Dicas essenciais para sua viagem</span>
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
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dicas de Viagem Essenciais 💡
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Prepare-se para uma viagem segura e inesquecível com nossas dicas cuidadosamente selecionadas.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar dicas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? category.gradient + " text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                } px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-5 h-5"
                    dangerouslySetInnerHTML={{ __html: category.icon }}
                  />
                  <span>{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Important Tips Section */}
        {importantTips.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="bg-red-100 dark:bg-red-900 p-2 rounded-lg mr-3">
                ⚠️
              </span>
              Dicas Importantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantTips.map((tip) => {
                const category = categories.find(cat => cat.id === tip.category);
                return (
                  <div
                    key={tip.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-red-500"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {tip.title}
                        </h3>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-xs font-medium">
                          IMPORTANTE
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tip.description}
                      </p>
                      {category && (
                        <div className="flex items-center">
                          <span
                            className="w-4 h-4 mr-2 text-gray-500"
                            dangerouslySetInnerHTML={{ __html: category.icon }}
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {category.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Tips Section */}
        {regularTips.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                💡
              </span>
              Dicas Úteis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTips.map((tip) => {
                const category = categories.find(cat => cat.id === tip.category);
                return (
                  <div
                    key={tip.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tip.description}
                      </p>
                      {category && (
                        <div className="flex items-center">
                          <span
                            className="w-4 h-4 mr-2 text-gray-500"
                            dangerouslySetInnerHTML={{ __html: category.icon }}
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {category.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma dica encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tente ajustar seus filtros ou buscar por outros termos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelTips;