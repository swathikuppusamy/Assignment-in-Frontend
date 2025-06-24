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

  const handleEventCreate = (eventData) => {
    console.log('New event created:', eventData);
    setEvents(prev => [...prev, eventData]);
  };
  
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleDateSelect = (date) => setCurrentDate(date);

  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\nTime: ${event.time}\nLocation: ${event.location || 'N/A'}`);
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
      />

      <div className="flex-1 flex flex-col">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToggleSidebar={handleToggleSidebar}
          view={view}
          setView={setView}
        />

        <main className="flex-1 p-4 overflow-auto">
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onEventCreate={handleEventCreate}
          />        
        </main>
      </div>
    </div>
  );
};

export default CalendarApp;