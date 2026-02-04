import React from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onNext: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNext }) => (
  <header className="flex justify-between items-center py-6 px-4 md:px-8 max-w-4xl mx-auto w-full">
    <div className="flex items-center gap-2">
      <div className="bg-indigo-600 p-2 rounded-lg text-white">
        <BookOpen size={24} />
      </div>
      <h1 className="text-2xl font-serif font-bold text-gray-800 tracking-tight">Lexicon</h1>
    </div>
    <button 
      onClick={onNext}
      className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-full"
    >
      <RefreshCw size={16} />
      <span>Randomize Day</span>
    </button>
  </header>
);

export default Header;
