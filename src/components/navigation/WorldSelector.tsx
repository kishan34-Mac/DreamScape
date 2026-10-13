import React from 'react';
import { EXPLORABLE_WORLDS } from '../../config/worlds';
import { WorldId } from '../../types/world';
import { Modal } from '../ui/Modal';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface WorldSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorld: WorldId;
  visitedWorlds: string[];
  onSelectWorld: (worldId: WorldId) => void;
}

export const WorldSelector: React.FC<WorldSelectorProps> = ({
  isOpen,
  onClose,
  currentWorld,
  visitedWorlds,
  onSelectWorld,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dimensions of Dreamscape"
      subtitle="Dimensional Atlas"
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginBottom: '8px' }}>
          Five parallel realities exist suspended across the void. Select any coordinate below to materialize directly into that realm.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {EXPLORABLE_WORLDS.map((world) => {
            const isCurrent = currentWorld === world.id;
            const isVisited = visitedWorlds.includes(world.id);

            return (
              <div
                key={world.id}
                style={{
                  background: isCurrent 
                    ? 'rgba(117, 100, 255, 0.12)' 
                    : 'rgba(18, 24, 48, 0.55)',
                  border: `1px solid ${isCurrent ? world.portalColor : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  boxShadow: isCurrent ? `0 0 24px ${world.portalColor}33` : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <div>
                  {/* Top metadata */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        color: world.portalColor,
                      }}
                    >
                      WORLD 0{world.index}
                    </span>

                    {isVisited ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.7rem',
                          color: 'var(--color-cyan)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        <CheckCircle2 size={12} /> Visited
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--color-muted)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Unexplored
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--color-white)',
                      marginBottom: '4px',
                    }}
                  >
                    {world.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-lavender)',
                      fontStyle: 'italic',
                      marginBottom: '10px',
                    }}
                  >
                    {world.tagline}
                  </div>
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--color-lavender)',
                      lineHeight: 1.5,
                    }}
                  >
                    {world.description}
                  </p>
                </div>

                {/* Bottom button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  {isCurrent ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: world.portalColor,
                        fontFamily: 'var(--font-headline)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <Compass size={14} /> Current Dimension
                    </span>
                  ) : (
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => {
                        onSelectWorld(world.id);
                        onClose();
                      }}
                      icon={<ArrowRight size={14} />}
                    >
                      Enter Realm
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
