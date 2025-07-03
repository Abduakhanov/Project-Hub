import React from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '../../context/AppContext';
import { CreateTimeEntryForm } from '../../types';
import Modal from '../ui/Modal';

interface AddTimeEntryModalProps {
  onClose: () => void;
  defaultTaskId?: string;
}

const AddTimeEntryModal: React.FC<AddTimeEntryModalProps> = ({ onClose, defaultTaskId }) => {
  const { addTimeEntry, tasks, users, currentUser } = useApp();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTimeEntryForm>({
    defaultValues: {
      taskId: defaultTaskId || '',
      userId: currentUser?.id || '',
      date: new Date().toISOString().split('T')[0],
      hours: 1
    }
  });

  const onSubmit = (data: CreateTimeEntryForm) => {
    addTimeEntry(data);
    onClose();
  };

  return (
    <Modal title="Учет времени" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Задача *
            </label>
            <select
              {...register('taskId', { required: 'Выберите задачу' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Выберите задачу</option>
              {tasks.map(task => (
                <option key={task.id} value={task.id}>{task.title}</option>
              ))}
            </select>
            {errors.taskId && (
              <p className="mt-1 text-sm text-red-600">{errors.taskId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сотрудник *
            </label>
            <select
              {...register('userId', { required: 'Выберите сотрудника' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Выберите сотрудника</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.userId && (
              <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата *
            </label>
            <input
              {...register('date', { required: 'Дата обязательна' })}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Часы *
            </label>
            <input
              {...register('hours', { 
                required: 'Количество часов обязательно',
                valueAsNumber: true,
                min: { value: 0.1, message: 'Минимум 0.1 часа' },
                max: { value: 24, message: 'Максимум 24 часа' }
              })}
              type="number"
              min="0.1"
              max="24"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите количество часов"
            />
            {errors.hours && (
              <p className="mt-1 text-sm text-red-600">{errors.hours.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Комментарий
          </label>
          <textarea
            {...register('comment')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Описание выполненной работы"
          />
        </div>

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
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTimeEntryModal;