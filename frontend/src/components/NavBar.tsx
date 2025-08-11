// src/components/Navbar.tsx
import {  useLocation, useNavigate } from 'react-router-dom'; // Importa Link e NavLink para navegação
import { iconMapMarkerAlt } from '../assets/icons';
import { type Flight } from '../data/flightInterface'; // Importa a interface de voo

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const { departureFlights, returnFlights, itinerary } = (location.state ||
      {}) as {
      departureFlights: Flight[];
      returnFlights: Flight[];
      itinerary: unknown;
    };


  return (
    <nav className="w-full bg-white p-4 shadow-md flex flex-col md:flex-row items-center justify-between">
      {/* Logo e Slogan (Lado Esquerdo) */}
      <div className="flex items-center mb-3 md:mb-0">
        <button onClick={() => navigate("/forms", { state: { departureFlights, returnFlights, itinerary } })} className="text-2xl font-bold text-blue-600 mr-4">Trip Wise</button>
        <p className="text-gray-600 flex items-center text-sm md:text-base">
          <span className="inline-flex justify-center items-center w-5 h-5 mr-1" dangerouslySetInnerHTML={{__html: iconMapMarkerAlt}} />
          Planeje sua próxima aventura
        </p>
      </div>

      {/* Links de Navegação (Lado Direito) */}
      <div className="flex space-x-6">
        {/* <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-lg font-medium hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`
          }
        >
          Perfil
        </NavLink> */}

        <button
          onClick={() => navigate("/forms", { state: { departureFlights, returnFlights, itinerary } })}
          className={`text-lg font-medium hover:text-blue-600 transition-colors border-b-2
            ${
              location.pathname === "/forms"
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 border-transparent"
            }`}
        >
          Formulário
        </button>
        <button
          onClick={() => navigate("/flights", { state: { departureFlights, returnFlights, itinerary } })}
          className={`text-lg font-medium hover:text-blue-600 transition-colors border-b-2
            ${
              location.pathname === "/flights"
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 border-transparent"
            }`}
        >
          Voos
        </button>
        <button
          onClick={() => navigate("/itinerary", { state: { departureFlights, returnFlights, itinerary } })}
          className={`text-lg font-medium hover:text-blue-600 transition-colors border-b-2
            ${
              location.pathname === "/itinerary"
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 border-transparent"
            }`}
        >
          Roteiro
        </button>
      </div>
    </nav>
  );
}