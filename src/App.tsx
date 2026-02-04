import { useState } from 'react'
import { BookOpen, RefreshCw, Volume2 } from 'lucide-react'

function App() {
  const [word] = useState('Serendipity')
  const [definition] = useState('The occurrence and development of events by chance in a happy or beneficial way.')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Word of the Day</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-5xl font-bold text-indigo-600">{word}</h2>
            <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
              <Volume2 className="w-6 h-6 text-indigo-600" />
            </button>
          </div>

          <div className="border-l-4 border-indigo-600 pl-4">
            <p className="text-lg text-gray-700 leading-relaxed">{definition}</p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 mt-6">
            <p className="text-sm text-indigo-900">
              <span className="font-semibold">Example:</span> "Their meeting was pure serendipity; 
              they both happened to be at the right place at the right time."
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Built with Vite ⚡ TypeScript 💙 Tailwind CSS 🎨 Lucide React ✨
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
