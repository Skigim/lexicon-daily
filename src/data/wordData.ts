import type { WordData } from '../types';

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
