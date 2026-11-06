import React from 'react';
import { Badge } from '../common/Badge';
import { WorkspaceStatus } from '../../types';

interface WorkspaceStatusBadgeProps {
  status: WorkspaceStatus;
  size?: 'sm' | 'md';
}

const statusLabels: Record<WorkspaceStatus, string> = {
  running: 'Running',
  starting: 'Starting...',
  stopped: 'Stopped',
  not_started: 'Not Started',
  error: 'Error',
};

export const WorkspaceStatusBadge: React.FC<WorkspaceStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  return (
    <Badge
      label={statusLabels[status] || status}
      variant="status"
      status={status}
      size={size}
    />
  );
};
