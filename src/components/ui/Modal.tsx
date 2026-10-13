import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '580px',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(5, 7, 14, 0.78)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="glass-panel"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth,
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '32px',
              zIndex: 1,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 40px rgba(117, 100, 255, 0.15)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '16px',
              }}
            >
              <div>
                {subtitle && (
                  <div
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-cyan)',
                      marginBottom: '4px',
                    }}
                  >
                    {subtitle}
                  </div>
                )}
                {title && (
                  <h2
                    id="modal-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--color-white)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {title}
                  </h2>
                )}
              </div>
              <IconButton icon={<X size={18} />} label="Close dialog" onClick={onClose} size="sm" />
            </div>

            {/* Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
