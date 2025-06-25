import React, { useState } from 'react';
import { dateUtils } from '../utils/dateUtils';
import EventItem from './EventItem';
import EventCreate from './EventCreate';

const CalendarGrid = ({ currentDate, events, onEventClick, onEventCreate, viewMode = 'month' }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = dateUtils.getDaysInMonth(year, month);
  const firstDayOfMonth = dateUtils.getFirstDayOfMonth(year, month);
  const dayNames = dateUtils.getDayNames();
  const monthNames = dateUtils.getMonthNames();
  const [showEventCreate, setShowEventCreate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const getEventsForDate = (date, eventMonth = month, eventYear = year) => {
    const dateString = `${eventYear}-${String(eventMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    
    return events.filter(event => event.date === dateString);
  };

  const getEventsForMonth = (monthIndex, yearIndex = year) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === yearIndex;
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleCreateClick = (day, clickedMonth = month, clickedYear = year) => {
    const clickedDate = new Date(clickedYear, clickedMonth, day);
    setSelectedDate(clickedDate);
    setShowEventCreate(true);
  };

  const handleMonthClick = (monthIndex) => {
    const newDate = new Date(year, monthIndex, 1);
    setSelectedDate(newDate);
  };

  const handleEventSave = (eventData) => {
    onEventCreate && onEventCreate(eventData);
    setShowEventCreate(false);
    setSelectedDate(null);
  };

  const handleEventCreateClose = () => {
    setShowEventCreate(false);
    setSelectedDate(null);
  };

  const handleEventDetailsClose = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const renderMonthView = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const prevMonthDays = dateUtils.getDaysInMonth(prevYear, prevMonth);
      const prevDay = prevMonthDays - (firstDayOfMonth - i - 1);
      const prevDayEvents = getEventsForDate(prevDay, prevMonth, prevYear);
      
      days.push(
        <div key={`prev-${i}`} className="min-h-32 bg-gray-50 border border-gray-100 p-3 opacity-40 relative group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-medium">{prevDay}</span>
            <button 
              onClick={() => handleCreateClick(prevDay, prevMonth, prevYear)}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs hover:bg-gray-500 transition-all">
              +
            </button>
          </div>
          <div className="space-y-1 max-h-16 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {prevDayEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onClick={handleEventClick}
                compact={true}
              />
            ))}
          </div>
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
            
            <button 
              onClick={() => handleCreateClick(day)}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-all">
              +
            </button>
          </div>
          
          <div className="space-y-1 max-h-20 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
            {dayEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onClick={handleEventClick}
                compact={true}
              />
            ))}
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
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const nextDayEvents = getEventsForDate(day, nextMonth, nextYear);
      
      days.push(
        <div key={`next-${day}`} className="min-h-32 bg-gray-50 border border-gray-100 p-3 opacity-40 relative group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-medium">{day}</span>
            <button 
              onClick={() => handleCreateClick(day, nextMonth, nextYear)}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs hover:bg-gray-500 transition-all">
              +
            </button>
          </div>
          
          <div className="space-y-1 max-h-16 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {nextDayEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onClick={handleEventClick}
                compact={true}
              />
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const renderYearView = () => {
    const months = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthEvents = getEventsForMonth(monthIndex);
      const isCurrentMonth = year === currentYear && monthIndex === currentMonth;
      
      months.push(
        <div
          key={monthIndex}
          className={`p-4 border border-gray-200 rounded-lg transition-all duration-200 cursor-pointer group hover:shadow-md h-64 flex flex-col
            ${isCurrentMonth 
              ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-100' 
              : 'bg-white hover:bg-gray-50'
            }`}
          onClick={() => handleMonthClick(monthIndex)}
        >
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h3 className={`text-lg font-semibold 
              ${isCurrentMonth ? 'text-blue-900' : 'text-gray-900'}
            `}>
              {monthNames[monthIndex]}
            </h3>
            {isCurrentMonth && (
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col min-h-0">
            {monthEvents.length > 0 ? (
              <>
                <div className="text-sm text-gray-600 mb-2 flex-shrink-0">
                  {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-1 flex-1 overflow-y-auto min-h-0">
                  {monthEvents.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                      className={`text-xs p-2 rounded cursor-pointer transition-colors flex-shrink-0
                        ${event.color === 'blue' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                          event.color === 'red' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                          event.color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          event.color === 'purple' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-75">{event.date}</div>
                    </div>
                  ))}
                  {monthEvents.length > 5 && (
                    <div className="text-xs text-gray-500 text-center py-1 flex-shrink-0">
                      +{monthEvents.length - 5} more events
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-sm text-gray-400 italic">No events</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return months;
  };

  if (viewMode === 'year') {
    return (
      <div className="year-view bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {renderYearView()}
        </div>
        
        <EventCreate
          isOpen={showEventCreate}
          onClose={handleEventCreateClose}
          onSave={handleEventSave}
          selectedDate={selectedDate}
        />
        {showEventDetails && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <button
                    onClick={handleEventDetailsClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedEvent.date}
                  </div>
                  
                  {selectedEvent.time && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {dateUtils.formatTime(selectedEvent.time)}
                      {selectedEvent.duration && ` (${selectedEvent.duration} min)`}
                    </div>
                  )}
                  
                  {selectedEvent.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedEvent.location}
                    </div>
                  )}
                  
                  {selectedEvent.description && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                    </div>
                  )}
                  
                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Attendees</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.attendees.map((attendee, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.category && (
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${selectedEvent.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          selectedEvent.color === 'red' ? 'bg-red-100 text-red-800' :
                          selectedEvent.color === 'green' ? 'bg-green-100 text-green-800' :
                          selectedEvent.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
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
      
      <EventCreate
        isOpen={showEventCreate}
        onClose={handleEventCreateClose}
        onSave={handleEventSave}
        selectedDate={selectedDate}
      />
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
                <button
                  onClick={handleEventDetailsClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedEvent.date}
                </div>
                
                {selectedEvent.time && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {dateUtils.formatTime(selectedEvent.time)}
                    {selectedEvent.duration && ` (${selectedEvent.duration} min)`}
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedEvent.location}
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Attendees</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.attendees.map((attendee, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedEvent.category && (
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                      ${selectedEvent.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        selectedEvent.color === 'red' ? 'bg-red-100 text-red-800' :
                        selectedEvent.color === 'green' ? 'bg-green-100 text-green-800' :
                        selectedEvent.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;