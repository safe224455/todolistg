'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MultiSelect } from '@/components/ui/multi-select';
import { Project, Employee } from '../types';
import { employees } from '../data/mock';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Partial<Project>) => void;
  buttonText?: string;
}

export function ProjectForm({ project, onSubmit, buttonText = 'Create Project' }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [selectedTeam, setSelectedTeam] = useState<Employee[]>(project?.team || []);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      team: selectedTeam,
      status: project?.status || 'active',
      tasks: project?.tasks || [],
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <MultiSelect
            options={employees.map(emp => ({
              label: emp.name,
              value: emp.id,
              data: emp
            }))}
            selected={selectedTeam}
            onChange={setSelectedTeam}
            placeholder="Select Team Members"
          />
          <Button onClick={handleSubmit} className="w-full">
            {project ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}