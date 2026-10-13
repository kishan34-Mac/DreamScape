import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [role="button"], canvas, [data-interactive]');
        setIsHovered(Boolean(interactive));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        pointerEvents: 'none',
        zIndex: 'var(--z-cursor)',
        transition: 'transform 0.04s linear',
      }}
    >
      {/* Outer Glow Halo */}
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: isHovered ? '48px' : '26px',
          height: isHovered ? '48px' : '26px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovered ? 'var(--color-cyan)' : 'rgba(117, 100, 255, 0.5)'}`,
          backgroundColor: isHovered ? 'rgba(121, 231, 255, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 16px var(--color-cyan-glow)' : 'none',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, border-color 0.25s, background-color 0.25s',
        }}
      />
      {/* Inner Dot */}
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: isHovered ? '#FFFFFF' : 'var(--color-cyan)',
          boxShadow: '0 0 8px #79E7FF',
        }}
      />
    </div>
  );
};
