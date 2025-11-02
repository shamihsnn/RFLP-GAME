import React from 'react';
import { InteractiveObject, Step } from '../types';
import { X } from 'lucide-react';

interface InteractionModalProps {
    interactiveObject: InteractiveObject;
    step: Step;
    onClose: () => void;
    onComplete: () => void;
}

const InteractionModal: React.FC<InteractionModalProps> = ({ interactiveObject, step, onClose, onComplete }) => {
    const MiniGameComponent = step.miniGame;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[3000]">
            <div className="bg-gray-800 text-white rounded-lg shadow-2xl border-2 border-blue-400 w-3/4 max-w-2xl transform transition-all animate-fade-in-up relative">
                <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-yellow-300">{interactiveObject.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    <p className="mb-4 text-gray-300">{step.description}</p>
                    <div className="bg-gray-900 p-4 rounded-md border border-gray-700 min-h-[150px]">
                         {MiniGameComponent ? (
                            // Pass both the onComplete callback and any additional props from step.miniGameProps
                            <MiniGameComponent onComplete={onComplete} {...(step.miniGameProps || {})} />
                         ) : (
                            // Fallback for displays with no minigame
                            <div className="flex flex-col items-center justify-center h-full">
                               <button onClick={onClose} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-md font-bold">Close</button>
                            </div>
                         )
                         }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractionModal;
