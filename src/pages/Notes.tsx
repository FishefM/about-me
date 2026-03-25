import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FiSearch, FiMenu, FiX, FiFileText, FiChevronRight, FiHome } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface Note {
  slug: string;
  title: string;
  content: string;
  path: string; // Ruta completa relativa a content/notes
}

interface Folder {
  name: string;
  path: string;
  files: Note[];
  folders: { [key: string]: Folder };
  isOpen?: boolean;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folderTree, setFolderTree] = useState<Folder | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['root']));
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(true);
  const lastScrollY = useRef(0);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const selectedNoteSlug = searchParams.get('note');

  // Lógica para ocultar/mostrar búsqueda al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;
      
      const currentScrollY = mainContentRef.current.scrollTop;
      
      // Solo activamos la lógica si hemos scrolleado un mínimo (ej. 10px)
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowMobileSearch(false);
      } else {
        setShowMobileSearch(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    const mainElement = mainContentRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading]); // Se vuelve a ejecutar cuando termina de cargar

  // Resetear visibilidad y scroll al cambiar de nota
  useEffect(() => {
    setShowMobileSearch(true);
    lastScrollY.current = 0;
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [selectedNoteSlug]);

  useEffect(() => {
    const loadNotes = async () => {
      // Cargamos todas las notas incluyendo subdirectorios
      const modules = import.meta.glob('../content/notes/**/*.md', { query: '?raw', import: 'default' });
      const loadedNotes: Note[] = [];

      for (const path in modules) {
        // Ignoramos archivos en carpetas ocultas como .obsidian
        if (path.includes('/.')) continue;

        const content = await modules[path]() as string;
        // Obtenemos el slug (nombre del archivo sin extensión)
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        // Obtenemos la ruta relativa desde content/notes
        const relativePath = path.replace('../content/notes/', '').replace('.md', '');
        
        const titleMatch = content.match(/^#\s+(.*)$/m);
        const title = titleMatch ? titleMatch[1] : slug;
        
        loadedNotes.push({ slug, title, content, path: relativePath });
      }

      setNotes(loadedNotes);
      
      // Construimos el árbol de carpetas
      const tree: Folder = { name: 'root', path: '', files: [], folders: {} };
      
      loadedNotes.forEach(note => {
        const parts = note.path.split('/');
        let currentFolder = tree;
        
        // Recorremos las partes de la ruta (menos el nombre del archivo)
        for (let i = 0; i < parts.length - 1; i++) {
          const folderName = parts[i];
          if (!currentFolder.folders[folderName]) {
            currentFolder.folders[folderName] = {
              name: folderName,
              path: parts.slice(0, i + 1).join('/'),
              files: [],
              folders: {}
            };
          }
          currentFolder = currentFolder.folders[folderName];
        }
        currentFolder.files.push(note);
      });

      setFolderTree(tree);

      // Si no hay nota seleccionada, abrimos la primera nota que encontremos
      if (!selectedNoteSlug && loadedNotes.length > 0) {
        setSearchParams({ note: loadedNotes[0].slug }, { replace: true });
      }
      setLoading(false);
    };

    loadNotes();
  }, [selectedNoteSlug, setSearchParams]);

  const toggleFolder = (path: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const selectedNote = useMemo(() => {
    return notes.find(n => n.slug === selectedNoteSlug) || null;
  }, [notes, selectedNoteSlug]);

  const fuse = useMemo(() => {
    return new Fuse(notes, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'content', weight: 0.3 }
      ],
      threshold: 0.4,
      ignoreLocation: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [notes]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery) return null; // Solo mostramos lista plana si hay búsqueda
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, fuse]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNoteSelect = (slug: string) => {
    setSearchParams({ note: slug });
    setIsSidebarOpen(false);
  };

  const renderFolder = (folder: Folder, level: number = 0) => {
    const isOpen = openFolders.has(folder.path || 'root');
    const hasContent = Object.keys(folder.folders).length > 0 || folder.files.length > 0;

    if (!hasContent && folder.path !== '') return null;

    return (
      <div key={folder.path || 'root'} className="flex flex-col">
        {folder.path !== '' && (
          <button
            onClick={() => toggleFolder(folder.path)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-left text-zinc-500 dark:text-zinc-400 transition-colors"
            style={{ paddingLeft: `${(level * 12) + 12}px` }}
          >
            <FiChevronRight className={`shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            <span className="text-xs font-semibold uppercase tracking-wider">{folder.name}</span>
          </button>
        )}
        
        {isOpen && (
          <div className="flex flex-col mt-1">
            {/* Primero mostramos subcarpetas */}
            {Object.values(folder.folders)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(subFolder => renderFolder(subFolder, level + 1))}
            
            {/* Luego mostramos archivos */}
            {folder.files
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(note => (
                <button
                  key={note.slug}
                  onClick={() => handleNoteSelect(note.slug)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${selectedNoteSlug === note.slug
                      ? 'bg-violet-600 text-white'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}
                  `}
                  style={{ paddingLeft: `${((level + (folder.path === '' ? 0 : 1)) * 12) + 12}px` }}
                >
                  <FiFileText className="shrink-0" />
                  <span className="truncate text-sm font-medium">{note.title}</span>
                </button>
              ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Barra de búsqueda móvil (Flotante y Centrada) */}
      <div 
        className={`
          md:hidden fixed top-6 inset-x-0 z-50 flex justify-center px-6 pointer-events-none transition-transform duration-300
          ${showMobileSearch ? 'translate-y-0' : '-translate-y-24'}
        `}
      >
        <div className="w-full max-w-sm pointer-events-auto">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-600 transition-colors" />
            <input
              type="text"
              placeholder="Buscar notas..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value && !isSidebarOpen) setIsSidebarOpen(true);
              }}
              className="w-full pl-12 pr-4 py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl text-sm focus:ring-2 focus:ring-violet-600 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Botón menú móvil */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-violet-600 text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-0 z-40 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
          w-full md:w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full pt-20 md:pt-0">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Mis Notas</h2>
              <Link
                to="/"
                className="p-2 text-zinc-500 hover:text-violet-600 transition-colors"
                title="Volver al inicio"
              >
                <FiHome size={20} />
              </Link>
            </div>
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar notas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-violet-600 transition-all"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            {searchQuery ? (
              // Vista de búsqueda (plana)
              <div className="flex flex-col gap-1">
                {filteredNotes && filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <button
                      key={note.slug}
                      onClick={() => handleNoteSelect(note.slug)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                        ${selectedNoteSlug === note.slug
                          ? 'bg-violet-600 text-white'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}
                      `}
                    >
                      <FiFileText className="shrink-0" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium">{note.title}</span>
                        <span className="truncate text-[10px] opacity-60 italic">{note.path}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-500 text-sm">
                    No se encontraron notas
                  </div>
                )}
              </div>
            ) : (
              // Vista de carpetas (árbol)
              folderTree && renderFolder(folderTree)
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        ref={mainContentRef}
        className="flex-1 overflow-y-auto p-4 pt-24 md:p-8 lg:p-12 md:pt-8"
      >
        <div className="max-w-4xl mx-auto">
          {selectedNote ? (
            <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MarkdownRenderer content={selectedNote.content} allNotes={notes} />
            </article>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
              <FiFileText size={48} className="mb-4 opacity-20" />
              <p>Selecciona una nota para leer</p>
            </div>
          )}
        </div>
      </main>

      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}
    </div>
  );
};

export default Notes;
