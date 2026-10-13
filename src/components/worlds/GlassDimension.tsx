import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AtmosphericParticles } from '../scene/AtmosphericParticles';
import { WORLDS_CONFIG } from '../../config/worlds';
import { WorldLoreItem } from '../../types/world';

interface GlassDimensionProps {
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
  onCrystalChime?: () => void;
}

export const GlassDimension: React.FC<GlassDimensionProps> = ({
  onSelectLore,
  onHoverSound,
  onCrystalChime,
}) => {
  const world = WORLDS_CONFIG['glass-dimension'];

  // Array of floating geometric polyhedrons
  const prisms = [
    { id: 1, pos: [-7, 3, -8] as [number, number, number], shape: 'icosahedron' },
    { id: 2, pos: [6, 4, -10] as [number, number, number], shape: 'octahedron' },
    { id: 3, pos: [-4, -1, -6] as [number, number, number], shape: 'dodecahedron' },
    { id: 4, pos: [5, -0.5, -7] as [number, number, number], shape: 'torus' },
    { id: 5, pos: [0, 5, -12] as [number, number, number], shape: 'tetrahedron' },
  ];

  return (
    <group>
      {/* Central Prismatic Lattice Floor */}
      <mesh position={[0, -2.5, -9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 34, 16, 16]} />
        <meshStandardMaterial
          color="#16082B"
          roughness={0.15}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>

      {/* Crystalline Shimmer Particles */}
      <AtmosphericParticles count={240} color="#EC4899" spread={[32, 20, 32]} />

      {/* Floating Prismatic Bodies */}
      {prisms.map((p) => (
        <InteractivePrism
          key={p.id}
          initialPos={p.pos}
          shape={p.shape}
          onChime={onCrystalChime}
          onHoverSound={onHoverSound}
        />
      ))}

      {/* Interactive Lore Items */}
      {world.loreItems.map((lore) => (
        <InteractiveGlassMonolith
          key={lore.id}
          lore={lore}
          onSelectLore={onSelectLore}
          onHoverSound={onHoverSound}
        />
      ))}
    </group>
  );
};

interface InteractivePrismProps {
  initialPos: [number, number, number];
  shape: string;
  onChime?: () => void;
  onHoverSound?: () => void;
}

const PALETTE_CYCLE = ['#EC4899', '#79E7FF', '#8B5CF6', '#F59E0B', '#10B981'];

const InteractivePrism: React.FC<InteractivePrismProps> = ({
  initialPos,
  shape,
  onChime,
  onHoverSound,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [colorIndex, setColorIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(0.4);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x += delta * spinSpeed;
    meshRef.current.rotation.y += delta * (spinSpeed * 1.3);
    meshRef.current.position.y = initialPos[1] + Math.sin(t * 1.2 + initialPos[0]) * 0.35;
  });

  const handleClick = (e: THREE.Event) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation();
    setColorIndex((prev) => (prev + 1) % PALETTE_CYCLE.length);
    setSpinSpeed(3.0);
    setTimeout(() => setSpinSpeed(0.4), 1200);
    if (onChime) onChime();
  };

  const currentColor = PALETTE_CYCLE[colorIndex];

  return (
    <mesh
      ref={meshRef}
      position={initialPos}
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
      {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 0]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[1.2, 0]} />}
      {shape === 'dodecahedron' && <dodecahedronGeometry args={[1.1, 0]} />}
      {shape === 'torus' && <torusGeometry args={[1.1, 0.35, 12, 28]} />}
      {shape === 'tetrahedron' && <tetrahedronGeometry args={[1.4, 0]} />}

      <meshPhysicalMaterial
        color={currentColor}
        emissive={currentColor}
        emissiveIntensity={hovered ? 1.8 : 0.6}
        roughness={0.08}
        metalness={0.2}
        transmission={0.8}
        opacity={0.88}
        transparent={true}
        ior={1.5}
      />
    </mesh>
  );
};

interface InteractiveGlassMonolithProps {
  lore: WorldLoreItem;
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

const InteractiveGlassMonolith: React.FC<InteractiveGlassMonolithProps> = ({
  lore,
  onSelectLore,
  onHoverSound,
}) => {
  const [hovered, setHovered] = useState(false);
  const pos = lore.position || [0, 0, 0];

  return (
    <group
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
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.9, 2.5, 4]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#EC4899"
          emissiveIntensity={hovered ? 2.6 : 1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      <pointLight color="#EC4899" intensity={hovered ? 2.5 : 1.2} distance={7} />

      <Html position={[0, 2.8, 0]} center distanceFactor={16}>
        <div
          style={{
            background: 'rgba(28, 10, 36, 0.88)',
            border: `1px solid ${hovered ? '#EC4899' : 'rgba(236, 72, 153, 0.3)'}`,
            borderRadius: '9999px',
            padding: '5px 14px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-headline)',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            boxShadow: hovered ? '0 0 16px rgba(236, 72, 153, 0.6)' : 'none',
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
