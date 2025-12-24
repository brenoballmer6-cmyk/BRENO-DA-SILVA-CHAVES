
import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video, Info, Send, Smile, Paperclip, CheckCheck, Pause, Play, User as UserIcon, Zap, Inbox } from 'lucide-react';
import { ChatSession } from '../types';

export const InboxView: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      contactName: 'Alice Freitas',
      phoneNumber: '+55 11 91234-5678',
      lastMessage: 'Preciso de ajuda com meu pedido #4521',
      unreadCount: 3,
      status: 'open',
      messages: [
        { id: '1', sender: 'user', content: 'Olá!', timestamp: '09:00', status: 'read' },
        { id: '2', sender: 'bot', content: 'Bem-vindo! Como posso ajudar você hoje?', timestamp: '09:01', status: 'read' },
        { id: '3', sender: 'user', content: 'Preciso de ajuda com meu pedido #4521', timestamp: '09:15', status: 'delivered' },
      ]
    },
    {
      id: '2',
      contactName: 'Michel Pereira',
      phoneNumber: '+55 11 98877-6655',
      lastMessage: 'Ótimo, obrigado pelas informações!',
      unreadCount: 0,
      status: 'resolved',
      messages: []
    },
    {
      id: '3',
      contactName: 'Sara Miller',
      phoneNumber: '+55 11 97766-5544',
      lastMessage: 'O robô ainda está ativo?',
      unreadCount: 0,
      status: 'bot_paused',
      messages: []
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string>('1');
  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="h-full flex bg-white rounded-3xl border border-slate-200 -m-8 relative overflow-hidden shadow-2xl">
      {/* Sidebar - Lista de Contatos */}
      <div className="w-80 border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-xl font-bold font-heading mb-4 text-slate-900">Conversas</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar chat..." 
              className="w-full bg-slate-50 border-none pl-10 pr-4 py-2 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {sessions.map(session => (
            <button 
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full p-4 flex gap-4 transition-all hover:bg-slate-50 border-b border-slate-50 text-left ${activeSessionId === session.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : ''}`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center text-slate-500">
                   <UserIcon className="w-6 h-6" />
                </div>
                {session.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {session.unreadCount}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm truncate text-slate-900">{session.contactName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">09:15</span>
                </div>
                <p className="text-xs text-slate-500 truncate leading-relaxed">{session.lastMessage}</p>
                <div className="mt-1 flex items-center gap-2">
                   {session.status === 'bot_paused' && <span className="text-[8px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Bot Pausado</span>}
                   {session.status === 'resolved' && <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Resolvido</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Área Principal de Chat */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeSession ? (
          <>
            <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{activeSession.contactName}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <button className="px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100">
                  <Pause className="w-3.5 h-3.5" /> Pausar Robô
                </button>
                <div className="h-6 w-[1px] bg-slate-100"></div>
                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><Phone className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><Video className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><Info className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
               <div className="flex justify-center my-8">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Hoje</span>
               </div>
               
               {activeSession.messages.map(msg => (
                 <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                   <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${
                     msg.sender === 'user' 
                     ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm' 
                     : 'gradient-primary text-white rounded-tr-none shadow-lg'
                   }`}>
                     {msg.content}
                     <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.sender === 'user' ? 'text-slate-400' : 'text-blue-100'}`}>
                        {msg.timestamp}
                        {msg.sender !== 'user' && <CheckCheck className="w-3 h-3" />}
                     </div>
                   </div>
                 </div>
               ))}

               {activeSession.status === 'open' && (
                 <div className="flex justify-center">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                      <Zap className="w-3 h-3" /> Automação ativa: Boas-vindas
                   </div>
                 </div>
               )}
            </div>

            <div className="p-6 bg-white border-t border-slate-100 shrink-0">
               <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Smile className="w-5 h-5" /></button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Paperclip className="w-5 h-5" /></button>
                  <input 
                    type="text" 
                    placeholder="Digite sua resposta aqui..."
                    className="flex-1 bg-transparent border-none text-sm outline-none focus:ring-0 px-2"
                  />
                  <button className="w-10 h-10 gradient-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all shadow-lg">
                    <Send className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
               <Inbox className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Selecione uma conversa</h3>
            <p className="max-w-xs text-sm leading-relaxed">Escolha um chat na barra lateral para iniciar o atendimento manual ou ver o histórico do robô.</p>
          </div>
        )}
      </div>
    </div>
  );
};
