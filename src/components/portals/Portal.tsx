import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { WorldConfig } from '../../types/world';

interface PortalProps {
  world: WorldConfig;
  onEnter: (worldId: WorldConfig['id']) => void;
  onHoverSound?: () => void;
}

export const Portal: React.FC<PortalProps> = ({
  world,
  onEnter,
  onHoverSound,
}) => {
  const portalGroupRef = useRef<THREE.Group>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);

  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * (hovered ? 1.2 : 0.4);
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * (hovered ? 1.8 : 0.6);
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * (hovered ? 0.18 : 0.08);
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (portalGroupRef.current) {
      // Gentle floating
      portalGroupRef.current.position.y = world.portalPosition[1] + Math.sin(t * 1.5 + world.index) * 0.2;
    }
  });

  const handlePointerOver = (e: THREE.Event) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (onHoverSound) onHoverSound();
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: THREE.Event) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation();
    onEnter(world.id);
  };

  return (
    <group
      ref={portalGroupRef}
      position={world.portalPosition}
      rotation={world.portalRotation}
    >
      {/* Outer Torus Ring */}
      <mesh
        ref={outerRingRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <torusGeometry args={[2.0, 0.08, 16, 48]} />
        <meshStandardMaterial
          color={world.portalColor}
          emissive={world.portalColor}
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Middle Spoke Ring */}
      <mesh
        ref={innerRingRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <torusGeometry args={[1.5, 0.05, 12, 36]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={world.portalColor}
          emissiveIntensity={hovered ? 2.0 : 0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Core Glowing Energy Disk */}
      <mesh
        ref={coreRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <circleGeometry args={[1.35, 32]} />
        <meshBasicMaterial
          color={world.portalColor}
          transparent={true}
          opacity={hovered ? 0.75 : 0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Portal Plinth Base */}
      <mesh position={[0, -2.1, 0]}>
        <cylinderGeometry args={[0.9, 1.2, 0.5, 8]} />
        <meshStandardMaterial
          color="#161828"
          roughness={0.8}
          metalness={0.3}
          flatShading={true}
        />
      </mesh>

      {/* Point Light from portal */}
      <pointLight
        color={world.portalColor}
        intensity={hovered ? 3.5 : 2.0}
        distance={9}
        decay={2}
      />

      {/* Interactive 3D HTML Label */}
      <Html
        position={[0, 2.5, 0]}
        center
        distanceFactor={18}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={() => onEnter(world.id)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: hovered ? 'rgba(7, 8, 16, 0.9)' : 'rgba(11, 16, 32, 0.75)',
              border: `1.5px solid ${hovered ? world.portalColor : 'rgba(255, 255, 255, 0.18)'}`,
              backdropFilter: 'blur(8px)',
              boxShadow: hovered ? `0 0 20px ${world.portalColor}88` : '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: world.portalColor,
              }}
            >
              WORLD 0{world.index}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
              }}
            >
              {world.title}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
