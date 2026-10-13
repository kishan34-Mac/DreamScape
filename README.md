# DREAMSCAPE — The World Beyond Reality

> *"Somewhere Between Reality and Imagination."*

[![Repository](https://img.shields.io/badge/GitHub-kishan34--Mac%2FDreamScape-blue?logo=github)](https://github.com/kishan34-Mac/DreamScape)
[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.165.0-black?logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-8.16.8-indigo.svg)](https://docs.pmnd.rs/react-three-fiber/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

An award-winning interactive 3D digital universe operating natively in the browser. Travelers materialize in a central celestial archipelago and traverse dimensional portals into five surreal realms: **The Cosmic Ocean**, **The Forgotten City**, **The Neon Forest**, **The Glass Dimension**, and **The Star Sanctuary**.

---

## 🌌 Experience Overview

**DREAMSCAPE** merges interactive 3D exploration with a cinematic audio-visual installation and a luxury creative portfolio.

- **100% Browser Native & Client-Side**: No backend, database, authentication, cookies, or remote analytics.
- **Procedural Web Audio Synthesizer**: Generates harmonious ambient drones and crystalline resonance in real-time using the Web Audio API without third-party audio hosting.
- **Interactive Environmental Lore**: Every realm contains interactive monuments and luminous beacons that unlock poetic lore entries.
- **Real-Time Constellation Weaver**: Generate and connect custom astral constellations in World 05 with deterministic PRNG algorithms.
- **Zero-Friction Fallback**: Intelligent 2D WebGL fallback with CSS animations ensuring full navigation and lore accessibility even without hardware acceleration.

---

## 🔮 The Five Dimensions

| Realm | Title | Aesthetic & Palette | Key Interactions |
|---|---|---|---|
| **00** | **The Dream Hub** | Midnight Navy & Ethereal Cyan (`#070810`, `#7564FF`, `#79E7FF`) | Central archipelago, floating islands, celestial moon with debris rings, 5 interactive 3D portals. |
| **01** | **The Cosmic Ocean** | Deep Violet & Oceanic Cyan (`#030814`, `#00D2FF`, `#3A7BD5`) | Real-time displaced wave surface, low-hanging supermoon, interactive hydro-acoustic memory beacons. |
| **02** | **The Forgotten City** | Obsidian & Monolithic Amber (`#08060D`, `#F59E0B`, `#B45309`) | Procedural skyscrapers, broken skyways, Arch of Dawn, and ancient acoustic lore spires. |
| **03** | **The Neon Forest** | Bioluminescent Emerald & Synth Violet (`#040B0B`, `#10B981`, `#8B5CF6`) | Stylized glowing trees, drifting spores, and reactive flora with radiant burst animations. |
| **04** | **The Glass Dimension** | Prismatic Magenta & Specular Void (`#0A0614`, `#EC4899`, `#6366F1`) | Translucent polyhedrons (icosahedrons, octahedrons, crystal rings), live color cycling, and glass chimes. |
| **05** | **The Star Sanctuary** | Interstellar Indigo & Starlight White (`#060614`, `#818CF8`, `#C084FC`) | Rotating spiral galaxy core, armillary spheres, and interactive Astral Weaver constellation generator. |

---

## 🏗️ Project Architecture

```
src/
├── app/
│   └── App.tsx                 # Root application controller
├── components/
│   ├── navigation/
│   │   ├── ExplorationHUD.tsx   # Realm indicators, lore hints, discovery tracking
│   │   ├── TopNavigation.tsx    # Audio toggle, worlds atlas, settings, branding
│   │   └── WorldSelector.tsx    # Dimensional Atlas drawer for all 5 worlds
│   ├── portals/
│   │   └── Portal.tsx           # 3D interactive portal rings with HTML labels
│   ├── scene/
│   │   ├── AtmosphericParticles.tsx # Soft glowing cosmic dust & dream spores
│   │   ├── CameraController.tsx # Smooth mouse parallax, auto-drift & lerp
│   │   ├── DreamCanvas.tsx      # R3F canvas with WebGL error boundary
│   │   ├── FloatingIsland.tsx   # Procedural floating plateaus & crystal spires
│   │   ├── Moon.tsx             # Celestial moon with atmospheric glow & ring
│   │   ├── SceneLighting.tsx    # Dynamic fog, hemisphere & directional moonlight
│   │   ├── StarField.tsx        # 3,500+ instanced star points with twinkling
│   │   └── WebGLFallback.tsx    # 2D CSS-animated celestial fallback
│   ├── ui/
│   │   ├── AboutModal.tsx       # Narrative & local browser architecture modal
│   │   ├── Button.tsx           # Accessible glass and primary buttons
│   │   ├── CustomCursor.tsx     # Fine-pointer desktop cursor with glow halo
│   │   ├── IconButton.tsx       # Circular glass action buttons
│   │   ├── LoadingScreen.tsx    # Cinematic opening sequence & audio activation
│   │   ├── LoreModal.tsx        # Environmental memory inspection modal
│   │   ├── Modal.tsx            # Accessible dialog with blur & Escape support
│   │   └── SettingsModal.tsx     # Quality, audio volume, particles & motion
│   └── worlds/
│       ├── CosmicOcean.tsx      # World 01: Wave displacement & supermoon
│       ├── DreamHub.tsx         # Central archipelago with 5 portals
│       ├── ForgottenCity.tsx    # World 02: Monoliths, bridges & amber embers
│       ├── GlassDimension.tsx   # World 04: Prisms, transmission & color cycles
│       ├── NeonForest.tsx       # World 03: Glowing trees, spores & reactive flora
│       └── StarSanctuary.tsx    # World 05: Spiral galaxy & constellation weaver
├── config/
│   ├── sceneSettings.ts         # High, Auto, and Low graphics profiles
│   └── worlds.ts                # Realm palettes, portal coordinates & lore items
├── hooks/
│   ├── useAudio.ts              # Web Audio connection & sound triggers
│   ├── useQualitySettings.ts    # Settings state & localStorage sync
│   ├── useReducedMotion.ts      # Accessibility motion preference detection
│   └── useWorldNavigation.ts    # Realm state machine & discovery tracking
├── styles/
│   ├── animations.css           # Keyframe animations (float, pulse, grain)
│   ├── globals.css              # Glassmorphic classes, resets & vignette
│   └── tokens.css               # Design tokens, colors, blurs & z-indices
├── types/
│   ├── settings.ts              # Types for preferences & scene configuration
│   └── world.ts                 # Types for worlds, coordinates & lore items
└── utils/
    ├── audioSynth.ts            # Web Audio API ambient synthesizer
    ├── deviceCapabilities.ts    # WebGL & device capability detection
    ├── particleTexture.ts       # Canvas-generated circular soft glow texture
    ├── seededRandom.ts          # Deterministic PRNG algorithm
    └── storage.ts               # LocalStorage wrapper with error handling
```

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict type-checking)
- **3D Engine**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Interface Transitions**: [Framer Motion](https://www.framer.com/motion/)
- **Audio Synthesis**: Native Browser [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS Design System with CSS Tokens, Glassmorphism, and Atmospheric Film Grain

---

## 🚀 Local Installation & Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- [Git](https://git-scm.com/)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/kishan34-Mac/DreamScape.git
   cd DreamScape
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173/` in your browser.

4. Build production bundle:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Vercel

DREAMSCAPE is fully static and pre-configured for instant zero-configuration deployment on Vercel:

1. Import repository `https://github.com/kishan34-Mac/DreamScape` in the [Vercel Dashboard](https://vercel.com/new).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### GitHub Pages

1. In `vite.config.ts`, set the base path:
   ```ts
   export default defineConfig({
     base: '/DreamScape/',
     // ...
   });
   ```
2. Build and deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

---

## 🎛️ System Preferences & Accessibility

- **Ambient Audio Synthesizer**: Disabled by default adhering to browser autoplay policies; smoothly fades in on user gesture with configurable master volume.
- **Visual Quality**: Supports `Auto` (balanced DPR for 60fps), `High` (3,500 stars, shadows, full resolution), and `Low` (optimized for integrated GPUs or mobile).
- **Particle Density**: Switchable between `Low`, `Medium`, and `High`.
- **Reduced Motion**: Respects `prefers-reduced-motion` operating system preference and provides a manual toggle to disable rapid panning and rotational effects.
- **Keyboard Navigation**: `Escape` key dismisses any open modal; buttons feature high-contrast visible focus rings.
- **Local Persistence**: Non-sensitive preferences and discovered realm progress are stored safely in `localStorage`.

---

## 🛡️ Privacy & Security Guarantees

- **No Remote Tracking or Analytics**: No Google Analytics, telemetry, or third-party tracking pixels.
- **No Remote Fonts / Assets Required at Runtime**: Self-contained SVG icons and local fallback fonts.
- **No Cookies or PII Collected**: Operates entirely in memory and isolated local storage.

---

## 📄 License

MIT License. Designed and built with Google Antigravity IDE.
