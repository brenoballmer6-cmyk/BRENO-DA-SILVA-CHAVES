
import React, { useState } from 'react';
import { ArrowLeft, Save, Play, Plus, Zap, MessageSquare, Clock, GitBranch, Terminal, Trash2, X, Settings2 } from 'lucide-react';

interface Props {
  flowId: string | null;
  onBack: () => void;
}

export const FlowEditorView: React.FC<Props> = ({ flowId, onBack }) => {
  const [nodes, setNodes] = useState<any[]>([
    { id: '1', type: 'trigger', label: 'Mensagem Recebida', x: 100, y: 100, config: 'Palavra-chave: "olá"' },
    { id: '2', type: 'action', label: 'Texto de Boas-vindas', x: 400, y: 100, config: 'Olá! Seja bem-vindo...' },
    { id: '3', type: 'logic', label: 'Checar Horário', x: 400, y: 300, config: 'Horário Comercial' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = (type: string) => {
    const labels: any = {
      trigger: 'Novo Gatilho',
      action: 'Enviar Mensagem',
      delay: 'Aguardar Tempo',
      logic: 'Condição Se/Então',
      http: 'Requisição API'
    };
    const newNode = {
      id: String(Date.now()),
      type,
      label: labels[type] || 'Novo Bloco',
      x: 150,
      y: 150,
      config: ''
    };
    setNodes([...nodes, newNode]);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="h-full flex flex-col bg-slate-100 -m-8 relative overflow-hidden">
      {/* Cabeçalho do Editor */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">Fluxo: Experiência de Boas-vindas</h2>
            <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Alterações Não Salvas</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5" /> Testar Fluxo
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg">
            <Save className="w-3.5 h-3.5" /> Salvar Alterações
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Barra Lateral de Blocos */}
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 shrink-0 z-10 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Blocos Disponíveis</h3>
          <div className="space-y-3">
            <NodeMenuItem 
              icon={<Zap className="w-4 h-4 text-orange-500" />} 
              label="Gatilho" 
              desc="Quando mensagem recebida"
              onClick={() => addNode('trigger')}
            />
            <NodeMenuItem 
              icon={<MessageSquare className="w-4 h-4 text-blue-500" />} 
              label="Mensagem" 
              desc="Enviar texto/mídia"
              onClick={() => addNode('action')}
            />
            <NodeMenuItem 
              icon={<Clock className="w-4 h-4 text-purple-500" />} 
              label="Delay" 
              desc="Aguardar segundos/minutos"
              onClick={() => addNode('delay')}
            />
            <NodeMenuItem 
              icon={<GitBranch className="w-4 h-4 text-emerald-500" />} 
              label="Condição" 
              desc="Lógica Se / Senão"
              onClick={() => addNode('logic')}
            />
            <NodeMenuItem 
              icon={<Terminal className="w-4 h-4 text-slate-600" />} 
              label="Webhook" 
              desc="Enviar para API externa"
              onClick={() => addNode('http')}
            />
          </div>
          
          <div className="mt-auto p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-2">Dica de Especialista</p>
            <p className="text-xs text-blue-700 leading-relaxed">Arraste os pontos laterais para conectar os blocos e criar a lógica de conversação.</p>
          </div>
        </div>

        {/* Área do Canvas */}
        <div className="flex-1 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] overflow-auto">
          <div className="absolute inset-0 p-20 min-w-[2000px] min-h-[2000px]">
            {nodes.map(node => (
              <VisualNode 
                key={node.id} 
                node={node} 
                isSelected={selectedNodeId === node.id}
                onClick={() => setSelectedNodeId(node.id)}
              />
            ))}
            
            <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-30">
              <path d="M 280 140 C 340 140, 340 140, 400 140" stroke="#2563eb" strokeWidth="2" fill="none" />
              <path d="M 580 140 C 640 140, 400 300, 400 300" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Painel de Configuração */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col z-10 animate-in slide-in-from-right duration-200 shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Configurar: {selectedNode.label}</h3>
              <button onClick={() => setSelectedNodeId(null)} className="p-1 hover:bg-slate-50 rounded text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome do Bloco</label>
                <input 
                  type="text" 
                  value={selectedNode.label} 
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conteúdo / Regra</label>
                <textarea 
                  rows={6}
                  value={selectedNode.config}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-mono"
                  placeholder="Ex: Mensagem que o bot enviará..."
                />
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button className="w-full py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" /> Excluir Bloco
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NodeMenuItem = ({ icon, label, desc, onClick }: any) => (
  <button onClick={onClick} className="w-full p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group">
    <div className="flex items-center gap-3 mb-1">
      <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
        {icon}
      </div>
      <span className="font-bold text-sm text-slate-900">{label}</span>
    </div>
    <p className="text-[10px] text-slate-500 ml-9">{desc}</p>
  </button>
);

const VisualNode = ({ node, isSelected, onClick }: any) => {
  const typeColors: any = {
    trigger: 'border-orange-500 bg-orange-50 text-orange-600',
    action: 'border-blue-500 bg-blue-50 text-blue-600',
    logic: 'border-emerald-500 bg-emerald-50 text-emerald-600',
    delay: 'border-purple-500 bg-purple-50 text-purple-600',
    http: 'border-slate-500 bg-slate-50 text-slate-600',
  };

  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{ left: node.x, top: node.y }}
      className={`absolute w-48 p-4 rounded-xl border-2 bg-white flow-node-shadow cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500/20 scale-105 z-20' : 'hover:scale-102 z-10'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${typeColors[node.type] || 'border-slate-200 text-slate-500'}`}>
          {node.type === 'trigger' ? 'Gatilho' : 
           node.type === 'action' ? 'Ação' : 
           node.type === 'logic' ? 'Lógica' : 
           node.type === 'delay' ? 'Delay' : 'API'}
        </div>
        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
      </div>
      <h4 className="font-bold text-xs mb-1 truncate text-slate-900">{node.label}</h4>
      <p className="text-[10px] text-slate-400 line-clamp-2 italic">{node.config || 'Sem configuração'}</p>
      
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full"></div>
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full"></div>
    </div>
  );
};
