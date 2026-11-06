/**
 * CodeNomad Phase 1 Data Models and Types
 * Based on CodeNomad PRD Specification (Section 7.5)
 */

export type WorkspaceStatus =
  | 'not_started'
  | 'starting'
  | 'running'
  | 'stopped'
  | 'error';

export type AIProvider = 'claude' | 'gemini';

export interface Project {
  id: string;
  name: string;
  description?: string;
  repositoryFullName?: string;
  primaryLanguage?: string;
  technologies: string[];
  branch: string;
  lastActivityAt?: string;
  workspaceStatus: WorkspaceStatus;
  previewUrl?: string;
  serverPort?: number;
}

export interface ActivityItem {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  createdAt: string;
  type?: 'git' | 'workspace' | 'agent' | 'build';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  provider?: AIProvider;
  toolCall?: {
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    detail?: string;
  };
}

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  children?: FileNode[];
  contentSample?: string;
  language?: string;
}

export interface TerminalLog {
  id: string;
  text: string;
  type: 'info' | 'output' | 'error' | 'command' | 'system';
  timestamp: string;
}
