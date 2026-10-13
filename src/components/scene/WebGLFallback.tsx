import React from 'react';
import { WorldId, WorldLoreItem } from '../../types/world';
import { WORLDS_CONFIG, EXPLORABLE_WORLDS } from '../../config/worlds';
import { Sparkles, Globe, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface WebGLFallbackProps {
  currentWorld: WorldId;
  onSelectWorld: (worldId: WorldId) => void;
  onSelectLore: (lore: WorldLoreItem) => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  currentWorld,
  onSelectWorld,
  onSelectLore,
}) => {
  const world = WORLDS_CONFIG[currentWorld] || WORLDS_CONFIG['hub'];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: world.palette.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        transition: 'background-color 0.8s ease',
      }}
    >
      {/* 2D Celestial Ambient Background Orbs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${world.palette.primary}33 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'etherealFloat 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${world.palette.secondary}22 0%, transparent 70%)`,
          filter: 'blur(50px)',
          top: '20%',
          right: '15%',
          pointerEvents: 'none',
        }}
      />

      {/* Notice Banner */}
      <div
        style={{
          position: 'absolute',
          top: '84px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.74rem',
          color: 'var(--color-cyan)',
          letterSpacing: '0.06em',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Sparkles size={13} />
        <span>2D Celestial Fallback Active (WebGL Hardware Acceleration Unavailable)</span>
      </div>

      {/* Main Celestial Portal Emblem */}
      <div
        style={{
          position: 'relative',
          width: 'min(280px, 60vw)',
          height: 'min(280px, 60vw)',
          borderRadius: '50%',
          border: `2px solid ${world.portalColor}`,
          boxShadow: `0 0 40px ${world.portalColor}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-15px',
            borderRadius: '50%',
            border: '1px dashed rgba(255, 255, 255, 0.2)',
            animation: 'spinSlow 20s linear infinite',
          }}
        />
        <div
          style={{
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${world.portalColor} 0%, transparent 80%)`,
            opacity: 0.6,
            animation: 'pulseGlow 4s ease-in-out infinite',
          }}
        />
        <Compass size={48} color="#FFFFFF" />
      </div>

      {/* Realm Information */}
      <div style={{ textAlign: 'center', maxWidth: '580px', zIndex: 2 }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'var(--color-white)',
            marginBottom: '8px',
          }}
        >
          {world.title}
        </h2>
        <p
          style={{
            color: 'var(--color-lavender)',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          {world.description}
        </p>

        {/* Lore Items in current world */}
        {world.loreItems.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '0.74rem',
                letterSpacing: '0.12em',
                color: 'var(--color-cyan)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Discover Realm Lore
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {world.loreItems.map((lore) => (
                <button
                  key={lore.id}
                  onClick={() => onSelectLore(lore)}
                  className="glass-button"
                  style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                >
                  <Sparkles size={12} color={world.portalColor} />
                  <span>{lore.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* World Navigator Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <Button
            variant={currentWorld === 'hub' ? 'primary' : 'glass'}
            size="sm"
            onClick={() => onSelectWorld('hub')}
          >
            Central Nexus
          </Button>
          {EXPLORABLE_WORLDS.map((w) => (
            <Button
              key={w.id}
              variant={currentWorld === w.id ? 'primary' : 'glass'}
              size="sm"
              onClick={() => onSelectWorld(w.id)}
            >
              World 0{w.index}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
