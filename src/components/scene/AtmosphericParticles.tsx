import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getGlowingParticleTexture } from '../../utils/particleTexture';

interface AtmosphericParticlesProps {
  count?: number;
  color?: string;
  spread?: [number, number, number];
}

export const AtmosphericParticles: React.FC<AtmosphericParticlesProps> = ({
  count = 200,
  color = '#79E7FF',
  spread = [30, 16, 25],
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const texture = useMemo(() => getGlowingParticleTexture(), []);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread[0];
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread[1] + 1;
      // Keep strictly behind the camera (camera is at z=9)
      pos[i * 3 + 2] = -Math.random() * spread[2] + 2;
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return [pos, spd];
  }, [count, spread]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Floating ascent
      array[idx + 1] += speeds[i] * delta * 0.35;
      // Horizontal sway
      array[idx] += Math.sin(time * 0.5 + i) * delta * 0.08;

      // Wrap around bounds
      if (array[idx + 1] > spread[1] / 2 + 5) {
        array[idx + 1] = -spread[1] / 2 - 2;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.28}
        sizeAttenuation={true}
        color={color}
        transparent={true}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
