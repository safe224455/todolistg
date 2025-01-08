'use client';

import { Project, Task } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Clock, PlayCircle, Trash2 } from 'lucide-react';
import { TaskForm } from './task-form';
import { ProjectForm } from './project-form';

interface ProjectDetailProps {
  project: Project;
  onUpdate: (project: Partial<Project>) => void;
  onDelete: () => void;
}

export function ProjectDetail({ project, onUpdate, onDelete }: ProjectDetailProps) {
  const handleCreateTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...taskData,
    } as Task;
    onUpdate({
      tasks: [...project.tasks, newTask]
    });
  };

  const handleUpdateTask = (taskId: string, taskData: Partial<Task>) => {
    onUpdate({
      tasks: project.tasks.map(t => 
        t.id === taskId ? { ...t, ...taskData } : t
      )
    });
  };

  const handleDeleteTask = (taskId: string) => {
    onUpdate({
      tasks: project.tasks.filter(t => t.id !== taskId)
    });
  };

  const getTaskStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAssignedEmployee = (taskId: string) => {
    return project.team.find(emp => emp.id === taskId);
  };

  return (
    <Card className="h-[calc(100vh-2rem)]">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <div>
            <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
            <CardDescription className="text-base">{project.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <ProjectForm 
              project={project}
              onSubmit={onUpdate}
              buttonText="Edit Project"
            />
            <Button variant="destructive" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">Team Members:</span>
            <div className="flex -space-x-2">
              {project.team.map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <TaskForm team={project.team} onSubmit={handleCreateTask} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getTaskStatusIcon(task.status)}
                            <h4 className="font-semibold">{task.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={getAssignedEmployee(task.assignedTo)?.avatar}
                              alt={getAssignedEmployee(task.assignedTo)?.name}
                            />
                            <AvatarFallback>
                              {getAssignedEmployee(task.assignedTo)?.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <TaskForm
                            task={task}
                            team={project.team}
                            onSubmit={(data) => handleUpdateTask(task.id, data)}
                            buttonText="Edit"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}