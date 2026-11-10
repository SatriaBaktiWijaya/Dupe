import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  icon,
  className = '',
  ...props
}) => {
  const variantClass = {
    default: '',
    accent: 'zen-badge-accent',
    success: 'zen-badge-success',
    warning: 'zen-badge-warning',
  }[variant];

  return (
    <span className={`zen-badge ${variantClass} ${className}`.trim()} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;

