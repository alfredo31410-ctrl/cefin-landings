'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LandingCEFIN() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Auxiliar Contable - Entrenamiento En Vivo | CEFIN";
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const oldScript = document.getElementById('ac-script-loader');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.id = 'ac-script-loader';
      script.src = 'https://cefincapacitacion.activehosted.com/f/embed.php?id=169';
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isModalOpen]);

  return (
    <main className="min-h-screen w-full bg-[#0f172a] text-white relative font-sans overflow-x-hidden flex flex-col">
      
      {/* FONDO Y RESPLANDOR */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[5%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] opacity-40"
          style={{ background: 'radial-gradient(circle, #e6007e 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
          <Image
            src="/alfredo.png"
            alt="Mtro. Alfredo Cobos"
            fill
            priority
            className="object-contain object-left-bottom scale-110 -translate-x-[15%] sm:-translate-x-[5%] opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/10 to-[#0f172a] z-0" />
      </div>

      {/* HEADER */}
      <header className="relative z-30 flex justify-end px-6 py-6 lg:px-12">
        <div className="text-right border-r-4 border-fuchsia-600 pr-4">
          <p className="font-black text-2xl tracking-tighter leading-none">CEFIN</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Mtro. Alfredo Cobos</p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-start-4 lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-block bg-fuchsia-600 text-white px-4 py-1 text-[11px] font-black uppercase italic tracking-widest rounded-sm">
              ¡Entrenamiento desde cero!
            </div>
            
            <h1 className="text-6xl sm:text-7xl xl:text-[95px] font-black leading-[0.8] uppercase italic tracking-tighter">
              Auxiliar <br />
              <span className="text-yellow-400">Contable</span>
            </h1>

            <div className="bg-blue-600 inline-block px-5 py-2 text-sm font-bold uppercase italic shadow-lg">
              Sesión 100% en vivo // Cupo Limitado
            </div>

            <div className="pt-4">
              <p className="text-4xl sm:text-6xl font-black text-fuchsia-500 leading-none uppercase italic drop-shadow-md">
                MARTES 14 DE ABRIL
              </p>
              <div className="text-xl font-bold mt-2 flex items-center justify-center lg:justify-start gap-3">
                11:00 AM - (CDMX)
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                </span>
              </div>
            </div>

            <div className="pt-24 lg:pt-8 flex justify-center lg:justify-start">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white bg-fuchsia-600 rounded-xl overflow-hidden transition-all hover:bg-fuchsia-700 active:scale-95 shadow-[0_15px_40px_rgba(230,0,126,0.4)] text-xl uppercase italic tracking-tighter"
              >
                <span className="relative z-10">¡Registrarme Gratis Ahora!</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CON BOTÓN "CONOCER MÁS" INCORPORADO */}
      <footer className="relative z-20 w-full pt-10 pb-12 bg-gradient-to-t from-fuchsia-900/10 to-transparent flex flex-col items-center">
        
        {/* Botón "Conoce más" centrado arriba de los tags */}
        <div className="mb-10">
          <a 
            href="https://cefin.mx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-all duration-300"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-fuchsia-400 transition-colors">
              ¿Quieres saber más de nosotros?
            </span>
            <div className="px-6 py-3 border-2 border-fuchsia-600/30 group-hover:border-fuchsia-600 rounded-full text-sm font-black uppercase italic tracking-tighter transition-all group-hover:bg-fuchsia-600/10 flex items-center gap-3">
              Conoce más de lo que hacemos en CEFIN
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>

        <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
               {['BASES CONTABLES', 'CONTROL DE FACTURAS', 'REPORTERÍA ESENCIAL'].map((item) => (
                <span key={item} className="text-[10px] sm:text-xs font-black tracking-[0.3em] italic text-fuchsia-200">
                  {"// "} {item}
                </span>
              ))}
            </div>
        </div>
      </footer>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f172a]/95 backdrop-blur-md">
          <div className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] p-8 shadow-[0_0_60px_rgba(230,0,126,0.4)] border-t-[10px] border-fuchsia-600 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-6 text-slate-400 hover:text-slate-900 font-bold text-2xl">✕</button>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-[#0f172a] italic uppercase leading-none">
                Asegura tu <span className="text-fuchsia-600">Lugar</span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Entrenamiento 14 de Abril</p>
            </div>
            <div className="ac-modal-wrapper min-h-[400px]">
              <div className="_form_169"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .ac-modal-wrapper ._form_169 { background: transparent !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        .ac-modal-wrapper ._form-title { display: none !important; }
        .ac-modal-wrapper ._submit {
          background: #e6007e !important; color: white !important; font-weight: 900 !important;
          text-transform: uppercase !important; border-radius: 14px !important;
          padding: 1.2rem !important; width: 100% !important; font-size: 1.1rem !important;
        }
        .ac-modal-wrapper input { background: #f1f5f9 !important; border: 1px solid #e2e8f0 !important; border-radius: 12px !important; padding: 1rem !important; }
        .ac-modal-wrapper ._form-branding { display: none !important; }
      `}</style>
    </main>
  );
}