'use client';

import { useState } from 'react';
import { useAuth } from './hooks/use-auth';
import { AuthForm } from './components/auth-form';
import { ProjectCard } from './components/project-card';
import { ProjectDetail } from './components/project-detail';
import { ProjectForm } from './components/project-form';
import { Project } from './types';
import { Button } from '@/components/ui/button';
import { initialProjects } from './data/mock';

export default function Home() {
  const { user, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tasks: [],
      ...projectData,
    } as Project;
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (projectId: string, projectData: Partial<Project>) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, ...projectData } : p
    ));
    setSelectedProject(prev => prev?.id === projectId ? { ...prev, ...projectData } : prev);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setSelectedProject(null);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Project Management</h1>
        <div className="flex gap-4">
          <ProjectForm onSubmit={handleCreateProject} />
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
        
        <div>
          {selectedProject ? (
            <ProjectDetail 
              project={selectedProject}
              onUpdate={(data) => handleUpdateProject(selectedProject.id, data)}
              onDelete={() => handleDeleteProject(selectedProject.id)}
            />
          ) : (
            <div className="h-[calc(100vh-2rem)] flex items-center justify-center text-muted-foreground">
              Select a project to view details
            </div>
          )}
        </div>
      </div>
    </main>
  );
}