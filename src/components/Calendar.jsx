import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import CalendarStats from './CalendarStats';
import { dateUtils } from '../utils/dateUtils';
import eventsData from '../data/events.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load events data
  useEffect(() => {
    try {
      // In a real app, you might fetch from an API
      // For now, we'll use the imported JSON data
      setEvents(eventsData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Failed to load events');
      setLoading(false);
      
      // Fallback to sample data
      const fallbackEvents = [
        {
          id: 1,
          title: "Team Meeting",
          date: "2025-06-25",
          time: "10:00",
          duration: 60,
          description: "Weekly team sync",
          location: "Conference Room A",
          attendees: ["John", "Jane", "Mike"],
          priority: "high",
          category: "meeting"
        },
        {
          id: 2,
          title: "Project Review",
          date: "2025-06-25",
          time: "14:00",
          duration: 90,
          description: "Q2 project review meeting",
          location: "Main Hall",
          attendees: ["Sarah", "Tom", "Lisa"],
          priority: "high",
          category: "review"
        }
      ];
      setEvents(fallbackEvents);
    }
  }, []);

  const handlePrevMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  // Check for time conflicts between events on the same day
  const hasTimeConflict = (dayEvents) => {
    if (dayEvents.length < 2) return false;
    
    for (let i = 0; i < dayEvents.length; i++) {
      for (let j = i + 1; j < dayEvents.length; j++) {
        const event1 = dayEvents[i];
        const event2 = dayEvents[j];
        
        // Parse start times
        const start1 = new Date(`2000-01-01T${event1.time}:00`);
        const end1 = new Date(start1.getTime() + (event1.duration || 60) * 60000);
        const start2 = new Date(`2000-01-01T${event2.time}:00`);
        const end2 = new Date(start2.getTime() + (event2.duration || 60) * 60000);
        
        // Check for overlap
        if (start1 < end2 && start2 < end1) {
          return true;
        }
      }
    }
    return false;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading calendar...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Error notification */}
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
          <p className="text-sm">⚠️ {error}. Using fallback data.</p>
        </div>
      )}

      {/* Calendar Header */}
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      
      {/* Calendar Grid */}
      <CalendarGrid
        currentDate={currentDate}
        events={events}
        onEventClick={handleEventClick}
        hasTimeConflict={hasTimeConflict}
      />
      
      {/* Calendar Statistics */}
      <CalendarStats
        events={events}
        currentDate={currentDate}
        hasTimeConflict={hasTimeConflict}
      />
      
      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Calendar;