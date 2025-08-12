import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  iconMapMarkerAlt,
  iconCalendar,
  iconDollarSign,
} from "../assets/icons";

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  bestTime: string;
  budget: "low" | "medium" | "high";
  type: string[];
  highlights: string[];
  climate: string;
  image: string;
  rating: number;
  popularActivities: string[];
}

interface FilterOption {
  id: string;
  name: string;
  icon?: string;
}

const ExploreDestinations: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const continents: FilterOption[] = [
    { id: "all", name: "Todos os Continentes" },
    { id: "europe", name: "Europa" },
    { id: "asia", name: "Ásia" },
    { id: "africa", name: "África" },
    { id: "america-north", name: "América do Norte" },
    { id: "america-south", name: "América do Sul" },
    { id: "oceania", name: "Oceania" },
  ];

  const budgetTypes: FilterOption[] = [
    { id: "all", name: "Todos os Orçamentos" },
    { id: "low", name: "Econômico" },
    { id: "medium", name: "Moderado" },
    { id: "high", name: "Premium" },
  ];

  const travelTypes: FilterOption[] = [
    { id: "all", name: "Todos os Tipos" },
    { id: "culture", name: "Cultural" },
    { id: "beach", name: "Praia" },
    { id: "adventure", name: "Aventura" },
    { id: "nature", name: "Natureza" },
    { id: "city", name: "Cidade" },
    { id: "relaxation", name: "Relaxamento" },
  ];

  const destinations: Destination[] = [
    {
      id: "1",
      name: "Paris",
      country: "França",
      continent: "europe",
      description: "A cidade luz oferece arte, cultura, gastronomia e romance incomparáveis.",
      bestTime: "Abril a Junho, Setembro a Outubro",
      budget: "high",
      type: ["culture", "city"],
      highlights: ["Torre Eiffel", "Louvre", "Champs-Élysées", "Montmartre"],
      climate: "Temperado oceânico",
      image: "🇫🇷",
      rating: 4.8,
      popularActivities: ["Museus", "Gastronomia", "Arquitetura", "Arte"],
    },
    {
      id: "2",
      name: "Tóquio",
      country: "Japão",
      continent: "asia",
      description: "Metrópole vibrante que combina tradição milenar com tecnologia de ponta.",
      bestTime: "Março a Maio, Setembro a Novembro",
      budget: "high",
      type: ["culture", "city"],
      highlights: ["Shibuya Crossing", "Templo Senso-ji", "Harajuku", "Tokyo Skytree"],
      climate: "Subtropical úmido",
      image: "🇯🇵",
      rating: 4.9,
      popularActivities: ["Tecnologia", "Tradição", "Gastronomia", "Anime"],
    },
    {
      id: "3",
      name: "Bali",
      country: "Indonésia",
      continent: "asia",
      description: "Ilha paradisíaca com praias deslumbrantes, templos sagrados e cultura rica.",
      bestTime: "Abril a Outubro",
      budget: "medium",
      type: ["beach", "relaxation", "culture"],
      highlights: ["Ubud", "Tanah Lot", "Kuta Beach", "Templos hindus"],
      climate: "Tropical",
      image: "🇮🇩",
      rating: 4.7,
      popularActivities: ["Surf", "Yoga", "Templos", "Natureza"],
    },
    {
      id: "4",
      name: "Machu Picchu",
      country: "Peru",
      continent: "america-south",
      description: "Cidade perdida dos incas, uma das maravilhas do mundo moderno.",
      bestTime: "Maio a Setembro",
      budget: "medium",
      type: ["adventure", "culture", "nature"],
      highlights: ["Trilha Inca", "Huayna Picchu", "Aguas Calientes", "Ruínas incas"],
      climate: "Subtropical de montanha",
      image: "🇵🇪",
      rating: 4.9,
      popularActivities: ["Trekking", "História", "Fotografia", "Arqueologia"],
    },
    {
      id: "5",
      name: "Santorini",
      country: "Grécia",
      continent: "europe",
      description: "Ilha grega com pôr do sol espetacular e arquitetura cicládica única.",
      bestTime: "Maio a Outubro",
      budget: "high",
      type: ["beach", "relaxation", "culture"],
      highlights: ["Oia", "Fira", "Red Beach", "Vinícolas"],
      climate: "Mediterrâneo",
      image: "🇬🇷",
      rating: 4.8,
      popularActivities: ["Pôr do sol", "Vinhos", "Praias", "Romance"],
    },
    {
      id: "6",
      name: "Serengeti",
      country: "Tanzânia",
      continent: "africa",
      description: "Parque nacional famoso pela migração dos gnus e vida selvagem abundante.",
      bestTime: "Junho a Outubro",
      budget: "high",
      type: ["nature", "adventure"],
      highlights: ["Big Five", "Migração", "Cratéra Ngorongoro", "Safári"],
      climate: "Tropical seco",
      image: "🇹🇿",
      rating: 4.9,
      popularActivities: ["Safari", "Vida selvagem", "Fotografia", "Natureza"],
    },
    {
      id: "7",
      name: "Bangkok",
      country: "Tailândia",
      continent: "asia",
      description: "Capital vibrante com templos dourados, street food incrível e vida noturna.",
      bestTime: "Novembro a Março",
      budget: "low",
      type: ["culture", "city"],
      highlights: ["Grand Palace", "Wat Pho", "Mercados flutuantes", "Khao San Road"],
      climate: "Tropical",
      image: "🇹🇭",
      rating: 4.6,
      popularActivities: ["Templos", "Street food", "Compras", "Massagem"],
    },
    {
      id: "8",
      name: "Sydney",
      country: "Austrália",
      continent: "oceania",
      description: "Cidade cosmopolita com ópera icônica, praias urbanas e vida cultural rica.",
      bestTime: "Setembro a Novembro, Março a Maio",
      budget: "high",
      type: ["city", "beach"],
      highlights: ["Opera House", "Harbour Bridge", "Bondi Beach", "The Rocks"],
      climate: "Subtropical úmido",
      image: "🇦🇺",
      rating: 4.7,
      popularActivities: ["Praias", "Cultura", "Arquitetura", "Surf"],
    },
    {
      id: "9",
      name: "Marrakech",
      country: "Marrocos",
      continent: "africa",
      description: "Cidade imperial com medina histórica, souks coloridos e paláciosornamentados.",
      bestTime: "Outubro a Abril",
      budget: "medium",
      type: ["culture", "adventure"],
      highlights: ["Jemaa el-Fnaa", "Souks", "Palácio Bahia", "Jardins Majorelle"],
      climate: "Árido",
      image: "🇲🇦",
      rating: 4.5,
      popularActivities: ["Souks", "Culinária", "Arquitetura", "Deserto"],
    },
    {
      id: "10",
      name: "Rio de Janeiro",
      country: "Brasil",
      continent: "america-south",
      description: "Cidade maravilhosa com praias icônicas, Cristo Redentor e carnaval vibrante.",
      bestTime: "Maio a Setembro",
      budget: "medium",
      type: ["beach", "culture", "city"],
      highlights: ["Cristo Redentor", "Copacabana", "Pão de Açúcar", "Santa Teresa"],
      climate: "Tropical",
      image: "🇧🇷",
      rating: 4.6,
      popularActivities: ["Praias", "Samba", "Futebol", "Natureza"],
    },
    {
      id: "11",
      name: "Reykjavik",
      country: "Islândia",
      continent: "europe",
      description: "Capital nórdica com aurora boreal, gêiseres, e paisagens vulcânicas únicas.",
      bestTime: "Junho a Agosto (verão), Setembro a Março (aurora)",
      budget: "high",
      type: ["nature", "adventure"],
      highlights: ["Aurora boreal", "Blue Lagoon", "Gêiseres", "Gullfoss"],
      climate: "Subártico oceânico",
      image: "🇮🇸",
      rating: 4.8,
      popularActivities: ["Aurora boreal", "Termas", "Vulcões", "Trekking"],
    },
    {
      id: "12",
      name: "Dubai",
      country: "Emirados Árabes Unidos",
      continent: "asia",
      description: "Metrópole futurista com arranha-céus impressionantes e luxo sem igual.",
      bestTime: "Novembro a Março",
      budget: "high",
      type: ["city", "adventure"],
      highlights: ["Burj Khalifa", "Palm Jumeirah", "Desert Safari", "Dubai Mall"],
      climate: "Desértico",
      image: "🇦🇪",
      rating: 4.7,
      popularActivities: ["Compras", "Arquitetura", "Deserto", "Luxo"],
    },
  ];

  const filteredDestinations = destinations.filter((destination) => {
    const matchesContinent = selectedContinent === "all" || destination.continent === selectedContinent;
    const matchesBudget = selectedBudget === "all" || destination.budget === selectedBudget;
    const matchesType = selectedType === "all" || destination.type.includes(selectedType);
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesContinent && matchesBudget && matchesType && matchesSearch;
  });

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case "low": return { label: "Econômico", color: "text-green-600 dark:text-green-400" };
      case "medium": return { label: "Moderado", color: "text-yellow-600 dark:text-yellow-400" };
      case "high": return { label: "Premium", color: "text-red-600 dark:text-red-400" };
      default: return { label: budget, color: "text-gray-600 dark:text-gray-400" };
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < Math.floor(rating)
            ? "text-yellow-400"
            : index < rating
            ? "text-yellow-300"
            : "text-gray-300 dark:text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

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
                  dangerouslySetInnerHTML={{ __html: iconMapMarkerAlt }}
                />
                <span className="font-medium">Descubra destinos incríveis</span>
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
            Explorar Destinos 🌍
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubra lugares incríveis ao redor do mundo e encontre sua próxima aventura.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar destinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Continent Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Continente
              </label>
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {continents.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Orçamento
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {budgetTypes.map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Viagem
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {travelTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destino encontrado' : 'destinos encontrados'}
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => {
              const budgetInfo = getBudgetLabel(destination.budget);
              return (
                <div
                  key={destination.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{destination.image}</div>
                      <div className="flex items-center space-x-1">
                        {renderStars(destination.rating)}
                        <span className="ml-2 text-sm">({destination.rating})</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-blue-100">{destination.country}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {destination.description}
                    </p>

                    {/* Info Grid */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <span
                          className="w-4 h-4 mr-3 text-gray-500"
                          dangerouslySetInnerHTML={{ __html: iconCalendar }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {destination.bestTime}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className="w-4 h-4 mr-3 text-gray-500"
                          dangerouslySetInnerHTML={{ __html: iconDollarSign }}
                        />
                        <span className={`text-sm font-medium ${budgetInfo.color}`}>
                          {budgetInfo.label}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Clima:</strong> {destination.climate}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Principais Atrações:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                        {destination.highlights.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{destination.highlights.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate("/forms", { state: { destination: destination.name } })}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Planejar Viagem
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum destino encontrado
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

export default ExploreDestinations;