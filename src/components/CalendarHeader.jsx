import React from 'react';
import { ChevronLeft, ChevronRight, Menu, Grid3X3, List } from 'lucide-react';
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

  const formatCurrentDate = () => new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
    
      <div className="md:hidden">
      
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">📅</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-800">Calendar</h1>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('month')}
              className={`p-1.5 rounded-md ${
                viewMode === 'month' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
              title="Month view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange('year')}
              className={`p-1.5 rounded-md ${
                viewMode === 'year' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
              title="Year view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-base font-semibold text-gray-800 px-2">
              {viewMode === 'year' ? currentYear : `${monthNames[currentMonth]} ${currentYear}`}
            </h2>
            <button
              onClick={onNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <button
            onClick={onToday}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${
              (viewMode === 'month' && !isCurrentMonth) || (viewMode === 'year' && currentYear !== today.getFullYear())
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 text-gray-600'
            } hover:bg-opacity-90 transition-colors`}
          >
            Today
          </button>
        </div>
      </div>

      <div className="hidden md:flex lg:hidden flex-col gap-3">
       
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">📅</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Calendar</h1>
              <p className="text-xs text-gray-500">{formatCurrentDate()}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-1.5">
            <button
              onClick={() => onViewChange('month')}
              className={`p-2 rounded-md ${
                viewMode === 'month' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Month view"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewChange('year')}
              className={`p-2 rounded-md ${
                viewMode === 'year' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Year view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {viewMode === 'year' ? currentYear : `${monthNames[currentMonth]} ${currentYear}`}
            </h2>
            <button
              onClick={onNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <button
            onClick={onToday}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              (viewMode === 'month' && !isCurrentMonth) || (viewMode === 'year' && currentYear !== today.getFullYear())
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 text-gray-600'
            } hover:bg-opacity-90 transition-colors`}
          >
            Today
          </button>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-between">
    
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">📅</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Calendar</h1>
              <p className="text-xs text-gray-500">{formatCurrentDate()}</p>
            </div>
          </div>

          <button
            onClick={onToday}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              (viewMode === 'month' && !isCurrentMonth) || (viewMode === 'year' && currentYear !== today.getFullYear())
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 text-gray-600'
            } hover:bg-opacity-90 transition-colors`}
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 min-w-fit px-4">
            {viewMode === 'year' ? currentYear : `${monthNames[currentMonth]} ${currentYear}`}
          </h2>
          <button
            onClick={onNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <button
            onClick={() => onViewChange('month')}
            className={`p-2 rounded-md ${
              viewMode === 'month' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
            title="Month view"
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewChange('year')}
            className={`p-2 rounded-md ${
              viewMode === 'year' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
            title="Year view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;