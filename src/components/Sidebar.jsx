import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Check,
  MoreVertical,
  Settings
} from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';
import EventCreate from './EventCreate';

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

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
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

const Sidebar = ({ 
  isOpen, 
  onClose, 
  currentDate, 
  onDateSelect,
  calendars = [],
  onCalendarToggle,
  onEventCreate
}) => {
  const [showEventCreate, setShowEventCreate] = useState(false);

  const defaultCalendars = [
    { id: 'personal', name: 'Personal', color: 'bg-blue-500', enabled: true },
    { id: 'work', name: 'Work', color: 'bg-red-500', enabled: true },
    { id: 'family', name: 'Family', color: 'bg-green-500', enabled: true },
    { id: 'birthdays', name: 'Birthdays', color: 'bg-purple-500', enabled: true },
    { id: 'holidays', name: 'Holidays', color: 'bg-orange-500', enabled: true }
  ];

  const calendarList = calendars.length > 0 ? calendars : defaultCalendars;

  const handleCreateClick = () => {
    setShowEventCreate(true);
  };

  const handleEventSave = (eventData) => {
    onEventCreate && onEventCreate(eventData);
    setShowEventCreate(false);
  };

  const handleEventCreateClose = () => {
    setShowEventCreate(false);
  };

  return (
    <>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:z-auto
      `}>

        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
    
        <div className="p-4">
          <button 
            onClick={handleCreateClick}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create</span>
          </button>
        </div>
        
        <div className="px-4 pb-4">
          <MiniCalendar 
            currentDate={currentDate}
            onDateSelect={onDateSelect}
          />
        </div>
  
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">
              My calendars
            </h3>
            
          </div>
          
          <div className="space-y-1">
            {calendarList.map((calendar) => (
              <div key={calendar.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                <button
                  onClick={() => onCalendarToggle && onCalendarToggle(calendar.id)}
                  className={`
                    w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
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
               
              </div>
            ))}
          </div>
        </div>

      

        
      </div>

      <EventCreate
        isOpen={showEventCreate}
        onClose={handleEventCreateClose}
        onSave={handleEventSave}
        selectedDate={currentDate}
      />
    </>
  );
};

export default Sidebar;