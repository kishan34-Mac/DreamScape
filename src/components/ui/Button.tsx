import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'glass',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = variant === 'primary' ? 'primary-button' : 'glass-button';
  
  const sizeStyles = {
    sm: { padding: '6px 14px', fontSize: '0.78rem' },
    md: { padding: '10px 22px', fontSize: '0.85rem' },
    lg: { padding: '14px 32px', fontSize: '0.98rem' },
  }[size];

  return (
    <button
      className={`${baseClasses} ${className}`}
      style={sizeStyles}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
