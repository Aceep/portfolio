import React from 'react';
import '../styles/components/Button.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  className?: string;
}

/**
 * Reusable button component with primary and secondary variants
 */
export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  href,
  download,
  onClick,
  className = '',
}) => {
  const baseClass = `btn btn-${variant}`;
  const classes = `${baseClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} download={download}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
