import React from 'react';
import { Task } from '../../types';
import { Calendar, User, Tag, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface KanbanCardProps {
  task: Task;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <div className={`bg-white rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${getPriorityColor()}`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-gray-900 text-sm leading-5">{task.title}</h4>
          {isOverdue && (
            <div className="flex items-center space-x-1 text-red-600 text-xs">
              <Clock size={12} />
              <span>Просрочено</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          {task.assignee && (
            <div className="flex items-center space-x-1">
              <User size={12} />
              <span>{task.assignee.name.split(' ')[0]}</span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{format(new Date(task.dueDate), 'dd MMM', { locale: ru })}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Tag size={12} className={`${
              task.priority === 'urgent' ? 'text-red-600' :
              task.priority === 'high' ? 'text-orange-600' :
              task.priority === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;