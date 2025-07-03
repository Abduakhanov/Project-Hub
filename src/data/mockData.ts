import { User, Project, Task, KanbanColumn, DashboardMetrics } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Алексей Иванов',
    email: 'alexey@company.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Мария Петрова',
    email: 'maria@company.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    role: 'manager'
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    email: 'dmitry@company.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    role: 'user'
  },
  {
    id: '4',
    name: 'Екатерина Козлова',
    email: 'ekaterina@company.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    role: 'user'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Цифровая трансформация',
    description: 'Внедрение новой CRM системы',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    endDate: '2024-04-30',
    progress: 65,
    owner: mockUsers[0],
    team: [mockUsers[0], mockUsers[1], mockUsers[2]],
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Мобильное приложение',
    description: 'Разработка корпоративного мобильного приложения',
    status: 'active',
    priority: 'urgent',
    startDate: '2024-02-01',
    endDate: '2024-06-15',
    progress: 40,
    owner: mockUsers[1],
    team: [mockUsers[1], mockUsers[2], mockUsers[3]],
    color: '#14B8A6'
  },
  {
    id: '3',
    title: 'BI Dashboard',
    description: 'Создание аналитических дашбордов',
    status: 'active',
    priority: 'medium',
    startDate: '2024-03-01',
    endDate: '2024-07-30',
    progress: 25,
    owner: mockUsers[2],
    team: [mockUsers[2], mockUsers[3]],
    color: '#F97316'
  },
  {
    id: '4',
    title: 'Автоматизация HR',
    description: 'Внедрение системы управления персоналом',
    status: 'on-hold',
    priority: 'low',
    startDate: '2024-04-01',
    endDate: '2024-08-31',
    progress: 10,
    owner: mockUsers[3],
    team: [mockUsers[3]],
    color: '#8B5CF6'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Анализ требований',
    description: 'Провести анализ бизнес-требований для CRM',
    status: 'done',
    priority: 'high',
    assignee: mockUsers[0],
    dueDate: '2024-02-15',
    projectId: '1',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-02-14T16:30:00Z',
    tags: ['analysis', 'requirements']
  },
  {
    id: '2',
    title: 'Дизайн интерфейса',
    description: 'Создать макеты пользовательского интерфейса',
    status: 'in-progress',
    priority: 'medium',
    assignee: mockUsers[1],
    dueDate: '2024-03-01',
    projectId: '1',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-20T14:15:00Z',
    tags: ['design', 'ui']
  },
  {
    id: '3',
    title: 'Разработка API',
    description: 'Создать REST API для мобильного приложения',
    status: 'review',
    priority: 'urgent',
    assignee: mockUsers[2],
    dueDate: '2024-02-28',
    projectId: '2',
    createdAt: '2024-02-05T11:00:00Z',
    updatedAt: '2024-02-25T09:45:00Z',
    tags: ['development', 'api']
  },
  {
    id: '4',
    title: 'Тестирование',
    description: 'Проведение интеграционных тестов',
    status: 'backlog',
    priority: 'medium',
    assignee: mockUsers[3],
    dueDate: '2024-03-15',
    projectId: '2',
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-02-10T12:00:00Z',
    tags: ['testing', 'qa']
  },
  {
    id: '5',
    title: 'Настройка Superset',
    description: 'Развернуть и настроить Apache Superset',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[2],
    dueDate: '2024-03-20',
    projectId: '3',
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-10T15:30:00Z',
    tags: ['bi', 'setup']
  },
  {
    id: '6',
    title: 'Интеграция с Jira',
    description: 'Настроить импорт данных из Jira через REST API',
    status: 'backlog',
    priority: 'medium',
    assignee: mockUsers[1],
    dueDate: '2024-04-01',
    projectId: '1',
    createdAt: '2024-03-05T13:00:00Z',
    updatedAt: '2024-03-05T13:00:00Z',
    tags: ['integration', 'jira']
  }
];

export const mockKanbanColumns: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: mockTasks.filter(task => task.status === 'backlog'),
    color: '#6B7280'
  },
  {
    id: 'in-progress',
    title: 'В работе',
    tasks: mockTasks.filter(task => task.status === 'in-progress'),
    color: '#3B82F6'
  },
  {
    id: 'review',
    title: 'На проверке',
    tasks: mockTasks.filter(task => task.status === 'review'),
    color: '#F59E0B'
  },
  {
    id: 'done',
    title: 'Готово',
    tasks: mockTasks.filter(task => task.status === 'done'),
    color: '#10B981'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalProjects: 4,
  activeProjects: 3,
  overdueTasks: 2,
  completedThisWeek: 8,
  teamUtilization: 85,
  averageCycleTime: 5.2
};