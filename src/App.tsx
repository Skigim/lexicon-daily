import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Header from './components/Header';
import WordHero from './components/WordHero';
import QuizModule from './components/QuizModule';
import WordMine from './components/WordMine';
import { WORD_DATA } from './data/wordData';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const currentData = WORD_DATA[currentIndex];

  const nextWord = () => {
    setAnimate(true);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % WORD_DATA.length);
        setAnimate(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <Header onNext={nextWord} />

      <main className={`max-w-4xl mx-auto px-4 md:px-8 transition-opacity duration-300 ${animate ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Main Word Display */}
        <WordHero data={currentData} />

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Activity 1: Context Quiz */}
          <div className="h-full">
             <QuizModule data={currentData} />
          </div>

          {/* Activity 2: Word Mine Game */}
          <div className="h-full">
            <WordMine word={currentData.word} />
          </div>

        </div>

        {/* Footer / Writing Prompt Idea */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Challenge Yourself</h3>
                    <p className="text-gray-500 text-sm">Try using <span className="font-serif italic text-indigo-600 font-bold">{currentData.word}</span> in a conversation today.</p>
                </div>
            </div>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Share Definition
            </button>
        </div>

      </main>
    </div>
  );
}
