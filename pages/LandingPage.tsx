
import React from 'react';
import { Zap, MessageSquare, Workflow, BarChart3, ShieldCheck, ChevronRight, Check } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navegação */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight text-slate-900">OmniFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Funcionalidades</a>
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Soluções</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('login')}
              className="text-sm font-semibold text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Entrar
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="text-sm font-semibold text-white bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Novo: Fluxos com IA 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-heading text-slate-900 mb-6 leading-tight">
            Escalone seu WhatsApp <br />
            <span className="text-transparent bg-clip-text gradient-primary">sem esforço manual</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A plataforma definitiva de automação visual para empresas que precisam entregar uma experiência premium em escala.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Teste Grátis <ChevronRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              Ver Demonstração
            </button>
          </div>
          
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-100 aspect-video">
             <img src="https://picsum.photos/seed/dashboard/1200/800" alt="Prévia do Dashboard" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">Tudo o que você precisa para automatizar</h2>
            <p className="text-slate-600">Construído para times de alta performance e agências.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Workflow className="text-blue-600" />}
              title="Construtor de Fluxos Visual"
              description="Arraste e solte blocos para criar jornadas complexas sem escrever uma única linha de código."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-purple-600" />}
              title="Suporte a Múltiplas Instâncias"
              description="Gerencie dezenas de contas de WhatsApp de um único painel com lógica avançada de roteamento."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-emerald-600" />}
              title="Analytics Avançado"
              description="Acompanhe taxas de conversão, tempo de resposta e performance com precisão absoluta."
            />
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Planos flexíveis para qualquer escala</h2>
            <p className="text-slate-600">Sem taxas ocultas. Comece grátis, faça o upgrade conforme crescer.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              name="Starter"
              price="0"
              features={["1 Instância", "100 Contatos", "Fluxos Básicos", "Suporte via Email"]}
            />
            <PricingCard 
              name="Professional"
              price="497"
              highlight
              features={["5 Instâncias", "5.000 Contatos", "Lógica Avançada", "Analytics Visual", "Suporte Prioritário"]}
            />
            <PricingCard 
              name="Enterprise"
              price="Sob consulta"
              features={["Instâncias Ilimitadas", "Infraestrutura Dedicada", "White Label", "Suporte 24/7 Personalizado"]}
            />
          </div>
        </div>
      </section>
      
      {/* Rodapé */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 OmniFlow SaaS. Excelência em automação para negócios globais.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({ name, price, features, highlight }: any) => (
  <div className={`p-8 rounded-2xl border ${highlight ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-200'} flex flex-col`}>
    <h3 className="text-lg font-bold mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-extrabold">{price === 'Sob consulta' ? price : `R$ ${price}`}</span>
      {price !== 'Sob consulta' && <span className="text-slate-500">/mês</span>}
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((f: string) => (
        <li key={f} className="flex items-center gap-3 text-slate-600">
          <Check className="w-5 h-5 text-blue-600" /> {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-xl font-bold transition-all ${highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
      Escolher {name}
    </button>
  </div>
);
