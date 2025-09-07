import React from 'react';
import { InlineNotification } from '@carbon/react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationMessageProps {
  type: NotificationType;
  title: string;
  subtitle?: string;
  onClose?: () => void;
  hideCloseButton?: boolean;
  timeout?: number;
}

export const NotificationMessage: React.FC<NotificationMessageProps> = ({
  type,
  title,
  subtitle,
  onClose,
  hideCloseButton = false,
  timeout,
}) => {
  React.useEffect(() => {
    if (timeout && onClose) {
      const timer = setTimeout(onClose, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout, onClose]);

  return (
    <InlineNotification
      kind={type}
      title={title}
      subtitle={subtitle}
      hideCloseButton={hideCloseButton}
      onCloseButtonClick={onClose}
      style={{ marginBottom: '1rem' }}
    />
  );
};
