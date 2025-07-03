import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import MetricsCard from './MetricsCard';
import ProjectCard from './ProjectCard';
import TaskList from './TaskList';
import { 
  FolderOpen, 
  Play, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Clock 
} from 'lucide-react';
import { ProjectStatus, TaskStatus } from '../../types';

const Dashboard: React.FC = () => {
  const { projects, tasks, timeEntries } = useApp();

  const metrics = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === ProjectStatus.Active);
    const overdueTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      return new Date(task.dueDate) < new Date() && task.status !== TaskStatus.Done;
    });
    
    const completedThisWeek = tasks.filter(task => {
      if (task.status !== TaskStatus.Done) return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(task.updatedAt) >= weekAgo;
    });

    const totalTimeLogged = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const uniqueDays = new Set(timeEntries.map(e => e.date)).size;
    const averageCycleTime = uniqueDays > 0 ? totalTimeLogged / uniqueDays : 0;

    return {
      totalProjects: projects.length,
      activeProjects: activeProjects.length,
      overdueTasks: overdueTasks.length,
      completedThisWeek: completedThisWeek.length,
      teamUtilization: 85, // Mock value
      averageCycleTime: averageCycleTime,
      totalTimeLogged
    };
  }, [projects, tasks, timeEntries]);

  const recentTasks = useMemo(() => {
    return tasks
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }, [tasks]);

  const activeProjects = useMemo(() => {
    return projects.filter(p => p.status === ProjectStatus.Active);
  }, [projects]);

  const overdueTasks = useMemo(() => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      return new Date(task.dueDate) < new Date() && task.status !== TaskStatus.Done;
    });
  }, [tasks]);

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricsCard
          title="Всего проектов"
          value={metrics.totalProjects}
          icon={FolderOpen}
          color="bg-blue-500"
        />
        <MetricsCard
          title="Активных проектов"
          value={metrics.activeProjects}
          change="+12%"
          changeType="positive"
          icon={Play}
          color="bg-green-500"
        />
        <MetricsCard
          title="Просроченных задач"
          value={metrics.overdueTasks}
          change="-8%"
          changeType="positive"
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <MetricsCard
          title="Выполнено за неделю"
          value={metrics.completedThisWeek}
          change="+23%"
          changeType="positive"
          icon={CheckCircle}
          color="bg-teal-500"
        />
        <MetricsCard
          title="Загрузка команды"
          value={`${metrics.teamUtilization}%`}
          change="+5%"
          changeType="positive"
          icon={Users}
          color="bg-purple-500"
        />
        <MetricsCard
          title="Среднее время цикла"
          value={`${metrics.averageCycleTime.toFixed(1)}ч`}
          change="-0.8ч"
          changeType="positive"
          icon={Clock}
          color="bg-orange-500"
        />
      </div>

      {/* Projects and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Активные проекты</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Показать все
            </button>
          </div>
          <div className="space-y-4">
            {activeProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Нет активных проектов</p>
              </div>
            ) : (
              activeProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Недавние задачи</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Показать все
            </button>
          </div>
          <TaskList tasks={recentTasks} />
        </div>
      </div>

      {/* Alerts */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="text-red-600" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Внимание: просроченные задачи</h3>
              <p className="text-red-700 text-sm">
                {overdueTasks.length} задач просрочены. Требуется немедленное внимание.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;