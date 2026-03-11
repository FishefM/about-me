import React from 'react';
import TechIcon from '../components/TechIcon';

const Hero: React.FC = () => (
  <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    {/* Background Decorative Blobs */}
    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

    <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-1000">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </span>
        Disponible para nuevos proyectos
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight leading-[1.1]">
        Adapta la <span className="text-violet-600 italic">tecnología</span> a las necesidades de tu <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">negocio.</span>
      </h1>

      <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
        Soy <span className="text-zinc-900 dark:text-white underline decoration-violet-500 decoration-2 underline-offset-4">Yucef</span>, 
        Desarrollador Web y Móvil especializado en crear software ¡A la medida!
      </p>

      {/* Tech Stack Row */}
      <div className="flex flex-wrap justify-center items-center gap-6 pt-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Vite', 'Kotlin'].map((tech) => (
          <div key={tech} className="flex flex-col items-center gap-2">
            <TechIcon name={tech} className="text-3xl" />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center items-center">
        <a href="#portfolio" className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-zinc-500/20">
          Explorar mi trabajo
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
        </a>
        <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95">
          Hablemos
        </a>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
      <div className="w-1 h-12 rounded-full bg-gradient-to-b from-violet-600 to-transparent"></div>
    </div>
  </section>
);

export default Hero;
