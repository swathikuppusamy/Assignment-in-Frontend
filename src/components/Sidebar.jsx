import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Check,
  MoreVertical
} from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

const MiniCalendar = ({ currentDate, onDateSelect }) => {
  const [miniDate, setMiniDate] = useState(new Date());
  const year = miniDate.getFullYear();
  const month = miniDate.getMonth();
  const daysInMonth = dateUtils.getDaysInMonth(year, month);
  const firstDayOfMonth = dateUtils.getFirstDayOfMonth(year, month);
  const monthNames = dateUtils.getMonthNames();

  const handlePrevMonth = () => {
    setMiniDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setMiniDate(new Date(year, month + 1, 1));
  };

  const renderMiniCalendar = () => {
    const days = [];
    
    // Empty cells for days before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = dateUtils.isToday(year, month, day);
      const isSelected = currentDate.getFullYear() === year && 
                        currentDate.getMonth() === month && 
                        currentDate.getDate() === day;
      
      days.push(
        <button
          key={day}
          onClick={() => onDateSelect && onDateSelect(new Date(year, month, day))}
          className={`
            w-8 h-8 text-sm rounded-lg flex items-center justify-center transition-colors
            ${isToday ? 'bg-blue-600 text-white font-semibold' : ''}
            ${isSelected && !isToday ? 'bg-blue-100 text-blue-600 font-medium' : ''}
            ${!isToday && !isSelected ? 'hover:bg-gray-100 text-gray-700' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      {/* Mini calendar header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-800">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="w-8 h-6 text-xs text-gray-500 font-medium flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderMiniCalendar()}
      </div>
    </div>
  );
};

const Sidebar = ({ 
  isOpen, 
  onClose, 
  currentDate, 
  onDateSelect,
  calendars = [],
  onCalendarToggle 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const defaultCalendars = [
    { id: 'personal', name: 'Personal', color: 'bg-blue-500', enabled: true },
    { id: 'work', name: 'Work', color: 'bg-red-500', enabled: true },
    { id: 'family', name: 'Family', color: 'bg-green-500', enabled: true },
    { id: 'birthdays', name: 'Birthdays', color: 'bg-purple-500', enabled: false },
    { id: 'holidays', name: 'Holidays', color: 'bg-orange-500', enabled: true }
  ];

  const calendarList = calendars.length > 0 ? calendars : defaultCalendars;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-78 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-auto
      `}>
       
        
        {/* Create button */}
        <div className="p-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create</span>
          </button>
        </div>
        
        {/* Mini calendar */}
        <div className="px-4 pb-4">
          <MiniCalendar 
            currentDate={currentDate}
            onDateSelect={onDateSelect}
          />
        </div>
        
        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for people, events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* My calendars */}
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center justify-between">
            My calendars
            <button className="p-1 rounded hover:bg-gray-100">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </h3>
          
          <div className="space-y-2">
            {calendarList.map((calendar) => (
              <div key={calendar.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <button
                  onClick={() => onCalendarToggle && onCalendarToggle(calendar.id)}
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                    ${calendar.enabled 
                      ? `${calendar.color} border-transparent` 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                >
                  {calendar.enabled && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className={`flex-1 text-sm ${calendar.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
                  {calendar.name}
                </span>
                <button className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Other calendars */}
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Other calendars</h3>
          <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add other calendars</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;