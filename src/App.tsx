import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import KanbanBoard from './components/Kanban/KanbanBoard';
import GanttChart from './components/Gantt/GanttChart';
import Analytics from './components/Analytics/Analytics';
import Team from './components/Team/Team';
import TimeTracking from './components/TimeTracking/TimeTracking';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'kanban': return 'Kanban Board';
      case 'gantt': return 'Gantt Chart';
      case 'time': return 'Учет времени';
      case 'analytics': return 'Analytics';
      case 'team': return 'Team';
      case 'settings': return 'Settings';
      default: return 'Project Hub';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'kanban':
        return <KanbanBoard />;
      case 'gantt':
        return <GanttChart />;
      case 'time':
        return <TimeTracking />;
      case 'analytics':
        return <Analytics />;
      case 'team':
        return <Team />;
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Настройки</h2>
            <p className="text-gray-600">Раздел настроек находится в разработке</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={getPageTitle()}
          showSearch={activeTab !== 'settings'}
          showFilter={activeTab !== 'settings'}
          activeTab={activeTab}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;