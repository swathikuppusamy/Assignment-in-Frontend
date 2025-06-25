import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Type
} from 'lucide-react';

const EventCreate = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    allDay: false,
    location: '',
    description: '',
    calendar: 'personal',
    color: 'bg-blue-500',
    guests: '',
    reminder: '10',
    repeat: 'none',
    priority: 'medium',
    category: 'meeting'
  });

  
  React.useEffect(() => {
    if (selectedDate) {
    
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      setEventData(prev => ({
        ...prev,
        date: formattedDate
      }));
    }
  }, [selectedDate]);

  const calendarOptions = [
    { id: 'personal', name: 'Personal', color: 'bg-blue-500' },
    { id: 'work', name: 'Work', color: 'bg-red-500' },
    { id: 'family', name: 'Family', color: 'bg-green-500' },
    { id: 'birthdays', name: 'Birthdays', color: 'bg-purple-500' },
    { id: 'holidays', name: 'Holidays', color: 'bg-orange-500' }
  ];

  const colorOptions = [
    'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 
    'bg-orange-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'
  ];

  const reminderOptions = [
    { value: 'none', label: 'No reminder' },
    { value: '0', label: 'At time of event' },
    { value: '10', label: '10 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '1440', label: '1 day before' }
  ];

  const repeatOptions = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const categoryOptions = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'client', label: 'Client' },
    { value: 'training', label: 'Training' },
    { value: 'review', label: 'Review' },
    { value: 'personal', label: 'Personal' }
  ];

  const handleInputChange = (field, value) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    const diffMs = end - start;
    return Math.max(0, Math.round(diffMs / (1000 * 60))); // Duration in minutes
  };

  const handleSubmit = () => {
    if (!eventData.title.trim()) {
      alert('Please enter an event title');
      return;
    }
    
    if (!eventData.date) {
      alert('Please select a date');
      return;
    }
    
  
    const duration = eventData.allDay ? 
      'All day' : 
      calculateDuration(eventData.startTime, eventData.endTime);
    
   
    const event = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date, 
      time: eventData.allDay ? 'All day' : eventData.startTime,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      allDay: eventData.allDay,
      duration: duration,
      location: eventData.location,
      description: eventData.description,
      calendar: eventData.calendar,
      color: eventData.color,
      guests: eventData.guests,
      attendees: eventData.guests ? eventData.guests.split(',').map(g => g.trim()).filter(g => g) : [],
      reminder: eventData.reminder,
      repeat: eventData.repeat,
      priority: eventData.priority,
      category: eventData.category,
      createdAt: new Date().toISOString()
    };
    
    console.log('Creating event:', event); 
    
    onSave && onSave(event);
    
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setEventData({
      title: '',
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      startTime: '09:00',
      endTime: '10:00',
      allDay: false,
      location: '',
      description: '',
      calendar: 'personal',
      color: 'bg-blue-500',
      guests: '',
      reminder: '10',
      repeat: 'none',
      priority: 'medium',
      category: 'meeting'
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Create Event</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Type className="w-4 h-4 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    Event Title *
                  </label>
                </div>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Add title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Date</label>
                </div>
                <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Time</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={eventData.allDay}
                      onChange={(e) => handleInputChange('allDay', e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">All day</span>
                  </label>
                </div>
                
                {!eventData.allDay && (
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="time"
                      value={eventData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={eventData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Location</label>
                </div>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Add location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Event Color</label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleInputChange('color', color)}
                      className={`w-6 h-6 rounded-full ${color} ${
                        eventData.color === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Add description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCreate;