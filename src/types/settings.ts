export type QualityLevel = 'auto' | 'high' | 'low';

export interface UserSettings {
  soundEnabled: boolean;
  soundVolume: number; // 0 to 1
  reducedMotion: boolean;
  quality: QualityLevel;
  particleDensity: 'low' | 'medium' | 'high';
  bloomEnabled: boolean;
  visitedWorlds: string[]; // List of WorldId strings
}

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: false,
  soundVolume: 0.5,
  reducedMotion: false,
  quality: 'auto',
  particleDensity: 'medium',
  bloomEnabled: true,
  visitedWorlds: ['hub'],
};
