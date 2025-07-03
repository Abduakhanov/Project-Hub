export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'user';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  progress: number;
  owner: User;
  team: User[];
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  dueDate?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
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
}