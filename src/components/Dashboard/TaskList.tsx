import React from 'react';
import { Task } from '../../types';
import { Clock, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'backlog': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div key={task.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {task.assignee && (
                <div className="flex items-center space-x-1">
                  <User size={12} />
                  <span>{task.assignee.name}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{format(new Date(task.dueDate), 'dd.MM', { locale: ru })}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Tag size={12} className={getPriorityColor(task.priority)} />
              <span className={getPriorityColor(task.priority)}>{task.priority}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;