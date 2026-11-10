import React from 'react';

interface KbdBadgeProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const KbdBadge: React.FC<KbdBadgeProps> = ({ children, className = '', title }) => {
  return (
    <kbd
      title={title}
      className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 font-mono text-[11px] font-semibold text-[var(--text-muted)] bg-[var(--element-background)] border border-[var(--border)] rounded shadow-[0_1px_0_rgba(0,0,0,0.2)] select-none leading-none ${className}`}
    >
      {children}
    </kbd>
  );
};

export default KbdBadge;

