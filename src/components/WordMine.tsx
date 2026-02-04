import React, { useState } from 'react';
import { Search, Loader2, ChevronRight } from 'lucide-react';

interface WordMineProps {
  word: string;
}

const WordMine: React.FC<WordMineProps> = ({ word }) => {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState(word);

  // Reset game state when word changes
  if (word !== currentWord) {
    setCurrentWord(word);
    setFoundWords([]);
    setInput("");
    setMessage("");
    setIsLoading(false);
  }

  // Helper: check if target letters exist in source
  const checkLetters = (source: string, target: string): boolean => {
    const sourceArr = source.toLowerCase().split('');
    const targetArr = target.toLowerCase().split('');
    
    for (const char of targetArr) {
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
    } catch {
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

export default WordMine;
