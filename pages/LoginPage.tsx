
import React, { useState } from 'react';
import { Zap, ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface Props {
  mode: 'login' | 'register';
  onLogin: (u: User) => void;
  onBack: () => void;
}

export const LoginPage: React.FC<Props> = ({ mode, onLogin, onBack }) => {
  const [email, setEmail] = useState('demo@omniflow.io');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: '1',
      name: 'João Anderson',
      email,
      plan: 'pro',
      avatar: 'https://i.pravatar.cc/150?u=john',
      workspace: 'Omni Media Group'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 mb-8 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-white w-7 h-7" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">
            {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h2>
          <p className="text-slate-500 text-center mb-8">
            {mode === 'login' ? 'Insira suas credenciais para acessar o painel' : 'Junte-se a mais de 2.000 empresas no OmniFlow'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Nome Completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Seu nome"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@empresa.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
            >
              {mode === 'login' ? 'Entrar no Painel' : 'Criar Conta Agora'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500">
              {mode === 'login' ? "Ainda não tem conta?" : "Já possui uma conta?"}{' '}
              <button 
                onClick={() => {}} 
                className="text-blue-600 font-bold hover:underline"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
