import React from 'react';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Kbd: React.FC<KbdProps> = ({ children, className = '', ...props }) => {
  return (
    <kbd className={`zen-kbd ${className}`} {...props}>
      {children}
    </kbd>
  );
};

export default Kbd;

