import { TerminalLog } from '../../types';

export const MOCK_TERMINAL_LOGS: TerminalLog[] = [
  {
    id: 'term-1',
    text: '[codenomad-env] Container runtime: AWS Fargate / Linux x86_64',
    type: 'system',
    timestamp: '23:44:50',
  },
  {
    id: 'term-2',
    text: '[codenomad-env] Attached to workspace: developer/portfolio-web (branch: main)',
    type: 'system',
    timestamp: '23:44:52',
  },
  {
    id: 'term-3',
    text: '$ git status',
    type: 'command',
    timestamp: '23:45:01',
  },
  {
    id: 'term-4',
    text: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  modified:   src/components/Hero.tsx\n\nno changes added to commit (use "git add" to track)',
    type: 'output',
    timestamp: '23:45:02',
  },
  {
    id: 'term-5',
    text: '$ npm run dev',
    type: 'command',
    timestamp: '23:45:10',
  },
  {
    id: 'term-6',
    text: '  VITE v5.4.2  ready in 182 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help',
    type: 'info',
    timestamp: '23:45:11',
  },
];

