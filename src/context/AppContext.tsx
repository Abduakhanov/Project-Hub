import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  Project, 
  Task, 
  TimeEntry, 
  User, 
  CreateProjectForm, 
  CreateTaskForm, 
  CreateTimeEntryForm,
  ProjectStatus,
  TaskStatus,
  Priority,
  UserRole
} from '../types';

interface AppState {
  projects: Project[];
  tasks: Task[];
  timeEntries: TimeEntry[];
  users: User[];
  currentUser: User | null;
}

interface AppContextType extends AppState {
  // CRUD операции
  addProject: (project: CreateProjectForm) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addTask: (task: CreateTaskForm) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  addTimeEntry: (entry: CreateTimeEntryForm) => void;
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void;
  deleteTimeEntry: (id: string) => void;
  
  // Утилиты
  exportData: () => void;
  importData: (data: string) => void;
  clearAllData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const LS_KEY = 'project-hub-data';

// Генерация ID
const generateId = () => crypto.randomUUID();

// Начальные данные
const getInitialData = (): AppState => {
  const stored = localStorage.getItem(LS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
  }
  
  // Дефолтные пользователи
  const defaultUsers: User[] = [
    {
      id: '1',
      name: 'Алексей Иванов',
      email: 'alexey@company.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: UserRole.Admin
    },
    {
      id: '2',
      name: 'Мария Петрова',
      email: 'maria@company.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: UserRole.Manager
    },
    {
      id: '3',
      name: 'Дмитрий Сидоров',
      email: 'dmitry@company.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: UserRole.User
    }
  ];

  return {
    projects: [],
    tasks: [],
    timeEntries: [],
    users: defaultUsers,
    currentUser: defaultUsers[0]
  };
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(getInitialData);

  // Сохранение в LocalStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  // CRUD для проектов
  const addProject = (projectForm: CreateProjectForm) => {
    const owner = state.users.find(u => u.id === projectForm.ownerId);
    const team = state.users.filter(u => projectForm.teamIds.includes(u.id));
    
    if (!owner) return;

    const newProject: Project = {
      ...projectForm,
      id: generateId(),
      progress: 0,
      owner,
      team,
      actualHours: 0
    };

    setState(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
      tasks: prev.tasks.filter(t => t.projectId !== id)
    }));
  };

  // CRUD для задач
  const addTask = (taskForm: CreateTaskForm) => {
    const assignee = taskForm.assigneeId ? state.users.find(u => u.id === taskForm.assigneeId) : undefined;
    
    const newTask: Task = {
      ...taskForm,
      id: generateId(),
      assignee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      actualHours: 0
    };

    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { 
        ...t, 
        ...updates, 
        updatedAt: new Date().toISOString() 
      } : t)
    }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
      timeEntries: prev.timeEntries.filter(e => e.taskId !== id)
    }));
  };

  // CRUD для учета времени
  const addTimeEntry = (entryForm: CreateTimeEntryForm) => {
    const newEntry: TimeEntry = {
      ...entryForm,
      id: generateId(),
      createdAt: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      timeEntries: [...prev.timeEntries, newEntry]
    }));

    // Обновляем actualHours в задаче
    const taskEntries = [...state.timeEntries.filter(e => e.taskId === entryForm.taskId), newEntry];
    const totalHours = taskEntries.reduce((sum, e) => sum + e.hours, 0);
    updateTask(entryForm.taskId, { actualHours: totalHours });
  };

  const updateTimeEntry = (id: string, updates: Partial<TimeEntry>) => {
    setState(prev => ({
      ...prev,
      timeEntries: prev.timeEntries.map(e => e.id === id ? { ...e, ...updates } : e)
    }));
  };

  const deleteTimeEntry = (id: string) => {
    const entry = state.timeEntries.find(e => e.id === id);
    if (!entry) return;

    setState(prev => ({
      ...prev,
      timeEntries: prev.timeEntries.filter(e => e.id !== id)
    }));

    // Пересчитываем actualHours для задачи
    const remainingEntries = state.timeEntries.filter(e => e.taskId === entry.taskId && e.id !== id);
    const totalHours = remainingEntries.reduce((sum, e) => sum + e.hours, 0);
    updateTask(entry.taskId, { actualHours: totalHours });
  };

  // Утилиты
  const exportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project-hub-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (dataStr: string) => {
    try {
      const importedData = JSON.parse(dataStr);
      setState(importedData);
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Ошибка импорта данных. Проверьте формат файла.');
    }
  };

  const clearAllData = () => {
    if (confirm('Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.')) {
      setState(getInitialData());
    }
  };

  const contextValue: AppContextType = {
    ...state,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addTimeEntry,
    updateTimeEntry,
    deleteTimeEntry,
    exportData,
    importData,
    clearAllData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};