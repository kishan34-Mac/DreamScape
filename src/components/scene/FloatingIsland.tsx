import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingIslandProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  bobbingSpeed?: number;
  bobbingOffset?: number;
  crystalColor?: string;
  hasCrystals?: boolean;
}

export const FloatingIsland: React.FC<FloatingIslandProps> = ({
  position = [0, -2, -6],
  scale = 1,
  rotation = [0, 0, 0],
  bobbingSpeed = 0.8,
  bobbingOffset = 0,
  crystalColor = '#79E7FF',
  hasCrystals = true,
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * bobbingSpeed + bobbingOffset;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.35;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main Upper Plateau Rock */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[4.2, 2.2, 1.8, 8]} />
        <meshStandardMaterial
          color="#161828"
          roughness={0.85}
          metalness={0.2}
          flatShading={true}
        />
      </mesh>

      {/* Island Underbelly / Stalactites */}
      <mesh position={[0, -1.8, 0]} castShadow>
        <coneGeometry args={[2.8, 3.2, 7]} />
        <meshStandardMaterial
          color="#0F111D"
          roughness={0.95}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* Secondary Under-Spire */}
      <mesh position={[1.1, -1.6, 0.8]} scale={[0.6, 0.8, 0.6]}>
        <coneGeometry args={[1.5, 3.0, 6]} />
        <meshStandardMaterial
          color="#0C0E18"
          roughness={0.9}
          flatShading={true}
        />
      </mesh>

      {/* Surface Vegetation / Moss Accents */}
      <mesh position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.0, 8]} />
        <meshStandardMaterial
          color="#232742"
          roughness={0.8}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* Luminous Crystals on Island Surface */}
      {hasCrystals && (
        <group position={[0, 1.0, 0]}>
          {/* Main Central Crystal */}
          <mesh position={[0, 1.2, 0]} rotation={[0.1, 0.2, 0.05]}>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color={crystalColor}
              emissive={crystalColor}
              emissiveIntensity={1.2}
              roughness={0.15}
              metalness={0.8}
            />
          </mesh>

          {/* Secondary Crystals Cluster */}
          <mesh position={[-1.2, 0.8, 0.8]} rotation={[-0.2, 0.4, 0.3]} scale={0.65}>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
              color={crystalColor}
              emissive={crystalColor}
              emissiveIntensity={1.0}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[1.4, 0.6, -0.6]} rotation={[0.3, -0.2, -0.2]} scale={0.5}>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color={crystalColor}
              emissive={crystalColor}
              emissiveIntensity={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Point Light from crystal cluster */}
          <pointLight
            color={crystalColor}
            intensity={1.8}
            distance={8}
            decay={2}
            position={[0, 1.5, 0]}
          />
        </group>
      )}
    </group>
  );
};
