import React from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import type { WordData } from '../types';

interface WordHeroProps {
  data: WordData;
}

const WordHero: React.FC<WordHeroProps> = ({ data }) => {
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(data.word);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <BookOpen size={200} />
      </div>
      
      <div className="relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wider mb-4 uppercase">
          Word of the Day
        </span>
        
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 tracking-tight">
            {data.word}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xl text-gray-500 font-mono">{data.phonetic}</span>
            <button 
              onClick={handleSpeak}
              className="p-2 rounded-full hover:bg-gray-100 text-indigo-600 transition-colors"
              aria-label="Pronounce word"
            >
              <Volume2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="italic font-serif text-gray-500">{data.type}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-gray-400 text-sm">Origin: {data.etymology}</span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Definition</h3>
            <p className="text-xl text-gray-800 leading-relaxed font-medium">
              {data.definition}
            </p>
          </div>
          
          <div className="bg-amber-50 border-l-4 border-amber-300 p-4 rounded-r-lg">
            <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-1">In Context</h3>
            <p className="text-lg text-gray-700 italic font-serif">
              "{data.example}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordHero;
