import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

const MiniCalendar = ({ currentDate, onDateSelect }) => {
  const [miniDate, setMiniDate] = useState(new Date());
  const year = miniDate.getFullYear();
  const month = miniDate.getMonth();
  const daysInMonth = dateUtils.getDaysInMonth(year, month);
  const firstDayOfMonth = dateUtils.getFirstDayOfMonth(year, month);
  const monthNames = dateUtils.getMonthNames();

  const handlePrevMonth = () => setMiniDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setMiniDate(new Date(year, month + 1, 1));

  const renderMiniCalendar = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = dateUtils.isToday(year, month, day);
      const isSelected = currentDate.getFullYear() === year && 
                        currentDate.getMonth() === month && 
                        currentDate.getDate() === day;
      
      days.push(
        <button
          key={day}
          onClick={() => onDateSelect && onDateSelect(new Date(year, month, day))}
          className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-all hover:bg-blue-50 ${
            isToday ? 'bg-blue-600 text-white font-semibold shadow-lg' : 
            isSelected && !isToday ? 'bg-blue-100 text-blue-700 font-medium' : 
            'text-gray-700 hover:text-blue-600'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-gray-100">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-800">
          {monthNames[month]} {year}
        </span>
        <button onClick={handleNextMonth} className="p-1 rounded hover:bg-gray-100">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dateUtils.getDayNamesShort().map((day, index) => (
          <div key={index} className="w-8 h-6 text-xs text-gray-500 font-medium flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderMiniCalendar()}
      </div>
    </div>
  );
};

export default MiniCalendar;