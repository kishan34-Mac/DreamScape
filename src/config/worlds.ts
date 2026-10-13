import { WorldConfig } from '../types/world';

export const WORLDS_CONFIG: Record<string, WorldConfig> = {
  'hub': {
    id: 'hub',
    index: 0,
    title: 'The Dream Hub',
    subtitle: 'The Threshold of Realities',
    tagline: 'Somewhere Between Reality and Imagination',
    description: 'The convergence nexus where all dreams intersect. Five dimensional portals hover suspended around an ancient celestial archipelago.',
    palette: {
      primary: '#7564FF',
      secondary: '#79E7FF',
      accent: '#F3F1FF',
      background: '#070810',
      fog: '#090D1C',
    },
    portalPosition: [0, 0, 0],
    portalRotation: [0, 0, 0],
    portalColor: '#7564FF',
    ambientFrequency: 108, // A2 sub-harmonic
    audioMood: 'ethereal',
    loreItems: [
      {
        id: 'nexus-core',
        title: 'The Nexus Anchor',
        subtitle: 'Ancient Celestial Keystone',
        description: 'Suspended in the zero-gravity void, this crystalline anchor stabilizes the drift of memories between mortal waking and deep dreamscapes.',
        position: [0, -1, 0],
      },
      {
        id: 'celestial-moon',
        title: 'The Slumbering Moon',
        subtitle: 'Luminescent Sovereign',
        description: 'A colossal planetary eye that never closes. Its moonlight does not reflect the sun, but the collective reveries of sleeping minds.',
        position: [0, 15, -45],
      }
    ]
  },
  'cosmic-ocean': {
    id: 'cosmic-ocean',
    index: 1,
    title: 'The Cosmic Ocean',
    subtitle: 'World 01 — The Liquid Void',
    tagline: 'Reflections of Forgotten Stars',
    description: 'An endless reflective ocean stretching toward infinity beneath a low-hanging supermoon. Luminous bioluminescent orbs drift above tidal ripples of starlight.',
    palette: {
      primary: '#00D2FF',
      secondary: '#3A7BD5',
      accent: '#79E7FF',
      background: '#030814',
      fog: '#051226',
    },
    portalPosition: [-12, 1.2, -6],
    portalRotation: [0, Math.PI / 4, 0],
    portalColor: '#00D2FF',
    ambientFrequency: 144, // D3 oceanic drone
    audioMood: 'oceanic',
    loreItems: [
      {
        id: 'tide-echo',
        title: 'Echo of the Deep',
        subtitle: 'Hydro-Acoustic Memory',
        description: 'Vibrations in the surface tension carry the faint murmurs of thoughts discarded at sea. Listening closely reveals harmonies composed by ancient whales.',
        position: [-6, 0.5, -4],
      },
      {
        id: 'luminous-trench',
        title: 'The Luminous Trench',
        subtitle: 'Abyssal Aurora',
        description: 'Miles beneath the liquid starlight, geothermal fissures release gaseous ribbons of ultraviolet light that never diminish.',
        position: [8, 0.4, -8],
      },
      {
        id: 'moon-reflection',
        title: 'The Silver Mirror',
        subtitle: 'Still Waters of Eternity',
        description: 'Here the boundary between water and atmosphere is dissolved. One could dive upward into the cosmos or float forever across the quiet horizon.',
        position: [0, 0.8, -12],
      }
    ]
  },
  'forgotten-city': {
    id: 'forgotten-city',
    index: 2,
    title: 'The Forgotten City',
    subtitle: 'World 02 — The Monolithic Ruin',
    tagline: 'Silent Monuments of an Unwritten Age',
    description: 'Towering geometric spires, broken sky-bridges, and monumental doorways rising from the obsidian abyss, bathed in warm amber and twilight embers.',
    palette: {
      primary: '#F59E0B',
      secondary: '#B45309',
      accent: '#FDE68A',
      background: '#08060D',
      fog: '#130D1E',
    },
    portalPosition: [-7, 2.5, -13],
    portalRotation: [0, Math.PI / 6, 0],
    portalColor: '#F59E0B',
    ambientFrequency: 162, // E3 ancient horn tone
    audioMood: 'ancient',
    loreItems: [
      {
        id: 'spire-whispers',
        title: 'Spire of Whispers',
        subtitle: 'Acoustic Monolith',
        description: 'Built by architects who understood geometry as a language. The hollow interior amplifies wind into choral chants of an extinct civilization.',
        position: [-4, 5, -8],
      },
      {
        id: 'sunken-forum',
        title: 'The Sunken Forum',
        subtitle: 'Chamber of Decrees',
        description: 'Basalt pillars inscribed with glyphs of star cycles. Time moves slower across its perimeter, preserving shadows cast millennia ago.',
        position: [5, 2, -6],
      },
      {
        id: 'celestial-arch',
        title: 'The Arch of Dawn',
        subtitle: 'Gateway to the Meridian',
        description: 'A colossal cantilevered gateway that aligns with planetary equinoxes, channeling solar flare radiation into radiant gold light.',
        position: [0, 8, -14],
      }
    ]
  },
  'neon-forest': {
    id: 'neon-forest',
    index: 3,
    title: 'The Neon Forest',
    subtitle: 'World 03 — Bioluminescent Glade',
    tagline: 'Flora That Breathes in Ultraviolet',
    description: 'An enchanted extraterrestrial forest where crystalline branches pulse with synth-violet and emerald veins, emitting glowing spores that float weightlessly.',
    palette: {
      primary: '#10B981',
      secondary: '#8B5CF6',
      accent: '#34D399',
      background: '#040B0B',
      fog: '#061715',
    },
    portalPosition: [7, 2.2, -13],
    portalRotation: [0, -Math.PI / 6, 0],
    portalColor: '#10B981',
    ambientFrequency: 192, // G3 organic pulse
    audioMood: 'bioluminescent',
    loreItems: [
      {
        id: 'singing-moss',
        title: 'The Resonant Spores',
        subtitle: 'Photosynthetic Luminescence',
        description: 'Microscopic organisms that cluster along bark fibers. When approached, their collective electrical potential produces a soothing melodic chime.',
        position: [-5, 1.5, -5],
      },
      {
        id: 'crystal-canopy',
        title: 'The Shimmering Canopy',
        subtitle: 'Fiber-Optic Foliage',
        description: 'Leaves woven from glass-like silicate fibers that redirect cosmic rays directly into the soil to nourish subterranean mycorrhizal networks.',
        position: [6, 4, -9],
      },
      {
        id: 'elder-trunk',
        title: 'The Heartwood Spire',
        subtitle: 'Millennial Organism',
        description: 'A thousand-year-old tree whose trunk houses an organic battery of living sap, illuminating the understory with pulsating emerald light.',
        position: [1, 3, -11],
      }
    ]
  },
  'glass-dimension': {
    id: 'glass-dimension',
    index: 4,
    title: 'The Glass Dimension',
    subtitle: 'World 04 — The Prismatic Lattice',
    tagline: 'Where Light Fractures into Pure Form',
    description: 'A crystalline realm of translucent polyhedrons, floating prisms, and chromatic refractions. Geometric bodies pivot in mathematical harmony against the dark vacuum.',
    palette: {
      primary: '#EC4899',
      secondary: '#6366F1',
      accent: '#F472B6',
      background: '#0A0614',
      fog: '#120924',
    },
    portalPosition: [12, 1.2, -6],
    portalRotation: [0, -Math.PI / 4, 0],
    portalColor: '#EC4899',
    ambientFrequency: 216, // A3 crystalline resonance
    audioMood: 'crystalline',
    loreItems: [
      {
        id: 'refraction-monolith',
        title: 'The Refraction Monolith',
        subtitle: 'Dispersion Vector',
        description: 'A massive triangular prism that splits ambient cosmic radiation into spectral ribbons of magenta, cyan, and amber that linger in vacuum.',
        position: [-6, 3, -7],
      },
      {
        id: 'resonating-icosahedron',
        title: 'The Resonant Lattice',
        subtitle: 'Geometric Equilibrium',
        description: 'Hovering polyhedrons that chime with glass-harmonic overtones whenever their facets align with celestial magnetic fields.',
        position: [5, 2, -6],
      },
      {
        id: 'specular-abyss',
        title: 'The Total Internal Mirror',
        subtitle: 'Infinite Recursion',
        description: 'A transparent floating plane where light is trapped inside through infinite reflection, creating an endless corridor of recursive illusions.',
        position: [0, 4, -12],
      }
    ]
  },
  'star-sanctuary': {
    id: 'star-sanctuary',
    index: 5,
    title: 'The Star Sanctuary',
    subtitle: 'World 05 — The Celestial Observatory',
    tagline: 'Weaving Destiny Across the Milky Core',
    description: 'An open cosmic sanctuary perched above an interstellar galaxy spiral. Visitors can weave starlight into custom constellations across the dark heavens.',
    palette: {
      primary: '#818CF8',
      secondary: '#C084FC',
      accent: '#E0E7FF',
      background: '#060614',
      fog: '#0A0822',
    },
    portalPosition: [0, 3.2, -16],
    portalRotation: [0, 0, 0],
    portalColor: '#818CF8',
    ambientFrequency: 240, // B3 celestial harmony
    audioMood: 'celestial',
    loreItems: [
      {
        id: 'armillary-sphere',
        title: 'The Armillary of Horizons',
        subtitle: 'Navigational Chronometer',
        description: 'Interlocking brass and starlight rings that map the trajectory of wandering worlds across the five distinct dream sectors.',
        position: [-5, 2.5, -10],
      },
      {
        id: 'galactic-vortex',
        title: 'The Spiral Eye',
        subtitle: 'Galactic Nucleus',
        description: 'A gentle stellar whirlpool where millions of newborn stars rotate in peaceful cadence, casting soft indigo glows across the observatory floor.',
        position: [0, -2, -22],
      },
      {
        id: 'constellation-altar',
        title: 'The Weaver’s Altar',
        subtitle: 'Interactive Star Canvas',
        description: 'An astral plinth allowing dream travelers to connect cosmic beacons into mythic constellations and etch their signatures onto the sky.',
        position: [4, 1.8, -8],
      }
    ]
  }
};

export const EXPLORABLE_WORLDS = Object.values(WORLDS_CONFIG).filter(w => w.id !== 'hub');
