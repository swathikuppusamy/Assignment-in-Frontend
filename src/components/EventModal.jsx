import React from 'react';
import { Clock, MapPin, Users, X, Calendar, AlertCircle } from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-purple-100 text-purple-800';
      case 'training':
        return 'bg-indigo-100 text-indigo-800';
      case 'review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>
              <div className="flex items-center gap-2">
                {event.priority && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(event.priority)}`}>
                    {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
                  </span>
                )}
                {event.category && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 pt-4 space-y-4">
          {/* Date and Time */}
          <div className="flex items-center text-gray-700">
            <Calendar className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <div className="font-medium">{formatEventDate(event.date)}</div>
              <div className="text-sm text-gray-600">
                {dateUtils.formatTime(event.time)} ({event.duration} minutes)
              </div>
            </div>
          </div>
          
          {/* Location */}
          {event.location && (
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-green-600" />
              <span>{event.location}</span>
            </div>
          )}
          
          {/* Attendees */}
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-start text-gray-700">
              <Users className="w-5 h-5 mr-3 mt-0.5 text-purple-600" />
              <div>
                <div className="font-medium mb-1">Attendees</div>
                <div className="text-sm">
                  {Array.isArray(event.attendees) 
                    ? event.attendees.join(', ') 
                    : event.attendees
                  }
                </div>
              </div>
            </div>
          )}
          
          {/* Description */}
          {event.description && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-start text-gray-700">
                <AlertCircle className="w-5 h-5 mr-3 mt-0.5 text-orange-600" />
                <div>
                  <div className="font-medium mb-2">Description</div>
                  <p className="text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;