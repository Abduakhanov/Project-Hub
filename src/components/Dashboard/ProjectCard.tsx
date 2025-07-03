import React from 'react';
import { Project } from '../../types';
import { Calendar, Users, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getPriorityColor = () => {
    switch (project.priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = () => {
    if (project.progress >= 80) return 'bg-green-500';
    if (project.progress >= 60) return 'bg-blue-500';
    if (project.progress >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}>
          {project.priority}
        </span>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Прогресс</span>
          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getProgressColor()}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>{format(new Date(project.endDate), 'dd.MM.yyyy', { locale: ru })}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={14} />
          <span>{project.team.length}</span>
        </div>
        <div className="flex items-center space-x-1">
          <BarChart3 size={14} />
          <span>{project.status}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;