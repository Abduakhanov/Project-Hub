import React from 'react';
import { mockDashboardMetrics, mockProjects, mockTasks } from '../../data/mockData';
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

const Dashboard: React.FC = () => {
  const overdueTasks = mockTasks.filter(task => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && task.status !== 'done';
  });

  const recentTasks = mockTasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricsCard
          title="Всего проектов"
          value={mockDashboardMetrics.totalProjects}
          icon={FolderOpen}
          color="bg-blue-500"
        />
        <MetricsCard
          title="Активных проектов"
          value={mockDashboardMetrics.activeProjects}
          change="+12%"
          changeType="positive"
          icon={Play}
          color="bg-green-500"
        />
        <MetricsCard
          title="Просроченных задач"
          value={overdueTasks.length}
          change="-8%"
          changeType="positive"
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <MetricsCard
          title="Выполнено за неделю"
          value={mockDashboardMetrics.completedThisWeek}
          change="+23%"
          changeType="positive"
          icon={CheckCircle}
          color="bg-teal-500"
        />
        <MetricsCard
          title="Загрузка команды"
          value={`${mockDashboardMetrics.teamUtilization}%`}
          change="+5%"
          changeType="positive"
          icon={Users}
          color="bg-purple-500"
        />
        <MetricsCard
          title="Среднее время цикла"
          value={`${mockDashboardMetrics.averageCycleTime}д`}
          change="-0.8д"
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
            {mockProjects.filter(p => p.status === 'active').map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
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