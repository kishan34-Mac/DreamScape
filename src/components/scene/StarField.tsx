import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getGlowingParticleTexture } from '../../utils/particleTexture';

interface StarFieldProps {
  count?: number;
  radius?: number;
  paletteColor?: string;
}

export const StarField: React.FC<StarFieldProps> = ({
  count = 2500,
  radius = 180,
  paletteColor = '#79E7FF',
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const texture = useMemo(() => getGlowingParticleTexture(), []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(paletteColor);
    const whiteColor = new THREE.Color('#FFFFFF');
    const violetColor = new THREE.Color('#7564FF');

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.6 + 0.4 * Math.cbrt(Math.random()));

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const pick = Math.random();
      const c = pick > 0.6 ? baseColor : pick > 0.25 ? whiteColor : violetColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, radius, paletteColor]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.65}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
