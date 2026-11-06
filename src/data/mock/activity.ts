import { ActivityItem } from '../../types';

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    projectId: 'proj-1',
    title: 'Workspace resumed',
    description: 'Cloud environment resumed on AWS Fargate node us-east-1',
    createdAt: '2026-11-06T23:45:00Z',
    type: 'workspace',
  },
  {
    id: 'act-2',
    projectId: 'proj-1',
    title: 'Agent applied patch',
    description: 'Updated Hero section responsive styles in src/components/Hero.tsx',
    createdAt: '2026-11-06T23:40:00Z',
    type: 'agent',
  },
  {
    id: 'act-3',
    projectId: 'proj-1',
    title: 'Commit pushed to origin/main',
    description: 'feat: add interactive project showcase carousel (abc982e)',
    createdAt: '2026-11-06T22:15:00Z',
    type: 'git',
  },
  {
    id: 'act-4',
    projectId: 'proj-2',
    title: 'Workspace paused',
    description: 'Automatically suspended after 30m inactivity. Snapshot saved.',
    createdAt: '2026-11-06T18:15:00Z',
    type: 'workspace',
  },
  {
    id: 'act-5',
    projectId: 'proj-3',
    title: 'Development server started',
    description: 'Uvicorn running on http://127.0.0.1:8000 with hot-reload',
    createdAt: '2026-11-05T14:30:00Z',
    type: 'build',
  },
  {
    id: 'act-6',
    projectId: 'proj-5',
    title: 'Container failed to initialize',
    description: 'Out of memory while executing terraform plan in container',
    createdAt: '2026-11-02T11:05:00Z',
    type: 'workspace',
  },
];
