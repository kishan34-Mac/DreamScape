import { useEffect, useCallback } from 'react';
import { audioEngine } from '../utils/audioSynth';
import { WORLDS_CONFIG } from '../config/worlds';
import { WorldId } from '../types/world';

export function useAudio(soundEnabled: boolean, volume: number, currentWorld: WorldId) {
  useEffect(() => {
    if (soundEnabled) {
      audioEngine.start(volume);
    } else {
      audioEngine.stop();
    }
  }, [soundEnabled, volume]);

  useEffect(() => {
    if (soundEnabled && WORLDS_CONFIG[currentWorld]) {
      audioEngine.transitionMood(WORLDS_CONFIG[currentWorld].ambientFrequency);
    }
  }, [currentWorld, soundEnabled]);

  const toggleSound = useCallback(() => {
    return !soundEnabled;
  }, [soundEnabled]);

  const playInteractionSound = useCallback((frequency: number = 528) => {
    if (soundEnabled) {
      audioEngine.playChime(frequency, 0.9);
    }
  }, [soundEnabled]);

  const playPortalSound = useCallback(() => {
    if (soundEnabled) {
      audioEngine.playPortalWarp();
    }
  }, [soundEnabled]);

  return {
    toggleSound,
    playInteractionSound,
    playPortalSound,
  };
}
