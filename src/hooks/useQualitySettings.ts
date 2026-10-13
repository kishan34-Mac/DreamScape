import { useState, useEffect, useCallback } from 'react';
import { UserSettings, DEFAULT_SETTINGS, QualityLevel } from '../types/settings';
import { loadStoredSettings, saveStoredSettings } from '../utils/storage';
import { QUALITY_CONFIG, SceneConfig } from '../config/sceneSettings';

export function useQualitySettings() {
  const [settings, setSettings] = useState<UserSettings>(() => loadStoredSettings());

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  const setQuality = useCallback((quality: QualityLevel) => {
    setSettings(prev => ({ ...prev, quality }));
  }, []);

  const setSoundEnabled = useCallback((soundEnabled: boolean) => {
    setSettings(prev => ({ ...prev, soundEnabled }));
  }, []);

  const setSoundVolume = useCallback((soundVolume: number) => {
    setSettings(prev => ({ ...prev, soundVolume }));
  }, []);

  const setReducedMotion = useCallback((reducedMotion: boolean) => {
    setSettings(prev => ({ ...prev, reducedMotion }));
  }, []);

  const setParticleDensity = useCallback((particleDensity: 'low' | 'medium' | 'high') => {
    setSettings(prev => ({ ...prev, particleDensity }));
  }, []);

  const resetToDefault = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const currentSceneConfig: SceneConfig = QUALITY_CONFIG[settings.quality];

  // Adjust particle count based on density setting
  const effectiveSceneConfig: SceneConfig = {
    ...currentSceneConfig,
    particlesCount:
      settings.particleDensity === 'low'
        ? Math.floor(currentSceneConfig.particlesCount * 0.5)
        : settings.particleDensity === 'high'
        ? Math.floor(currentSceneConfig.particlesCount * 1.5)
        : currentSceneConfig.particlesCount,
  };

  return {
    settings,
    setSettings,
    setQuality,
    setSoundEnabled,
    setSoundVolume,
    setReducedMotion,
    setParticleDensity,
    resetToDefault,
    sceneConfig: effectiveSceneConfig,
  };
}
