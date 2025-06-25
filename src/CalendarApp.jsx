import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import { sampleEvents } from './data/sampleEvents';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('month');
  const [events, setEvents] = useState(sampleEvents);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleEventCreate = (eventData) => {
    const newEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      date: eventData.date || formatDate(currentDate),
      color: eventData.color || 'blue',
      category: eventData.category || 'personal'
    };
    
    console.log('Adding new event:', newEvent);
    setEvents(prev => [...prev, newEvent]);
  };

  const handlePrevPeriod = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    }
  };

  const handleNextPeriod = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    }
  };

  const handleDateSelect = (date) => setCurrentDate(date);

  const handleToday = () => {
    setCurrentDate(new Date()); 
  };

  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time || 'All day'}\nLocation: ${event.location || 'N/A'}`);
  };
  
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleToggleSidebar} 
        currentDate={currentDate} 
        onDateSelect={handleDateSelect} 
        calendars={[]} 
        onCalendarToggle={() => {}} 
        onEventCreate={handleEventCreate}
      />

      <div className="flex-1 flex flex-col">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevPeriod}
          onNextMonth={handleNextPeriod}
          onToday={handleToday}
          onSidebarToggle={handleToggleSidebar}
          viewMode={view}
          onViewChange={setView}
        />

        <main className="flex-1 p-4 overflow-auto">
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onEventCreate={handleEventCreate}
            viewMode={view}
          />        
        </main>
      </div>
    </div>
  );
};

export default CalendarApp;