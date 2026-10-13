import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Moon } from '../scene/Moon';
import { AtmosphericParticles } from '../scene/AtmosphericParticles';
import { WORLDS_CONFIG } from '../../config/worlds';
import { WorldLoreItem } from '../../types/world';

interface CosmicOceanProps {
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

export const CosmicOcean: React.FC<CosmicOceanProps> = ({
  onSelectLore,
  onHoverSound,
}) => {
  const oceanRef = useRef<THREE.Mesh>(null!);
  const world = WORLDS_CONFIG['cosmic-ocean'];

  // Animate ocean ripples
  useFrame((state) => {
    if (!oceanRef.current) return;
    const geom = oceanRef.current.geometry;
    const pos = geom.getAttribute('position') as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const wave = Math.sin(u * 0.4 + t * 1.2) * 0.25 + Math.cos(v * 0.3 + t * 0.8) * 0.2;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      {/* Low-hanging supermoon over water */}
      <Moon position={[0, 8, -35]} size={14} glowColor="#00D2FF" hasRing={false} />

      {/* Endless animated wave plane */}
      <mesh
        ref={oceanRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, -10]}
        receiveShadow
      >
        <planeGeometry args={[90, 90, 48, 48]} />
        <meshStandardMaterial
          color="#061A35"
          emissive="#030C1C"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.85}
          flatShading={true}
        />
      </mesh>

      {/* Ambient water particles */}
      <AtmosphericParticles count={250} color="#00D2FF" spread={[40, 8, 40]} />

      {/* Distant silhouette rock formations */}
      <mesh position={[-20, -1, -30]}>
        <coneGeometry args={[6, 8, 5]} />
        <meshStandardMaterial color="#040914" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[24, -1, -32]}>
        <coneGeometry args={[8, 10, 6]} />
        <meshStandardMaterial color="#040914" roughness={0.9} flatShading />
      </mesh>

      {/* Interactive Luminous Beacons / Monoliths */}
      {world.loreItems.map((lore, idx) => (
        <InteractiveWaterBeacon
          key={lore.id}
          lore={lore}
          index={idx}
          onSelectLore={onSelectLore}
          onHoverSound={onHoverSound}
        />
      ))}
    </group>
  );
};

interface InteractiveWaterBeaconProps {
  lore: WorldLoreItem;
  index: number;
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

const InteractiveWaterBeacon: React.FC<InteractiveWaterBeaconProps> = ({
  lore,
  index,
  onSelectLore,
  onHoverSound,
}) => {
  const beaconRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = React.useState(false);
  const pos = lore.position || [0, 0, 0];

  useFrame((state) => {
    if (!beaconRef.current) return;
    const t = state.clock.getElapsedTime() + index * 1.5;
    beaconRef.current.position.y = pos[1] + Math.sin(t * 1.4) * 0.25;
    beaconRef.current.rotation.y += 0.01;
  });

  return (
    <group
      ref={beaconRef}
      position={[pos[0], pos[1], pos[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectLore(lore);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        if (onHoverSound) onHoverSound();
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Floating Crystal Obelisk */}
      <mesh position={[0, 1.2, 0]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#00D2FF"
          emissiveIntensity={hovered ? 2.8 : 1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Floating Concentric Energy Ring */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.04, 12, 32]} />
        <meshBasicMaterial
          color="#79E7FF"
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      <pointLight
        color="#00D2FF"
        intensity={hovered ? 2.5 : 1.2}
        distance={6}
      />

      {/* 3D Label */}
      <Html position={[0, 2.5, 0]} center distanceFactor={16}>
        <div
          style={{
            background: 'rgba(5, 18, 38, 0.85)',
            border: `1px solid ${hovered ? '#00D2FF' : 'rgba(0, 210, 255, 0.3)'}`,
            borderRadius: '9999px',
            padding: '4px 12px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-headline)',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            boxShadow: hovered ? '0 0 16px rgba(0, 210, 255, 0.6)' : 'none',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
        >
          {lore.title}
        </div>
      </Html>
    </group>
  );
};
