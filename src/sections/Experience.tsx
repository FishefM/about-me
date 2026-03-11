import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { experiences } from '../data/experience';

const Experience: React.FC = () => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="experience" className="py-32 bg-zinc-900 dark:bg-zinc-900/50 rounded-2xl md:rounded-[3rem] px-6 md:px-20 text-white overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full"
      ></motion.div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-violet-400 font-mono text-sm font-bold tracking-[0.2em] uppercase text-center">Trayectoria</h2>
          <h3 className="text-4xl md:text-6xl font-black text-center">Donde he trabajado.</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, margin: "-100px" }}
          className="space-y-12"
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-8 rounded-3xl will-change-transform ${exp.current ? 'bg-violet-500/10 border-violet-500/20 hover:border-violet-500/30 hover:bg-violet-500/20' : 'hover:bg-white/5 border border-transparent hover:border-white/10'}`}
            >
              <span className="text-zinc-500 font-mono font-bold whitespace-nowrap">{exp.period}</span>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-2xl font-bold">{exp.role}</h4>
                  {exp.current && <span className="px-2 py-0.5 bg-violet-500 text-[10px] font-black uppercase rounded text-white tracking-widest">Activo</span>}
                </div>
                <h5 className="text-violet-400 font-bold text-lg">{exp.company}</h5>
                <p className="text-zinc-400 max-w-xl leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
