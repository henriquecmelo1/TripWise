import { useLocation, useNavigate } from "react-router-dom";
import {
  iconMapMarkerAlt,
  iconCalendar,
  iconStar,
} from "../assets/icons";
import { type Flight } from "../data/flightInterface";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { departureFlights, returnFlights, itinerary } = (location.state ||
    {}) as {
    departureFlights: Flight[];
    returnFlights: Flight[];
    itinerary: unknown;
  };

  const navItems = [
    {
      path: "/forms",
      label: "Formulário",
      icon: iconMapMarkerAlt,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      path: "/flights",
      label: "Voos",
      icon: iconCalendar,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      path: "/itinerary",
      label: "Roteiro",
      icon: iconStar,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path, { state: { departureFlights, returnFlights, itinerary } });
  };

  const handleHomeNavigation = () => {
    navigate("/", { state: { departureFlights, returnFlights, itinerary } });
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          {/* Logo e Slogan */}
          <div className="flex items-center mb-4 md:mb-0 group">
            <button
              onClick={handleHomeNavigation}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mr-4 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Trip Wise
            </button>
            <div className="hidden md:flex items-center text-gray-600 dark:text-gray-300 text-sm lg:text-base transition-colors duration-300">
              <span
                className="inline-flex justify-center items-center w-5 h-5 mr-2 text-blue-500 group-hover:animate-bounce"
                dangerouslySetInnerHTML={{ __html: iconMapMarkerAlt }}
              />
              <span className="font-medium">Planeje sua próxima aventura</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-2 md:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                  isActive(item.path)
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-blue-500"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <span className="text-sm md:text-base">{item.label}</span>

                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
    </nav>
  );
}
