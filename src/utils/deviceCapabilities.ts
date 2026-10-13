export interface DeviceCapabilities {
  hasWebGL: boolean;
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
  hasFinePointer: boolean;
}

export function detectDeviceCapabilities(): DeviceCapabilities {
  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    hasWebGL = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    hasWebGL = false;
  }

  const isTouchDevice = 
    typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hasFinePointer = 
    typeof window !== 'undefined' && 
    window.matchMedia('(pointer: fine)').matches;

  return {
    hasWebGL,
    isTouchDevice,
    prefersReducedMotion,
    hasFinePointer,
  };
}
