import Image from 'next/image';

export default function LandingCEFIN() {
  return (
    <main className="h-screen w-full bg-[#0f172a] text-white overflow-hidden relative font-sans">
      
      {/* 1. FONDO: Alfredo + Resplandor Rosa (Capa corregida) */}
<div className="absolute inset-0 z-0">
  
  {/* El Resplandor: Debe ir ANTES de la imagen en el código para quedar detrás */}
  <div 
    className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-60 pointer-events-none"
    style={{ background: 'radial-gradient(circle, #e6007e 0%, transparent 70%)' }}
  ></div>

  {/* La Imagen de Alfredo */}
  <Image
    src="/alfredo.png" 
    alt="Mtro. Alfredo Cobos"
    fill
    className="object-contain object-left-bottom md:scale-125 md:-translate-x-[15%] z-10"
    priority
  />
  
  {/* Capa de ajuste de contraste para el fondo oscuro */}
  <div className="absolute inset-0 bg-[#0f172a]/20 z-0"></div>
</div>

      {/* 2. HEADER: Logo CEFIN */}
      <header className="relative z-20 flex justify-end p-8">
        <div className="text-right border-r-4 border-magenta pr-4">
          <p className="font-black text-3xl tracking-tighter leading-none">CEFIN</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Mtro. Alfredo Cobos</p>
        </div>
      </header>

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-160px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* LADO IZQUIERDO: Títulos (Compactos para evitar scroll) */}
          <div className="lg:col-start-4 lg:col-span-5 space-y-4">
            <div className="inline-block bg-magenta text-white px-3 py-1 text-[11px] font-black uppercase italic tracking-widest">
              ¡Tu entrenamiento desde cero está listo!
            </div>
            
            <h1 className="text-6xl md:text-[80px] font-black leading-[0.8] uppercase italic tracking-tighter">
              Auxiliar <br />
              <span className="text-yellow-400">Contable</span>
            </h1>

            <div className="bg-blue-600 inline-block px-4 py-1.5 text-md font-bold uppercase italic shadow-lg shadow-blue-900/50">
              Entrenamiento desde cero
            </div>

            <div className="pt-2">
              <p className="text-3xl md:text-5xl font-black text-magenta leading-none uppercase italic drop-shadow-md">
                MARTES 14 DE ABRIL
              </p>
              <p className="text-xl font-bold text-white flex items-center gap-3 mt-1">
                11:00 AM - (CDMX) EN VIVO 
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-magenta"></span>
                </span>
              </p>
            </div>
          </div>

          {/* LADO DERECHO: Formulario */}
          <div className="lg:col-span-3 flex justify-end">
            <div className="w-full max-w-[340px] bg-white rounded-[2.5rem] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-slate-900 border-t-8 border-magenta">
              <h2 className="text-xl font-black text-[#0f172a] leading-tight uppercase text-center mb-5 italic">
                Inscríbete ahora y <br /> <span className="text-magenta">asegura tu lugar</span>
              </h2>

              <form className="space-y-4">
                <input type="text" placeholder="Nombre Completo" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta transition-all" />
                <input type="email" placeholder="Correo Electrónico" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta transition-all" />
                <input type="tel" placeholder="WhatsApp (10 dígitos)" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta transition-all" />
                
                <button className="w-full bg-magenta hover:bg-[#cc1a8a] text-black font-black py-4 rounded-xl text-lg transition-all shadow-[0_8px_20px_rgba(230,0,126,0.3)] uppercase active:scale-95 leading-tight mt-2">
                  ¡Quiero mi lugar gratis! <br /> <span className="text-[10px] opacity-80">Acceso inmediato</span>
                </button>
                
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase">
                  *Acceso limitado. No se requiere tarjeta.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* 4. SECCIÓN INFERIOR: Estilo Píldora (Compacta) */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { text: 'Bases contables', icon: '📊' },
              { text: 'Control de facturas', icon: '📄' },
              { text: 'Reportería esencial', icon: '📈' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 group">
                <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(230,0,126,0.5)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-bold text-xs uppercase italic tracking-widest text-slate-300 group-hover:text-white transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}