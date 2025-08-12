import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildApiUrl, API_CONFIG } from "../constants/api";
import LoadingSpinner from "../components/LoadingSpinner";

interface GeneratingState {
  agendarVoo?: boolean;
  dataToSend?: any;
  departureFlightData?: any;
  returnFlightData?: any;
}

export default function Generating() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as GeneratingState;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const runGeneration = async () => {
      try {
        if (!state?.dataToSend) {
          navigate("/forms");
          return;
        }

        if (state.agendarVoo) {
          const [departureResponse, returnResponse, itineraryResponse] = await Promise.all([
            fetch(buildApiUrl("/flights/search"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(state.departureFlightData),
            }),
            fetch(buildApiUrl("/flights/search"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(state.returnFlightData),
            }),
            fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AI.GENERATE_ITINERARY), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(state.dataToSend),
            }),
          ]);

          if (!departureResponse.ok || !returnResponse.ok || !itineraryResponse.ok) {
            const errorData = await itineraryResponse.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro do servidor: ${itineraryResponse.status}`);
          }

          const [departureData, returnData, itineraryData] = await Promise.all([
            departureResponse.json(),
            returnResponse.json(),
            itineraryResponse.json(),
          ]);

          if (!isCancelled) {
            navigate("/flights", {
              state: {
                departureFlights: departureData,
                returnFlights: returnData,
                itinerary: itineraryData,
              },
            });
          }
          return;
        }

        // Only itinerary generation
        const itineraryResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AI.GENERATE_ITINERARY), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.dataToSend),
        });

        if (!itineraryResponse.ok) {
          const errorData = await itineraryResponse.json().catch(() => ({}));
          throw new Error(errorData.message || `Erro do servidor: ${itineraryResponse.status}`);
        }

        const itineraryData = await itineraryResponse.json();
        if (!isCancelled) {
          navigate("/itinerary", { state: { itinerary: itineraryData } });
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err?.message || "Falha ao gerar o roteiro. Tente novamente.");
        }
      }
    };

    runGeneration();
    return () => {
      isCancelled = true;
    };
  }, [navigate, state]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-6">
      <div className="max-w-xl w-full">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] animate-spin-slow">
              <div className="h-full w-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gerando seu roteiro personalizado</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Estamos preparando recomendações únicas, experiências autênticas e um plano sob medida para sua viagem.</p>

          <div className="mt-6">
            <LoadingSpinner text="Isso pode levar alguns segundos..." />
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
              <p className="font-medium">{error}</p>
              <button
                className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                onClick={() => navigate(-1)}
              >
                Voltar
              </button>
            </div>
          )}

          {!error && (
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Dica: você poderá salvar, favoritar e exportar seu roteiro em PDF ao final.
            </div>
          )}
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}