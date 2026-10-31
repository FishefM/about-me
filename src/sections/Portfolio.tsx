import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { FiExternalLink, FiShoppingBag, FiVideo, FiBookOpen } from 'react-icons/fi';
import TechIcon from '../components/TechIcon';
import { projects } from '../data/portfolio';

const renderProjectIcon = (img: string | { [key: string]: string }, title: string) => {
  if (typeof img === 'object') {
    const src = Object.values(img)[0];
    return <img src={src} alt={title} className="w-full h-full object-cover rounded-2xl" />;
  }
  if (img === 'shopping') return <FiShoppingBag className="text-xl text-violet-500" />;
  if (img === 'video') return <FiVideo className="text-xl text-violet-500" />;
  if (img === 'notes') return <FiBookOpen className="text-xl text-violet-500" />;
  if (img.startsWith('/') || img.includes('.')) {
    return <img src={img} alt={title} className="w-full h-full object-cover rounded-2xl" />;
  }
  return null;
};

const Portfolio: React.FC = () => {
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
    <section id="portfolio" className="py-16 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-8"
        >
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-violet-600 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">Portafolio</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black">Proyectos Seleccionados.</h3>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-base md:text-lg">
            Una colección de mis proyectos más representativos.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 will-change-transform"
            >
              <div>
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{p.category}</span>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all shrink-0 overflow-hidden">
                    {renderProjectIcon(p.image, p.title)}
                  </div>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-violet-600 transition-colors">{p.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">{p.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {p.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-1.5 group/tag">
                    <TechIcon name={tag} className="text-xs sm:text-sm text-zinc-400 group-hover/tag:text-violet-500 transition-colors" />
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
          viewport={{ once: true, amount: 0.2 }}
          className="text-center pt-6 sm:pt-8"
        >
          <Link
            to="/dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-violet-600 transition-colors border-b-2 border-violet-600 pb-1 group"
          >
            <span>Ver más a detalle mis proyectos y desarrollos</span>
            <FiExternalLink className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
