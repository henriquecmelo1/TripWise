// src/components/Navbar.tsx
import { Link, NavLink } from 'react-router-dom'; // Importa Link e NavLink para navegação
import { iconMapMarkerAlt } from '../assets/icons';

export default function Navbar() {
  // Ícone para a navbar global (o mesmo map marker usado anteriormente)

  return (
    <nav className="w-full bg-white p-4 shadow-md flex flex-col md:flex-row items-center justify-between">
      {/* Logo e Slogan (Lado Esquerdo) */}
      <div className="flex items-center mb-3 md:mb-0">
        <Link to="/forms" className="text-2xl font-bold text-blue-600 mr-4">Trip Wise</Link>
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

        <NavLink
          to="/forms"
          className={({ isActive }) =>
            `text-lg font-medium hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`
          }
        >
          Formulário
        </NavLink>
        <NavLink
          to="/flights"
          className={({ isActive }) =>
            `text-lg font-medium hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`
          }
        >
          Voos
        </NavLink>
        <NavLink
          to="/itinerary"
          className={({ isActive }) =>
            `text-lg font-medium hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`
          }
        >
          Roteiro
        </NavLink>
      </div>
    </nav>
  );
}