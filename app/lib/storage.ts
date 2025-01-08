import fs from 'fs';
import path from 'path';
import { Project, Employee } from '../types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Initialize data directory and files if they don't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify([]));
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export function getProjects(): Project[] {
  const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveProject(project: Project) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  return project;
}

export function deleteProject(id: string) {
  const projects = getProjects().filter(p => p.id !== id);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

export function getUsers() {
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveUser(user: any) {
  const users = getUsers();
  const index = users.findIndex((u: any) => u.email === user.email);
  
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  return user;
}