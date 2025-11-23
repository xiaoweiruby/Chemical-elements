import React, { useEffect, useState } from 'react';
import { PeriodicElement, AIDetailData } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface ElementModalProps {
  element: PeriodicElement;
  data: AIDetailData | null;
  isLoading: boolean;
  onClose: () => void;
}

// Component to simulate futuristic data typing
const TypingText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 10 }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

export const ElementModal: React.FC<ElementModalProps> = ({ element, data, isLoading, onClose }) => {
  const colorClass = CATEGORY_COLORS[element.category];
  // Extract base color for border logic
  const baseColorClass = colorClass.split(' ')[0]; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      {/* Close overlay (clicking background closes) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" onClick={onClose}></div>

      <div className={`
        relative w-full max-w-5xl bg-cyber-950 
        border-2 border-opacity-50 
        shadow-[0_0_50px_rgba(6,182,212,0.15),inset_0_0_20px_rgba(0,0,0,0.8)]
        flex flex-col md:flex-row overflow-hidden
        clip-tech-modal
        ${baseColorClass}
      `}>
        
        {/* Moving Scan Line inside Modal */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(34,211,238,0.1)_25%,rgba(34,211,238,0.1)_26%,transparent_27%,transparent_74%,rgba(34,211,238,0.1)_75%,rgba(34,211,238,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(34,211,238,0.1)_25%,rgba(34,211,238,0.1)_26%,transparent_27%,transparent_74%,rgba(34,211,238,0.1)_75%,rgba(34,211,238,0.1)_76%,transparent_77%,transparent)] bg-[length:30px_30px]"></div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan z-20 opacity-50"></div>

        {/* Left Panel: HUD Visuals */}
        <div className={`
          w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center justify-between
          border-b md:border-b-0 md:border-r border-opacity-30 border-current
          relative bg-gradient-to-b from-slate-900/80 to-black/80
        `}>
           <div className="w-full">
             <div className="flex justify-between items-center text-[10px] font-mono opacity-70 mb-8 text-cyan-300">
               <span>ID: {element.number.toString().padStart(3, '0')}</span>
               <span className="animate-pulse">● ONLINE</span>
             </div>

             {/* Holographic Atom Representation */}
             <div className="relative w-full aspect-square max-w-[220px] mx-auto mb-8 flex items-center justify-center">
                {/* Outer Ring */}
                <div className={`absolute inset-0 border border-dashed border-current opacity-40 rounded-full ${isLoading ? 'animate-spin' : 'animate-spin-slow'}`}></div>
                {/* Inner Ring */}
                <div className={`absolute inset-4 border border-current opacity-60 rounded-full ${isLoading ? 'animate-spin' : 'animate-spin-reverse'}`}></div>
                {/* Core Glow */}
                <div className="absolute inset-12 bg-current opacity-10 rounded-full blur-xl animate-pulse-fast"></div>
                
                <div className="text-center z-10 relative transform hover:scale-110 transition-transform duration-500">
                    <h1 className="text-8xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                      {element.symbol}
                    </h1>
                    <div className="absolute top-0 -right-6 text-xs font-mono bg-current text-black px-1 rounded-sm font-bold">
                      {element.number}
                    </div>
                </div>
             </div>
           </div>

           <div className="w-full text-center relative z-10">
             <h2 className="text-4xl font-bold text-white tracking-[0.2em] mb-2 uppercase drop-shadow-md">{element.name}</h2>
             <div className="h-[1px] w-16 mx-auto bg-current mb-4 shadow-[0_0_5px_currentColor]"></div>
             
             <div className="inline-flex items-center border border-current/40 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                <span className={`w-2 h-2 rounded-full bg-current mr-2 ${isLoading ? 'animate-pulse' : ''}`}></span>
                <p className="text-xs text-cyan-100 font-mono uppercase tracking-widest">
                   {element.category}
                </p>
             </div>
             
             <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-left mt-6 w-full">
                <div className="bg-white/5 p-2 border-l-2 border-current hover:bg-white/10 transition-colors">
                   <span className="block text-cyan-400/70 mb-1">MASS UNIT</span>
                   <span className="text-lg text-white">{element.atomicMass}</span>
                </div>
                <div className="bg-white/5 p-2 border-l-2 border-current hover:bg-white/10 transition-colors">
                   <span className="block text-cyan-400/70 mb-1">COORDS</span>
                   <span className="text-lg text-white">P{element.period} / G{element.group}</span>
                </div>
             </div>
           </div>
        </div>

        {/* Right Panel: Data Stream */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col relative min-h-[450px] bg-cyber-950/50">
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 p-4 group flex items-center space-x-2 z-50 outline-none"
          >
             <span className="text-[10px] font-mono text-cyan-500 group-hover:text-white transition-colors">TERMINATE_SESSION</span>
             <div className="w-6 h-6 border border-cyan-500/50 flex items-center justify-center text-cyan-500 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-white transition-all">
               ×
             </div>
          </button>

          {/* Terminal Header */}
          <div className="flex items-center space-x-2 mb-8 font-mono text-xs text-cyan-500/80 border-b border-cyan-900/50 pb-2">
            <span className="animate-pulse">▶</span>
            <span>ACCESSING SECURE DATABASE...</span>
          </div>

          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-80">
              <div className="flex items-end space-x-1 h-12">
                 <div className="w-1 h-full bg-cyan-500 animate-[pulse_1s_ease-in-out_infinite]"></div>
                 <div className="w-1 h-3/4 bg-cyan-500 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
                 <div className="w-1 h-1/2 bg-cyan-500 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
                 <div className="w-1 h-2/3 bg-cyan-500 animate-[pulse_1.3s_ease-in-out_infinite]"></div>
              </div>
              <div className="font-mono text-xs text-cyan-400 animate-pulse tracking-[0.2em]">DECRYPTING DATA PACKETS...</div>
            </div>
          ) : data ? (
            <div className="space-y-6 relative z-10 h-full overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Main Description */}
              <div className="group">
                <h3 className="text-[10px] font-bold text-cyan-600/80 uppercase tracking-widest mb-2 flex items-center">
                   <span className="w-1 h-1 bg-cyan-500 mr-2"></span>
                   ANALYSIS_LOG
                </h3>
                <div className="text-sm md:text-base leading-7 text-cyan-50 font-light border-l border-cyan-500/40 pl-4 bg-gradient-to-r from-cyan-900/10 to-transparent">
                  <TypingText text={data.description} speed={5} />
                </div>
              </div>

              {/* Grid Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                 <div className="bg-black/30 p-4 border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h4 className="text-[10px] text-cyan-400 font-mono mb-2 uppercase tracking-wider opacity-70">MATERIAL_FORM</h4>
                    <p className="text-sm text-white font-medium">
                       <TypingText text={data.substance} speed={15} />
                    </p>
                 </div>
                 <div className="bg-black/30 p-4 border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h4 className="text-[10px] text-cyan-400 font-mono mb-2 uppercase tracking-wider opacity-70">APPLICATIONS</h4>
                    <p className="text-sm text-white font-medium">
                       <TypingText text={data.usage} speed={15} />
                    </p>
                 </div>
              </div>

              {/* Footer Fact */}
              <div className="relative p-4 bg-green-900/10 border border-green-500/20 mt-4 rounded-sm">
                 <div className="absolute -top-2 left-4 px-1 bg-cyber-950 text-green-500 text-[9px] font-bold font-mono border border-green-500/30">
                    TRIVIA_MODULE.exe
                 </div>
                 <p className="text-xs font-mono text-green-300/90 leading-5">
                    > <TypingText text={data.funFact} speed={10} />
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-500/50 ml-1 align-bottom"></span>
                 </p>
              </div>

            </div>
          ) : (
             <div className="flex-1 flex items-center justify-center text-red-500 font-mono border border-red-500/20 bg-red-500/5 p-8 clip-tech-card">
                CRITICAL ERROR: DATA STREAM LOST
             </div>
          )}
          
          {/* Decorative Footer */}
          <div className="mt-auto pt-6 flex justify-between items-end opacity-30 border-t border-white/5">
             <div className="text-[0.5rem] font-mono text-cyan-600">
                SECURE LINK ESTABLISHED // NO-CACHE PROTOCOL ACTIVE<br/>
                NODE: 127.0.0.1 // ENCRYPTION: AES-256
             </div>
             <div className="flex space-x-1">
                <div className="w-1 h-1 bg-cyan-500"></div>
                <div className="w-1 h-1 bg-cyan-500 opacity-50"></div>
                <div className="w-1 h-1 bg-cyan-500 opacity-25"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};