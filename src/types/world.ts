export type WorldId = 
  | 'hub' 
  | 'cosmic-ocean' 
  | 'forgotten-city' 
  | 'neon-forest' 
  | 'glass-dimension' 
  | 'star-sanctuary';

export interface WorldLoreItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName?: string;
  position?: [number, number, number];
}

export interface WorldConfig {
  id: WorldId;
  index: number;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    fog: string;
  };
  portalPosition: [number, number, number];
  portalRotation: [number, number, number];
  portalColor: string;
  loreItems: WorldLoreItem[];
  ambientFrequency: number; // Hz for procedural sound
  audioMood: 'ethereal' | 'oceanic' | 'ancient' | 'bioluminescent' | 'crystalline' | 'celestial';
}
