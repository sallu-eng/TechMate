import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
    return (
        <div className="h-full">
            <h1 className="text-2xl font-bold mb-4 p-4 text-center">AI Learning Assistant</h1>
            <ChatInterface />
        </div>
    );
};

export default ChatPage;
