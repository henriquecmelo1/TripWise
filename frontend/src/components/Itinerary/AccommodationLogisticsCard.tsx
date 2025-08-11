// src/components/Itinerary/AccommodationLogisticsCard.tsx

interface AccommodationLogisticsCardProps {
  hospedagem: string;
  logistica: string;
  iconHotel: string;
  iconBriefcase: string;
}

export default function AccommodationLogisticsCard({
  hospedagem,
  logistica,
  iconHotel,
  iconBriefcase,
}: AccommodationLogisticsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ml-11">
      <div className="bg-yellow-50 p-5 rounded-lg shadow-sm border border-yellow-200">
        <p className="text-lg font-bold text-gray-800 flex items-center mb-2">
          <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-yellow-600" dangerouslySetInnerHTML={{ __html: iconHotel }} />
          Hospedagem:
        </p>
        <p className="text-base text-gray-700 ml-9">{hospedagem}</p>
      </div>
      <div className="bg-purple-50 p-5 rounded-lg shadow-sm border border-purple-200">
        <p className="text-lg font-bold text-gray-800 flex items-center mb-2">
          <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-purple-600" dangerouslySetInnerHTML={{ __html: iconBriefcase }} />
          Logística:
        </p>
        <p className="text-base text-gray-700 ml-9">{logistica}</p>
      </div>
    </div>
  );
}