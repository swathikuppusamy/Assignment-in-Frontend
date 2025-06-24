import React from 'react';
import { dateUtils } from '../utils/dateUtils';

const EventItem = ({ event, onClick, isConflict }) => {
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

  const formatTimeShort = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const displayHour = hour % 12 || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${displayHour}:${minutes}${ampm}`;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(event);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(event);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Event: ${event.title} at ${dateUtils.formatTime(event.time)}`}
      className={`
        event-item text-xs p-2 mb-1 rounded-md cursor-pointer truncate 
        transition-all duration-200 ease-in-out
        hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500
        border-l-3 relative
        ${isConflict 
          ? 'bg-red-100 text-red-800 border-l-red-500 hover:bg-red-200' 
          : getPriorityClass(event.priority)
        }
      `}
    >
      {/* Time */}
      <div className="font-semibold text-xs mb-1">
        {formatTimeShort(event.time)}
      </div>
      
      {/* Title */}
      <div className="font-medium truncate mb-1" title={event.title}>
        {event.title}
      </div>
      
      {/* Duration and Location */}
      <div className="text-xs opacity-75 truncate">
        {event.duration}min
        {event.location && (
          <span className="ml-1" title={event.location}>
            • {event.location.length > 10 ? event.location.substring(0, 10) + '...' : event.location}
          </span>
        )}
      </div>
      
      {/* Conflict indicator */}
      {isConflict && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" 
             title="Time conflict detected" />
      )}
      
      {/* Priority indicator */}
      {event.priority === 'high' && !isConflict && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" 
             title="High priority" />
      )}
    </div>
  );
};

export default EventItem;