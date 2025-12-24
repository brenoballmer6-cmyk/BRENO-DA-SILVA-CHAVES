
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  ArrowUpRight,
  MoreVertical,
  Plus,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Seg', enviadas: 400, recebidas: 240 },
  { name: 'Ter', enviadas: 300, recebidas: 139 },
  { name: 'Qua', enviadas: 200, recebidas: 980 },
  { name: 'Qui', enviadas: 278, recebidas: 390 },
  { name: 'Sex', enviadas: 189, recebidas: 480 },
  { name: 'Sab', enviadas: 239, recebidas: 380 },
  { name: 'Dom', enviadas: 349, recebidas: 430 },
];

interface Props {
  onNavigate: (page: string) => void;
}

export const HomeView: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-1 text-slate-900">Performance do Workspace</h1>
          <p className="text-slate-500 text-sm">Métricas em tempo real de suas operações automatizadas.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm">
            Exportar Relatório
          </button>
          <button 
            onClick={() => onNavigate('instances')}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 text-sm shadow-md"
          >
            <Plus className="w-4 h-4" /> Nova Instância
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<MessageSquare className="text-blue-600" />}
          label="Total de Mensagens"
          value="24.8k"
          trend="+12%"
          positive
        />
        <StatCard 
          icon={<Users className="text-purple-600" />}
          label="Contatos Únicos"
          value="8.421"
          trend="+5.4%"
          positive
        />
        <StatCard 
          icon={<CheckCircle2 className="text-emerald-600" />}
          label="Taxa de Conclusão"
          value="94.2%"
          trend="-0.8%"
          positive={false}
        />
        <StatCard 
          icon={<TrendingUp className="text-orange-600" />}
          label="Funis Ativos"
          value="12"
          trend="+2"
          positive
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Volume de Mensagens</h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 px-3 py-1.5 rounded-lg outline-none">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEnviadas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  labelStyle={{ fontWeight: 'bold' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="enviadas" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorEnviadas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Atividade Recente</h3>
          <div className="space-y-6">
            <ActivityItem 
              user="Maria Santos"
              action="Conectou instância 'Vendas SP'"
              time="2 min atrás"
              avatar="https://i.pravatar.cc/150?u=maria"
            />
            <ActivityItem 
              user="Bot de Fluxo"
              action="Disparou 'Série de Boas-vindas'"
              time="15 min atrás"
              icon={<Zap className="w-4 h-4 text-yellow-500" />}
            />
            <ActivityItem 
              user="Carlos Lima"
              action="Resolveu 14 tickets em 'Suporte'"
              time="1 hora atrás"
              avatar="https://i.pravatar.cc/150?u=carlos"
            />
            <ActivityItem 
              user="Sistema"
              action="Backup diário concluído"
              time="4 horas atrás"
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            />
          </div>
          <button className="w-full mt-10 py-3 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Ver Tudo
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, positive }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {trend}
        <ArrowUpRight className={`w-3 h-3 ${!positive && 'rotate-90'}`} />
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <h4 className="text-2xl font-bold mt-1 text-slate-900">{value}</h4>
  </div>
);

const ActivityItem = ({ user, action, time, avatar, icon }: any) => (
  <div className="flex gap-4">
    {avatar ? (
      <img src={avatar} className="w-10 h-10 rounded-full shrink-0 object-cover" alt="" />
    ) : (
      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
        {icon}
      </div>
    )}
    <div className="min-w-0">
      <p className="text-sm font-bold text-slate-900 truncate">{user}</p>
      <p className="text-xs text-slate-500 truncate">{action}</p>
      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">{time}</p>
    </div>
  </div>
);
