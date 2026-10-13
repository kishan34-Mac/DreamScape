import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { generateConstellationNodes } from '../../utils/seededRandom';
import { getGlowingParticleTexture } from '../../utils/particleTexture';
import { WORLDS_CONFIG } from '../../config/worlds';
import { WorldLoreItem } from '../../types/world';
import { Sparkles, Shuffle } from 'lucide-react';

interface StarSanctuaryProps {
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
  onChime?: (freq?: number) => void;
}

export const StarSanctuary: React.FC<StarSanctuaryProps> = ({
  onSelectLore,
  onHoverSound,
  onChime,
}) => {
  const world = WORLDS_CONFIG['star-sanctuary'];
  const [seed, setSeed] = useState(42);
  const [activeStarId, setActiveStarId] = useState<number | null>(null);
  const texture = useMemo(() => getGlowingParticleTexture(), []);

  // Generate constellation nodes based on seed
  const stars = useMemo(() => generateConstellationNodes(seed, 8), [seed]);

  // Connect sequential stars to form constellation lines
  const constellationPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < stars.length; i++) {
      pts.push([stars[i].x, stars[i].y, stars[i].z]);
    }
    // loop back to first for closed constellation loop
    if (stars.length > 0) {
      pts.push([stars[0].x, stars[0].y, stars[0].z]);
    }
    return pts;
  }, [stars]);

  // Spiral Galaxy Particle Vortex
  const galaxyRef = useRef<THREE.Points>(null!);
  const [galaxyPositions, galaxyColors] = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const innerColor = new THREE.Color('#FFFFFF');
    const midColor = new THREE.Color('#818CF8');
    const outerColor = new THREE.Color('#C084FC');

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 22 + 2;
      const spinAngle = radius * 0.8;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4;

      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY * 2;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixed = radius < 6 ? innerColor : radius < 14 ? midColor : outerColor;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.04;
    }
  });

  const handleNextConstellation = () => {
    const nextSeed = Math.floor(Math.random() * 10000);
    setSeed(nextSeed);
    if (onChime) onChime(640);
  };

  return (
    <group>
      {/* Observatory Platform Floor */}
      <mesh position={[0, -2.5, -9]} receiveShadow>
        <cylinderGeometry args={[14, 15, 1, 32]} />
        <meshStandardMaterial
          color="#0C0E24"
          roughness={0.8}
          metalness={0.4}
          flatShading
        />
      </mesh>

      {/* Armillary Ring Structures */}
      <group position={[0, 4, -14]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[8, 0.08, 12, 48]} />
          <meshBasicMaterial color="#818CF8" wireframe />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[8.5, 0.08, 12, 48]} />
          <meshBasicMaterial color="#C084FC" wireframe />
        </mesh>
      </group>

      {/* Rotating Spiral Galaxy Core */}
      <points ref={galaxyRef} position={[0, -6, -24]} rotation={[Math.PI / 3, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[galaxyPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[galaxyColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          size={0.45}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Interactive Constellation Lines */}
      {constellationPoints.length > 1 && (
        <Line
          points={constellationPoints}
          color="#818CF8"
          lineWidth={2}
          transparent
          opacity={0.7}
        />
      )}

      {/* Constellation Stars */}
      {stars.map((star) => (
        <group
          key={star.id}
          position={[star.x, star.y, star.z]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveStarId(star.id);
            if (onChime) onChime(440 + star.id * 40);
          }}
        >
          <mesh>
            <sphereGeometry args={[activeStarId === star.id ? 0.35 : 0.22, 16, 16]} />
            <meshBasicMaterial
              color={activeStarId === star.id ? '#FFFFFF' : '#818CF8'}
            />
          </mesh>
          <pointLight
            color="#818CF8"
            intensity={activeStarId === star.id ? 2.5 : 1.0}
            distance={4}
          />
        </group>
      ))}

      {/* Constellation Generator Tool UI in 3D */}
      <Html position={[0, -1.2, -6]} center distanceFactor={14}>
        <div
          style={{
            background: 'rgba(10, 12, 34, 0.88)',
            border: '1px solid rgba(129, 140, 248, 0.4)',
            borderRadius: '16px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(129, 140, 248, 0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.68rem',
                color: 'var(--color-cyan)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Sparkles size={11} /> Astral Weaver
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>
              Pattern #{seed}
            </div>
          </div>

          <button
            onClick={handleNextConstellation}
            className="glass-button"
            style={{ padding: '6px 14px', fontSize: '0.75rem', borderColor: 'var(--color-violet)' }}
          >
            <Shuffle size={13} />
            <span>Generate New</span>
          </button>
        </div>
      </Html>

      {/* Interactive Lore Items */}
      {world.loreItems.map((lore) => (
        <InteractiveSanctuaryMonument
          key={lore.id}
          lore={lore}
          onSelectLore={onSelectLore}
          onHoverSound={onHoverSound}
        />
      ))}
    </group>
  );
};

interface InteractiveSanctuaryMonumentProps {
  lore: WorldLoreItem;
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

const InteractiveSanctuaryMonument: React.FC<InteractiveSanctuaryMonumentProps> = ({
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
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#818CF8"
          emissive="#818CF8"
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.7}
        />
      </mesh>

      <pointLight color="#818CF8" intensity={hovered ? 2.5 : 1.2} distance={6} />

      <Html position={[0, 2.6, 0]} center distanceFactor={16}>
        <div
          style={{
            background: 'rgba(12, 14, 38, 0.88)',
            border: `1px solid ${hovered ? '#818CF8' : 'rgba(129, 140, 248, 0.3)'}`,
            borderRadius: '9999px',
            padding: '5px 14px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-headline)',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            boxShadow: hovered ? '0 0 16px rgba(129, 140, 248, 0.6)' : 'none',
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
