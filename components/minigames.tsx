import React, { useState, useEffect } from 'react';

interface MiniGameProps {
    onComplete: () => void;
}

const MiniGameButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button
        {...props}
        className={`w-full text-left p-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-all disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed my-1 ${className || ''}`}
    >
        {children}
    </button>
);

export const EvidenceCollection: React.FC<MiniGameProps> = ({ onComplete }) => {
    const [currentSlide, setCurrentSlide] = useState<number | null>(null);

    const slides = [
        {
            title: 'Introduction to RFLP',
            content: [
                'RFLP = Restriction Fragment Length Polymorphism',
                'Molecular technique for DNA analysis & identification',
                'First DNA fingerprinting method (1980s)',
                'Applications: Forensics, paternity testing, disease diagnosis, genome mapping'
            ]
        },
        {
            title: 'Principle - Restriction Enzymes & Polymorphism',
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
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-all"
                    >
                        {`Slide ${index + 1}: ${slide.title}`}
                    </button>
                ))}
            </div>

            {currentSlide !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[4000]">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full border-2 border-blue-400">
                        <h4 className="text-xl font-bold mb-4 text-blue-300">{slides[currentSlide].title}</h4>
                        <div className="space-y-2 text-gray-100">
                            {slides[currentSlide].content.map((line, i) => (
                                <p key={i} className="whitespace-pre-wrap">{line}</p>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentSlide(null)}
                            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <button 
                onClick={onComplete} 
                className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md transition-all font-bold"
            >
                Collect Blood Sample
            </button>
        </div>
    );
};

export const DnaExtraction: React.FC<MiniGameProps> = ({ onComplete }) => {
    const steps = ["Add Lysis Buffer", "Incubate", "Add Proteinase", "Centrifuge", "Collect DNA"];
    const [currentStep, setCurrentStep] = useState(0);

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            onComplete();
        }
    };

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

export const DnaDigestion: React.FC<MiniGameProps> = ({ onComplete }) => {
    const steps = ["Select EcoRI Enzyme", "Combine DNA and Enzyme", "Incubate mixture", "Stop reaction"];
    const [currentStep, setCurrentStep] = useState(0);

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            onComplete();
        }
    };

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

export const Electrophoresis: React.FC<MiniGameProps> = ({ onComplete }) => {
    const [running, setRunning] = useState(false);
    
    useEffect(() => {
        if (running) {
            const timer = setTimeout(onComplete, 3000);
            return () => clearTimeout(timer);
        }
    }, [running, onComplete]);

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


export const SouthernBlotting: React.FC<MiniGameProps> = ({ onComplete }) => {
    const steps = ["Transfer DNA to Membrane", "UV Crosslink DNA to Membrane", "Wash Membrane"];
    const [currentStep, setCurrentStep] = useState(0);

    const handleStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
        else onComplete();
    };

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

export const ProbeHybridization: React.FC<MiniGameProps> = ({ onComplete }) => {
    const steps = ["Prepare Radioactive Probe", "Add Probe to Membrane", "Incubate in Hybridization Oven", "Wash Excess Probe"];
    const [currentStep, setCurrentStep] = useState(0);
    
    const handleStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
        else onComplete();
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Probe Hybridization Protocol</h3>
             <p className="text-sm mb-4 text-yellow-500">Caution: Handling radioactive materials.</p>
            {steps.map((step, index) => (
                <MiniGameButton key={step} onClick={handleStep} disabled={index !== currentStep}>
                    {index < currentStep ? `✓ ${step}` : step}
                </MiniGameButton>
            ))}
        </div>
    );
};


export const AutoradiographyAnalysis: React.FC<MiniGameProps> = ({ onComplete }) => {
    const [suspect, setSuspect] = useState<number | null>(null);
    const [step, setStep] = useState(0);

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
            {suspect === 2 && <MiniGameButton onClick={onComplete} className="mt-4 bg-green-700 hover:bg-green-800">Confirm Match & Complete Analysis</MiniGameButton>}
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

export const ApplicationMinigame: React.FC<MiniGameProps & {type: 'Forensics' | 'Paternity' | 'Disease'}> = ({ onComplete, type }) => {
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

export const InfoDisplay: React.FC<MiniGameProps> = ({ onComplete }) => {
    return (
        <div className="text-center">
            <p className="text-sm mb-4">This is an informational display. Read the description above to learn more.</p>
             <MiniGameButton onClick={onComplete} className="mt-4 bg-blue-700 hover:bg-blue-800">Continue</MiniGameButton>
        </div>
    );
};

// Display a large protocol steps image inside the interaction modal.
export const StepsImageDisplay: React.FC<MiniGameProps & {src?: string}> = ({ onComplete, src }) => {
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
                <button onClick={onComplete} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">Done</button>
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
