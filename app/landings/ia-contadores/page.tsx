'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LandingIA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Master IA para Contadores | CEFIN";
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const oldScript = document.getElementById('ac-script-loader');
      if (oldScript) oldScript.remove();
      const script = document.createElement('script');
      script.id = 'ac-script-loader';
      script.src = 'https://cefincapacitacion.activehosted.com/f/embed.php?id=177';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isModalOpen]);

  return (
    <main className="relative min-h-screen bg-[#02040a] text-white font-sans overflow-x-hidden flex flex-col">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Inteligencia_Artificial.png" 
          alt="IA Background"
          fill
          className="object-cover object-center lg:object-right opacity-40 lg:opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#02040a]/80 to-[#02040a] lg:bg-gradient-to-r lg:from-[#02040a] lg:via-[#02040a]/90 lg:to-transparent" />
      </div>

      {/* CONTENIDO PRINCIPAL: Cambiado a Flex para mejor control de altura */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 w-full max-w-[1600px] mx-auto">
          
          {/* LADO IZQUIERDO */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-8 lg:py-12 space-y-4 md:space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <p className="text-[10px] md:text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">
                Tecnología aplicada al 100%
              </p>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black italic leading-[0.95] uppercase tracking-tighter">
                <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">MASTER IA</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">
                  PARA CONTADORES
                </span>
              </h1>
            </div>

            <div className="backdrop-blur-md bg-white/5 border-l-4 border-cyan-500 p-4 md:p-6 max-w-xl">
              <p className="text-sm md:text-base xl:text-lg font-light leading-relaxed text-gray-300">
                Automatiza procesos, multiplica tu precisión y <span className="text-white font-bold text-cyan-300">lidera la nueva era contable</span> con herramientas de IA de última generación.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <div className="bg-gray-900/60 border border-gray-800 p-3 md:p-4 rounded-xl">
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-1">Próxima Sesión</p>
                <p className="text-base md:text-lg font-black text-white italic">21 DE ABRIL</p>
              </div>
              <div className="bg-gray-900/60 border border-gray-800 p-3 md:p-4 rounded-xl border-b-cyan-500">
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-1">Horario Online</p>
                <p className="text-base md:text-lg font-black text-white italic">11:00 AM</p>
              </div>
            </div>

            <div className="pt-2 md:pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 font-black text-black transition-all duration-200 bg-lime-400 hover:bg-lime-300 skew-x-[-15deg] shadow-[0_0_30px_rgba(163,230,53,0.3)] active:scale-95"
              >
                <span className="skew-x-[15deg] uppercase italic text-base md:text-lg">
                  Acceso Gratuito Aquí _
                </span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* MODAL: Ahora con scroll garantizado */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-white text-black w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full max-h-[95vh] sm:h-auto">
            
            <div className="bg-[#0a0c14] text-white py-3 px-6 flex justify-between items-center shrink-0">
              <h2 className="text-base font-black uppercase italic tracking-wider text-cyan-400">Inscripción Masterclass</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:rotate-90 transition-transform p-2 text-xl">✕</button>
            </div>
            
            <div className="p-4 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="_form_177 w-full min-h-[500px]"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0a0c14; border-radius: 10px; }
        ._form_169 { width: 100% !important; }
        /* Ajuste para que el formulario no fuerce anchos extraños */
        ._form_169 form { margin: 0 !important; width: 100% !important; }
      `}</style>
    </main>
  );
}