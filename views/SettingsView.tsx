
import React, { useState, useRef } from 'react';
import { User as UserIcon, Loader2, Sparkles, Upload, CheckCircle2, Shield, CreditCard, Bell, Globe, Database } from 'lucide-react';
import { User as UserType } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  user: UserType;
}

export const SettingsView: React.FC<Props> = ({ user }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Simulação de API de Upload com controle de progresso
   */
  const mockUploadAPI = (file: File, onProgress: (p: number) => void): Promise<string> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          progress = 100;
          onProgress(progress);
          clearInterval(interval);
          setTimeout(() => resolve(URL.createObjectURL(file)), 600);
        } else {
          onProgress(progress);
        }
      }, 250);
    });
  };

  /**
   * Manipula a seleção de arquivo e inicia o processo visual
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Início do estado de carregamento (Animação Sutil)
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    try {
      const newUrl = await mockUploadAPI(file, (p) => setUploadProgress(p));
      
      // Transição suave para a nova imagem
      setAvatarUrl(newUrl);
      setUploadSuccess(true);
      
      // Oculta indicador de sucesso após 3s
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleGenerateIAAvatar = async () => {
    setIsGenerating(true);
    setUploadSuccess(false);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Professional headshot of a business person named ${user.name}, modern office background, high-end photography, cinematic lighting.` }],
        },
        config: { imageConfig: { aspectRatio: "1:1" } },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setAvatarUrl(`data:image/png;base64,${part.inlineData.data}`);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
          break;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isBusy = isUploading || isGenerating;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-1 text-slate-900 tracking-tight">Configurações</h1>
          <p className="text-slate-500 text-sm">Personalize sua identidade no OmniFlow.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="flex flex-col gap-1">
            <SettingsLink icon={<UserIcon className="w-4 h-4" />} label="Perfil" active />
            <SettingsLink icon={<Shield className="w-4 h-4" />} label="Segurança" />
            <SettingsLink icon={<CreditCard className="w-4 h-4" />} label="Plano" />
            <SettingsLink icon={<Bell className="w-4 h-4" />} label="Alertas" />
            <SettingsLink icon={<Globe className="w-4 h-4" />} label="Integrações" />
          </nav>
        </aside>

        <div className="md:col-span-3 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md overflow-hidden relative">
            <h3 className="text-lg font-bold mb-8 text-slate-900">Seu Perfil Profissional</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-10">
              {/* Avatar Container com Animações Sutis */}
              <div className="relative group shrink-0">
                {/* Halo de Atividade */}
                {isBusy && (
                  <div className="absolute -inset-3 animate-halo z-0"></div>
                )}

                {/* Container Principal */}
                <div className={`w-36 h-36 rounded-full border-4 relative overflow-hidden bg-slate-100 shadow-inner z-10 transition-all duration-500 ease-out ${
                  uploadSuccess ? 'border-emerald-400 scale-105' : 
                  isBusy ? 'border-blue-200 scale-95 blur-[0.5px]' : 
                  'border-white scale-100'
                }`}>
                  
                  {/* Imagem do Avatar */}
                  <div className={`w-full h-full relative ${isBusy ? 'animate-shimmer' : ''}`}>
                    <img 
                      src={avatarUrl} 
                      alt={user.name} 
                      className={`w-full h-full object-cover transition-all duration-1000 ${isBusy ? 'opacity-40 scale-110 grayscale' : 'opacity-100 scale-100'}`} 
                    />
                  </div>
                  
                  {/* Overlay de Progresso */}
                  {isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-600 bg-white/20 backdrop-blur-[1px]">
                      <div className="relative flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <span className="absolute text-[8px] font-black">{uploadProgress}%</span>
                      </div>
                    </div>
                  )}

                  {/* Feedback de IA */}
                  {isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white gradient-primary opacity-90 animate-in zoom-in duration-300">
                      <Sparkles className="w-8 h-8 animate-pulse mb-1 text-yellow-200" />
                      <span className="text-[7px] font-black uppercase tracking-widest text-center">Criando<br/>Identidade</span>
                    </div>
                  )}

                  {/* Check de Sucesso */}
                  {uploadSuccess && !isBusy && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center animate-in fade-in zoom-in duration-500">
                      <div className="bg-white rounded-full p-2.5 shadow-2xl animate-bounce">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Botão de Edição Flutuante */}
                {!isBusy && (
                  <button 
                    onClick={triggerFileInput}
                    className="absolute bottom-1 right-1 w-11 h-11 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-xl text-slate-500 hover:text-blue-600 hover:scale-110 active:scale-90 z-20 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-slate-900">{user.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{user.workspace}</p>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <button 
                    onClick={triggerFileInput}
                    disabled={isBusy}
                    className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    Subir Foto
                  </button>
                  <button 
                    onClick={handleGenerateIAAvatar}
                    disabled={isBusy}
                    className="px-6 py-2.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-100 active:scale-95 transition-all flex items-center gap-2 border border-blue-100 disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    Avatar por IA
                  </button>
                </div>
                
                <div className="pt-2">
                  {uploadSuccess ? (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-center sm:justify-start animate-in slide-in-from-top-1">
                      <CheckCircle2 className="w-3 h-3" /> Perfil atualizado com sucesso!
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Suporte: JPG, PNG • Max 2MB
                    </p>
                  )}
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 mt-10 border-t border-slate-50">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nome de Exibição</label>
                <input type="text" defaultValue={user.name} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">E-mail Corporativo</label>
                <input type="email" defaultValue={user.email} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4">
             <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 active:scale-95 transition-all">
               Atualizar Workspace
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsLink = ({ icon, label, active }: any) => (
  <button className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all w-full ${
    active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-white hover:text-slate-900'
  }`}>
    {icon}
    {label}
  </button>
);
