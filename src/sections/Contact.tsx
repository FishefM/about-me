import React from 'react';
import { FiMail } from 'react-icons/fi';

const Contact: React.FC = () => (
  <section id="contact" className="py-16 md:py-32 text-center px-4 sm:px-6">
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div className="relative inline-block w-full">
        <h2 className="text-violet-600 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4">¿Te interesa mi perfil?</h2>
        <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">Charlemos sobre tu nueva <span className="text-zinc-400 italic">App.</span></h3>
      </div>

      <p className="text-base sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2">
        Actualmente estoy abierto a colaboraciones freelance o posiciones de medio tiempo.
        Si buscas a alguien capaz de entregar soluciones tecnológicas de calidad escríbeme.
      </p>

      <div className="pt-6 sm:pt-12 flex flex-col items-center gap-8 w-full">
        <a
          href="mailto:yucefhernandez@hotmail.com"
          className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-violet-600 text-white font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-violet-500/40 text-center"
        >
          <span className="relative z-10 text-lg sm:text-xl inline-flex items-center gap-2">
            <span>Enviar mensaje</span>
            <FiMail className="text-xl" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-fuchsia-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </a>

        <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12 w-full justify-center">
          {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map(social => (
            <a key={social} href="#" className="text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-violet-600 transition-colors py-1 px-2">
              {social}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
