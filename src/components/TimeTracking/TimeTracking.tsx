import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Calendar, User, Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import AddTimeEntryModal from '../modals/AddTimeEntryModal';

const TimeTracking: React.FC = () => {
  const { timeEntries, tasks, users, deleteTimeEntry } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredEntries = useMemo(() => {
    return timeEntries
      .filter(entry => entry.date === selectedDate)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [timeEntries, selectedDate]);

  const totalHours = useMemo(() => {
    return filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);
  }, [filteredEntries]);

  const getTaskTitle = (taskId: string) => {
    return tasks.find(task => task.id === taskId)?.title || 'Неизвестная задача';
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Неизвестный пользователь';
  };

  const handleDeleteEntry = (entryId: string) => {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
      deleteTimeEntry(entryId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Учет времени</h2>
            <p className="text-gray-600">Отслеживание времени по задачам</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Добавить запись</span>
          </button>
        </div>

        {/* Date filter and stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <Clock size={20} className="text-blue-600" />
            <span>Всего: {totalHours.toFixed(1)} ч</span>
          </div>
        </div>
      </div>

      {/* Time entries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center">
            <Clock size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет записей за выбранную дату
            </h3>
            <p className="text-gray-600 mb-4">
              Добавьте первую запись времени для отслеживания работы
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Добавить запись
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredEntries.map(entry => (
              <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">
                        {getTaskTitle(entry.taskId)}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {entry.hours}ч
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{getUserName(entry.userId)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{format(new Date(entry.date), 'dd MMMM yyyy', { locale: ru })}</span>
                      </div>
                    </div>
                    
                    {entry.comment && (
                      <p className="text-gray-700 text-sm">{entry.comment}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Сводка за неделю</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {timeEntries.reduce((sum, entry) => sum + entry.hours, 0).toFixed(1)}
            </div>
            <div className="text-sm text-blue-800">Всего часов</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {new Set(timeEntries.map(e => e.taskId)).size}
            </div>
            <div className="text-sm text-green-800">Задач</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {new Set(timeEntries.map(e => e.date)).size}
            </div>
            <div className="text-sm text-orange-800">Дней</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {timeEntries.length > 0 ? (timeEntries.reduce((sum, entry) => sum + entry.hours, 0) / new Set(timeEntries.map(e => e.date)).size).toFixed(1) : '0.0'}
            </div>
            <div className="text-sm text-purple-800">Среднее в день</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTimeEntryModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default TimeTracking;