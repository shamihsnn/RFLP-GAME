import React, { useState, useEffect } from 'react';
import { Dna, GitCommit, Map, Target, BookCheck, Factory, Binary, Microscope } from 'lucide-react';

interface MiniGameProps {
    onComplete: () => void;
    onClose?: () => void;
}

const MiniGameButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button
        {...props}
        className={`w-full text-left p-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-all disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed my-1 ${className || ''}`}
    >
        {children}
    </button>
);

export const EvidenceCollection: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState<number | null>(null);

    // Slide 1: DNA Helix Animation Component
    const Slide1Animation = () => (
        <div className="relative w-full h-48 md:h-56 bg-gradient-to-b from-gray-900 to-blue-900 rounded-xl overflow-hidden border-2 border-blue-400 mb-4">
            {/* Animated DNA Helix */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-48 md:w-64 h-full" viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
                    {/* Left strand - animated */}
                    <path 
                        d="M 30 0 Q 10 37.5, 30 75 Q 50 112.5, 30 150 Q 10 187.5, 30 225 Q 50 262.5, 30 300" 
                        stroke="#3B82F6" 
                        strokeWidth="4" 
                        fill="none" 
                        className="animate-pulse"
                        style={{ animationDuration: '2s' }}
                    />
                    {/* Right strand - animated */}
                    <path 
                        d="M 70 0 Q 90 37.5, 70 75 Q 50 112.5, 70 150 Q 90 187.5, 70 225 Q 50 262.5, 70 300" 
                        stroke="#60A5FA" 
                        strokeWidth="4" 
                        fill="none" 
                        className="animate-pulse"
                        style={{ animationDuration: '2s', animationDelay: '0.3s' }}
                    />
                    {/* Base pairs - staggered animation */}
                    {[0, 37.5, 75, 112.5, 150, 187.5, 225, 262.5].map((y, i) => (
                        <g key={i} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}>
                            <line 
                                x1="30" 
                                y1={y} 
                                x2="70" 
                                y2={y} 
                                stroke={i % 2 === 0 ? "#10B981" : "#F59E0B"} 
                                strokeWidth="3"
                                opacity="0.8"
                            />
                            <circle cx="30" cy={y} r="4" fill="#3B82F6" />
                            <circle cx="70" cy={y} r="4" fill="#60A5FA" />
                        </g>
                    ))}
                </svg>
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
            </div>
            {/* Floating info bubbles */}
            <div className="absolute top-4 left-4 bg-blue-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-200 animate-bounce" style={{ animationDuration: '3s' }}>
                🧬 DNA Double Helix
            </div>
            <div className="absolute bottom-4 right-4 bg-indigo-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-indigo-200 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                💡 Genetic Blueprint
            </div>
        </div>
    );

    // Slide 2: Scissors Cutting DNA Animation
    const Slide2Animation = () => {
        const [cutPhase, setCutPhase] = useState(0);
        
        useEffect(() => {
            const timer = setInterval(() => {
                setCutPhase(prev => (prev + 1) % 3);
            }, 2000);
            return () => clearInterval(timer);
        }, []);

        return (
            <div className="relative w-full h-48 md:h-56 bg-gradient-to-b from-gray-900 to-purple-900 rounded-xl overflow-hidden border-2 border-purple-400 mb-4">
                {/* DNA strand */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8">
                    {cutPhase < 2 ? (
                        <div className="h-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
                    ) : (
                        <div className="flex justify-around items-center gap-4">
                            <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex-1 shadow-lg shadow-blue-500/50 animate-pulse"></div>
                            <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex-1 shadow-lg shadow-blue-500/50 animate-pulse"></div>
                        </div>
                    )}
                </div>
                
                {/* Animated scissors */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500" style={{ transform: cutPhase === 1 ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)' }}>
                    <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L18 18M6 18L18 6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
                        <circle cx="6" cy="6" r="3.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
                        <circle cx="6" cy="18" r="3.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
                        <path d="M12 12L18 6" stroke="#7C2D12" strokeWidth="2.5"/>
                        <path d="M12 12L18 18" stroke="#7C2D12" strokeWidth="2.5"/>
                    </svg>
                </div>
                
                {/* Cut flash effect */}
                {cutPhase === 1 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse"></div>
                )}
                
                {/* Info labels */}
                <div className="absolute top-4 left-4 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-200">
                    ✂️ Restriction Enzyme
                </div>
                <div className="absolute bottom-4 right-4 bg-pink-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-pink-200">
                    {cutPhase < 2 ? '⏳ Cutting...' : '✅ Fragments Created'}
                </div>
                
                {/* Recognition sequence indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-yellow-900/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-yellow-200 font-mono">
                    GAATTC
                </div>
            </div>
        );
    };

    // Slide 3: DNA Fingerprint/Gel Pattern Animation
    const Slide3Animation = () => {
        const [showBands, setShowBands] = useState(false);
        
        useEffect(() => {
            const timer = setTimeout(() => setShowBands(true), 500);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="relative w-full h-48 md:h-56 bg-gradient-to-b from-gray-900 to-green-900 rounded-xl overflow-hidden border-2 border-green-400 mb-4">
                {/* Gel background */}
                <div className="absolute inset-4 bg-gray-800/50 rounded border-2 border-gray-600">
                    {/* Electric field indicators */}
                    <div className="absolute top-2 left-2 text-red-400 font-bold text-sm">− Negative</div>
                    <div className="absolute bottom-2 left-2 text-blue-400 font-bold text-sm">+ Positive</div>
                    
                    {/* DNA Fingerprint lanes */}
                    <div className="absolute inset-0 flex justify-around items-center px-8 py-12">
                        {/* Person A */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs text-gray-300 mb-1">Person A</div>
                            <div className="relative w-8 h-32 md:h-40 bg-gray-700/50 rounded">
                                {showBands && (
                                    <>
                                        <div className="absolute w-full h-2 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 rounded-full shadow-lg shadow-pink-500/50 transition-all duration-1000" style={{ top: '30%', opacity: showBands ? 1 : 0 }}></div>
                                        <div className="absolute w-full h-2 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 rounded-full shadow-lg shadow-pink-500/50 transition-all duration-1000 delay-300" style={{ top: '60%', opacity: showBands ? 1 : 0 }}></div>
                                    </>
                                )}
                            </div>
                            <div className="text-xs text-green-300">5 VNTRs</div>
                        </div>
                        
                        {/* Person B */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs text-gray-300 mb-1">Person B</div>
                            <div className="relative w-8 h-32 md:h-40 bg-gray-700/50 rounded">
                                {showBands && (
                                    <>
                                        <div className="absolute w-full h-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-1000 delay-500" style={{ top: '20%', opacity: showBands ? 1 : 0 }}></div>
                                        <div className="absolute w-full h-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-1000 delay-700" style={{ top: '70%', opacity: showBands ? 1 : 0 }}></div>
                                    </>
                                )}
                            </div>
                            <div className="text-xs text-green-300">10 VNTRs</div>
                        </div>
                        
                        {/* Probe indicator */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-900/80 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-yellow-200">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span>☢ Radioactive Probe</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Info labels */}
                <div className="absolute top-4 right-4 bg-green-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-green-200 animate-pulse">
                    🧬 Unique DNA Fingerprints
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-200">
                    📊 Different Band Patterns = Different Individuals
                </div>
            </div>
        );
    };

    const slides = [
        {
            title: 'Introduction to RFLP',
            animation: <Slide1Animation />,
            content: [
                'RFLP = Restriction Fragment Length Polymorphism',
                'Molecular technique for DNA analysis & identification',
                'First DNA fingerprinting method (1980s)',
                'Developed by Alec Jeffreys in 1984',
                
               
            ]
        },
        {
            title: 'Principle - Restriction Enzymes & Polymorphism',
            animation: <Slide2Animation />,
            content: [
                'Restriction Enzymes:',
                '• "Molecular scissors"',
                '• Recognize specific DNA sequences (e.g., GAATTC)',
                '• Cut DNA at precise locations',
                '',
                'Polymorphism = Natural DNA variations',
                '',
                'Two Types:',
                '1. Restriction site polymorphism - mutations create/destroy cut sites',
                '2. VNTR polymorphism (main source)',
                '   • Variable Number Tandem Repeats',
                '   • Short sequences repeated multiple times',
                '   • Number of repeats varies between individuals'
            ]
        },
        {
            title: 'How RFLP Creates DNA Fingerprints',
            animation: <Slide3Animation />,
            content: [
                'Example:',
                'Person A: [Cut]--5 VNTR repeats--[Cut] = 2kb fragment',
                'Person B: [Cut]--10 VNTR repeats--[Cut] = 4kb fragment',
                '',
                'Result:',
                '• Same restriction sites, different VNTR lengths',
                '• Different fragment sizes = unique band pattern',
                '',
                'Role of Probes:',
                '• Complementary to flanking regions',
                '• Isolate specific VNTR fragments from thousands',
                '• Create visible DNA fingerprint',
                '',
                'Output: Unique genetic "barcode" for each individual'
            ]
        }
    ];

    return (
        <div className="relative">
            <h3 className="text-lg font-bold mb-2">Case File: The Missing Mascot</h3>
            <p className="text-sm mb-4">BLOOD sample was found at the scene. Learn about RFLP analysis and collect the sample.</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-all transform hover:scale-105"
                    >
                        {`Slide ${index + 1}: ${slide.title}`}
                    </button>
                ))}
            </div>

            {currentSlide !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-3 md:p-4 z-[4000] backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8 rounded-2xl w-[95vw] md:w-[90vw] lg:w-auto max-w-6xl max-h-[92vh] overflow-y-auto scroll-smooth border-4 border-blue-400 shadow-2xl shadow-blue-500/50 transform transition-all" style={{ animation: 'slideIn 0.3s ease-out' }}>
                        <div className="flex items-center gap-3 mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-blue-400">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-blue-200 flex-grow">{slides[currentSlide].title}</h4>
                            <span className="text-blue-300 font-semibold bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full text-sm">
                                Slide {currentSlide + 1}/3
                            </span>
                        </div>
                        
                        {/* Animation Section */}
                        {slides[currentSlide].animation}
                        
                        {/* Content Section with sequential reveal */}
                        <div className="space-y-2 md:space-y-3 text-gray-100 bg-gray-800 bg-opacity-40 p-4 md:p-6 rounded-xl border border-blue-500 border-opacity-30 max-h-[30vh] overflow-y-auto scroll-smooth">
                            {slides[currentSlide].content.map((line, i) => (
                                <p 
                                    key={i} 
                                    className={`whitespace-pre-wrap leading-relaxed transition-all duration-500 ${line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') ? 'ml-4 text-blue-100' : line === '' ? 'h-2' : 'text-gray-200 font-medium'}`}
                                    style={{ 
                                        animation: 'fadeInUp 0.5s ease-out forwards',
                                        animationDelay: `${i * 0.1}s`,
                                        opacity: 0
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 md:mt-6 pt-4 border-t border-blue-500/30">
                            <div className="flex gap-2">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`h-2 rounded-full transition-all cursor-pointer hover:bg-blue-300 ${idx === currentSlide ? 'w-8 bg-blue-400' : 'w-2 bg-gray-600'}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentSlide(null)}
                                className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button 
                onClick={onComplete} 
                className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md transition-all font-bold"
            >
                Collect Blood Sample
            </button>
            
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export const DnaExtraction: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const steps = ["Add Lysis Buffer", "Incubate", "Add Proteinase", "Centrifuge", "Collect DNA"];
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setIsAnimating(true);
        }
    };

    if (isAnimating) {
        return (
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-300">Extracting DNA...</h3>
                {/* DNA Extraction Animation */}
                <div className="w-full h-64 bg-gradient-to-b from-gray-900 to-blue-900 rounded-lg my-4 flex items-center justify-center border-2 border-blue-400 relative overflow-hidden">
                    {/* DNA Double Helix */}
                    <div className="relative w-32 h-full flex items-center justify-center">
                        {/* Helix strands */}
                        <svg className="absolute w-full h-full animate-dna-extract" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
                            {/* Left strand */}
                            <path d="M 30 0 Q 10 25, 30 50 Q 50 75, 30 100 Q 10 125, 30 150 Q 50 175, 30 200" 
                                  stroke="#3B82F6" strokeWidth="3" fill="none" className="animate-pulse"/>
                            {/* Right strand */}
                            <path d="M 70 0 Q 90 25, 70 50 Q 50 75, 70 100 Q 90 125, 70 150 Q 50 175, 70 200" 
                                  stroke="#60A5FA" strokeWidth="3" fill="none" className="animate-pulse"/>
                            {/* Base pairs */}
                            {[0, 25, 50, 75, 100, 125, 150, 175].map((y, i) => (
                                <line key={i} x1="30" y1={y} x2="70" y2={y} 
                                      stroke="#10B981" strokeWidth="2" className="animate-pulse" 
                                      style={{animationDelay: `${i * 0.1}s`}}/>
                            ))}
                        </svg>
                        {/* Extraction effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/20 to-transparent animate-slide-up"></div>
                    </div>
                    <p className="absolute bottom-4 text-cyan-300 text-sm font-semibold animate-pulse">DNA Double Helix Extracted</p>
                </div>
                <MiniGameButton onClick={onComplete} className="bg-green-600 hover:bg-green-700">Finish</MiniGameButton>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Extraction Protocol</h3>
            {steps.map((step, index) => (
                <MiniGameButton key={step} onClick={handleStep} disabled={index !== currentStep}>
                    {index < currentStep ? `✓ ${step}` : step}
                </MiniGameButton>
            ))}
        </div>
    );
};

export const DnaDigestion: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const steps = ["Select EcoRI Enzyme", "Combine DNA and Enzyme", "Incubate mixture", "Stop reaction"];
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setIsAnimating(true);
        }
    };

    if (isAnimating) {
        return (
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-300">Digesting DNA...</h3>
                {/* DNA Digestion Animation with Scissors */}
                <div className="w-full h-64 bg-gradient-to-b from-gray-900 to-purple-900 rounded-lg my-4 flex items-center justify-center border-2 border-purple-400 relative overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* DNA strand */}
                        <div className="absolute w-3/4 h-1 bg-blue-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        
                        {/* Scissors cutting at multiple points */}
                        {[25, 50, 75].map((pos, i) => (
                            <div key={i} className="absolute" style={{left: `${pos}%`, top: '50%', transform: 'translate(-50%, -50%)'}}>
                                {/* Scissor SVG */}
                                <svg className="w-12 h-12 animate-scissors-cut" style={{animationDelay: `${i * 0.5}s`}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6L18 18M6 18L18 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                                    <circle cx="6" cy="6" r="3" fill="#DC2626"/>
                                    <circle cx="6" cy="18" r="3" fill="#DC2626"/>
                                    <path d="M12 12L18 6" stroke="#991B1B" strokeWidth="2"/>
                                    <path d="M12 12L18 18" stroke="#991B1B" strokeWidth="2"/>
                                </svg>
                                {/* Cut effect */}
                                <div className="absolute w-0.5 h-8 bg-red-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-flash" style={{animationDelay: `${i * 0.5 + 0.3}s`}}></div>
                            </div>
                        ))}
                        
                        {/* DNA fragments after cutting */}
                        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-around px-8 opacity-0 animate-fade-in" style={{animationDelay: '2s', animationFillMode: 'forwards'}}>
                            <div className="w-16 h-1 bg-blue-300"></div>
                            <div className="w-20 h-1 bg-blue-300"></div>
                            <div className="w-12 h-1 bg-blue-300"></div>
                            <div className="w-24 h-1 bg-blue-300"></div>
                        </div>
                    </div>
                    <p className="absolute bottom-4 text-purple-300 text-sm font-semibold animate-pulse">DNA Cut into Fragments</p>
                </div>
                <MiniGameButton onClick={onComplete} className="bg-green-600 hover:bg-green-700">Finish</MiniGameButton>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Digestion Protocol</h3>
            <p className="text-sm mb-4">Mix your purified DNA with the EcoRI enzyme to cut it into fragments.</p>
            {steps.map((step, index) => (
                <MiniGameButton key={step} onClick={handleStep} disabled={index !== currentStep}>
                    {index < currentStep ? `✓ ${step}` : step}
                </MiniGameButton>
            ))}
        </div>
    );
};

export const Electrophoresis: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const [running, setRunning] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (running && !isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [running, isAnimating]);

    if (isAnimating) {
        return (
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-300">Separation Complete!</h3>
                {/* Gel Electrophoresis Animation */}
                <div className="w-full h-64 bg-gradient-to-b from-gray-900 to-indigo-900 rounded-lg my-4 border-2 border-indigo-400 relative overflow-hidden">
                    {/* Gel matrix background */}
                    <div className="absolute inset-0 bg-blue-900/30"></div>
                    
                    {/* Electric field indicators */}
                    <div className="absolute top-2 left-4 text-red-400 font-bold">−</div>
                    <div className="absolute bottom-2 left-4 text-blue-400 font-bold">+</div>
                    
                    {/* DNA fragments moving */}
                    <div className="relative w-full h-full flex flex-col justify-center items-center px-8">
                        {/* Loading wells at top */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-3 h-3 bg-gray-700 rounded-sm"></div>
                            ))}
                        </div>
                        
                        {/* DNA fragments of different sizes migrating */}
                        {[
                            {size: 'small', distance: 75, width: 'w-16', color: 'bg-pink-400'},
                            {size: 'medium', distance: 55, width: 'w-20', color: 'bg-purple-400'},
                            {size: 'large', distance: 35, width: 'w-24', color: 'bg-blue-400'},
                            {size: 'xlarge', distance: 20, width: 'w-28', color: 'bg-cyan-400'}
                        ].map((fragment, i) => (
                            <div key={i} 
                                 className={`absolute left-1/2 -translate-x-1/2 h-1 ${fragment.width} ${fragment.color} rounded-full animate-migrate-down`}
                                 style={{
                                     top: `${fragment.distance}%`,
                                     animationDelay: `${i * 0.2}s`,
                                     boxShadow: '0 0 10px currentColor'
                                 }}>
                            </div>
                        ))}
                    </div>
                    
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-indigo-300 text-sm font-semibold animate-pulse">DNA Fragments Separated by Size</p>
                </div>
                <MiniGameButton onClick={onComplete} className="bg-green-600 hover:bg-green-700">Finish</MiniGameButton>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Run Gel Electrophoresis</h3>
            {!running ? (
                <div>
                    <p className="text-sm mb-4">This will separate the DNA fragments by size.</p>
                    <MiniGameButton onClick={() => setRunning(true)}>Prepare Gel & Start Power Supply</MiniGameButton>
                </div>
            ) : (
                <div className="text-center p-4">
                    <p className="animate-pulse text-yellow-300">Running... DNA fragments are migrating.</p>
                    <div className="mt-4 h-6 bg-gray-700 rounded-md overflow-hidden relative border-2 border-blue-400">
                        <div className="h-full bg-pink-500 w-1/4 absolute left-0 animate-gel-band-1"></div>
                        <div className="h-full bg-cyan-400 w-1/4 absolute left-0 animate-gel-band-2"></div>
                        <div className="h-full bg-pink-500 w-1/4 absolute left-0 animate-gel-band-3"></div>
                    </div>
                </div>
            )}
        </div>
    );
};


export const SouthernBlotting: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const steps = ["Transfer DNA to Membrane", "UV Crosslink DNA to Membrane", "Wash Membrane"];
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setIsAnimating(true);
        }
    };

    if (isAnimating) {
        return (
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-300">Transferring DNA...</h3>
                {/* Southern Blotting Animation */}
                <div className="w-full h-64 bg-gradient-to-b from-gray-900 to-yellow-900 rounded-lg my-4 border-2 border-yellow-400 relative overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Gel (bottom layer) */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-16 bg-blue-800/50 border-2 border-blue-400 rounded">
                            <p className="text-xs text-blue-300 text-center mt-1">Gel</p>
                            {/* DNA bands in gel */}
                            {[30, 50, 70].map((pos, i) => (
                                <div key={i} className="absolute w-full h-0.5 bg-pink-400 opacity-100 animate-transfer-up" 
                                     style={{top: `${pos}%`, animationDelay: `${i * 0.3}s`}}></div>
                            ))}
                        </div>
                        
                        {/* Transfer arrows */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="text-4xl text-yellow-400 animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>↑</div>
                            ))}
                        </div>
                        
                        {/* Membrane (top layer) */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-16 bg-gray-700/50 border-2 border-yellow-400 rounded">
                            <p className="text-xs text-yellow-300 text-center mt-1">Membrane</p>
                            {/* DNA bands appearing on membrane */}
                            {[30, 50, 70].map((pos, i) => (
                                <div key={i} className="absolute w-full h-0.5 bg-pink-400 opacity-0 animate-appear" 
                                     style={{top: `${pos}%`, animationDelay: `${i * 0.3 + 0.5}s`, animationFillMode: 'forwards'}}></div>
                            ))}
                        </div>
                    </div>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-yellow-300 text-sm font-semibold animate-pulse">DNA Pattern Transferred</p>
                </div>
                <MiniGameButton onClick={onComplete} className="bg-green-600 hover:bg-green-700">Finish</MiniGameButton>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Southern Blotting Protocol</h3>
            {steps.map((step, index) => (
                <MiniGameButton key={step} onClick={handleStep} disabled={index !== currentStep}>
                    {index < currentStep ? `✓ ${step}` : step}
                </MiniGameButton>
            ))}
        </div>
    );
};

export const ProbeHybridization: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const steps = ["Prepare Radioactive Probe", "Add Probe to Membrane", "Incubate in Hybridization Oven", "Wash Excess Probe"];
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setIsAnimating(true);
        }
    };

    if (isAnimating) {
        return (
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-300">Hybridizing...</h3>
                {/* Probe Hybridization Animation */}
                <div className="w-full h-64 bg-gradient-to-b from-gray-900 to-green-900 rounded-lg my-4 border-2 border-green-400 relative overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* DNA strands on membrane */}
                        <div className="absolute w-3/4 space-y-8">
                            {[0, 1, 2].map((strand, i) => (
                                <div key={i} className="relative h-2 bg-blue-600/40 rounded-full">
                                    {/* Target sequence region */}
                                    <div className="absolute left-1/3 w-1/3 h-full bg-blue-400 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Radioactive probes floating and binding */}
                        {[0, 1, 2].map((probe, i) => (
                            <div key={i} className="absolute animate-probe-bind" 
                                 style={{
                                     left: '50%',
                                     top: `${20 + i * 25}%`,
                                     animationDelay: `${i * 0.4}s`
                                 }}>
                                {/* Glowing probe */}
                                <div className="relative">
                                    <div className="w-8 h-2 bg-yellow-400 rounded-full animate-pulse" 
                                         style={{boxShadow: '0 0 20px #FBBF24'}}></div>
                                    {/* Radioactive symbol */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400 text-xs">☢</div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Binding effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse"></div>
                    </div>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-green-300 text-sm font-semibold animate-pulse">Probes Bound to Target DNA</p>
                </div>
                <MiniGameButton onClick={onComplete} className="bg-green-600 hover:bg-green-700">Finish</MiniGameButton>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Probe Hybridization Protocol</h3>
            <p className="text-sm mb-4">Caution: Handling radioactive materials.</p>
            {steps.map((step, index) => (
                <MiniGameButton key={step} onClick={handleStep} disabled={index !== currentStep}>
                    {index < currentStep ? `✓ ${step}` : step}
                </MiniGameButton>
            ))}
        </div>
    );
};


export const AutoradiographyAnalysis: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const [suspect, setSuspect] = useState<number | null>(null);
    const [step, setStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnalysisComplete = () => {
        setIsAnimating(true);
    };

    if (isAnimating) {
        return (
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-300">Developing Film...</h3>
                {/* Autoradiogram Animation */}
                <div className="w-full h-64 bg-gradient-to-b from-gray-900 to-pink-900 rounded-lg my-4 border-2 border-pink-400 relative overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* X-ray film background */}
                        <div className="absolute inset-4 bg-gray-800 rounded border-2 border-gray-600">
                            {/* Film developing effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent animate-film-develop"></div>
                            
                            {/* DNA bands appearing on film */}
                            <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 p-8">
                                {[
                                    {width: 'w-32', pos: 20},
                                    {width: 'w-40', pos: 40},
                                    {width: 'w-36', pos: 60},
                                    {width: 'w-28', pos: 80}
                                ].map((band, i) => (
                                    <div key={i} className="relative w-full flex justify-center">
                                        <div className={`h-2 ${band.width} bg-white/0 rounded-full animate-band-appear`}
                                             style={{
                                                 animationDelay: `${i * 0.3}s`,
                                                 animationFillMode: 'forwards',
                                                 boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                                             }}></div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Film grain effect */}
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                                backgroundSize: '100px 100px'
                            }}></div>
                        </div>
                        
                        {/* Film label */}
                        <div className="absolute top-2 right-2 text-xs text-gray-400 font-mono">X-RAY FILM</div>
                    </div>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-pink-300 text-sm font-semibold animate-pulse">DNA Fingerprint Revealed</p>
                </div>
                <MiniGameButton onClick={onComplete} className="bg-green-600 hover:bg-green-700">Finish</MiniGameButton>
            </div>
        );
    }

    if (step === 0) {
        return (
            <div>
                <h3 className="text-lg font-bold mb-2">Expose to X-Ray Film</h3>
                <p className="text-sm mb-4">Place the membrane against an X-ray film in a dark cassette to detect the radioactive probe.</p>
                <MiniGameButton onClick={() => setStep(1)}>Expose Film</MiniGameButton>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Analyze DNA Fingerprints</h3>
            <div className="flex justify-around items-center bg-black p-4 rounded-md my-4 h-32 border-2 border-pink-500">
                <div className="text-center"><p>Crime Scene</p><div className="relative h-20 w-4 bg-gray-700"><div className="absolute bg-yellow-300 h-1 w-full" style={{top: '30%'}}></div><div className="absolute bg-yellow-300 h-1 w-full" style={{top: '70%'}}></div></div></div>
                <div className="text-center"><p>Suspect 1</p><div className="relative h-20 w-4 bg-gray-700"><div className="absolute bg-white h-1 w-full" style={{top: '40%'}}></div></div></div>
                <div className="text-center"><p>Suspect 2</p><div className="relative h-20 w-4 bg-gray-700"><div className="absolute bg-white h-1 w-full" style={{top: '30%'}}></div><div className="absolute bg-white h-1 w-full" style={{top: '70%'}}></div></div></div>
                <div className="text-center"><p>Suspect 3</p><div className="relative h-20 w-4 bg-gray-700"><div className="absolute bg-white h-1 w-full" style={{top: '20%'}}></div><div className="absolute bg-white h-1 w-full" style={{top: '50%'}}></div></div></div>
            </div>
            <p className="text-sm mb-4">Compare the patterns. Which suspect matches the crime scene DNA?</p>
            <div className="flex space-x-2">
                <button onClick={() => setSuspect(1)} className={`w-full p-2 rounded ${suspect === 1 ? 'bg-red-500' : 'bg-gray-600'}`}>Suspect 1</button>
                <button onClick={() => setSuspect(2)} className={`w-full p-2 rounded ${suspect === 2 ? 'bg-green-500' : 'bg-gray-600'}`}>Suspect 2</button>
                <button onClick={() => setSuspect(3)} className={`w-full p-2 rounded ${suspect === 3 ? 'bg-red-500' : 'bg-gray-600'}`}>Suspect 3</button>
            </div>
            {suspect === 2 && <MiniGameButton onClick={handleAnalysisComplete} className="mt-4 bg-green-700 hover:bg-green-800">Confirm Match & Complete Analysis</MiniGameButton>}
        </div>
    );
};

const GEL_PATTERNS = {
    Forensics: {
        labels: ["Crime Scene", "Suspect 1", "Suspect 2"],
        bands: [ [30, 70], [40, 80], [30, 70] ],
        correctIndex: 2,
    },
    Paternity: {
        labels: ["Child", "Mother", "Father 1", "Father 2"],
        bands: [ [25, 45, 70], [45, 70], [20, 55], [25, 60] ],
        correctIndex: -1, // Paternity is more complex, let's simplify for the game
        explanation: "The child's bands must match one from the mother and one from the father. Here, band at 25% must come from a father. Father 2 has a matching band."
    },
    Disease: {
        labels: ["Healthy", "Patient 1", "Patient 2"],
        bands: [ [50], [20, 30], [50] ],
        correctIndex: 1,
    }
}

export const ApplicationMinigame: React.FC<MiniGameProps & {type: 'Forensics' | 'Paternity' | 'Disease'}> = ({ onComplete, onClose, type }) => {
    const { labels, bands, correctIndex } = GEL_PATTERNS[type];
    const [selected, setSelected] = useState<number|null>(null);
    const isPaternity = type === "Paternity";

    const handleSelect = (index: number) => {
        if(isPaternity) {
             setSelected(3); // Hardcode correct father for simplicity
        } else {
            setSelected(index);
        }
    }

    return (
        <div>
             <div className="flex justify-around items-center bg-black p-4 rounded-md my-4 h-32 border-2 border-blue-400">
                {labels.map((label, i) => (
                    <div className="text-center" key={label}>
                        <p className="text-xs">{label}</p>
                         <div className="relative h-20 w-4 bg-gray-700 mx-auto">
                            {bands[i].map(bandPos => (
                                <div key={bandPos} className="absolute bg-white h-1 w-full" style={{top: `${bandPos}%`}}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {isPaternity ? (
                 <p className="text-sm mb-4">{GEL_PATTERNS.Paternity.explanation}</p>
            ): (
                <p className="text-sm mb-4">Select the sample that matches the case.</p>
            )}
           
            <div className="flex space-x-2">
                 {labels.map((label, i) => {
                     // Don't make buttons for evidence/child/mother etc.
                     if ((isPaternity && i < 2) || (!isPaternity && i === 0)) return null;

                     return <button key={i} onClick={() => handleSelect(i)} className={`w-full p-2 rounded ${selected === i ? 'bg-blue-500' : 'bg-gray-600'}`}>{label}</button>
                 })}
            </div>
             {((isPaternity && selected === 3) || (!isPaternity && selected === correctIndex)) && (
                <MiniGameButton onClick={onComplete} className="mt-4 bg-green-700 hover:bg-green-800">Confirm Correct Match</MiniGameButton>
            )}
        </div>
    )
}

export const InfoDisplay: React.FC<MiniGameProps & { description?: string }> = ({ onComplete, onClose, description }) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow bg-gray-800 p-6 rounded-lg">
                <p className="text-lg text-white whitespace-pre-wrap leading-relaxed">{description}</p>
            </div>
            <div className="mt-4 flex justify-end">
                <button 
                    onClick={handleClose} 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// Display a large protocol steps image inside the interaction modal.
export const StepsImageDisplay: React.FC<MiniGameProps & {src?: string}> = ({ onComplete, onClose, src }) => {
    const [imageError, setImageError] = React.useState(false);
    
    React.useEffect(() => {
        console.log('StepsImageDisplay rendered with src:', src);
    }, [src]);

    const handleImageError = () => {
        console.error('Failed to load image:', src);
        setImageError(true);
    };

    const handleImageLoad = () => {
        console.log('Image loaded successfully:', src);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="max-h-[60vh] overflow-auto w-full flex items-center justify-center p-2 bg-gray-900 rounded">
                {src && !imageError ? (
                    <img 
                        src={src} 
                        alt="RFLP Protocol Steps Diagram"
                        className="max-w-full max-h-[60vh] object-contain" 
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-300 p-4 text-center">
                        {imageError ? 
                            `Error loading image from ${src}. Please check the file exists and is accessible.` : 
                            'No image provided'}
                    </div>
                )}
            </div>
            <div className="w-full mt-4 flex justify-end space-x-2">
                <button onClick={handleClose} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">Done</button>
            </div>
        </div>
    );
};

        // Display advantages with icons and better formatting
        export const AdvantagesDisplay: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
            const advantages = [
                { icon: '✓', title: 'Semi-Dominant Markers', text: 'Produces semi-dominant markers, allowing determination of homozygosity or heterozygosity.', color: 'from-emerald-500 to-green-600' },
                { icon: '⚡', title: 'Stable & Reproducible', text: 'Gives constant, reliable results over time and across different locations.', color: 'from-cyan-500 to-blue-600' },
                { icon: '📊', title: 'No Prior Sequence Info', text: 'No prior information on DNA sequence is required to perform the analysis.', color: 'from-violet-500 to-purple-600' },
                { icon: '🎯', title: 'Relatively Simple', text: 'Conceptually straightforward technique with well-established protocols.', color: 'from-amber-500 to-orange-600' }
            ];

            const handleClose = () => {
                if (onClose) {
                    onClose();
                } else {
                    onComplete();
                }
            };

            return (
                <div className="flex flex-col h-full w-full">
                    {/* Header with gradient */}
                    <div className="text-center mb-6">
                        <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Advantages of RFLP</h3>
                        <p className="text-gray-400 text-sm mt-2">Key benefits of this pioneering technique</p>
                    </div>
                    
                    {/* Advantages Grid */}
                    <div className="flex-grow overflow-auto px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {advantages.map((adv, idx) => (
                                <div 
                                    key={idx} 
                                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl border-2 border-green-500/20 hover:border-green-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                                    style={{animationDelay: `${idx * 0.1}s`}}
                                >
                                    {/* Icon Badge */}
                                    <div className={`absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br ${adv.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform`}>
                                        <span className="text-2xl">{adv.icon}</span>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="ml-6 mt-2">
                                        <h4 className="font-bold text-green-300 text-lg mb-2 group-hover:text-green-200 transition-colors">{adv.title}</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{adv.text}</p>
                                    </div>
                                    
                                    {/* Decorative corner */}
                                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-green-500/20 rounded-br-lg"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Close Button */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={handleClose} 
                            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );
        };

        // Display limitations with icons and better formatting
        export const LimitationsDisplay: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
            const limitations = [
                { icon: '⚗️', title: 'High DNA Requirements', text: 'Requires large amounts of high-quality DNA sample', color: 'from-orange-500 to-red-500' },
                { icon: '⏱️', title: 'Time-Consuming', text: 'Slow process taking 5-7 days to complete', color: 'from-amber-500 to-orange-500' },
                { icon: '🔧', title: 'Technical Complexity', text: 'Labor-intensive and technically demanding procedure', color: 'from-yellow-500 to-amber-500' },
                { icon: '🎯', title: 'Limited Detection', text: 'Detects polymorphisms only at restriction sites', color: 'from-orange-500 to-amber-500' },
                { icon: '📉', title: 'Low Sensitivity', text: 'Cannot detect very small mutations effectively', color: 'from-red-500 to-orange-500' },
                { icon: '🔬', title: 'Limited Loci', text: 'Analyzes limited number of loci per experiment', color: 'from-amber-500 to-yellow-500' },
                
            ];

            const handleClose = () => {
                if (onClose) {
                    onClose();
                } else {
                    onComplete();
                }
            };

            return (
                <div className="flex flex-col h-full w-full">
                    {/* Header with gradient */}
                    <div className="text-center mb-6">
                        <div className="inline-block bg-gradient-to-r from-orange-400 to-amber-500 p-3 rounded-full mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Limitations of RFLP</h3>
                        <p className="text-gray-400 text-sm mt-2">Important considerations and constraints</p>
                    </div>
                    
                    {/* Limitations Grid */}
                    <div className="flex-grow overflow-auto px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {limitations.map((lim, idx) => (
                                <div 
                                    key={idx} 
                                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border-2 border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                                    style={{animationDelay: `${idx * 0.1}s`}}
                                >
                                    {/* Icon Badge */}
                                    <div className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${lim.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform`}>
                                        <span className="text-xl">{lim.icon}</span>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="ml-6 mt-1">
                                        <h4 className="font-bold text-orange-300 text-base mb-1 group-hover:text-orange-200 transition-colors">{lim.title}</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{lim.text}</p>
                                    </div>
                                    
                                    {/* Warning indicator */}
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Close Button */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={handleClose} 
                            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );
        };

        // Display comparison table for RFLP vs PCR
        export const ComparisonTable: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
            const handleClose = () => {
                if (onClose) {
                    onClose();
                } else {
                    onComplete();
                }
            };

            const comparisonData = [
                { characteristic: 'Full Form', rflp: 'Restriction Fragment Length Polymorphism', pcr: 'Polymerase Chain Reaction', icon: '📝' },
                { characteristic: 'Principle', rflp: 'Cuts DNA with enzymes, detects fragment differences', pcr: 'Amplifies specific DNA segment rapidly', icon: '🧬' },
                { characteristic: 'DNA Amount Required', rflp: 'Large amounts (microgram level)', pcr: 'Very small amounts (nanogram level)', icon: '🧪' },
                { characteristic: 'Time Required', rflp: 'Several days (5-7 days)', pcr: 'A few hours (2-4 hours)', icon: '⏱️' },
                { characteristic: 'Sensitivity', rflp: 'Less sensitive', pcr: 'Highly sensitive', icon: '🔍' },
                { characteristic: 'Process Steps', rflp: 'Digestion → Gel → Blotting → Hybridization', pcr: 'Thermal cycling with primers', icon: '🔄' },
                { characteristic: 'Primary Application', rflp: 'Genetic mapping, forensics, diagnosis', pcr: 'Cloning, diagnostics, mutation detection', icon: '🎯' },
                { characteristic: 'Cost & Complexity', rflp: 'More expensive and technically complex', pcr: 'Cost-effective and simpler', icon: '💰' },
                { characteristic: 'Automation', rflp: 'Difficult to automate', pcr: 'Easily automated', icon: '🤖' },
                
            ];

            return (
                <div className="flex flex-col h-full w-full max-h-[70vh]">
                    {/* Header with gradient */}
                    <div className="text-center mb-6">
                        <div className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">RFLP vs PCR Comparison</h3>
                        <p className="text-gray-400 text-sm mt-2">Side-by-side comparison of two DNA analysis techniques</p>
                    </div>
                    
                    {/* Comparison Table */}
                    <div className="flex-grow overflow-auto rounded-xl border-2 border-gray-700">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 z-10">
                                <tr className="border-b-2 border-cyan-500">
                                    <th className="p-4 text-left font-bold text-cyan-300 w-1/4">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                            Characteristic
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-bold text-green-300 w-3/8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            RFLP
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-bold text-purple-300 w-3/8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                            PCR
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, idx) => (
                                    <tr 
                                        key={idx} 
                                        className={`border-b border-gray-700 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all ${idx % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'}`}
                                    >
                                        <td className="p-4 font-semibold text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{row.icon}</span>
                                                {row.characteristic}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-300 border-l border-gray-700">
                                            <div className="flex items-start gap-2">
                                                <div className="w-1 h-full bg-green-500/30 rounded-full"></div>
                                                <span>{row.rflp}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-300 border-l border-gray-700">
                                            <div className="flex items-start gap-2">
                                                <div className="w-1 h-full bg-purple-500/30 rounded-full"></div>
                                                <span>{row.pcr}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Close Button */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={handleClose} 
                            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );
        };

        // Display references with better formatting
        export const ReferencesDisplay: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
            const handleClose = () => {
                if (onClose) {
                    onClose();
                } else {
                    onComplete();
                }
            };
            const references = [
                {
                    authors: 'Southern, E.M.',
                    year: '1975',
                    title: 'Detection of specific sequences among DNA fragments separated by gel electrophoresis',
                    journal: 'Journal of Molecular Biology',
                    type: 'Foundational Paper',
                    color: 'from-blue-500 to-indigo-600'
                },
                {
                    authors: 'Botstein, D., White, R.L., Skolnick, M., & Davis, R.W.',
                    year: '1980',
                    title: 'Construction of a genetic linkage map in man using restriction fragment length polymorphisms',
                    journal: 'American Journal of Human Genetics',
                    type: 'Key Application',
                    color: 'from-purple-500 to-pink-600'
                }
            ];

            return (
                <div className="flex flex-col h-full w-full">
                    {/* Header with gradient */}
                    <div className="text-center mb-6">
                        <div className="inline-block bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-full mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Key References</h3>
                        <p className="text-gray-400 text-sm mt-2">Foundational research in RFLP technology</p>
                    </div>
                    
                    {/* References */}
                    <div className="flex-grow overflow-auto px-2 space-y-5">
                        {references.map((ref, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border-2 border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                            >
                                {/* Citation Number Badge */}
                                <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${ref.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform`}>
                                    <span className="text-white font-bold text-xl">{idx + 1}</span>
                                </div>
                                
                                {/* Type Badge */}
                                <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-xs text-white font-semibold mb-3 shadow-md">
                                    📝 {ref.type}
                                </div>
                                
                                {/* Content */}
                                <div className="ml-4">
                                    <p className="text-blue-200 font-bold text-lg mb-2">{ref.authors} <span className="text-blue-400">({ref.year})</span></p>
                                    <p className="text-gray-200 italic text-base mb-2 leading-relaxed">"{ref.title}"</p>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                                        </svg>
                                        <span>{ref.journal}</span>
                                    </div>
                                </div>
                                
                                {/* Decorative corner */}
                                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-blue-500/20 rounded-br-lg"></div>
                            </div>
                        ))}
                        
                        {/* Additional Resources */}
                        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-5 rounded-xl border-2 border-indigo-500/30">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-indigo-300 text-lg">Additional Resources</h4>
                            </div>
                            <ul className="space-y-2 ml-2">
                                {[
                                    'National Center for Biotechnology Information (NCBI) - RFLP Database',
                                    'Molecular Biology of the Cell (Alberts et al.) - Chapter on DNA Analysis',
                                    'Forensic DNA Typing (Butler, J.M.) - RFLP Applications in Forensics'
                                ].map((resource, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <span className="text-indigo-400 mt-1">•</span>
                                        <span>{resource}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Close Button */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={handleClose} 
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );
        };

        // Completion certificate display
        export const CompletionDisplay: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
            const handleClose = () => {
                if (onClose) {
                    onClose();
                } else {
                    onComplete();
                }
            };
            return (
                <div className="flex flex-col h-full w-full">
                    <div className="flex-grow bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-8 rounded-2xl border-4 border-yellow-400 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                        {/* Animated background particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float" 
                                     style={{
                                         left: `${Math.random() * 100}%`,
                                         top: `${Math.random() * 100}%`,
                                         animationDelay: `${Math.random() * 3}s`,
                                         animationDuration: `${3 + Math.random() * 2}s`
                                     }}></div>
                            ))}
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            {/* Trophy Icon */}
                            <div className="mb-6 relative">
                                <div className="text-8xl animate-bounce-slow">🏆</div>
                                <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
                            </div>
                            
                            {/* Title */}
                            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-6 animate-pulse">
                                Congratulations!
                            </h2>
                            
                            {/* Certificate Card */}
                            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border-2 border-white/20 max-w-2xl shadow-2xl transform hover:scale-105 transition-transform">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                    </svg>
                                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                                </div>
                                
                                <p className="text-xl text-gray-100 mb-3">You have successfully completed</p>
                                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent mb-6">
                                    RFLP Training Program
                                </h3>
                                
                                <div className="space-y-3 mb-6">
                                    {[
                                        { icon: '✓', text: 'Mastered RFLP Principles' },
                                        { icon: '✓', text: 'Completed Methodology Steps' },
                                        { icon: '✓', text: 'Explored Real-World Applications' },
                                        { icon: '✓', text: 'Understood Limitations & Comparisons' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-center gap-2 text-gray-200">
                                            <span className="text-green-400 font-bold text-xl">{item.icon}</span>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t-2 border-yellow-400/30 pt-6 mt-6">
                                    <p className="text-yellow-300 font-bold text-xl mb-2">🎓 Ready to Graduate!</p>
                                    <p className="text-gray-300 text-sm">You are now certified in RFLP analysis</p>
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="mt-8 flex items-center justify-center gap-2 text-gray-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                <span className="text-sm font-semibold">Certificate of Completion • RFLP Virtual Laboratory</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Close Button */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={handleClose} 
                            className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-600 rounded-xl text-white font-bold text-lg transition-all shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-110"
                        >
                            🎉 Finish & Close
                        </button>
                    </div>
                </div>
            );
        };


// Display for Genome Mapping with custom styling
export const GenomeMappingDisplay: React.FC<MiniGameProps> = ({ onComplete, onClose }) => {
    const mappingSteps = [
        { icon: Dna, text: 'RFLP detects variations in DNA fragment lengths after restriction enzyme digestion.' },
        { icon: GitCommit, text: 'These variations serve as genetic markers throughout the genome.' },
        { icon: Map, text: 'By studying inheritance patterns, recombination frequencies are calculated to determine the relative positions of genes on chromosomes.' },
        { icon: Target, text: 'Multiple RFLP markers are used to create detailed linkage maps showing gene order.' },
        { icon: BookCheck, text: 'RFLP mapping is crucial for identifying disease genes and genetic trait loci.' },
        { icon: Factory, text: 'It has been used extensively in plants, animals, and humans for gene localization studies.' },
        { icon: Binary, text: 'Though now supplemented by newer methods, RFLP provided foundational genetic maps for modern genomics.' }
    ];

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <h3 className="text-2xl font-bold text-blue-300 mb-6 text-center">Genome Mapping with RFLP</h3>
            <div className="flex-grow overflow-auto space-y-4 pr-2">
                {mappingSteps.map((step, idx) => (
                    <div 
                        key={idx} 
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-900/50 rounded-full flex items-center justify-center border border-blue-700">
                                <step.icon className="text-blue-300" size={20} />
                            </div>
                            <p className="text-gray-300 text-base leading-relaxed pt-1">{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleClose} 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition-all shadow-md hover:shadow-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// Keep old ones for constants file to not break types, though they are unused.
export const EnzymeSelection = () => <div />;
export const GelPrep = () => <div />;
export const GelLoading = () => <div />;
export const UvImaging = () => <div />;
export const Analysis = () => <div />;
