import React from 'react';
import { Modal, Button } from '@carbon/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}) => {
  return (
    <Modal
      open={isOpen}
      modalHeading={title}
      primaryButtonText={confirmLabel}
      secondaryButtonText={cancelLabel}
      onRequestSubmit={onConfirm}
      onRequestClose={onCancel}
      danger={danger}
    >
      <p>{message}</p>
    </Modal>
  );
};
