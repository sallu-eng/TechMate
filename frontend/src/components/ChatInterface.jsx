import React, { useState } from 'react';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm TechMate, your AI learning assistant. How can I help you today?", isUser: false }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEli5, setIsEli5] = useState(false);
    const [isDeepDive, setIsDeepDive] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Call Backend API
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input, isEli5, isDeepDive }),
            });
            const data = await response.json();

            const aiResponse = { text: data.reply, isUser: false };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            const errorResponse = { text: "Sorry, I'm having trouble connecting to the server.", isUser: false };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow-md'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md italic">
                            Thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Mode Toggles */}
            <div className="flex justify-center gap-4 mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isEli5}
                        onChange={() => { setIsEli5(!isEli5); setIsDeepDive(false); }}
                        className="form-checkbox text-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Explain Like I'm 5</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isDeepDive}
                        onChange={() => { setIsDeepDive(!isDeepDive); setIsEli5(false); }}
                        className="form-checkbox text-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Technical Deep Dive</span>
                </label>
            </div>

            <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
                <input
                    type="text"
                    className="flex-1 p-2 outline-none"
                    placeholder="Ask a technical question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
