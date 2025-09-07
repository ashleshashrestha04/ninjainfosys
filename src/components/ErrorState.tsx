import React from 'react';
import { Tile } from '@carbon/react';
import { ErrorFilled } from '@carbon/icons-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showIcon?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please try again.',
  onRetry,
  showIcon = true,
}) => {
  return (
    <Tile
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {showIcon && (
        <ErrorFilled
          size={48}
          style={{ color: '#da1e28', marginBottom: '1rem' }}
        />
      )}
      <h3 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>
        {title}
      </h3>
      <p style={{ marginBottom: '1rem', color: 'var(--foreground)', opacity: 0.7 }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0f62fe',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      )}
    </Tile>
  );
};
