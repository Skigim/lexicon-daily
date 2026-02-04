import React, { useState } from 'react';
import { HelpCircle, Check, X } from 'lucide-react';
import type { WordData } from '../types';

interface QuizModuleProps {
  data: WordData;
}

const QuizModule: React.FC<QuizModuleProps> = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentWordId, setCurrentWordId] = useState(data.id);

  // Reset quiz state when word changes
  if (data.id !== currentWordId) {
    setCurrentWordId(data.id);
    setSelected(null);
    setIsCorrect(null);
  }

  const handleOptionClick = (index: number) => {
    if (selected !== null) return; 
    setSelected(index);
    setIsCorrect(index === data.quiz.correctIndex);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-600">
            <HelpCircle size={24} />
            <h3 className="font-bold text-lg">Did You Know?</h3>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">
            {data.quiz.topic}
        </span>
      </div>

      <p className="text-gray-700 mb-6 font-medium text-lg leading-snug">{data.quiz.question}</p>

      <div className="space-y-3 flex-grow">
        {data.quiz.options.map((option, idx) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ";
          
          if (selected === null) {
            btnClass += "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 text-gray-600";
          } else if (idx === data.quiz.correctIndex) {
            btnClass += "border-green-500 bg-green-50 text-green-700 font-bold";
          } else if (selected === idx && idx !== data.quiz.correctIndex) {
            btnClass += "border-red-500 bg-red-50 text-red-700 opacity-50";
          } else {
            btnClass += "border-gray-100 text-gray-400 opacity-50";
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={btnClass}
              disabled={selected !== null}
            >
              <span>{option}</span>
              {selected !== null && idx === data.quiz.correctIndex && <Check size={20} />}
              {selected === idx && idx !== data.quiz.correctIndex && <X size={20} />}
            </button>
          );
        })}
      </div>

      {isCorrect !== null && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold animate-in fade-in slide-in-from-bottom-4 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isCorrect ? "Correct! Well done." : "Not quite. Check the definition!"}
        </div>
      )}
    </div>
  );
};

export default QuizModule;
