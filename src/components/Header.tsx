import React from 'react';
import { BookOpen, History, Calendar } from 'lucide-react';
import type { ViewMode } from '../types';
import { formatDisplayDate, getTodayDateString } from '../utils/dateUtils';
import UserMenu from './UserMenu';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  currentDate?: string;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, currentDate }) => {
  const displayDate = currentDate || getTodayDateString();
  
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 tracking-tight">Lexicon Daily</h1>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            <span>{formatDisplayDate(displayDate)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {currentView === 'today' ? (
          <button 
            onClick={() => onViewChange('history')}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-full"
          >
            <History size={16} />
            <span className="hidden sm:inline">History</span>
          </button>
        ) : (
          <button 
            onClick={() => onViewChange('today')}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-full"
          >
            <Calendar size={16} />
            <span className="hidden sm:inline">Today's Word</span>
          </button>
        )}
        
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
