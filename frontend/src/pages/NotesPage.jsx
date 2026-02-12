import React from 'react';
import NotesGenerator from '../components/NotesGenerator';

const NotesPage = () => {
    return (
        <div className="h-full overflow-y-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Smart Notes Generator</h1>
            <NotesGenerator />
        </div>
    );
};

export default NotesPage;
