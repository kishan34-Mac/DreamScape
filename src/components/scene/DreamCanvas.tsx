import React, { Component, ErrorInfo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { StarField } from './StarField';
import { Moon } from './Moon';
import { SceneLighting } from './SceneLighting';
import { CameraController } from './CameraController';
import { AtmosphericParticles } from './AtmosphericParticles';
import { DreamHub } from '../worlds/DreamHub';
import { CosmicOcean } from '../worlds/CosmicOcean';
import { ForgottenCity } from '../worlds/ForgottenCity';
import { NeonForest } from '../worlds/NeonForest';
import { GlassDimension } from '../worlds/GlassDimension';
import { StarSanctuary } from '../worlds/StarSanctuary';
import { WebGLFallback } from './WebGLFallback';
import { WorldId, WorldLoreItem } from '../../types/world';
import { SceneConfig } from '../../config/sceneSettings';
import { WORLDS_CONFIG } from '../../config/worlds';

interface DreamCanvasProps {
  currentWorld: WorldId;
  sceneConfig: SceneConfig;
  reducedMotion: boolean;
  isAutoDrift: boolean;
  onEnterWorld: (worldId: WorldId) => void;
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
  onChime?: (freq?: number) => void;
  onSceneReady: () => void;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<
  {
    children: React.ReactNode;
    fallback: React.ReactNode;
  },
  CanvasErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('DreamCanvas 3D WebGL Encountered Issue:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const DreamCanvas: React.FC<DreamCanvasProps> = ({
  currentWorld,
  sceneConfig,
  reducedMotion,
  isAutoDrift,
  onEnterWorld,
  onSelectLore,
  onHoverSound,
  onChime,
  onSceneReady,
}) => {
  const world = WORLDS_CONFIG[currentWorld] || WORLDS_CONFIG['hub'];

  const fallback = (
    <WebGLFallback
      currentWorld={currentWorld}
      onSelectWorld={onEnterWorld}
      onSelectLore={onSelectLore}
    />
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 'var(--z-canvas)',
        backgroundColor: world.palette.background,
        transition: 'background-color 0.8s ease',
      }}
    >
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas
          dpr={sceneConfig.dpr}
          shadows={sceneConfig.shadows}
          gl={{
            antialias: sceneConfig.antialias,
            powerPreference: sceneConfig.powerPreference,
            alpha: false,
          }}
          camera={{ position: [0, 2.5, 9], fov: 55, near: 0.1, far: 250 }}
          onCreated={() => {
            // Signal that WebGL is ready
            onSceneReady();
          }}
        >
          <Suspense fallback={null}>
            {/* Dynamic camera and parallax */}
            <CameraController
              currentWorld={currentWorld}
              isAutoDrift={isAutoDrift}
              reducedMotion={reducedMotion}
            />

            {/* Atmosphere & Lighting */}
            <SceneLighting
              currentWorld={currentWorld}
              shadowsEnabled={sceneConfig.shadows}
            />

            {/* Background Stars & Atmospheric Particles */}
            <StarField
              count={sceneConfig.starsCount}
              paletteColor={world.palette.secondary}
            />

            <AtmosphericParticles
              count={sceneConfig.particlesCount}
              color={world.palette.accent}
            />

            {/* Hub World */}
            {currentWorld === 'hub' && (
              <>
                <Moon
                  position={[0, 16, -45]}
                  size={12}
                  glowColor="#79E7FF"
                  hasRing={true}
                />
                <DreamHub
                  onEnterWorld={onEnterWorld}
                  onHoverSound={onHoverSound}
                />
              </>
            )}

            {/* World 01: Cosmic Ocean */}
            {currentWorld === 'cosmic-ocean' && (
              <CosmicOcean
                onSelectLore={onSelectLore}
                onHoverSound={onHoverSound}
              />
            )}

            {/* World 02: Forgotten City */}
            {currentWorld === 'forgotten-city' && (
              <ForgottenCity
                onSelectLore={onSelectLore}
                onHoverSound={onHoverSound}
              />
            )}

            {/* World 03: Neon Forest */}
            {currentWorld === 'neon-forest' && (
              <NeonForest
                onSelectLore={onSelectLore}
                onHoverSound={onHoverSound}
              />
            )}

            {/* World 04: Glass Dimension */}
            {currentWorld === 'glass-dimension' && (
              <GlassDimension
                onSelectLore={onSelectLore}
                onHoverSound={onHoverSound}
                onCrystalChime={() => {
                  if (onChime) onChime(580);
                }}
              />
            )}

            {/* World 05: Star Sanctuary */}
            {currentWorld === 'star-sanctuary' && (
              <StarSanctuary
                onSelectLore={onSelectLore}
                onHoverSound={onHoverSound}
                onChime={onChime}
              />
            )}
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
