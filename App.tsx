
import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { HomeView } from './views/HomeView';
import { InstancesView } from './views/InstancesView';
import { FlowsView } from './views/FlowsView';
import { FlowEditorView } from './views/FlowEditorView';
import { InboxView } from './views/InboxView';
import { SettingsView } from './views/SettingsView';
import { LoginPage } from './pages/LoginPage';
import { User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);

  // Simple state-based routing
  const navigate = (page: string, params?: any) => {
    if (page === 'flow-editor' && params?.id) {
      setSelectedFlowId(params.id);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={navigate} />;
  }

  if (currentPage === 'login' || currentPage === 'register') {
    return <LoginPage mode={currentPage as 'login' | 'register'} onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
  }

  if (!user) {
    return <LoginPage mode="login" onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
  }

  return (
    <DashboardLayout 
      user={user} 
      currentPage={currentPage} 
      onNavigate={navigate} 
      onLogout={handleLogout}
    >
      {currentPage === 'dashboard' && <HomeView onNavigate={navigate} />}
      {currentPage === 'instances' && <InstancesView />}
      {currentPage === 'flows' && <FlowsView onNavigate={navigate} />}
      {currentPage === 'flow-editor' && <FlowEditorView flowId={selectedFlowId} onBack={() => setCurrentPage('flows')} />}
      {currentPage === 'inbox' && <InboxView />}
      {currentPage === 'settings' && <SettingsView user={user} />}
    </DashboardLayout>
  );
};

export default App;
