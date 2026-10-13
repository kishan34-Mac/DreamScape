import React from 'react';
import { Volume2, VolumeX, Settings, Compass, Info, Globe } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { WorldId } from '../../types/world';

interface TopNavigationProps {
  currentWorld: WorldId;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenWorlds: () => void;
  onOpenAbout: () => void;
  onOpenSettings: () => void;
  onReturnToHub: () => void;
  isAutoDrift: boolean;
  onToggleAutoDrift: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  currentWorld,
  soundEnabled,
  onToggleSound,
  onOpenWorlds,
  onOpenAbout,
  onOpenSettings,
  onReturnToHub,
  isAutoDrift,
  onToggleAutoDrift,
}) => {
  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 4vw, 36px)',
        zIndex: 'var(--z-nav)',
        pointerEvents: 'none',
      }}
    >
      {/* Brand Logo */}
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onReturnToHub}
          aria-label="Return to Dreamscape Hub"
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentWorld === 'hub' ? 'var(--color-cyan)' : 'var(--color-violet)',
              boxShadow: currentWorld === 'hub' ? '0 0 12px var(--color-cyan)' : '0 0 12px var(--color-violet)',
              transition: 'background-color 0.4s',
            }}
          />
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--color-white)',
              }}
            >
              DREAMSCAPE
            </span>
            <span
              style={{
                display: 'none',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                color: 'var(--color-muted)',
                marginLeft: '8px',
                textTransform: 'uppercase',
              }}
            >
              v1.0
            </span>
          </div>
        </button>
      </div>

      {/* Nav Controls */}
      <nav
        aria-label="Main Navigation"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 1.5vw, 14px)',
        }}
      >
        <button
          onClick={onToggleAutoDrift}
          className={`glass-button ${isAutoDrift ? 'active' : ''}`}
          style={{ display: 'none' }} /* Desktop view query handled inline */
          data-desktop-only
        >
          <Compass size={15} />
          <span>{isAutoDrift ? 'Drifting' : 'Orbit'}</span>
        </button>

        <button
          onClick={onOpenWorlds}
          className="glass-button"
          style={{ padding: '8px 16px' }}
        >
          <Globe size={15} />
          <span>Worlds</span>
        </button>

        <button
          onClick={onOpenAbout}
          className="glass-button"
          style={{ padding: '8px 16px' }}
        >
          <Info size={15} />
          <span>About</span>
        </button>

        <IconButton
          icon={soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          label={soundEnabled ? 'Mute ambient audio' : 'Unmute ambient audio'}
          isActive={soundEnabled}
          onClick={onToggleSound}
          size="md"
        />

        <IconButton
          icon={<Settings size={17} />}
          label="Open settings"
          onClick={onOpenSettings}
          size="md"
        />
      </nav>
    </header>
  );
};
