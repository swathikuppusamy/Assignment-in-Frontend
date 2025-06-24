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
  onViewChange,
  sidebarOpen = false
}) => {
  const monthNames = dateUtils.getMonthNames();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const today = new Date();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-30">
      <div className="flex items-center justify-between w-full">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle button */}
          <button
            onClick={onSidebarToggle}
            className={`p-2 rounded-lg transition-colors ${
              sidebarOpen 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">📅</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 hidden sm:block">
              Calendar
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Current month/year */}
          <h2 className="text-xl font-semibold text-gray-800 min-w-fit">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          {/* Today button */}
          <button
            onClick={onToday}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
              isCurrentMonth 
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200'
            }`}
            disabled={isCurrentMonth}
          >
            Today
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('month')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'month' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Month view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange('week')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'week' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Week view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Create button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Create</span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;