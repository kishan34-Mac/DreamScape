import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AtmosphericParticles } from '../scene/AtmosphericParticles';
import { WORLDS_CONFIG } from '../../config/worlds';
import { WorldLoreItem } from '../../types/world';

interface ForgottenCityProps {
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

export const ForgottenCity: React.FC<ForgottenCityProps> = ({
  onSelectLore,
  onHoverSound,
}) => {
  const world = WORLDS_CONFIG['forgotten-city'];

  // Procedural skyline towers
  const towers = useMemo(() => {
    const list = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 12 + ((i * 7) % 10);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 10;
      const height = 8 + ((i * 13) % 14);
      const width = 2.2 + ((i * 3) % 3);
      list.push({ id: i, x, z, height, width });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Ground Monolithic Platform */}
      <mesh position={[0, -2, -10]} receiveShadow>
        <boxGeometry args={[45, 1, 45]} />
        <meshStandardMaterial
          color="#120F1C"
          roughness={0.9}
          metalness={0.3}
          flatShading
        />
      </mesh>

      {/* Amber Ember Particles */}
      <AtmosphericParticles count={220} color="#F59E0B" spread={[35, 25, 35]} />

      {/* Procedural City Towers */}
      {towers.map((t) => (
        <group key={t.id} position={[t.x, t.height / 2 - 2, t.z]}>
          {/* Main Tower Box */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[t.width, t.height, t.width]} />
            <meshStandardMaterial
              color="#0A0713"
              roughness={0.85}
              metalness={0.4}
            />
          </mesh>

          {/* Golden Window Strips */}
          <mesh position={[0, 0, t.width / 2 + 0.02]}>
            <planeGeometry args={[t.width * 0.7, t.height * 0.8]} />
            <meshBasicMaterial
              color="#F59E0B"
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Spire Pinnacle */}
          <mesh position={[0, t.height / 2 + 1.2, 0]}>
            <coneGeometry args={[t.width * 0.4, 2.4, 4]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#F59E0B"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}

      {/* Broken Sky-Bridge */}
      <mesh position={[-3, 4, -10]} rotation={[0, 0.4, 0.1]}>
        <boxGeometry args={[14, 0.8, 2.5]} />
        <meshStandardMaterial color="#1C1829" roughness={0.9} />
      </mesh>
      <mesh position={[7, 4.8, -12]} rotation={[0, -0.3, -0.15]}>
        <boxGeometry args={[10, 0.8, 2.5]} />
        <meshStandardMaterial color="#1C1829" roughness={0.9} />
      </mesh>

      {/* Monumental Arch of Dawn */}
      <group position={[0, 4, -16]}>
        <mesh position={[-4, 0, 0]}>
          <boxGeometry args={[1.8, 12, 2]} />
          <meshStandardMaterial color="#241E34" roughness={0.8} />
        </mesh>
        <mesh position={[4, 0, 0]}>
          <boxGeometry args={[1.8, 12, 2]} />
          <meshStandardMaterial color="#241E34" roughness={0.8} />
        </mesh>
        <mesh position={[0, 6, 0]}>
          <boxGeometry args={[10, 1.8, 2]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#B45309"
            emissiveIntensity={0.8}
            roughness={0.4}
          />
        </mesh>
        <pointLight color="#F59E0B" intensity={3} distance={15} position={[0, 4, 0]} />
      </group>

      {/* Interactive Monolith Landmarks for Lore */}
      {world.loreItems.map((lore) => (
        <InteractiveCityMonument
          key={lore.id}
          lore={lore}
          onSelectLore={onSelectLore}
          onHoverSound={onHoverSound}
        />
      ))}
    </group>
  );
};

interface InteractiveCityMonumentProps {
  lore: WorldLoreItem;
  onSelectLore: (lore: WorldLoreItem) => void;
  onHoverSound?: () => void;
}

const InteractiveCityMonument: React.FC<InteractiveCityMonumentProps> = ({
  lore,
  onSelectLore,
  onHoverSound,
}) => {
  const [hovered, setHovered] = React.useState(false);
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
      {/* Monument Crystal Anchor */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.6, 0.9, 2.4, 6]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={hovered ? 2.5 : 1.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Golden Aura Rings */}
      <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.05, 8, 24]} />
        <meshBasicMaterial
          color="#FDE68A"
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      <pointLight color="#F59E0B" intensity={hovered ? 2.8 : 1.4} distance={8} />

      <Html position={[0, 3.2, 0]} center distanceFactor={16}>
        <div
          style={{
            background: 'rgba(25, 18, 38, 0.88)',
            border: `1px solid ${hovered ? '#F59E0B' : 'rgba(245, 158, 11, 0.3)'}`,
            borderRadius: '9999px',
            padding: '5px 14px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-headline)',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            boxShadow: hovered ? '0 0 16px rgba(245, 158, 11, 0.6)' : 'none',
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
