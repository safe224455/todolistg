export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  team: Employee[];
  tasks: Task[];
  status: 'active' | 'completed';
  createdAt: string;
}