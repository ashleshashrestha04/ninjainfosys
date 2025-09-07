import React from 'react';
import { Tag } from '@carbon/react';

type StatusType = 'pending' | 'in-progress' | 'resolved' | 'closed' | 'new' | 'assigned';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const statusConfig: Record<StatusType, { label: string; type: any }> = {
  pending: { label: 'Pending', type: 'yellow' },
  'in-progress': { label: 'In Progress', type: 'blue' },
  resolved: { label: 'Resolved', type: 'green' },
  closed: { label: 'Closed', type: 'gray' },
  new: { label: 'New', type: 'purple' },
  assigned: { label: 'Assigned', type: 'cyan' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status] || { label: status, type: 'gray' };

  return (
    <Tag type={config.type} size={size}>
      {config.label}
    </Tag>
  );
};
