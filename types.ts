export enum ElementCategory {
  Nonmetal = 'nonmetal',
  NobleGas = 'noble-gas',
  AlkaliMetal = 'alkali-metal',
  AlkalineEarthMetal = 'alkaline-earth-metal',
  Metalloid = 'metalloid',
  Halogen = 'halogen',
  TransitionMetal = 'transition-metal',
  PostTransitionMetal = 'post-transition-metal',
  Lanthanide = 'lanthanide',
  Actinide = 'actinide',
  Unknown = 'unknown'
}

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: ElementCategory;
  group: number;
  period: number;
  summary?: string;
}

export interface AIDetailData {
  description: string;
  usage: string;
  substance: string;
  funFact: string;
}
