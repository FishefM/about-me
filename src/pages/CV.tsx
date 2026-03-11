import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiBookOpen, FiStar, FiBriefcase, FiCpu, FiLayout } from 'react-icons/fi';
import perfilImage from '../assets/perfil.png';
import { softSkills, technicalSkills } from '../data/skills';
import { experiences } from '../data/experience';
import { projects } from '../data/portfolio';
import TechIcon from '../components/TechIcon';

const CV: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-500/5">
          <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-2xl rotate-6 -z-10 blur-xl opacity-20 animate-pulse"></div>
            <img
              src={perfilImage}
              alt="Yucef Hernández"
              className="w-full h-full object-cover rounded-2xl border-4 border-white dark:border-zinc-800 shadow-lg"
            />
          </div>

          <div className="flex-grow space-y-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                HERNÁNDEZ GARCÍA <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">YUCEF UBAYD</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-400 font-mono tracking-wider uppercase">
                Desarrollador de Software
              </h2>
            </div>

            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Soy una persona con un gran apetito del aprendizaje, me apasionan los temas de tecnología y creación de software, así como sus posibles implementaciones útiles y artísticas.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
                <a href="mailto:yucefhernandez@hotmail.com" className="hover:text-violet-600 transition-colors"><FiMail size={24} /></a>
                <a href="tel:5584516139" className="hover:text-violet-600 transition-colors"><FiPhone size={24} /></a>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Sidebar Info */}
          <div className="space-y-8">
            <motion.section variants={itemVariants} className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-3xl border border-transparent dark:border-zinc-800">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-violet-600 dark:text-violet-400 uppercase tracking-widest font-mono">
                <FiMapPin /> Contacto
              </h3>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">Email</span>
                  <span className="break-all">yucefhernandez@hotmail.com</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">Teléfono</span>
                  <span>(+52)55-84516139</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">Localidad</span>
                  <span>Iztacalco Col. Granjas CDMX México</span>
                </li>
              </ul>
            </motion.section>

            <motion.section variants={itemVariants} className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-3xl border border-transparent dark:border-zinc-800">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-violet-600 dark:text-violet-400 uppercase tracking-widest font-mono">
                <FiBookOpen /> Educación
              </h3>
              <div className="space-y-6">
                <div className="relative pl-4 border-l-2 border-violet-500/30">
                  <h4 className="font-bold text-zinc-900 dark:text-white">Estudiante de Ing. Informática</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">IPN - UPIICSA</p>
                </div>
                <div className="relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                  <h4 className="font-bold text-zinc-900 dark:text-white">Egresado CECyT 7</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">"Cuauhtémoc"</p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-3xl border border-transparent dark:border-zinc-800">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-violet-600 dark:text-violet-400 uppercase tracking-widest font-mono">
                <FiStar /> Idiomas
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Español</span>
                  <span className="text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300 rounded-full font-bold">Nativo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Inglés</span>
                  <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full font-bold">Intermedio</span>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column - Main Content */}
          <div className="md:col-span-2 space-y-10">
            {/* Technical Skills Section */}
            <motion.section variants={itemVariants} className="space-y-6">
              <h3 className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                <FiCpu className="text-violet-600" /> Habilidades Técnicas
              </h3>
              <div className="flex flex-wrap gap-3">
                {technicalSkills.map((skill, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20 rounded-xl font-bold text-sm">
                    <TechIcon name={skill} className="text-lg" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Soft Skills Section */}
            <motion.section variants={itemVariants} className="space-y-6">
              <h3 className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                <FiStar className="text-violet-600" /> Habilidades Blandas
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {softSkills.map((skill, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-3 group hover:border-violet-500/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-violet-600 group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium leading-tight">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Professional Experience Section */}
            <motion.section variants={itemVariants} className="space-y-6">
              <h3 className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                <FiBriefcase className="text-violet-600" /> Experiencia Profesional
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-violet-600 before:to-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-bold">{exp.role}</h4>
                        <p className="text-violet-600 dark:text-violet-400 font-mono text-sm font-bold">{exp.company}</p>
                      </div>
                      <span className="text-xs font-black bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full uppercase tracking-widest mt-2 sm:mt-0 w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Featured Projects Section - Full Width */}
        <motion.section variants={itemVariants} className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h3 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight">
                <FiLayout className="text-violet-600" /> Proyectos Destacados
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                Una selección de trabajos representativos en desarrollo web, móvil e IoT.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] space-y-6 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold text-xl group-hover:text-violet-600 transition-colors">{project.title}</h4>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed relative z-10">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 relative z-10">
                  {project.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      <TechIcon name={tag} className="text-sm" />
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Decorative background element for the card */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl group-hover:bg-violet-600/10 transition-colors"></div>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default CV;
