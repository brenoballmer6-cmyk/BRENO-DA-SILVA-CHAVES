
import React from 'react';
import { 
  LayoutDashboard, 
  Smartphone, 
  Workflow, 
  Inbox, 
  Settings, 
  LogOut, 
  Zap, 
  ChevronRight,
  Bell,
  Search
} from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<Props> = ({ user, children, currentPage, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'instances', label: 'Instâncias WhatsApp', icon: Smartphone },
    { id: 'flows', label: 'Automações', icon: Workflow },
    { id: 'inbox', label: 'Chat ao Vivo', icon: Inbox },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-heading">OmniFlow</span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  currentPage === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="p-4 bg-slate-900 rounded-2xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Plano Atual</p>
              <h4 className="font-bold mb-1">{user.plan.toUpperCase()}</h4>
              <p className="text-xs text-slate-400 mb-4">4 de 5 instâncias usadas</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-4">
                <div className="bg-blue-500 h-full rounded-full w-4/5"></div>
              </div>
              <button className="w-full py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
                Fazer Upgrade
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar em tudo..." 
                className="bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                <p className="text-xs text-slate-500">{user.workspace}</p>
              </div>
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-slate-100" />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};
