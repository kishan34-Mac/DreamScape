import React from 'react';
import { WorldLoreItem } from '../../types/world';
import { Modal } from './Modal';
import { Sparkles, Compass } from 'lucide-react';
import { Button } from './Button';

interface LoreModalProps {
  item: WorldLoreItem | null;
  onClose: () => void;
}

export const LoreModal: React.FC<LoreModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <Modal
      isOpen={Boolean(item)}
      onClose={onClose}
      title={item.title}
      subtitle={item.subtitle}
      maxWidth="500px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--color-cyan)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-headline)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={16} />
          <span>Environmental Lore Recorded</span>
        </div>

        <p
          style={{
            lineHeight: 1.7,
            color: 'var(--color-lavender)',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {item.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              color: 'var(--color-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Compass size={14} /> Dimensional Memory
          </span>
          <Button variant="glass" size="sm" onClick={onClose}>
            Close Memory
          </Button>
        </div>
      </div>
    </Modal>
  );
};
