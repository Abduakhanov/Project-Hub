import React, { useState } from 'react';
import { Search, Plus, Download, Filter, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AddProjectModal from '../modals/AddProjectModal';
import AddTaskModal from '../modals/AddTaskModal';
import AddTimeEntryModal from '../modals/AddTimeEntryModal';

interface HeaderProps {
  title: string;
  onAddClick?: () => void;
  onExportClick?: () => void;
  showSearch?: boolean;
  showFilter?: boolean;
  activeTab?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onAddClick, 
  onExportClick, 
  showSearch = true, 
  showFilter = true,
  activeTab = 'dashboard'
}) => {
  const { exportData, importData } = useApp();
  const [showAddModal, setShowAddModal] = useState<string | null>(null);

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    } else {
      // Определяем тип модального окна на основе активной вкладки
      switch (activeTab) {
        case 'kanban':
          setShowAddModal('task');
          break;
        case 'time':
          setShowAddModal('time');
          break;
        default:
          setShowAddModal('project');
      }
    }
  };

  const handleExportClick = () => {
    if (onExportClick) {
      onExportClick();
    } else {
      exportData();
    }
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          importData(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'kanban': return 'Добавить задачу';
      case 'time': return 'Добавить запись';
      default: return 'Добавить проект';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">Управление проектами и задачами</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
          
          {showFilter && (
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              <span>Фильтр</span>
            </button>
          )}
          
          <button
            onClick={handleImportClick}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload size={20} />
            <span>Импорт</span>
          </button>
          
          <button
            onClick={handleExportClick}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span>Экспорт</span>
          </button>
          
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>{getAddButtonText()}</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showAddModal === 'project' && (
        <AddProjectModal onClose={() => setShowAddModal(null)} />
      )}
      {showAddModal === 'task' && (
        <AddTaskModal onClose={() => setShowAddModal(null)} />
      )}
      {showAddModal === 'time' && (
        <AddTimeEntryModal onClose={() => setShowAddModal(null)} />
      )}
    </div>
  );
};

export default Header;