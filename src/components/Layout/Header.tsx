import React from 'react';
import { Search, Plus, Download, Filter } from 'lucide-react';

interface HeaderProps {
  title: string;
  onAddClick?: () => void;
  onExportClick?: () => void;
  showSearch?: boolean;
  showFilter?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onAddClick, 
  onExportClick, 
  showSearch = true, 
  showFilter = true 
}) => {
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
          
          {onExportClick && (
            <button
              onClick={onExportClick}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={20} />
              <span>Экспорт</span>
            </button>
          )}
          
          {onAddClick && (
            <button
              onClick={onAddClick}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Добавить</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;