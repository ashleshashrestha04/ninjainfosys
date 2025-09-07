import React from 'react';
import { Button } from '@carbon/react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Button
      kind={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Button>
  );
};
