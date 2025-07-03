// Enums для типобезопасности
export enum ProjectStatus {
  Active = 'active',
  OnHold = 'on-hold',
  Completed = 'completed',
}

export enum TaskStatus {
  Backlog = 'backlog',
  InProgress = 'in-progress',
  Review = 'review',
  Done = 'done',
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: string;
  endDate: string;
  progress: number;
  owner: User;
  team: User[];
  color: string;
  estimateHours?: number;
  actualHours?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: User;
  dueDate?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  estimateHours?: number;
  actualHours?: number;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  date: string; // ISO 8601
  hours: number;
  comment?: string;
  createdAt: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  overdueTasks: number;
  completedThisWeek: number;
  teamUtilization: number;
  averageCycleTime: number;
  totalTimeLogged: number;
}

// Формы для создания новых сущностей
export interface CreateProjectForm {
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: string;
  endDate: string;
  ownerId: string;
  teamIds: string[];
  color: string;
  estimateHours?: number;
}

export interface CreateTaskForm {
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId?: string;
  dueDate?: string;
  projectId: string;
  tags: string[];
  estimateHours?: number;
}

export interface CreateTimeEntryForm {
  taskId: string;
  userId: string;
  date: string;
  hours: number;
  comment?: string;
}