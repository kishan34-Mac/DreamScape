import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DreamCanvas } from '../components/scene/DreamCanvas';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { TopNavigation } from '../components/navigation/TopNavigation';
import { WorldSelector } from '../components/navigation/WorldSelector';
import { ExplorationHUD } from '../components/navigation/ExplorationHUD';
import { AboutModal } from '../components/ui/AboutModal';
import { SettingsModal } from '../components/ui/SettingsModal';
import { LoreModal } from '../components/ui/LoreModal';
import { CustomCursor } from '../components/ui/CustomCursor';
import { useQualitySettings } from '../hooks/useQualitySettings';
import { useAudio } from '../hooks/useAudio';
import { useWorldNavigation } from '../hooks/useWorldNavigation';
import { WorldId, WorldLoreItem } from '../types/world';

export const App: React.FC = () => {
  const {
    settings,
    setSoundEnabled,
    setSoundVolume,
    setReducedMotion,
    setQuality,
    setParticleDensity,
    resetToDefault,
    sceneConfig,
  } = useQualitySettings();

  const {
    currentWorld,
    isTransitioning,
    visitedWorlds,
    activeLore,
    setActiveLore,
    navigateToWorld,
    returnToHub,
  } = useWorldNavigation(settings.visitedWorlds);

  const { playInteractionSound, playPortalSound } = useAudio(
    settings.soundEnabled,
    settings.soundVolume,
    currentWorld
  );

  // App state
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isWorldsOpen, setIsWorldsOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAutoDrift, setIsAutoDrift] = useState<boolean>(false);

  // Fallback timer in case canvas onCreated takes time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSceneReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterDream = useCallback((enableAudio: boolean) => {
    setHasEntered(true);
    if (enableAudio) {
      setSoundEnabled(true);
    }
    playPortalSound();
  }, [setSoundEnabled, playPortalSound]);

  const handleNavigateToWorld = useCallback((worldId: WorldId) => {
    playPortalSound();
    navigateToWorld(worldId);
  }, [navigateToWorld, playPortalSound]);

  const handleSelectLore = useCallback((lore: WorldLoreItem) => {
    playInteractionSound(520);
    setActiveLore(lore);
  }, [playInteractionSound, setActiveLore]);

  const handleHoverSound = useCallback(() => {
    playInteractionSound(780);
  }, [playInteractionSound]);

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#070810',
      }}
    >
      {/* Custom Pointer on Fine Pointer Desktops */}
      <CustomCursor />

      {/* Atmospheric Vignette & Film Grain */}
      <div className="vignette-overlay" />
      <div className="grain-overlay" />

      {/* 3D Dream Canvas */}
      <DreamCanvas
        currentWorld={currentWorld}
        sceneConfig={sceneConfig}
        reducedMotion={settings.reducedMotion}
        isAutoDrift={isAutoDrift}
        onEnterWorld={handleNavigateToWorld}
        onSelectLore={handleSelectLore}
        onHoverSound={handleHoverSound}
        onChime={playInteractionSound}
        onSceneReady={() => setIsSceneReady(true)}
      />

      {/* Warp Dimensional Flash Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="dimension-warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-transition)',
              backgroundColor: 'rgba(243, 241, 255, 0.25)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Cinematic Opening Loading Sequence */}
      <LoadingScreen
        isSceneReady={isSceneReady}
        hasEntered={hasEntered}
        onEnter={handleEnterDream}
        reducedMotion={settings.reducedMotion}
      />

      {/* Interactive Interface Layer when entered */}
      {hasEntered && (
        <>
          {/* Top Navigation */}
          <TopNavigation
            currentWorld={currentWorld}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => setSoundEnabled(!settings.soundEnabled)}
            onOpenWorlds={() => setIsWorldsOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onReturnToHub={() => handleNavigateToWorld('hub')}
            isAutoDrift={isAutoDrift}
            onToggleAutoDrift={() => setIsAutoDrift(!isAutoDrift)}
          />

          {/* Exploration HUD */}
          <ExplorationHUD
            currentWorld={currentWorld}
            visitedWorlds={visitedWorlds}
            onReturnToHub={() => handleNavigateToWorld('hub')}
            onOpenWorlds={() => setIsWorldsOpen(true)}
          />

          {/* World Selector Drawer */}
          <WorldSelector
            isOpen={isWorldsOpen}
            onClose={() => setIsWorldsOpen(false)}
            currentWorld={currentWorld}
            visitedWorlds={visitedWorlds}
            onSelectWorld={handleNavigateToWorld}
          />

          {/* About Modal */}
          <AboutModal
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
          />

          {/* Settings Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onUpdateSoundEnabled={setSoundEnabled}
            onUpdateSoundVolume={setSoundVolume}
            onUpdateReducedMotion={setReducedMotion}
            onUpdateQuality={setQuality}
            onUpdateParticleDensity={setParticleDensity}
            onReset={resetToDefault}
          />

          {/* Lore Item Modal */}
          <LoreModal
            item={activeLore}
            onClose={() => setActiveLore(null)}
          />
        </>
      )}
    </main>
  );
};

export default App;
