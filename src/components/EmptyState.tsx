import React from 'react';
import { Tile } from '@carbon/react';
import { DocumentBlank } from '@carbon/icons-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data available',
  message = 'There are no items to display at the moment.',
  actionLabel,
  onAction,
  icon,
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
      {icon || (
        <DocumentBlank
          size={48}
          style={{ color: 'var(--foreground)', opacity: 0.4, marginBottom: '1rem' }}
        />
      )}
      <h3 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>
        {title}
      </h3>
      <p style={{ marginBottom: '1rem', color: 'var(--foreground)', opacity: 0.7 }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0f62fe',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {actionLabel}
        </button>
      )}
    </Tile>
  );
};
