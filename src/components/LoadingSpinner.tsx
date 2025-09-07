import React from 'react';
import { Loading } from '@carbon/react';

interface LoadingSpinnerProps {
  description?: string;
  withOverlay?: boolean;
  small?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  description = 'Loading...',
  withOverlay = false,
  small = false,
}) => {
  const content = (
    <Loading
      description={description}
      small={small}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: small ? '50px' : '200px',
      }}
    />
  );

  if (withOverlay) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};
