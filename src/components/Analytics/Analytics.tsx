import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const Analytics: React.FC = () => {
  const projectStatusData = [
    { name: 'Активные', value: 3, color: '#3B82F6' },
    { name: 'На паузе', value: 1, color: '#F59E0B' },
    { name: 'Завершённые', value: 2, color: '#10B981' }
  ];

  const taskCompletionData = [
    { month: 'Янв', completed: 12, planned: 15 },
    { month: 'Фев', completed: 18, planned: 20 },
    { month: 'Мар', completed: 8, planned: 12 },
    { month: 'Апр', completed: 15, planned: 18 },
    { month: 'Май', completed: 22, planned: 25 },
    { month: 'Июн', completed: 28, planned: 30 }
  ];

  const teamPerformanceData = [
    { name: 'Алексей И.', tasks: 15, efficiency: 92 },
    { name: 'Мария П.', tasks: 12, efficiency: 88 },
    { name: 'Дмитрий С.', tasks: 18, efficiency: 85 },
    { name: 'Екатерина К.', tasks: 10, efficiency: 95 }
  ];

  const cycleTimeData = [
    { week: 'Неделя 1', time: 4.2 },
    { week: 'Неделя 2', time: 5.8 },
    { week: 'Неделя 3', time: 3.9 },
    { week: 'Неделя 4', time: 4.7 },
    { week: 'Неделя 5', time: 5.2 },
    { week: 'Неделя 6', time: 4.1 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Аналитика проектов</h2>
        <p className="text-gray-600">Метрики эффективности и производительности команды</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Статус проектов</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {projectStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Выполнение задач</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completed" fill="#3B82F6" name="Выполнено" />
                <Bar dataKey="planned" fill="#E5E7EB" name="Запланировано" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Производительность команды</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="tasks" fill="#14B8A6" name="Задачи" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cycle Time Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Время цикла (дни)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cycleTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#F97316" 
                  fill="#F97316"
                  fillOpacity={0.3}
                  name="Время цикла"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ключевые выводы</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Производительность</h4>
            <p className="text-blue-800 text-sm">Команда показывает стабильную производительность с средним выполнением 85% от плана</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Время цикла</h4>
            <p className="text-green-800 text-sm">Среднее время цикла сократилось на 15% за последний месяц</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">Узкие места</h4>
            <p className="text-orange-800 text-sm">Этап "На проверке" требует оптимизации - средняя задержка 2.3 дня</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;