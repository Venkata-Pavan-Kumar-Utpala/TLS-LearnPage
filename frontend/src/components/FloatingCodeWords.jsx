import { useState, useEffect } from 'react';

const FloatingCodeWords = () => {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [words, setWords] = useState([]);

  const floatingWords = [
    "#include", "console.log", "parseInt", "await", "System.out.println",
    "malloc", "dev-tools", "async", "package.json",
    "useState", "useEffect", "npm install", "git commit", "docker run",
    "SELECT *", "import React", "function", "const", "let",
    "return", "if", "else", "for", "while",
    "try", "catch", "throw", "new", "class",
    "extends", "super", "this", "null", "undefined",
    "true", "false",
  ];

  useEffect(() => {
    // Generate words with distributed starting positions to prevent clustering
    const generatedWords = floatingWords.map((word, index) => ({
      text: word,
      id: index,
      left: 5 + Math.random() * 90,
      // Distribute starting positions across an even larger vertical range for extended fall
      initialTop: -200 - (Math.random() * 1500), // Start from -200px to -1700px
      duration: 4 + Math.random() * 8, // Longer duration for extended fall
      delay: Math.random() * 25, // Even longer delays (0-25s)
    }));
    setWords(generatedWords);
  }, []);

  return (
    <>
      {words.map((word) => (
        <span
          key={word.id}
          className={`absolute text-gray-400 text-sm select-none cursor-pointer
                      transition-all duration-300
                      ${hoveredWord === word.id ?
                        '!text-gray-700 !scale-125 !font-semibold animate-none' :
                        hoveredWord !== null ? 'animate-slow-fall' : 'animate-fall'}`}
          style={{
            left: `${word.left}%`,
            top: `${word.initialTop}px`, // Start from distributed heights
            animationDuration: `${word.duration}s`,
            animationDelay: `${word.delay}s`,
            animationTimingFunction: 'linear',
            opacity: 0.7,
            transform: hoveredWord === word.id ? 'scale(1.25)' : 'none',
            zIndex: hoveredWord === word.id ? 20 : 10
          }}
          onMouseEnter={() => setHoveredWord(word.id)}
          onMouseLeave={() => setHoveredWord(null)}
        >
          {word.text}
        </span>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(calc(70vh + 600px + 200px));
            opacity: 0;
          }
        }

        @keyframes slow-fall {
          0% {
            transform: translateY(0px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(calc(70vh + 600px + 200px));
            opacity: 0.5;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-slow-fall {
          animation: slow-fall linear infinite;
          animation-duration: 20s !important;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};

export default FloatingCodeWords;
