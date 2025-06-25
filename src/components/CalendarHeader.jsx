import React from 'react';
import { ChevronLeft, ChevronRight, Menu, Search, Settings, Grid3X3, List, Plus } from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

const CalendarHeader = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onToday, 
  onSidebarToggle,
  viewMode,
  onViewChange 
}) => {
  const monthNames = dateUtils.getMonthNames();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const today = new Date();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
  const formatCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };
  const getNavigationLabel = () => {
    return viewMode === 'year' ? 'year' : 'month';
  };
  const getCurrentPeriodText = () => {
    if (viewMode === 'year') {
      return currentYear.toString();
    }
    return `${monthNames[currentMonth]} ${currentYear}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button
            onClick={onSidebarToggle}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">📅</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-semibold text-gray-800">
                Calendar
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrentDate()}
              </p>
            </div>
          </div>
          <button
            onClick={onToday}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
              (viewMode === 'month' && !isCurrentMonth) || 
              (viewMode === 'year' && currentYear !== today.getFullYear())
                ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Today
          </button>
          <div className="flex items-center space-x-1">
            <button
              onClick={onPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={`Previous ${getNavigationLabel()}`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={`Next ${getNavigationLabel()}`}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 min-w-fit">
            {getCurrentPeriodText()}
          </h2>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => onViewChange('month')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'month' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Month view"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewChange('year')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'year' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Year view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;