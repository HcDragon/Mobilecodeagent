import React, { createContext, useContext, useState, useMemo } from 'react';
import { Project, WorkspaceStatus, AIProvider } from '../types';
import { MOCK_PROJECTS } from '../data/mock/projects';

interface WorkspaceContextType {
  projects: Project[];
  selectedProject: Project | null;
  selectProject: (projectId: string) => void;
  updateWorkspaceStatus: (projectId: string, newStatus: WorkspaceStatus) => void;
  selectedProvider: AIProvider;
  setSelectedProvider: (provider: AIProvider) => void;
  isSimulatingCloud: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('claude');
  const [isSimulatingCloud, setIsSimulatingCloud] = useState<boolean>(false);

  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const updateWorkspaceStatus = (projectId: string, newStatus: WorkspaceStatus) => {
    setIsSimulatingCloud(true);
    // Simulate transition for realistic demo feel if moving to running
    if (newStatus === 'running') {
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, workspaceStatus: 'starting' } : p))
      );
      setTimeout(() => {
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, workspaceStatus: 'running' } : p))
        );
        setIsSimulatingCloud(false);
      }, 1200);
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, workspaceStatus: newStatus } : p))
      );
      setIsSimulatingCloud(false);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        projects,
        selectedProject,
        selectProject,
        updateWorkspaceStatus,
        selectedProvider,
        setSelectedProvider,
        isSimulatingCloud,
      }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

