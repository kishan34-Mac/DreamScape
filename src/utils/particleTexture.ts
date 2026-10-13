import * as THREE from 'three';

let cachedTexture: THREE.CanvasTexture | null = null;

export function getGlowingParticleTexture(): THREE.CanvasTexture {
  if (cachedTexture) return cachedTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  cachedTexture = new THREE.CanvasTexture(canvas);
  return cachedTexture;
}
