import React from 'react';
import { Award } from 'lucide-react';

interface GameCompleteProps {
    onRestart: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ onRestart }) => {
    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-2xl border-2 border-yellow-400 flex flex-col items-center animate-fade-in-up w-full max-w-lg text-center">
            <Award className="w-20 h-20 text-yellow-300 mb-4" />
            <h1 className="text-4xl font-bold text-yellow-300 mb-2">Training Complete!</h1>
            <p className="text-gray-300 mb-6 text-lg">
                Congratulations! You have successfully mastered the principles, methodology, and applications of RFLP analysis.
            </p>
            <p className="text-gray-400 mb-8">Your dedication and scientific skills are commendable. The lab is proud to certify your expertise.</p>

            <button
                onClick={onRestart}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105"
            >
                Start New Game
            </button>
        </div>
    );
};

export default GameComplete;
