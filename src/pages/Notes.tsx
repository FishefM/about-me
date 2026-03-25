import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiMenu, FiX, FiFileText, FiChevronRight, FiHome } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface Note {
  slug: string;
  title: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedNoteSlug = searchParams.get('note');

  useEffect(() => {
    const loadNotes = async () => {
      const modules = import.meta.glob('../content/notes/*.md', { query: '?raw', import: 'default' });
      const loadedNotes: Note[] = [];

      for (const path in modules) {
        const content = await modules[path]() as string;
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const titleMatch = content.match(/^#\s+(.*)$/m);
        const title = titleMatch ? titleMatch[1] : slug;
        loadedNotes.push({ slug, title, content });
      }

      setNotes(loadedNotes);
      
      // Si no hay nota en la URL pero hay notas cargadas, seleccionamos la primera
      if (!selectedNoteSlug && loadedNotes.length > 0) {
        setSearchParams({ note: loadedNotes[0].slug }, { replace: true });
      }
      setLoading(false);
    };

    loadNotes();
  }, [selectedNoteSlug, setSearchParams]);

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
    if (!searchQuery) return notes;
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, notes, fuse]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNoteSelect = (slug: string) => {
    setSearchParams({ note: slug });
    setIsSidebarOpen(false);
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
        <div className="flex flex-col h-full">
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
            <div className="relative">
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
            {filteredNotes.length > 0 ? (
              <ul className="space-y-1">
                {filteredNotes.map((note) => (
                  <li key={note.slug}>
                    <button
                      onClick={() => handleNoteSelect(note.slug)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                        ${selectedNoteSlug === note.slug
                          ? 'bg-violet-600 text-white'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}
                      `}
                    >
                      <FiFileText className="shrink-0" />
                      <span className="truncate text-sm font-medium">{note.title}</span>
                      <FiChevronRight className={`ml-auto shrink-0 transition-transform ${selectedNoteSlug === note.slug ? 'rotate-90' : ''}`} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-zinc-500 text-sm">
                No se encontraron notas
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {selectedNote ? (
            <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MarkdownRenderer content={selectedNote.content} />
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
