import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Volume2, HelpCircle, Check, X, Search, Loader2, Sparkles, ChevronRight } from 'lucide-react';

// ==========================================
// FILE: src/types.ts
// ==========================================
// Define your data shapes here to ensure consistency across the app.

export interface QuizData {
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface WordData {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  example: string;
  etymology: string;
  quiz: QuizData;
}

// ==========================================
// FILE: src/data/wordData.ts
// ==========================================

export const WORD_DATA: WordData[] = [
  {
    id: 1,
    word: "Petrichor",
    phonetic: "/ˈpe.trɪ.kɔːr/",
    type: "noun",
    definition: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.",
    example: "After the storm passed, the air was thick with the scent of petrichor.",
    etymology: "From Greek 'petra' (stone) and 'ichor' (the fluid that flows in the veins of the gods).",
    quiz: {
      topic: "Meteorology & Chemistry",
      question: "What chemical compound, produced by soil bacteria, is primarily responsible for the smell of petrichor?",
      options: [
        "Ozone",
        "Geosmin",
        "Petroleum",
        "Chlorine"
      ],
      correctIndex: 1
    }
  },
  {
    id: 2,
    word: "Sonder",
    phonetic: "/ˈsɒn.dər/",
    type: "noun",
    definition: "The realization that each random passerby is living a life as vivid and complex as your own.",
    example: "Sitting on the train, she was suddenly struck by sonder as she looked at the tired commuters.",
    etymology: "Coined by John Koenig for The Dictionary of Obscure Sorrows.",
    quiz: {
      topic: "Psychology",
      question: "Which cognitive concept is most closely related to the *opposite* of sonder (thinking you are the main character)?",
      options: [
        "Imposter Syndrome",
        "Main Character Syndrome",
        "Solipsism",
        "Deja Vu"
      ],
      correctIndex: 2
    }
  },
  {
    id: 3,
    word: "Apricity",
    phonetic: "/əˈprɪ.sɪ.ti/",
    type: "noun",
    definition: "The warmth of the sun in winter.",
    example: "The cat slept on the windowsill, soaking up the apricity on the cold January afternoon.",
    etymology: "From Latin 'apricitas' (sunniness).",
    quiz: {
      topic: "Astronomy",
      question: "Why does the winter sun feel weaker than the summer sun in the Northern Hemisphere?",
      options: [
        "The sun actually shrinks in winter",
        "The Earth is farther away from the sun",
        "Sunlight hits the Earth at a shallower angle",
        "There are more clouds in winter"
      ],
      correctIndex: 2
    }
  }
];

// ==========================================
// FILE: src/components/Header.tsx
// ==========================================

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

// ==========================================
// FILE: src/components/WordHero.tsx
// ==========================================

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

// ==========================================
// FILE: src/components/QuizModule.tsx
// ==========================================

interface QuizModuleProps {
  data: WordData;
}

const QuizModule: React.FC<QuizModuleProps> = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
  }, [data]);

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

// ==========================================
// FILE: src/components/WordMine.tsx
// ==========================================

interface WordMineProps {
  word: string;
}

const WordMine: React.FC<WordMineProps> = ({ word }) => {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFoundWords([]);
    setInput("");
    setMessage("");
    setIsLoading(false);
  }, [word]);

  // Helper: check if target letters exist in source
  const checkLetters = (source: string, target: string): boolean => {
    const sourceArr = source.toLowerCase().split('');
    const targetArr = target.toLowerCase().split('');
    
    for (let char of targetArr) {
      const index = sourceArr.indexOf(char);
      if (index === -1) return false;
      sourceArr.splice(index, 1);
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const guess = input.toLowerCase().trim();
    const mainWord = word.toLowerCase();

    if (!guess) return;

    if (foundWords.includes(guess)) {
      setMessage("You already found that one!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (guess.length < 3) {
      setMessage("Too short! 3 letters minimum.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!checkLetters(mainWord, guess)) {
      setMessage("Those letters aren't in the word.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    // API Validation
    setIsLoading(true);
    setMessage("Checking dictionary...");
    
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`);
        
        if (response.ok) {
            setFoundWords(prev => [...prev, guess]);
            setMessage(`Found "${guess}"!`);
            setInput("");
        } else {
            setMessage("Not a valid word.");
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    } catch (err) {
        setMessage("Connection error. Try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-indigo-900 text-white rounded-2xl shadow-lg p-6 h-full flex flex-col relative overflow-hidden">
       {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-800/50 rounded-full -mr-20 -mt-20"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-indigo-200">
                <Search size={24} />
                <h3 className="font-bold text-lg">Word Mine</h3>
            </div>
            <div className="text-sm bg-indigo-800 px-3 py-1 rounded-full text-indigo-300 font-mono">
                {foundWords.length} found
            </div>
        </div>

        <p className="text-indigo-300 text-sm mb-6">
            Find smaller words hidden inside <span className="font-bold text-white">{word}</span>.
        </p>

        {/* Word Display Area */}
        <div className="bg-indigo-950/50 rounded-xl p-4 flex-grow mb-4 overflow-y-auto max-h-48 border border-indigo-800">
            {foundWords.length === 0 ? (
                <div className="h-full flex items-center justify-center text-indigo-500 italic text-sm">
                    Words you find will appear here...
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {foundWords.map((w, i) => (
                        <span key={i} className="bg-indigo-600 px-3 py-1 rounded-lg text-sm font-bold animate-in zoom-in duration-200">
                            {w}
                        </span>
                    ))}
                </div>
            )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className={`relative ${shake ? 'animate-shake' : ''}`}>
           <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type a word...`}
              disabled={isLoading}
              className="w-full bg-indigo-800/50 border border-indigo-500 rounded-xl pl-4 pr-12 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all disabled:opacity-50"
            />
            <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bg-indigo-500 hover:bg-indigo-400 text-white p-1.5 rounded-lg transition-colors disabled:bg-indigo-700"
            >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} />}
            </button>
        </form>
        
        <div className="h-6 mt-2 text-center text-xs font-medium text-indigo-300">
            {message}
        </div>
      </div>
      
      {/* CSS for shake animation */}
      <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .animate-shake {
            animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

// ==========================================
// FILE: src/App.tsx (or Main Entry)
// ==========================================

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