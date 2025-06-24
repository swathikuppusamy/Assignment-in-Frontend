import React from 'react';

const EventItem = ({ event, onClick, isConflict, compact = false }) => {
  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'border-red-400 bg-red-50 text-red-800';
      case 'medium':
        return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low':
        return 'border-green-400 bg-green-50 text-green-800';
      default:
        return 'border-blue-400 bg-blue-50 text-blue-800';
    }
  };

  const getColorClass = (color) => {
    // Handle both bg-color-500 format and just color format
    if (color && color.startsWith('bg-')) {
      return color.replace('bg-', 'border-').replace('-500', '-400') + ' ' + color.replace('-500', '-50');
    }
    return 'border-blue-400 bg-blue-50';
  };

  const formatTimeShort = (time) => {
    if (!time || time === 'All day') {
      return 'All day';
    }
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const displayHour = hour % 12 || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${displayHour}:${minutes}${ampm}`;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick(event);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick(event);
    }
  };

  // Use the color from event or priority-based color
  const colorClass = event.color ? getColorClass(event.color) : getPriorityClass(event.priority);

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Event: ${event.title}`}
      className={`
        p-2 rounded-lg border-l-4 cursor-pointer transition-all duration-200 
        hover:shadow-md hover:scale-105 active:scale-95
        ${compact ? 'text-xs' : 'text-sm'}
        ${colorClass}
        ${isConflict ? 'ring-2 ring-red-300' : ''}
      `}
    >
      {/* Time */}
      <div className={`font-medium text-gray-700 ${compact ? 'text-xs' : 'text-sm'}`}>
        {formatTimeShort(event.time || event.startTime)}
      </div>
      
      {/* Title */}
      <div className={`font-semibold truncate ${compact ? 'text-xs' : 'text-sm'}`}>
        {event.title}
      </div>
      
      {/* Duration and Location */}
      <div className={`text-gray-600 truncate ${compact ? 'text-xs' : 'text-xs'}`}>
        {event.duration && event.duration !== 'All day' && (
          <span>{event.duration}min</span>
        )}
        {event.location && (
          <>
            {event.duration && event.duration !== 'All day' && <span> • </span>}
            <span>
              {event.location.length > 10 
                ? event.location.substring(0, 10) + '...' 
                : event.location
              }
            </span>
          </>
        )}
      </div>
      
      {/* Conflict indicator */}
      {isConflict && (
        <div className="mt-1">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="ml-1 text-xs text-red-600">Conflict</span>
        </div>
      )}
      
      {/* Priority indicator */}
      {event.priority === 'high' && !isConflict && (
        <div className="mt-1">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="ml-1 text-xs text-red-600">High Priority</span>
        </div>
      )}
    </div>
  );
};

export default EventItem;