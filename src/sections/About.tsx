import React from 'react';
import TechIcon from '../components/TechIcon';
import perfilImage from '../assets/perfil.png';
import { technicalSkills } from '../data/skills';

const About: React.FC = () => (
  <section id="about" className="py-16 md:py-32 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="relative order-2 lg:order-1 max-w-sm sm:max-w-md mx-auto w-full lg:max-w-none">
        <div className="aspect-square rounded-3xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-2xl rotate-2 sm:rotate-3 transition-transform hover:rotate-0 duration-500">
          {/* Placeholder for Profile Image */}
          <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center grayscale-25 hover:grayscale-0 transition-all">
            <img src={perfilImage} alt="Perfil" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </div>

      <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-violet-600 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">Mi Historia</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black">Un poco sobre mí.</h3>
        </div>

        <div className="space-y-4 sm:space-y-6 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          <p>
            Siempre me he interesado por las aplicaciones de la ciencia en la industria de la
            <span className="text-zinc-900 dark:text-white font-semibold"> Tecnología</span>.
          </p>
          <p>
            Mi enfoque combina la <span className="text-violet-500 font-medium">rigurosidad técnica</span> con una sensibilidad estética, asegurando que cada una de mis entregas apoye fructíferamente a satisfacer las necesidades de mis clientes.
          </p>

          <div className="pt-2 sm:pt-4 grid grid-cols-2 gap-3 sm:gap-4">
            {technicalSkills.map(skill => (
              <div key={skill} className="flex items-center gap-2.5 sm:gap-3 group">
                <TechIcon name={skill} className="text-lg sm:text-xl text-violet-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
