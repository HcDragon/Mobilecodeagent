import { ChatMessage } from '../../types';

export const MOCK_AGENT_CONVERSATIONS: Record<string, ChatMessage[]> = {
  'proj-1': [
    {
      id: 'msg-1',
      role: 'user',
      content: 'Can you inspect src/components/Hero.tsx and make the CTA button full width on small screens?',
      createdAt: '2026-11-06T23:38:00Z',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      provider: 'claude',
      content: 'I will inspect `src/components/Hero.tsx` and update the CTA button container classes to `w-full sm:w-auto`.',
      createdAt: '2026-11-06T23:38:30Z',
      toolCall: {
        name: 'read_file(src/components/Hero.tsx)',
        status: 'completed',
        detail: 'Read 84 lines of component code',
      },
    },
    {
      id: 'msg-3',
      role: 'assistant',
      provider: 'claude',
      content: 'I have modified `src/components/Hero.tsx`. The CTA now expands to full width on viewports below 640px. The preview hot-reloaded automatically.',
      createdAt: '2026-11-06T23:39:10Z',
      toolCall: {
        name: 'apply_patch(src/components/Hero.tsx)',
        status: 'completed',
        detail: '+4 lines / -2 lines',
      },
    },
  ],
  default: [
    {
      id: 'demo-msg-1',
      role: 'assistant',
      provider: 'claude',
      content: 'Hello! I am your CodeNomad AI development assistant. When connected in Phase 5, I can inspect your project repository, run terminal commands, and apply code patches in your isolated cloud container.',
      createdAt: '2026-11-06T12:00:00Z',
    },
  ],
};

