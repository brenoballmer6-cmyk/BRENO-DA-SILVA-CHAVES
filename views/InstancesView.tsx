
import React, { useState } from 'react';
import { Smartphone, Plus, RefreshCcw, Power, Trash2, ShieldCheck, MoreHorizontal, QrCode } from 'lucide-react';
import { WhatsAppInstance } from '../types';

export const InstancesView: React.FC = () => {
  const [instances, setInstances] = useState<WhatsAppInstance[]>([
    { id: '1', name: 'Hub Principal de Vendas', status: 'connected', phoneNumber: '+55 11 98888-7777', lastSeen: 'Agora mesmo' },
    { id: '2', name: 'Suporte ao Cliente', status: 'pairing', lastSeen: '2 horas atrás' },
    { id: '3', name: 'Marketing Automático', status: 'disconnected', lastSeen: '3 dias atrás' },
  ]);

  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-1 text-slate-900">Unidades WhatsApp</h1>
          <p className="text-slate-500 text-sm">Conecte e gerencie suas instâncias da Evolution API.</p>
        </div>
        <button 
          onClick={() => setShowQRModal(true)}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Adicionar Instância
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instances.map((instance) => (
          <div key={instance.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  instance.status === 'connected' ? 'bg-emerald-50 text-emerald-600' : 
                  instance.status === 'pairing' ? 'bg-amber-50 text-amber-600 animate-pulse' :
                  'bg-red-50 text-red-600'
                }`}>
                  {instance.status === 'connected' ? 'Conectado' : 
                   instance.status === 'pairing' ? 'Pareando...' : 'Desconectado'}
                </div>
                <button className="text-slate-400 hover:text-slate-900 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <Smartphone className={`w-7 h-7 ${instance.status === 'connected' ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{instance.name}</h3>
                  <p className="text-slate-500 text-sm">{instance.phoneNumber || 'Não atribuído'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-8">
                <RefreshCcw className="w-3 h-3" />
                Atualizado: {instance.lastSeen}
              </div>

              <div className="flex items-center gap-2 pt-6 border-t border-slate-50">
                {instance.status === 'connected' ? (
                  <button className="flex-1 py-2.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2">
                    <Power className="w-3 h-3" /> Desconectar
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowQRModal(true)}
                    className="flex-1 py-2.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-3 h-3" /> Conectar Agora
                  </button>
                )}
                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de QR Code */}
      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-2 text-center text-slate-900">Conectar WhatsApp</h2>
            <p className="text-slate-500 text-center mb-8 text-sm">Abra o WhatsApp no seu celular, vá em Aparelhos Conectados e escaneie o código abaixo.</p>
            
            <div className="aspect-square bg-slate-50 rounded-2xl border-4 border-slate-100 flex items-center justify-center mb-8 p-4 relative overflow-hidden group">
              <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full opacity-80">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <RefreshCcw className="w-10 h-10 text-slate-900 animate-spin" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Conexão criptografada ponta-a-ponta
              </div>
              <button 
                onClick={() => setShowQRModal(false)}
                className="w-full py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
