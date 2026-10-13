import React from 'react';
import { WorldId } from '../../types/world';
import { WORLDS_CONFIG } from '../../config/worlds';

interface SceneLightingProps {
  currentWorld: WorldId;
  shadowsEnabled: boolean;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({
  currentWorld,
  shadowsEnabled,
}) => {
  const world = WORLDS_CONFIG[currentWorld] || WORLDS_CONFIG['hub'];

  return (
    <>
      {/* Dynamic atmospheric fog tailored to the world's palette */}
      <fog attach="fog" args={[world.palette.fog, 10, 85]} />

      {/* Soft ambient moonlight fill */}
      <ambientLight color="#1A2035" intensity={0.9} />

      {/* Hemisphere Light for sky and ground contrast */}
      <hemisphereLight
        color={world.palette.primary}
        groundColor={world.palette.background}
        intensity={0.65}
      />

      {/* Main Celestial Directional Moonlight */}
      <directionalLight
        position={[8, 20, 10]}
        intensity={1.4}
        color={world.palette.accent}
        castShadow={shadowsEnabled}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
      />

      {/* Atmospheric Rim Light */}
      <directionalLight
        position={[-12, -4, -15]}
        intensity={0.5}
        color={world.palette.secondary}
      />
    </>
  );
};
