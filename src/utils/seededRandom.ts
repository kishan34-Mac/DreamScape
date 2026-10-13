export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateConstellationNodes(seed: number, count: number = 8): { id: number; x: number; y: number; z: number; name: string }[] {
  const rng = mulberry32(seed);
  const stars: { id: number; x: number; y: number; z: number; name: string }[] = [];
  const mythicNames = [
    'Aethelgard', 'Mirach', 'Celestia', 'Vega Minor', 'Orion Core', 
    'Polaris Echo', 'Deneb Lux', 'Aldebaran Void', 'Syrma', 'Alhena'
  ];

  for (let i = 0; i < count; i++) {
    const angle = rng() * Math.PI * 2;
    const radius = 2.5 + rng() * 4.5;
    const x = Math.cos(angle) * radius;
    const y = 1.0 + Math.sin(angle) * (radius * 0.7);
    const z = -14 + (rng() - 0.5) * 3;
    const name = mythicNames[i % mythicNames.length] + ' ' + String.fromCharCode(65 + i);
    stars.push({ id: i, x, y, z, name });
  }

  return stars;
}
