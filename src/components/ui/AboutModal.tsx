import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { ShieldCheck, Cpu, Sparkles, Compass } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="About DREAMSCAPE"
      subtitle="Vision & Architecture"
      maxWidth="620px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ lineHeight: 1.7, color: 'var(--color-lavender)', fontSize: '0.96rem' }}>
          <strong>DREAMSCAPE</strong> is an explorable digital universe operating wholly inside your browser. 
          Suspended somewhere between reality and imagination, travelers can explore five surreal dimensions:
          The Cosmic Ocean, The Forgotten City, The Neon Forest, The Glass Dimension, and The Star Sanctuary.
        </p>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            marginTop: '4px',
          }}
        >
          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-cyan)', marginBottom: '6px' }}>
              <ShieldCheck size={16} />
              <strong style={{ fontSize: '0.85rem' }}>100% Browser Native</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-lavender)', lineHeight: 1.5 }}>
              Zero servers, external APIs, tracking, or accounts required. All state and audio synthesis are generated in real-time.
            </p>
          </div>

          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-violet)', marginBottom: '6px' }}>
              <Cpu size={16} />
              <strong style={{ fontSize: '0.85rem' }}>Procedural Synthesizer</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-lavender)', lineHeight: 1.5 }}>
              Powered by the Web Audio API with sub-harmonic oscillators and modulated low-pass filtering tailored to each world.
            </p>
          </div>

          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', marginBottom: '6px' }}>
              <Sparkles size={16} />
              <strong style={{ fontSize: '0.85rem' }}>Interactive Lore</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-lavender)', lineHeight: 1.5 }}>
              Click floating beacons, ruins, bioluminescent plants, and geometric lattices to discover the hidden fragments of dream memory.
            </p>
          </div>

          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-amber)', marginBottom: '6px' }}>
              <Compass size={16} />
              <strong style={{ fontSize: '0.85rem' }}>Full Responsiveness</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-lavender)', lineHeight: 1.5 }}>
              Crafted with responsive Three.js viewports, touch controls, keyboard navigation, and an intelligent 2D WebGL fallback.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <Button variant="glass" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
