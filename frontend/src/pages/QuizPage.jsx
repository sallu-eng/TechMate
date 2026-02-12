import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  RotateCcw, 
  AlertCircle,
  Home
} from 'lucide-react';

// --- MOCK QUIZ DATA ---
const QUIZ_DATA = [
  {
    id: 1,
    question: "What is the correct way to declare a variable in JavaScript that cannot be reassigned?",
    options: ["var myVal = 10;", "let myVal = 10;", "const myVal = 10;", "immutable myVal = 10;"],
    answer: 2, // Index of correct option
    explanation: "The 'const' keyword creates a read-only reference to a value. It cannot be reassigned."
  },
  {
    id: 2,
    question: "Which array method creates a new array by performing a function on each array element?",
    options: [".filter()", ".map()", ".forEach()", ".reduce()"],
    answer: 1,
    explanation: ".map() iterates over the array and returns a new array with the results of the callback function."
  },
  {
    id: 3,
    question: "What does the '===', operator check for?",
    options: ["Value only", "Type only", "Value and Type", "Reference only"],
    answer: 2,
    explanation: "The strict equality operator (===) checks both the value and the data type of the operands."
  },
  {
    id: 4,
    question: "Which of these is NOT a valid JavaScript data type?",
    options: ["Undefined", "Boolean", "Float", "Symbol"],
    answer: 2,
    explanation: "JavaScript has a 'Number' type, but no specific 'Float' or 'Integer' types. All numbers are floating-point."
  },
  {
    id: 5,
    question: "How do you check if a variable 'x' is an array?",
    options: ["x.isArray()", "Array.isArray(x)", "typeof x == 'array'", "x instanceof Array"],
    answer: 1,
    explanation: "Array.isArray(x) is the most reliable way. 'typeof' returns 'object' for arrays."
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, or false
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [timerActive, setTimerActive] = useState(true);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && !showScore) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Time run out: Auto-select nothing and show failure state
      handleOptionClick(-1); 
    }
    return () => clearInterval(interval);
  }, [timeLeft, timerActive, showScore]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(15);
    setTimerActive(true);
  }, [currentQuestion]);

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return; // Prevent changing answer

    setTimerActive(false);
    setSelectedOption(index);

    const correct = index === QUIZ_DATA[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QUIZ_DATA.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(15);
    setTimerActive(true);
  };

  const getProgressColor = () => {
    if (timeLeft > 10) return 'bg-green-500';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // --- RENDER: SCORE SCREEN ---
  if (showScore) {
    const percentage = (score / QUIZ_DATA.length) * 100;
    let message = "Keep Practicing!";
    let subMessage = "Review the materials and try again.";
    let badgeColor = "bg-red-100 text-red-600";

    if (percentage === 100) {
        message = "Perfect Score!";
        subMessage = "You are a JavaScript Master.";
        badgeColor = "bg-green-100 text-green-600";
    } else if (percentage >= 80) {
        message = "Great Job!";
        subMessage = "You have a solid understanding.";
        badgeColor = "bg-blue-100 text-blue-600";
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className={`p-6 rounded-full ${badgeColor} animate-bounce`}>
                <Trophy size={48} />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{message}</h2>
            <p className="text-gray-500 mt-2">{subMessage}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
             <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Final Score</div>
             <div className="text-5xl font-extrabold text-indigo-600 mt-2">
                {score}<span className="text-2xl text-gray-400">/{QUIZ_DATA.length}</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={resetQuiz} 
                className="flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
                <RotateCcw size={18} className="mr-2" /> Try Again
            </button>
            <button 
                className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
                <Home size={18} className="mr-2" /> Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: QUIZ CARD ---
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {/* Header: Progress & Timer */}
        <div className="flex justify-between items-end mb-4 px-2">
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Question {currentQuestion + 1} of {QUIZ_DATA.length}</p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / QUIZ_DATA.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-sm bg-white border ${timeLeft <= 5 ? 'border-red-200 animate-pulse' : 'border-gray-200'}`}>
                <Clock size={18} className={timeLeft <= 5 ? 'text-red-500' : 'text-gray-400'} />
                <span className={`font-mono font-bold text-lg ${timeLeft <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
            </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Top Bar Line (Timer Visual) */}
            <div 
                className={`h-1.5 w-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
                style={{ width: `${(timeLeft / 15) * 100}%` }}
            ></div>

            <div className="p-8">
                {/* Question */}
                <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                    {QUIZ_DATA[currentQuestion].question}
                </h2>

                {/* Options Grid */}
                <div className="space-y-3">
                    {QUIZ_DATA[currentQuestion].options.map((option, index) => {
                        // Styling Logic
                        const isSelected = selectedOption === index;
                        const isCorrectAnswer = index === QUIZ_DATA[currentQuestion].answer;
                        const showCorrect = selectedOption !== null && isCorrectAnswer;
                        const showWrong = isSelected && !isCorrectAnswer;

                        let baseClasses = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex justify-between items-center group ";
                        
                        if (selectedOption === null) {
                            baseClasses += "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 cursor-pointer";
                        } else if (showCorrect) {
                            baseClasses += "border-green-500 bg-green-50 text-green-800";
                        } else if (showWrong) {
                            baseClasses += "border-red-500 bg-red-50 text-red-800";
                        } else {
                            baseClasses += "border-gray-100 text-gray-400 opacity-50 cursor-not-allowed";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={selectedOption !== null}
                                className={baseClasses}
                            >
                                <span className="font-medium">{option}</span>
                                {showCorrect && <CheckCircle className="text-green-600" size={20} />}
                                {showWrong && <XCircle className="text-red-600" size={20} />}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation Box (Appears after answer) */}
                {selectedOption !== null && (
                    <div className={`mt-6 p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'} animate-in fade-in slide-in-from-bottom-2`}>
                        <div className="flex items-start">
                            <AlertCircle size={20} className={`mt-0.5 mr-3 ${isCorrect ? 'text-green-600' : 'text-blue-600'}`} />
                            <div>
                                <p className={`font-bold text-sm ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                                    {isCorrect ? 'Correct!' : 'The correct answer is: ' + QUIZ_DATA[currentQuestion].options[QUIZ_DATA[currentQuestion].answer]}
                                </p>
                                <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                                    {QUIZ_DATA[currentQuestion].explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-500">
                    Score: <span className="text-indigo-600 font-bold">{score}</span>
                </div>
                <button 
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className={`flex items-center px-6 py-2.5 rounded-lg font-bold text-white transition-all transform ${
                        selectedOption === null 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-md shadow-indigo-200'
                    }`}
                >
                    {currentQuestion === QUIZ_DATA.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
