import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bento?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  bento = false,
  className = '',
  ...props
}) => {
  const baseClass = bento ? 'zen-bento-card' : 'zen-card';
  return (
    <div className={`${baseClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;

