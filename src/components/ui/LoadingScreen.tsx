import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface LoadingScreenProps {
  isSceneReady: boolean;
  hasEntered: boolean;
  onEnter: (enableAudio: boolean) => void;
  reducedMotion: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isSceneReady,
  hasEntered,
  onEnter,
  reducedMotion,
}) => {
  const [wantsAudio, setWantsAudio] = React.useState<boolean>(true);

  if (hasEntered) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: reducedMotion ? 0.3 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-transition)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(11, 16, 32, 0.85) 0%, rgba(7, 8, 16, 0.98) 100%)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        {/* Ambient background particles hint */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(117, 100, 255, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          {/* Subtle status eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-headline)',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-cyan)',
              marginBottom: '20px',
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(121, 231, 255, 0.2)',
              backgroundColor: 'rgba(121, 231, 255, 0.04)',
            }}
          >
            <Sparkles size={13} />
            <span>Interactive 3D Experience</span>
          </motion.div>

          {/* Main Title Wordmark */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, scale: 1, letterSpacing: '0.18em' }}
            transition={{ duration: reducedMotion ? 0.4 : 1.4, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              fontWeight: 800,
              color: 'var(--color-white)',
              textShadow: '0 0 35px rgba(117, 100, 255, 0.6), 0 0 70px rgba(121, 231, 255, 0.2)',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            DREAMSCAPE
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
              color: 'var(--color-lavender)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              marginBottom: '36px',
            }}
          >
            Somewhere Between Reality and Imagination.
          </motion.p>

          {/* Action Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {!isSceneReady ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--color-muted)',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-headline)',
                  letterSpacing: '0.06em',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderTopColor: 'var(--color-cyan)',
                    borderRadius: '50%',
                    animation: 'spinSlow 1.5s linear infinite',
                  }}
                />
                <span>Materializing Dimensions...</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onEnter(wantsAudio)}
                  className="primary-button"
                  style={{
                    fontSize: '1rem',
                    padding: '16px 42px',
                    boxShadow: '0 8px 32px rgba(117, 100, 255, 0.4), 0 0 60px rgba(121, 231, 255, 0.25)',
                  }}
                >
                  <span>Enter The Dream</span>
                  <ArrowRight size={18} />
                </button>

                {/* Sound preference toggle before enter */}
                <button
                  type="button"
                  onClick={() => setWantsAudio(!wantsAudio)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: wantsAudio ? 'var(--color-cyan)' : 'var(--color-muted)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-headline)',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s',
                  }}
                >
                  {wantsAudio ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  <span>{wantsAudio ? 'Ambient Sound Enabled' : 'Muted'}</span>
                </button>
              </>
            )}

            <div
              style={{
                fontSize: '0.74rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.05em',
                marginTop: '12px',
              }}
            >
              Desktop & Mobile • Web Audio Synthesizer • No Account Required
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
