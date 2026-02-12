import React, { useState } from 'react';
import { 
  Play, 
  Copy, 
  Check, 
  Terminal, 
  RotateCcw, 
  Code2, 
  Sparkles,
  X
} from 'lucide-react';

const CodePage = ({ 
    initialCode = `function calculateTotal(price, tax) {
  const total = price + (price * tax);
  return total.toFixed(2);
}

console.log(calculateTotal(100, 0.2));`, 
    language = "javascript" 
}) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    // Simulate running the code
    const handleRun = () => {
        setIsRunning(true);
        setOutput(null);

        // Fake processing delay
        setTimeout(() => {
            setIsRunning(false);
            // Simple mock output logic
            if (code.includes('console.log')) {
                setOutput('120.00'); // Mock result for the default code
            } else {
                setOutput('undefined');
            }
        }, 1200);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setCode(initialCode);
        setOutput(null);
        setShowExplanation(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700 font-mono text-sm my-8">
            
            {/* --- Toolbar --- */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5 group">
                        <div className="w-3 h-3 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:bg-yellow-600 transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
                    </div>
                    <span className="ml-3 text-gray-400 font-semibold text-xs uppercase tracking-wider flex items-center">
                        <Code2 size={14} className="mr-1" /> {language}
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded transition-all ${showExplanation ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-purple-400 hover:bg-gray-700'}`}
                    >
                        <Sparkles size={14} />
                        <span>Explain</span>
                    </button>
                    <button 
                        onClick={handleCopy} 
                        className="flex items-center space-x-1 text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-1.5 rounded transition-all"
                    >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
            </div>

            {/* --- Main Area: Editor & Explanation --- */}
            <div className="relative flex">
                
                {/* Line Numbers (Visual Only) */}
                <div className="hidden sm:block w-12 bg-gray-900 text-gray-600 text-right pr-3 pt-4 select-none border-r border-gray-800 leading-6">
                    {code.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Code Editor */}
                <div className="flex-1 relative">
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-64 bg-transparent text-gray-300 p-4 focus:outline-none resize-none leading-6 font-mono"
                        spellCheck="false"
                    />
                </div>

                {/* AI Explanation Slide-over */}
                {showExplanation && (
                    <div className="absolute top-0 right-0 w-64 h-full bg-gray-800 border-l border-gray-700 p-4 shadow-xl animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-purple-400 font-bold flex items-center gap-2">
                                <Sparkles size={16} /> AI Assistant
                            </h4>
                            <button onClick={() => setShowExplanation(false)} className="text-gray-500 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed">
                            This function <code className="text-yellow-400">calculateTotal</code> takes a price and a tax rate. It calculates the total by adding tax to the price and returns it formatted to 2 decimal places using <code className="text-blue-400">.toFixed(2)</code>.
                        </p>
                    </div>
                )}
            </div>

            {/* --- Output Console --- */}
            <div className="bg-black p-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-xs font-bold uppercase flex items-center">
                        <Terminal size={12} className="mr-1" /> Console Output
                    </span>
                    <div className="flex space-x-2">
                         <button 
                            onClick={handleReset}
                            className="text-gray-500 hover:text-white p-1 rounded transition-colors"
                            title="Reset Code"
                        >
                            <RotateCcw size={14} />
                        </button>
                        <button 
                            onClick={handleRun}
                            disabled={isRunning}
                            className={`flex items-center space-x-1 px-4 py-1 rounded font-semibold text-xs transition-all ${
                                isRunning 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/50'
                            }`}
                        >
                            {isRunning ? (
                                <>Processing...</>
                            ) : (
                                <><Play size={12} fill="currentColor" /> <span>Run Code</span></>
                            )}
                        </button>
                    </div>
                </div>

                <div className={`font-mono text-sm min-h-[40px] ${isRunning ? 'animate-pulse' : ''}`}>
                    {isRunning ? (
                        <span className="text-yellow-500">Running script...</span>
                    ) : output ? (
                        <span className="text-green-400 flex items-center">
                            <span className="mr-2 text-gray-600">➜</span> {output}
                        </span>
                    ) : (
                        <span className="text-gray-600 italic">No output yet. Click "Run Code".</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodePage;