'use client';

import Image from 'next/image';
import Script from 'next/script';

export default function LandingCEFIN() {
  return (
<main className="h-screen w-full bg-[#0f172a] text-white relative font-sans overflow-y-auto overflow-x-hidden">
  <div className="absolute inset-0 z-0">
    <div
      className="absolute top-[8%] left-[-15%] sm:left-[-8%] md:left-[-5%] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[500px] lg:h-[500px] rounded-full blur-[90px] lg:blur-[120px] opacity-60 pointer-events-none"
      style={{ background: 'radial-gradient(circle, #e6007e 0%, transparent 70%)' }}
    />

    <Image
      src="/alfredo.png"
      alt="Mtro. Alfredo Cobos"
      fill
      priority
      className="
        object-contain object-left-bottom z-10
        scale-[1.02] translate-x-[-22%]
        sm:scale-[1.02] sm:translate-x-[-14%]
        md:scale-[1.08] md:translate-x-[-10%]
        lg:scale-[1.16] lg:translate-x-[-12%]
        xl:scale-[1.22] xl:translate-x-[-14%]
        pointer-events-none select-none
      "
    />

    <div className="absolute inset-0 bg-[#0f172a]/25 z-0" />
  </div>

  <header className="relative z-20 flex justify-end px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 lg:pt-8">
    <div className="text-right border-r-4 border-fuchsia-500 pr-4">
      <p className="font-black text-2xl sm:text-3xl tracking-tighter leading-none">CEFIN</p>
      <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">
        Mtro. Alfredo Cobos
      </p>
    </div>
  </header>

      {/* CONTENIDO */}
 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-4 pb-10 min-h-[calc(100vh-88px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-6 items-center">
          {/* IZQUIERDA */}
          <div className="lg:col-start-4 lg:col-span-5 space-y-4 sm:space-y-5 text-center lg:text-left">
            <div className="inline-block bg-fuchsia-600 text-white px-3 py-1 text-[10px] sm:text-[11px] font-black uppercase italic tracking-widest rounded-sm">
              ¡Tu entrenamiento desde cero está listo!
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[80px] font-black leading-[0.85] uppercase italic tracking-tighter">
              Auxiliar <br />
              <span className="text-yellow-400">Contable</span>
            </h1>

            <div className="bg-blue-600 inline-block px-4 py-1.5 text-sm sm:text-base font-bold uppercase italic shadow-lg shadow-blue-900/50 rounded-sm">
              Entrenamiento desde cero
            </div>

            <div className="pt-1 sm:pt-2">
              <p className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black text-fuchsia-500 leading-none uppercase italic drop-shadow-md">
                MARTES 14 DE ABRIL
              </p>

              <p className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center justify-center lg:justify-start gap-3 mt-2">
                11:00 AM - (CDMX) EN VIVO
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                </span>
              </p>
            </div>
          </div>

          {/* DERECHA: FORMULARIO */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[340px] bg-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-slate-900 border-t-8 border-fuchsia-500 overflow-hidden">
              <div className="ac-form-wrapper">
                <div className="_form_169"></div>
              </div>

              <Script
                id="activecampaign-form-169"
                src="https://cefincapacitacion.activehosted.com/f/embed.php?id=169"
                strategy="afterInteractive"
                charSet="utf-8"
              />

              <style jsx global>{`
                .ac-form-wrapper,
                .ac-form-wrapper ._form_169,
                .ac-form-wrapper form,
                .ac-form-wrapper ._form-content {
                  overflow: visible !important;
                  max-height: none !important;
                }

                .ac-form-wrapper ._form-content,
                .ac-form-wrapper ._form_element,
                .ac-form-wrapper ._button-wrapper,
                .ac-form-wrapper input,
                .ac-form-wrapper textarea,
                .ac-form-wrapper select,
                .ac-form-wrapper button {
                  width: 100% !important;
                  max-width: 100% !important;
                  box-sizing: border-box !important;
                }

                .ac-form-wrapper ._form_169,
                .ac-form-wrapper form {
                  margin: 0 !important;
                  padding: 0 !important;
                  background: transparent !important;
                  border: 0 !important;
                  box-shadow: none !important;
                }

                .ac-form-wrapper ._form-title,
                .ac-form-wrapper h1,
                .ac-form-wrapper h2,
                .ac-form-wrapper h3 {
                  text-align: center !important;
                  color: #0f172a !important;
                }

                .ac-form-wrapper ._form-title {
                  font-weight: 900 !important;
                  font-size: 1.2rem !important;
                  line-height: 1.2 !important;
                  text-transform: uppercase !important;
                  font-style: italic !important;
                  margin-bottom: 1rem !important;
                }

                .ac-form-wrapper ._form-label {
                  font-weight: 700 !important;
                  font-size: 0.875rem !important;
                  color: #0f172a !important;
                  margin-bottom: 0.4rem !important;
                }

                .ac-form-wrapper input[type='text'],
                .ac-form-wrapper input[type='email'],
                .ac-form-wrapper input[type='tel'],
                .ac-form-wrapper textarea,
                .ac-form-wrapper select {
                  background: #f8fafc !important;
                  border: 1px solid #e2e8f0 !important;
                  border-radius: 0.85rem !important;
                  padding: 0.9rem 1rem !important;
                  font-size: 0.92rem !important;
                  color: #0f172a !important;
                  outline: none !important;
                  box-shadow: none !important;
                }

                .ac-form-wrapper input:focus,
                .ac-form-wrapper textarea:focus,
                .ac-form-wrapper select:focus {
                  border-color: #e6007e !important;
                  box-shadow: 0 0 0 3px rgba(230, 0, 126, 0.12) !important;
                }

                .ac-form-wrapper ._submit,
                .ac-form-wrapper button[type='submit'] {
                  background: #e6007e !important;
                  color: #000 !important;
                  font-weight: 900 !important;
                  text-transform: uppercase !important;
                  border-radius: 0.9rem !important;
                  padding: 1rem !important;
                  font-size: 1rem !important;
                  line-height: 1.1 !important;
                  border: none !important;
                  box-shadow: 0 8px 20px rgba(230, 0, 126, 0.28) !important;
                }

                .ac-form-wrapper ._submit:hover,
                .ac-form-wrapper button[type='submit']:hover {
                  background: #cc1a8a !important;
                }

                .ac-form-wrapper ._form-branding {
                  margin-top: 0.75rem !important;
                  text-align: center !important;
                  font-size: 10px !important;
                  color: #94a3b8 !important;
                }

                .ac-form-wrapper .sms_consent_checkbox,
                .ac-form-wrapper ._form_element {
                  margin-bottom: 0.9rem !important;
                }

                .ac-form-wrapper .sms_consent_message {
                  font-size: 11px !important;
                  line-height: 1.45 !important;
                  color: #64748b !important;
                }

                @media (max-width: 1023px) {
                  .ac-form-wrapper ._form-title {
                    font-size: 1.1rem !important;
                  }
                }

                @media (max-width: 640px) {
                  .ac-form-wrapper ._form-title {
                    font-size: 1rem !important;
                    margin-bottom: 0.85rem !important;
                  }

                  .ac-form-wrapper input[type='text'],
                  .ac-form-wrapper input[type='email'],
                  .ac-form-wrapper input[type='tel'],
                  .ac-form-wrapper textarea,
                  .ac-form-wrapper select {
                    padding: 0.85rem 0.95rem !important;
                    font-size: 16px !important;
                  }

                  .ac-form-wrapper ._submit,
                  .ac-form-wrapper button[type='submit'] {
                    font-size: 0.95rem !important;
                    padding: 0.95rem !important;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
        
      </div>

    </main>
    
  );
}