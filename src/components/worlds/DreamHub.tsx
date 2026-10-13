import React from 'react';
import { FloatingIsland } from '../scene/FloatingIsland';
import { Portal } from '../portals/Portal';
import { EXPLORABLE_WORLDS } from '../../config/worlds';
import { WorldId } from '../../types/world';

interface DreamHubProps {
  onEnterWorld: (worldId: WorldId) => void;
  onHoverSound?: () => void;
}

export const DreamHub: React.FC<DreamHubProps> = ({
  onEnterWorld,
  onHoverSound,
}) => {
  return (
    <group>
      {/* Central Sanctuary Island */}
      <FloatingIsland
        position={[0, -2.5, -7]}
        scale={1.3}
        crystalColor="#7564FF"
        bobbingSpeed={0.6}
        bobbingOffset={0}
      />

      {/* Flanking Floating Islets */}
      <FloatingIsland
        position={[-11, -1.8, -12]}
        scale={0.8}
        crystalColor="#00D2FF"
        bobbingSpeed={0.7}
        bobbingOffset={1.2}
      />

      <FloatingIsland
        position={[11, -1.5, -11]}
        scale={0.75}
        crystalColor="#EC4899"
        bobbingSpeed={0.8}
        bobbingOffset={2.5}
      />

      <FloatingIsland
        position={[-6, 1.2, -18]}
        scale={0.6}
        crystalColor="#F59E0B"
        bobbingSpeed={0.5}
        bobbingOffset={3.8}
      />

      <FloatingIsland
        position={[6, 0.8, -19]}
        scale={0.65}
        crystalColor="#10B981"
        bobbingSpeed={0.65}
        bobbingOffset={4.2}
      />

      {/* The 5 Dimensional Portals */}
      {EXPLORABLE_WORLDS.map((world) => (
        <Portal
          key={world.id}
          world={world}
          onEnter={onEnterWorld}
          onHoverSound={onHoverSound}
        />
      ))}
    </group>
  );
};
