import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '../../context/AppContext';
import { CreateProjectForm, ProjectStatus, Priority } from '../../types';
import Modal from '../ui/Modal';

interface AddProjectModalProps {
  onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose }) => {
  const { addProject, users } = useApp();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateProjectForm>({
    defaultValues: {
      status: ProjectStatus.Active,
      priority: Priority.Medium,
      color: '#3B82F6',
      teamIds: []
    }
  });

  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);

  const onSubmit = (data: CreateProjectForm) => {
    addProject({
      ...data,
      teamIds: selectedTeamIds
    });
    onClose();
  };

  const toggleTeamMember = (userId: string) => {
    setSelectedTeamIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Modal title="Новый проект" onClose={onClose} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название проекта *
            </label>
            <input
              {...register('title', { required: 'Название обязательно' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите название проекта"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Владелец проекта *
            </label>
            <select
              {...register('ownerId', { required: 'Выберите владельца' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Выберите владельца</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.ownerId && (
              <p className="mt-1 text-sm text-red-600">{errors.ownerId.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Описание проекта"
          />
        </div>

        {/* Статус и приоритет */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статус
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={ProjectStatus.Active}>Активный</option>
              <option value={ProjectStatus.OnHold}>На паузе</option>
              <option value={ProjectStatus.Completed}>Завершен</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Приоритет
            </label>
            <select
              {...register('priority')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={Priority.Low}>Низкий</option>
              <option value={Priority.Medium}>Средний</option>
              <option value={Priority.High}>Высокий</option>
              <option value={Priority.Urgent}>Срочный</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цвет
            </label>
            <input
              {...register('color')}
              type="color"
              className="w-full h-10 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Даты */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата начала *
            </label>
            <input
              {...register('startDate', { required: 'Дата начала обязательна' })}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата окончания *
            </label>
            <input
              {...register('endDate', { required: 'Дата окончания обязательна' })}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Оценка времени (часы)
          </label>
          <input
            {...register('estimateHours', { valueAsNumber: true, min: 0 })}
            type="number"
            min="0"
            step="0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Введите оценку в часах"
          />
        </div>

        {/* Команда */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Команда проекта
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {users.map(user => (
              <label key={user.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTeamIds.includes(user.id)}
                  onChange={() => toggleTeamMember(user.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            Создать проект
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectModal;