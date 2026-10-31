import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiSearch, 
  FiGithub, 
  FiExternalLink, 
  FiCheckCircle, 
  FiCalendar, 
  FiCode, 
  FiLayers,
  FiTerminal,
  FiX,
  FiMail,
  FiShoppingBag,
  FiVideo,
  FiBookOpen
} from 'react-icons/fi';
import TechIcon from '../components/TechIcon';
import { projects, type ProjectItem } from '../data/portfolio';

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

const Dev: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];
    return cats;
  }, []);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'Todos' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.desc.toLowerCase().includes(q) ||
        (project.longDesc && project.longDesc.toLowerCase().includes(q)) ||
        project.tags.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Top Navigation / Breadcrumb */}
      <div className="mb-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs sm:text-sm font-semibold">
          <FiTerminal className="text-sm" />
          <span>Módulo /dev • Desarrollos & Ingeniería</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            Proyectos y <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Desarrollos.</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Explora a detalle la arquitectura, tecnologías aplicadas, retos técnicos resueltos y código fuente de cada uno de mis proyectos de software y hardware.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="block text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">{projects.length}</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">Proyectos documentados</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="block text-2xl sm:text-3xl font-black text-fuchsia-600 dark:text-fuchsia-400">{categories.length - 1}</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">Áreas de especialidad</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="block text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">100%</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">Responsive & Mobile First</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="block text-2xl sm:text-3xl font-black text-fuchsia-600 dark:text-fuchsia-400">Full</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">Web, Móvil & IoT</span>
          </div>
        </div>
      </motion.div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-1 hidden sm:inline-block">Filtrar:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-base" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tecnología, título..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-violet-500 text-zinc-900 dark:text-zinc-100 transition-colors shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Limpiar búsqueda"
            >
              <FiX />
            </button>
          )}
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto text-2xl">
            <FiSearch />
          </div>
          <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">No se encontraron proyectos</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            No hay desarrollos que coincidan con los criterios de búsqueda actuales. Intenta limpiar los filtros.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
            className="px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl hover:bg-violet-700 transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {filteredProjects.map((project: ProjectItem) => (
            <motion.div
              key={project.id || project.title}
              variants={itemVariants}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 md:p-10 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/5 transition-all space-y-8 relative overflow-hidden"
            >
              {/* Card Top: Category, Status, Year & Icon */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20">
                    {project.category}
                  </span>
                  {project.status && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                      ● {project.status}
                    </span>
                  )}
                  {project.year && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 pl-1">
                      <FiCalendar className="text-zinc-400" />
                      {project.year}
                    </span>
                  )}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl shrink-0 self-start sm:self-auto overflow-hidden">
                  {renderProjectIcon(project.image, project.title)}
                </div>
              </div>

              {/* Title & Detailed Description */}
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
                  {project.title}
                </h3>
                {project.role && (
                  <p className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                    Rol: {project.role}
                  </p>
                )}
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.longDesc || project.desc}
                </p>
              </div>

              {/* Highlights / Technical Features */}
              {((project.highlights && project.highlights.length > 0) || (project.features && project.features.length > 0)) && (
                <div className="grid md:grid-cols-2 gap-6 bg-zinc-50 dark:bg-zinc-950/50 p-5 sm:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <FiCode className="text-violet-500" />
                        Aspectos Técnicos Clave
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <FiCheckCircle className="text-violet-500 shrink-0 mt-0.5 text-sm" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.features && project.features.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <FiLayers className="text-fuchsia-500" />
                        Funcionalidades Principales
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shrink-0 mt-2"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Technologies & Action Links */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 pt-2">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 items-center">
                  {project.tags.map(tag => (
                    <div 
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold"
                    >
                      <TechIcon name={tag} className="text-sm text-violet-500" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>

                {/* External Action Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-zinc-500/10"
                    >
                      <FiGithub className="text-base" />
                      <span>Ver Código</span>
                    </a>
                  )}

                  {project.links?.demo && (
                    <Link
                      to={project.links.demo}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 ${
                        project.id === 'kallyfit'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 shadow-emerald-500/20'
                          : 'border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-violet-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <FiExternalLink className="text-base" />
                      <span>{project.id === 'kallyfit' ? 'Conoce la App' : 'Demo'}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-transparent border border-violet-500/20">
        <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-3">
          ¿Tienes una idea o proyecto en mente?
        </h3>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-6">
          Desarrollo software a la medida: desde aplicaciones web escalables hasta soluciones móviles y proyectos de IoT.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="mailto:yucefhernandez@hotmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/20 text-center text-sm"
          >
            <FiMail className="text-base" />
            <span>Contactar por correo</span>
          </a>
          <Link
            to="/#contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-center text-sm"
          >
            Ver formulario de contacto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dev;
