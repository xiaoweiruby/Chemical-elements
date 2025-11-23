import React, { useState, useCallback } from 'react';
import { ELEMENTS } from './constants';
import { ElementCard } from './components/ElementCard';
import { ElementModal } from './components/ElementModal';
import { PeriodicElement, AIDetailData } from './types';
import { fetchElementDetails } from './services/geminiService';

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);
  const [aiData, setAiData] = useState<AIDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleElementClick = useCallback(async (element: PeriodicElement) => {
    setSelectedElement(element);
    setAiData(null);
    setIsLoading(true);

    // Fetch data from Gemini
    const data = await fetchElementDetails(element);
    
    setAiData(data);
    setIsLoading(false);
  }, []);

  const closeModal = () => {
    setSelectedElement(null);
    setAiData(null);
  };

  return (
    <div className="min-h-screen w-full bg-cyber-900 text-cyan-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      <header className="relative z-10 pt-8 pb-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          CYBER<span className="text-white">ELEMENT</span>
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-400 font-mono">
          INTERACTIVE PERIODIC DATA VISUALIZATION
        </p>
      </header>

      <main className="relative z-10 p-2 sm:p-4 md:p-8 overflow-x-auto">
        <div className="min-w-[800px] max-w-7xl mx-auto">
          {/* Main Grid Layout */}
          <div 
            className="grid gap-1 sm:gap-2"
            style={{
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(0, 1fr))', 
            }}
          >
            {ELEMENTS.map((el) => (
              <ElementCard 
                key={el.number} 
                element={el} 
                onClick={handleElementClick} 
              />
            ))}
            
            {/* Label for Lanthanides/Actinides placeholders in main table if strictly scientific, 
                but for this visual layout, we move the inner blocks down via grid-row logic in ElementCard. 
                We can add visual cues here if needed. */}
            
            {/* Key / Legend */}
            <div className="col-span-4 row-span-2 col-start-4 row-start-2 sm:col-start-5 sm:row-start-2 p-4 hidden lg:flex flex-col justify-center items-start border border-white/5 bg-white/5 backdrop-blur-md rounded-lg">
               <h3 className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-widest">System Status</h3>
               <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                 <span>AI NODE: ONLINE</span>
               </div>
               <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-1">
                 <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                 <span>DB: 118 ENTRIES</span>
               </div>
               <div className="mt-4 text-[10px] text-slate-500 max-w-[200px]">
                 Select an element to initiate quantum analysis sequence.
               </div>
            </div>

            {/* Element Category Legend (Simplified) */}
             <div className="col-span-10 row-span-2 col-start-4 row-start-1 md:col-start-3 md:row-start-1 hidden sm:flex justify-center items-end pb-2 space-x-4">
                <div className="flex items-center text-[10px] opacity-60"><div className="w-3 h-3 bg-green-400/20 border border-green-400 mr-1"></div>Nonmetal</div>
                <div className="flex items-center text-[10px] opacity-60"><div className="w-3 h-3 bg-blue-400/20 border border-blue-400 mr-1"></div>Transition</div>
                <div className="flex items-center text-[10px] opacity-60"><div className="w-3 h-3 bg-purple-400/20 border border-purple-400 mr-1"></div>Noble Gas</div>
             </div>

          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-8 text-slate-600 text-xs font-mono">
        POWERED BY GOOGLE GEMINI 2.5 FLASH // REACT 18 // TAILWIND
      </footer>

      {selectedElement && (
        <ElementModal 
          element={selectedElement} 
          data={aiData} 
          isLoading={isLoading} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default App;
