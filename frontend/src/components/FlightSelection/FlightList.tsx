import FlightCard from "./FlightCard"; // O card de voo que você já tem
import { type Flight } from "../../data/flightInterface";
import { planeIcon } from "../../assets/icons"; // A interface de voo

interface FlightListProps {
  flights: Flight[];
  title: string; // O título da seção, ex: "Voos de Ida para Rio de Janeiro"
  selectedFlight: Flight | null; // O voo selecionado nesta lista
  onSelectFlight: (flight: Flight) => void; // Função para selecionar o voo
}

export default function FlightList({
  flights,
  title,
  selectedFlight,
  onSelectFlight,
}: FlightListProps) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span
          className="inline-flex justify-center items-center w-8 h-8 mr-3 text-blue-600"
          dangerouslySetInnerHTML={{ __html: planeIcon }}
        />

        {title}
      </h3>
      {flights.length > 0 ? (
        flights.map((flight) => (
          <div
            key={flight.id}
            onClick={() => onSelectFlight(flight)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedFlight?.id === flight.id
                ? "border-2 border-blue-500 shadow-lg"
                : "border border-transparent"
            }`}
          >
            <FlightCard flight={flight} />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-300 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          Nenhuma opção de voo encontrada.
        </div>
      )}
    </div>
  );
}
