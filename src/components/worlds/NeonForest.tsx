import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AtmosphericParticles } from '../scene/AtmosphericParticles';
import { WORLDS_CONFIG } from '../../config/worlds';
import { WorldLoreItem } from '../../types/world';

interface NeonForestProps {
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

export const NeonForest: React.FC<NeonForestProps> = ({
  onSelectLore,
  onHoverSound,
}) => {
  const world = WORLDS_CONFIG['neon-forest'];

  // Procedural bioluminescent trees
  const trees = useMemo(() => {
    const list = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 6 + ((i * 5) % 9);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 10;
      const trunkHeight = 3.5 + ((i * 3) % 4);
      const canopyScale = 1.4 + ((i * 2) % 1.2);
      const color = i % 2 === 0 ? '#10B981' : '#8B5CF6';
      list.push({ id: i, x, z, trunkHeight, canopyScale, color });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Forest Floor */}
      <mesh position={[0, -2, -10]} receiveShadow>
        <cylinderGeometry args={[26, 28, 1, 24]} />
        <meshStandardMaterial
          color="#061211"
          roughness={0.9}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* Bioluminescent Spores */}
      <AtmosphericParticles count={260} color="#34D399" spread={[30, 16, 30]} />

      {/* Procedural Glowing Trees */}
      {trees.map((t) => (
        <group key={t.id} position={[t.x, -1.5, t.z]}>
          {/* Trunk */}
          <mesh position={[0, t.trunkHeight / 2, 0]}>
            <cylinderGeometry args={[0.25, 0.45, t.trunkHeight, 6]} />
            <meshStandardMaterial color="#0A1816" roughness={0.9} flatShading />
          </mesh>

          {/* Luminous Canopy Spheres */}
          <mesh position={[0, t.trunkHeight + 0.4, 0]}>
            <icosahedronGeometry args={[t.canopyScale, 1]} />
            <meshStandardMaterial
              color={t.color}
              emissive={t.color}
              emissiveIntensity={1.4}
              roughness={0.3}
              flatShading
            />
          </mesh>

          {/* Local Canopy Glow Light */}
          <pointLight
            color={t.color}
            intensity={1.2}
            distance={6}
            position={[0, t.trunkHeight + 0.5, 0]}
          />
        </group>
      ))}

      {/* Interactive Lore Plants */}
      {world.loreItems.map((lore) => (
        <InteractiveForestFlora
          key={lore.id}
          lore={lore}
          onSelectLore={onSelectLore}
          onHoverSound={onHoverSound}
        />
      ))}
    </group>
  );
};

interface InteractiveForestFloraProps {
  lore: WorldLoreItem;
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

const InteractiveForestFlora: React.FC<InteractiveForestFloraProps> = ({
  lore,
  onSelectLore,
  onHoverSound,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(false);
  const meshRef = useRef<THREE.Group>(null!);
  const pos = lore.position || [0, 0, 0];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
  });

  const handleClick = (e: THREE.Event) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation();
    setPulse(true);
    setTimeout(() => setPulse(false), 800);
    onSelectLore(lore);
  };

  return (
    <group
      ref={meshRef}
      position={[pos[0], pos[1], pos[2]]}
      onClick={handleClick}
      onPointerOver={(e) => {
        (e as unknown as { stopPropagation: () => void }).stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        if (onHoverSound) onHoverSound();
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Mushroom Cap or Glowing Flora Core */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.75, 12, 12]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#34D399"
          emissiveIntensity={pulse ? 3.5 : hovered ? 2.5 : 1.3}
          roughness={0.2}
          wireframe={pulse}
        />
      </mesh>

      {/* Radiant Petal Rings */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.2, 16]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={hovered ? 0.9 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight
        color="#34D399"
        intensity={pulse ? 4.0 : hovered ? 2.8 : 1.5}
        distance={7}
        position={[0, 1.2, 0]}
      />

      <Html position={[0, 2.4, 0]} center distanceFactor={16}>
        <div
          style={{
            background: 'rgba(6, 23, 21, 0.88)',
            border: `1px solid ${hovered ? '#10B981' : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: '9999px',
            padding: '5px 14px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-headline)',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            boxShadow: hovered ? '0 0 16px rgba(16, 185, 129, 0.6)' : 'none',
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
