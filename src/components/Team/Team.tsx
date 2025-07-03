import React from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { Mail, Phone, Calendar, Award, BarChart3, Users } from 'lucide-react';

const Team: React.FC = () => {
  const { users } = useApp();

  if (!users.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет участников</h3>
        <p className="text-gray-600">Добавьте участников команды для управления проектами</p>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'manager': return 'Менеджер';
      case 'user': return 'Сотрудник';
      default: return role;
    }
  };

  const getPerformanceData = (userId: string) => {
    // Mock performance data
    const performanceMap: { [key: string]: { tasks: number; efficiency: number; projects: number } } = {
      '1': { tasks: 15, efficiency: 92, projects: 3 },
      '2': { tasks: 12, efficiency: 88, projects: 2 },
      '3': { tasks: 18, efficiency: 85, projects: 4 },
      '4': { tasks: 10, efficiency: 95, projects: 1 }
    };
    return performanceMap[userId] || { tasks: 0, efficiency: 0, projects: 0 };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Команда</h2>
        <p className="text-gray-600">Управление участниками проектов и их производительностью</p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => {
          const performance = getPerformanceData(user.id);
          
          return (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600 text-sm mb-3">
                    <Mail size={14} />
                    <span>{user.email}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{performance.tasks}</div>
                      <div className="text-xs text-gray-500">Задач</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{performance.efficiency}%</div>
                      <div className="text-xs text-gray-500">Эффективность</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{performance.projects}</div>
                      <div className="text-xs text-gray-500">Проектов</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>Активен</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <BarChart3 size={16} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Award size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика команды</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{users.length}</div>
            <div className="text-sm text-gray-600">Участников</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
            <div className="text-sm text-gray-600">Средняя эффективность</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">55</div>
            <div className="text-sm text-gray-600">Общие задачи</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10</div>
            <div className="text-sm text-gray-600">Активных проектов</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Последняя активность</h3>
        
        <div className="space-y-4">
          {users.slice(0, 3).map((user, index) => (
            <div key={user.id} className="flex items-center space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{user.name}</span> {
                    index === 0 ? 'завершил задачу "Анализ требований"' :
                    index === 1 ? 'создала новый проект' :
                    'обновил статус задачи'
                  }
                </p>
                <p className="text-xs text-gray-500">{2 + index * 2} часа назад</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;