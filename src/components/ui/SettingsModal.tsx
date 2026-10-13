import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { UserSettings, QualityLevel } from '../../types/settings';
import { RotateCcw, Volume2, Sparkles, Eye, Zap } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSoundEnabled: (val: boolean) => void;
  onUpdateSoundVolume: (val: number) => void;
  onUpdateReducedMotion: (val: boolean) => void;
  onUpdateQuality: (val: QualityLevel) => void;
  onUpdateParticleDensity: (val: 'low' | 'medium' | 'high') => void;
  onReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSoundEnabled,
  onUpdateSoundVolume,
  onUpdateReducedMotion,
  onUpdateQuality,
  onUpdateParticleDensity,
  onReset,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="System & Immersion"
      subtitle="Preferences"
      maxWidth="540px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Sound toggle & volume */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={16} color="var(--color-cyan)" />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Ambient Audio Synthesizer</span>
            </div>
            <button
              onClick={() => onUpdateSoundEnabled(!settings.soundEnabled)}
              className={`glass-button ${settings.soundEnabled ? 'active' : ''}`}
              style={{ padding: '4px 14px', fontSize: '0.78rem' }}
            >
              {settings.soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {settings.soundEnabled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Volume</span>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => onUpdateSoundVolume(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: 'var(--color-cyan)',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-lavender)', width: '36px' }}>
                {Math.round(settings.soundVolume * 100)}%
              </span>
            </div>
          )}
        </section>

        {/* Visual Quality Mode */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Zap size={16} color="var(--color-violet)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Visual Quality</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {(['auto', 'high', 'low'] as QualityLevel[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onUpdateQuality(mode)}
                className={`glass-button ${settings.quality === mode ? 'active' : ''}`}
                style={{ padding: '8px', textTransform: 'capitalize' }}
              >
                {mode}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)', marginTop: '6px' }}>
            {settings.quality === 'auto' && 'Balances DPR and particle resolution for 60fps.'}
            {settings.quality === 'high' && 'Full fidelity 3.5k stars, high DPR, rich geometry.'}
            {settings.quality === 'low' && 'Optimized for low-power mobile or integrated GPUs.'}
          </div>
        </section>

        {/* Particle Density */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={16} color="var(--color-emerald)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Particle Density</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {(['low', 'medium', 'high'] as const).map((density) => (
              <button
                key={density}
                onClick={() => onUpdateParticleDensity(density)}
                className={`glass-button ${settings.particleDensity === density ? 'active' : ''}`}
                style={{ padding: '8px', textTransform: 'capitalize' }}
              >
                {density}
              </button>
            ))}
          </div>
        </section>

        {/* Reduced Motion Toggle */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={16} color="var(--color-lavender)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Reduced Motion</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                  Limits rapid camera transitions & rotation
                </div>
              </div>
            </div>

            <button
              onClick={() => onUpdateReducedMotion(!settings.reducedMotion)}
              className={`glass-button ${settings.reducedMotion ? 'active' : ''}`}
              style={{ padding: '4px 14px', fontSize: '0.78rem' }}
            >
              {settings.reducedMotion ? 'Active' : 'Standard'}
            </button>
          </div>
        </section>

        {/* Bottom Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            onClick={onReset}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-headline)',
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
