import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoonProps {
  position?: [number, number, number];
  size?: number;
  glowColor?: string;
  hasRing?: boolean;
}

export const Moon: React.FC<MoonProps> = ({
  position = [0, 16, -45],
  size = 11,
  glowColor = '#79E7FF',
  hasRing = true,
}) => {
  const moonRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.015;
    }
  });

  return (
    <group position={position} ref={moonRef}>
      {/* Core Planet Sphere */}
      <mesh>
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial
          color="#D8E8F5"
          emissive="#1E2A4A"
          emissiveIntensity={0.35}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Atmospheric Halo Glow */}
      <mesh>
        <sphereGeometry args={[size * 1.08, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent={true}
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Second outer soft halo */}
      <mesh>
        <sphereGeometry args={[size * 1.25, 32, 32]} />
        <meshBasicMaterial
          color="#7564FF"
          transparent={true}
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Celestial Dust Ring */}
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.6, Math.PI / 8, 0]}>
          <ringGeometry args={[size * 1.4, size * 1.8, 64]} />
          <meshBasicMaterial
            color={glowColor}
            transparent={true}
            opacity={0.25}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};
