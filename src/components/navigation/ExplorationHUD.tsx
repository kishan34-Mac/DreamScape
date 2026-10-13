import React from 'react';
import { WorldId } from '../../types/world';
import { WORLDS_CONFIG, EXPLORABLE_WORLDS } from '../../config/worlds';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

interface ExplorationHUDProps {
  currentWorld: WorldId;
  visitedWorlds: string[];
  onReturnToHub: () => void;
  onOpenWorlds: () => void;
}

export const ExplorationHUD: React.FC<ExplorationHUDProps> = ({
  currentWorld,
  visitedWorlds,
  onReturnToHub,
  onOpenWorlds,
}) => {
  const world = WORLDS_CONFIG[currentWorld] || WORLDS_CONFIG['hub'];
  const isHub = currentWorld === 'hub';

  // Count explorable worlds visited (excluding hub)
  const exploredCount = EXPLORABLE_WORLDS.filter(w => visitedWorlds.includes(w.id)).length;

  return (
    <div
      role="region"
      aria-label="Exploration Status"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0 clamp(16px, 4vw, 36px) clamp(16px, 3vh, 28px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 'var(--z-hud)',
        pointerEvents: 'none',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      {/* Left info badge */}
      <div
        className="glass-panel"
        style={{
          pointerEvents: 'auto',
          padding: '14px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          maxWidth: '360px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: world.portalColor,
              boxShadow: `0 0 10px ${world.portalColor}`,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: world.portalColor,
            }}
          >
            {isHub ? 'Central Nexus' : `Realm 0${world.index}`}
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--color-white)',
          }}
        >
          {world.title}
        </div>

        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-lavender)',
          }}
        >
          {world.tagline}
        </div>
      </div>

      {/* Center hint pill */}
      <div
        className="glass-panel"
        style={{
          pointerEvents: 'auto',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          color: 'var(--color-lavender)',
          borderRadius: '9999px',
        }}
      >
        <Sparkles size={14} color="var(--color-cyan)" />
        <span>
          {isHub
            ? 'Hover & click floating portals to travel • Drag to look around'
            : 'Click luminous monuments to unlock lore • Drag to explore'}
        </span>
      </div>

      {/* Right controls & progress */}
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Progress badge */}
        <button
          onClick={onOpenWorlds}
          aria-label={`Exploration progress: ${exploredCount} of 5 realms discovered`}
          className="glass-panel"
          style={{
            border: '1px solid var(--border-subtle)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            color: 'inherit',
          }}
        >
          <Compass size={16} color="var(--color-violet)" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', letterSpacing: '0.06em' }}>
              DISCOVERED
            </div>
            <div
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--color-white)',
              }}
            >
              {exploredCount} / 5 Realms
            </div>
          </div>
        </button>

        {/* Return to hub button if currently in a sub-world */}
        {!isHub && (
          <Button
            variant="primary"
            size="md"
            onClick={onReturnToHub}
            icon={<ArrowLeft size={16} />}
          >
            Return to Hub
          </Button>
        )}
      </div>
    </div>
  );
};
