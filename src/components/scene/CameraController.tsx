import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WorldId } from '../../types/world';

interface CameraControllerProps {
  currentWorld: WorldId;
  isAutoDrift: boolean;
  reducedMotion: boolean;
}

const WORLD_CAMERA_TARGETS: Record<WorldId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  'hub': { pos: [0, 2.5, 9], lookAt: [0, 0.5, -6] },
  'cosmic-ocean': { pos: [0, 1.8, 8], lookAt: [0, 1.0, -10] },
  'forgotten-city': { pos: [0, 3.2, 9], lookAt: [0, 3.0, -10] },
  'neon-forest': { pos: [0, 2.0, 7.5], lookAt: [0, 1.2, -8] },
  'glass-dimension': { pos: [0, 2.2, 8.5], lookAt: [0, 1.0, -8] },
  'star-sanctuary': { pos: [0, 2.8, 9], lookAt: [0, 1.5, -12] },
};

export const CameraController: React.FC<CameraControllerProps> = ({
  currentWorld,
  isAutoDrift,
  reducedMotion,
}) => {
  const { camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const targetLookAt = useRef(new THREE.Vector3(0, 0, -6));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, -6));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to [-1, 1]
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const targetConfig = WORLD_CAMERA_TARGETS[currentWorld] || WORLD_CAMERA_TARGETS['hub'];
    const time = state.clock.getElapsedTime();

    // Calculate parallax offsets
    const parallaxFactor = reducedMotion ? 0.1 : 0.6;
    const autoDriftX = isAutoDrift && !reducedMotion ? Math.sin(time * 0.3) * 2.5 : 0;
    const autoDriftY = isAutoDrift && !reducedMotion ? Math.cos(time * 0.4) * 0.8 : 0;

    const targetX = targetConfig.pos[0] + mousePos.current.x * parallaxFactor + autoDriftX;
    const targetY = targetConfig.pos[1] + mousePos.current.y * (parallaxFactor * 0.6) + autoDriftY;
    const targetZ = targetConfig.pos[2];

    // Smooth lerp to camera position
    const lerpSpeed = reducedMotion ? delta * 5.0 : delta * 2.2;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed);

    // Smooth lerp to lookAt target
    targetLookAt.current.set(
      targetConfig.lookAt[0] + mousePos.current.x * (parallaxFactor * 0.4),
      targetConfig.lookAt[1] + mousePos.current.y * (parallaxFactor * 0.3),
      targetConfig.lookAt[2]
    );

    currentLookAt.current.lerp(targetLookAt.current, lerpSpeed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
