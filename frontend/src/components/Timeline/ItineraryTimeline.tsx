import React from 'react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  type: 'activity' | 'meal' | 'transport' | 'accommodation' | 'other';
  duration?: string;
  location?: string;
}

interface DayTimeline {
  day: number;
  date: string;
  events: TimelineEvent[];
}

interface ItineraryTimelineProps {
  timeline: DayTimeline[];
  className?: string;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ timeline, className = '' }) => {

  const getEventIcon = (type: string) => {
    const icons = {
      activity: '🎯',
      meal: '🍽️',
      transport: '🚗',
      accommodation: '🏨',
      other: '📍',
    };
    return icons[type as keyof typeof icons] || icons.other;
  };

  const getEventColor = (type: string) => {
    const colors = {
      activity: 'bg-blue-500',
      meal: 'bg-orange-500',
      transport: 'bg-green-500',
      accommodation: 'bg-purple-500',
      other: 'bg-gray-500',
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  if (timeline.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">Nenhum evento na timeline</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {timeline.map((day) => (
        <div key={day.day} className="relative">
          {/* Day Header */}
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
              {day.day}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Dia {day.day}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{day.date}</p>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-6 space-y-6">
            {day.events.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute -left-9 w-6 h-6 rounded-full ${getEventColor(event.type)} flex items-center justify-center text-white text-xs font-bold`}>
                  {getEventIcon(event.type)}
                </div>

                {/* Event content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {event.time}
                        </span>
                        {event.duration && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                            {event.duration}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {event.title}
                      </h4>
                      {event.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          📍 {event.location}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'activity' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      event.type === 'meal' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      event.type === 'transport' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      event.type === 'accommodation' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {event.type === 'activity' ? 'Atividade' :
                       event.type === 'meal' ? 'Refeição' :
                       event.type === 'transport' ? 'Transporte' :
                       event.type === 'accommodation' ? 'Hospedagem' :
                       'Outro'}
                    </span>
                  </div>
                </div>

                {/* Connector line to next event */}
                {index < day.events.length - 1 && (
                  <div className="absolute -left-8 top-6 w-1 h-6 bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;