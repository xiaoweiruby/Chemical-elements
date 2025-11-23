import React from 'react';
import { PeriodicElement, ElementCategory } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface ElementCardProps {
  element: PeriodicElement;
  onClick: (el: PeriodicElement) => void;
}

export const ElementCard: React.FC<ElementCardProps> = ({ element, onClick }) => {
  let gridCol = element.group;
  let gridRow = element.period;

  // Visual adjustments for Lanthanides and Actinides
  if (element.category === ElementCategory.Lanthanide) {
    gridRow = 9;
    gridCol = (element.number - 57) + 4;
  } else if (element.category === ElementCategory.Actinide) {
    gridRow = 10;
    gridCol = (element.number - 89) + 4;
  }

  const colorClass = CATEGORY_COLORS[element.category];

  return (
    <div
      onClick={() => onClick(element)}
      style={{
        gridColumn: gridCol,
        gridRow: gridRow,
      }}
      className={`
        relative aspect-[4/5] p-1 sm:p-2 cursor-pointer
        border border-opacity-30 hover:border-opacity-100 
        bg-opacity-10 backdrop-blur-sm
        transition-all duration-200 ease-out
        hover:scale-110 hover:z-50 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:bg-opacity-30
        flex flex-col justify-between select-none
        clip-tech-card group
        ${colorClass}
      `}
    >
      {/* Hover Glitch Overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>

      <div className="flex justify-between items-start text-[0.5rem] sm:text-xs opacity-70 group-hover:text-white transition-colors font-mono">
        <span>{element.number.toString().padStart(2, '0')}</span>
      </div>
      
      <div className="text-center relative z-10">
        <div className="text-lg sm:text-xl md:text-2xl font-bold font-mono tracking-tighter group-hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {element.symbol}
        </div>
        <div className="text-[0.6rem] sm:text-xs truncate mt-1 font-sans font-semibold text-slate-300 group-hover:text-cyan-200">{element.name}</div>
      </div>
      
      <div className="text-[0.5rem] opacity-50 text-center truncate font-mono group-hover:opacity-80">
        {Math.round(parseFloat(element.atomicMass))}
      </div>

      {/* Tech Decoration Lines */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};