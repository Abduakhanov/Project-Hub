import React from 'react';
import { mockProjects } from '../../data/mockData';
import { Project } from '../../types';
import { Calendar, Users, BarChart3 } from 'lucide-react';
import { format, differenceInDays, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const GanttChart: React.FC = () => {
  const projects = mockProjects;
  
  // Calculate date range for the chart
  const allDates = projects.flatMap(p => [parseISO(p.startDate), parseISO(p.endDate)]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  const totalDays = differenceInDays(maxDate, minDate);
  const today = new Date();
  
  const getProjectBarStyle = (project: Project) => {
    const startDate = parseISO(project.startDate);
    const endDate = parseISO(project.endDate);
    const projectDays = differenceInDays(endDate, startDate);
    const offsetDays = differenceInDays(startDate, minDate);
    
    const left = (offsetDays / totalDays) * 100;
    const width = (projectDays / totalDays) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const generateTimelineMonths = () => {
    const months = [];
    const current = new Date(minDate);
    
    while (current <= maxDate) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    
    return months;
  };

  const timelineMonths = generateTimelineMonths();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Диаграмма Ганта</h2>
        <p className="text-gray-600">Временные рамки проектов и их прогресс</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Timeline Header */}
          <div className="flex border-b border-gray-200 pb-4 mb-4">
            <div className="w-80 flex-shrink-0">
              <h3 className="font-semibold text-gray-900">Проекты</h3>
            </div>
            <div className="flex-1 relative">
              <div className="flex justify-between">
                {timelineMonths.map((month, index) => (
                  <div key={index} className="text-sm text-gray-600 font-medium">
                    {format(month, 'MMM yyyy', { locale: ru })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Projects */}
          <div className="space-y-6">
            {projects.map(project => (
              <div key={project.id} className="flex items-center">
                <div className="w-80 flex-shrink-0 pr-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{project.team.length} участников</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart3 size={12} />
                        <span>{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 relative h-12 bg-gray-100 rounded-lg">
                  {/* Progress Bar */}
                  <div 
                    className={`absolute top-2 h-8 rounded-lg ${getStatusColor(project.status)} opacity-80`}
                    style={getProjectBarStyle(project)}
                  >
                    <div 
                      className="h-full bg-white bg-opacity-30 rounded-lg"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  
                  {/* Project Info */}
                  <div 
                    className="absolute top-2 h-8 flex items-center px-3 text-white text-xs font-medium"
                    style={getProjectBarStyle(project)}
                  >
                    <span className="truncate">{project.title}</span>
                  </div>
                  
                  {/* Today Indicator */}
                  {(() => {
                    const todayOffset = differenceInDays(today, minDate);
                    const todayPosition = (todayOffset / totalDays) * 100;
                    
                    return (
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                        style={{ left: `${todayPosition}%` }}
                      />
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Активный</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>На паузе</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Завершен</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-0.5 h-4 bg-red-500"></div>
          <span>Сегодня</span>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;