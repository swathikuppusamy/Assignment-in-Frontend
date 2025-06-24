import React from 'react';
import { Calendar, Users, AlertTriangle, Clock } from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

const CalendarStats = ({ events, currentDate, hasTimeConflict }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Filter events for current month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return dateUtils.isSameMonth(year, month, eventDate);
  });

  // Calculate statistics
  const totalEvents = currentMonthEvents.length;
  
  const daysWithEvents = new Set(
    currentMonthEvents.map(event => event.date)
  ).size;

  const conflictDays = Object.values(
    currentMonthEvents.reduce((acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    }, {})
  ).filter(dayEvents => hasTimeConflict(dayEvents)).length;

  const totalDuration = currentMonthEvents.reduce((total, event) => {
    return total + (event.duration || 0);
  }, 0);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const todayString = dateUtils.formatDate(today);
    
    return currentMonthEvents
      .filter(event => event.date >= todayString)
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      })
      .slice(0, 3);
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Statistics Cards */}
      <div className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Month Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Events */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-blue-600">{totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          {/* Active Days */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Days</p>
                <p className="text-2xl font-bold text-green-600">{daysWithEvents}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          {/* Conflicts */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conflicts</p>
                <p className="text-2xl font-bold text-red-600">{conflictDays}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Total Duration */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-purple-600">{formatDuration(totalDuration)}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {dateUtils.formatTime(event.time)}
                    </p>
                    {event.location && (
                      <p className="text-xs text-gray-500 truncate">{event.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No upcoming events this month</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarStats;