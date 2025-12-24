
import React, { useState } from 'react';
import { Workflow, Plus, Play, Pause, Edit3, Trash2, Clock, Zap, Search, Filter } from 'lucide-react';
import { AutomationFlow } from '../types';

interface Props {
  onNavigate: (page: string, params?: any) => void;
}

export const FlowsView: React.FC<Props> = ({ onNavigate }) => {
  const [flows, setFlows] = useState<AutomationFlow[]>([
    { 
      id: '1', 
      name: 'Experiência de Boas-vindas', 
      description: 'Saudar automaticamente novos clientes e capturar leads qualificados.', 
      status: 'active', 
      nodes: [], edges: [], 
      updatedAt: '2 horas atrás' 
    },
    { 
      id: '2', 
      name: 'Confirmação de Pedido', 
      description: 'Enviar recibo e detalhes de envio após uma compra aprovada.', 
      status: 'active', 
      nodes: [], edges: [], 
      updatedAt: 'Ontem' 
    },
    { 
      id: '3', 
      name: 'Feedback de Satisfação v2', 
      description: 'Solicitar avaliação 48h após a entrega do produto.', 
      status: 'draft', 
      nodes: [], edges: [], 
      updatedAt: '3 dias atrás' 
    },
  ]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-1 text-slate-900">Fluxos de Automação</h1>
          <p className="text-slate-500 text-sm">Desenhe jornadas visuais para seus contatos.</p>
        </div>
        <button 
          onClick={() => onNavigate('flow-editor', { id: 'new' })}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Criar Novo Fluxo
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar automações..." 
            className="w-full bg-slate-50 border-none pl-10 pr-4 py-2 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-100 transition-colors flex-1 md:flex-none justify-center">
            <Filter className="w-4 h-4" /> Filtrar
          </button>
          <button className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-100 transition-colors flex-1 md:flex-none justify-center">
            Recentes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flows.map((flow) => (
          <div key={flow.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all flex flex-col">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  flow.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {flow.status === 'active' ? 'Ativo' : 'Rascunho'}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onNavigate('flow-editor', { id: flow.id })} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors text-slate-900">{flow.name}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 min-h-[40px] leading-relaxed">{flow.description}</p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {flow.updatedAt}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-bold text-slate-700">2.4k disparos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 bg-slate-50/50 mt-auto">
              <button 
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  flow.status === 'active' 
                  ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-50'
                }`}
              >
                {flow.status === 'active' ? <><Pause className="w-3 h-3" /> Pausar Funil</> : <><Play className="w-3 h-3" /> Ativar Agora</>}
              </button>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => onNavigate('flow-editor', { id: 'new' })}
          className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all hover:bg-blue-50 group min-h-[250px]"
        >
          <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Plus className="w-7 h-7" />
          </div>
          <p className="font-bold">Criar Nova Automação</p>
        </button>
      </div>
    </div>
  );
};
