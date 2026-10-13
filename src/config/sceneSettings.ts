import { QualityLevel } from '../types/settings';

export interface SceneConfig {
  starsCount: number;
  particlesCount: number;
  enablePostProcessing: boolean;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
  powerPreference: 'high-performance' | 'default' | 'low-power';
}

export const QUALITY_CONFIG: Record<QualityLevel, SceneConfig> = {
  high: {
    starsCount: 3500,
    particlesCount: 450,
    enablePostProcessing: true,
    dpr: [1, 2],
    shadows: true,
    antialias: true,
    powerPreference: 'high-performance',
  },
  auto: {
    starsCount: 2200,
    particlesCount: 250,
    enablePostProcessing: true,
    dpr: [1, 1.75],
    shadows: false,
    antialias: true,
    powerPreference: 'high-performance',
  },
  low: {
    starsCount: 1000,
    particlesCount: 100,
    enablePostProcessing: false,
    dpr: [1, 1],
    shadows: false,
    antialias: false,
    powerPreference: 'default',
  },
};
