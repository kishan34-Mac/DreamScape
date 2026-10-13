import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  isActive = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeDims = {
    sm: { width: '36px', height: '36px', minWidth: '36px' },
    md: { width: '42px', height: '42px', minWidth: '42px' },
    lg: { width: '48px', height: '48px', minWidth: '48px' },
  }[size];

  return (
    <button
      aria-label={label}
      title={label}
      className={`glass-button ${isActive ? 'active' : ''} ${className}`}
      style={{
        ...sizeDims,
        padding: 0,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      {icon}
    </button>
  );
};
