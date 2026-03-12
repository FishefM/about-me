import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const cvPdf = '/CV-Yucef-Hernandez.pdf';

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Show if scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          // Hide if scrolling down
          setIsVisible(false);
          setIsOpen(false); // Close mobile menu when hiding
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Sobre mí', path: '#about' },
    { name: 'Experiencia', path: '#experience' },
    { name: 'Portafolio', path: '#portfolio' },
    { name: 'Contacto', path: '#contact' },
  ];

  const getPath = (path: string) => isHomePage ? path : `/${path}`;

  const handleCVClick = () => {
    // No prevenimos el default para que el href del PDF funcione, 
    // pero usamos setTimeout para navegar a la página de CV justo después
    setTimeout(() => {
      window.location.href = '/CV';
    }, 100);
  };

  return (
    <nav
      className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Yucef.dev
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={getPath(link.path)}
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-violet-600"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={cvPdf}
              download="CV-Yucef-Hernandez.pdf"
              onClick={handleCVClick}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              <FiDownload className="text-lg" />
              <span className="font-bold">Descarga mi CV</span>
            </a>
          </div>

          {/* Mobile Action Area */}
          <div className="flex md:hidden items-center space-x-4">
            <a
              href={cvPdf}
              download="CV-Yucef-Hernandez.pdf"
              onClick={handleCVClick}
              className="flex items-center space-x-1 px-4 py-2 text-sm rounded-full bg-violet-600 font-medium text-white hover:text-violet-600 transition-colors"
            >
              <FiDownload className="text-xl" />
              <span className="font-bold">CV</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <a
                href={getPath(link.path)}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-zinc-600 dark:text-zinc-400 hover:text-violet-600 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
