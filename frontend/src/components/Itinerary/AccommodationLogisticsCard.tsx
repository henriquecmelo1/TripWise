
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
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-700">
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center mb-2">
          <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" dangerouslySetInnerHTML={{ __html: iconHotel }} />
          Hospedagem:
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 ml-9">{hospedagem}</p>
      </div>
      <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700">
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center mb-2">
          <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" dangerouslySetInnerHTML={{ __html: iconBriefcase }} />
          Logística:
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 ml-9">{logistica}</p>
      </div>
    </div>
  );
}