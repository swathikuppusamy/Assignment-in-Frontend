import React from 'react';
import { dateUtils } from '../utils/dateUtils';
import EventItem from './EventItem';

const CalendarGrid = ({ currentDate, events, onEventClick, viewMode = 'month' }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = dateUtils.getDaysInMonth(year, month);
  const firstDayOfMonth = dateUtils.getFirstDayOfMonth(year, month);
  const dayNames = dateUtils.getDayNames();

  const getEventsForDate = (date) => {
    const dateString = dateUtils.formatDate(new Date(year, month, date));
    return events.filter(event => event.date === dateString);
  };

  const renderMonthView = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const prevMonthDays = dateUtils.getDaysInMonth(prevYear, prevMonth);
      const prevDay = prevMonthDays - (firstDayOfMonth - i - 1);
      
      days.push(
        <div key={`prev-${i}`} className="min-h-32 bg-gray-50 border border-gray-100 p-3 opacity-40">
          <span className="text-sm text-gray-400 font-medium">{prevDay}</span>
        </div>
      );
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = dateUtils.isToday(year, month, day);
      const dayOfWeek = (firstDayOfMonth + day - 1) % 7;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      days.push(
        <div
          key={day}
          className={`min-h-32 border border-gray-100 p-3 transition-all duration-200 relative group cursor-pointer
            ${isToday 
              ? 'bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-100' 
              : isWeekend 
                ? 'bg-gray-50 hover:bg-gray-100' 
                : 'bg-white hover:bg-gray-50'
            } hover:shadow-sm`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
              ${isToday 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-gray-200'
              }`}>
              {day}
            </div>
            
            <button className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-all">
              +
            </button>
          </div>
          
          <div className="space-y-1 max-h-20 overflow-hidden">
            {dayEvents.slice(0, 3).map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onClick={onEventClick}
                compact={true}
              />
            ))}
            
            {dayEvents.length > 3 && (
              <button className="w-full text-xs text-gray-500 text-left py-1 px-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                +{dayEvents.length - 3} more
              </button>
            )}
          </div>
          
          {isToday && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
          )}
        </div>
      );
    }
    
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDayOfMonth + daysInMonth);
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="min-h-32 bg-gray-50 border border-gray-100 p-3 opacity-40">
          <span className="text-sm text-gray-400 font-medium">{day}</span>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar-grid bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map((day, index) => {
          const isWeekend = index === 0 || index === 6;
          return (
            <div 
              key={day} 
              className={`p-4 text-center font-semibold text-sm
                ${isWeekend ? 'bg-gray-100 text-gray-600' : 'bg-gray-50 text-gray-700'}
                border-r border-gray-200 last:border-r-0`}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-7">
        {renderMonthView()}
      </div>
    </div>
  );
};

export default CalendarGrid;