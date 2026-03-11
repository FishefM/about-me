import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import TechIcon from '../components/TechIcon';
import { projects } from '../data/portfolio';
import monoImage from '../assets/mono.jpg';

const Portfolio: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="portfolio" className="py-32 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="space-y-4">
            <h2 className="text-violet-600 font-mono text-sm font-bold tracking-[0.2em] uppercase">Portafolio</h2>
            <h3 className="text-4xl md:text-6xl font-black">Proyectos Seleccionados.</h3>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-lg">
            Una colección de mis proyectos más representativos.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 will-change-transform"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{p.category}</span>
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  {typeof p.image === 'string' ? (p.image) : <img src={p.image.plantitas} alt={p.title} className="w-full h-full object-cover rounded-2xl" />}
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-3 group-hover:text-violet-600 transition-colors">{p.title}</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">{p.desc}</p>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {p.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-1.5 group/tag">
                    <TechIcon name={tag} className="text-sm text-zinc-400 group-hover/tag:text-violet-500 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 group-hover/tag:text-zinc-600 dark:group-hover/tag:text-zinc-200 transition-colors">{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.2 }}
          className="text-center pt-8"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-bold text-zinc-900 dark:text-white hover:text-violet-600 transition-colors border-b-2 border-violet-600 pb-1"
          >
            Ver todos los proyectos en GitHub
          </button>
        </motion.div>
      </div>

      {/* GitHub Provisional Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl max-w-md w-full border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all z-10"
            >
              ✕
            </button>
            <div className="p-8 text-center space-y-4">
              <h4 className="text-2xl font-bold">¡Hey!</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Que ves pinche chismosooooo.
              </p>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-inner border border-zinc-100 dark:border-zinc-800">
                <img src={monoImage} alt="GitHub provisional" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
