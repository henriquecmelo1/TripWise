import { type Flight } from "../../data/flightInterface";
import { planeIcon, clockIcon } from "../../assets/icons"; // Importa a interface Flight e ícones genéricos

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  // Função auxiliar para extrair apenas a hora do string "DD de Mês. de YYYY, HH:MM"
  const getHour = (dateTimeString: string) => {
    const parts = dateTimeString.split(", ");
    return parts.length > 1 ? parts[1] : dateTimeString;
  };

  const getDate = (dateTimeString: string) => {
    const parts = dateTimeString.split(", ");
    return parts.length > 0 ? parts[0] : dateTimeString;
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 flex items-center">
      {/* Coluna 1: Companhia Aérea e Número do Voo */}
      {/* w-20 para uma largura fixa, text-center para centralizar conteúdo */}
      <div className="flex-shrink-0 w-20 text-center mr-4">
        {/* Ícone de Avião Genérico */}
        <span
          className="inline-flex justify-center items-center w-8 h-8 text-blue-600 mb-1"
          dangerouslySetInnerHTML={{ __html: planeIcon }}
        />
        {/* Mostra só a primeira palavra da companhia aérea (ex: GOL, LATAM) */}
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {flight.companhiaAerea.split(" ")[0]}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Voo {flight.numeroVoo}</p>
      </div>

      {/* Coluna 2: Detalhes do Voo (Horários, Duração, Origem e Destino) */}
      {/* flex-grow para ocupar o espaço disponível, flex-col para layout vertical interno */}
      <div className="flex-grow flex flex-col justify-center">
        {/* Linha Superior: Horários de Partida e Chegada, com Duração no Meio */}
        {/* justify-between para empurrar horários para as pontas, items-center para alinhar verticalmente */}
        <div className="flex items-center justify-center mb-1">
          {/* Horário de Partida com Data */}
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {getHour(flight.dataHoraPartida)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getDate(flight.dataHoraPartida)}
            </p>
          </div>

          {/* Duração no meio */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mx-4">
            <span
              className="inline-flex justify-center items-center w-4 h-4 mr-1"
              dangerouslySetInnerHTML={{ __html: clockIcon }}
            />
            {flight.duracao}
          </div>

          {/* Horário de Chegada com Data */}
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {getHour(flight.dataHoraChegada)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getDate(flight.dataHoraChegada)}
            </p>
          </div>
        </div>

        {/* Linha Inferior: Aeroportos de Origem e Destino com Seta */}
        {/* justify-between para empurrar aeroportos para as pontas */}
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">{flight.origem}</p>
          <span className="text-gray-400 dark:text-gray-500 text-lg mx-2">→</span>{" "}
          {/* Seta como separador */}
          <p className="text-sm text-gray-500 dark:text-gray-400">{flight.destino}</p>
        </div>
      </div>

      {/* Coluna 3: Preços */}
      {/* ml-4 para margem esquerda, text-right para alinhar texto à direita, min-w-[120px] para garantir espaço mínimo */}
      <div className="flex-shrink-0 ml-4 text-right min-w-[150px]">
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{flight.precoTotal}</p>
        {flight.precoAdulto && (
          <p className="text-xs text-gray-500 dark:text-gray-400">Passagem Adulto: {flight.precoAdulto}</p>
        )}
        {flight.precoCrianca != 'N/A'&& (
          <p className="text-xs text-gray-500 dark:text-gray-400">Passagem Criança: {flight.precoCrianca}</p>
        )}

      </div>
    </div>
  );
}
