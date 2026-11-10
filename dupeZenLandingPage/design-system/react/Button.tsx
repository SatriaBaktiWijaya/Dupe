import React from 'react';
import { Kbd } from './Kbd';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  shortcut?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  shortcut,
  icon,
  className = '',
  ...props
}) => {
  const variantClass = {
    primary: 'zen-btn-primary',
    secondary: 'zen-btn-secondary',
    accent: 'zen-btn-accent',
    ghost: 'zen-btn-ghost',
    outline: 'zen-btn-outline',
  }[variant];

  const sizeClass = {
    sm: 'zen-btn-sm',
    md: '',
    lg: 'zen-btn-lg',
  }[size];

  return (
    <button
      className={`zen-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {shortcut && <Kbd>{shortcut}</Kbd>}
    </button>
  );
};

export default Button;

