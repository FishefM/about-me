import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { 
  FiInfo, 
  FiAlertTriangle, 
  FiZap, 
  FiCheckCircle, 
  FiHelpCircle, 
  FiXCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiEdit3,
  FiMessageSquare,
  FiCopy,
  FiCheck
} from 'react-icons/fi';
import Mermaid from './Mermaid';

interface Note {
  slug: string;
  title: string;
  content: string;
}

interface MarkdownRendererProps {
  content: string;
  allNotes?: Note[];
  imageMap?: Record<string, string>;
}

interface CalloutTypeDefinition {
  icon: IconType;
  color: string;
  label: string;
}

const CALLOUT_TYPES: Record<string, CalloutTypeDefinition> = {
  note: { icon: FiEdit3, color: 'blue', label: 'Nota' },
  info: { icon: FiInfo, color: 'blue', label: 'Información' },
  todo: { icon: FiCheckCircle, color: 'blue', label: 'Por hacer' },
  tip: { icon: FiZap, color: 'emerald', label: 'Consejo' },
  hint: { icon: FiZap, color: 'emerald', label: 'Pista' },
  important: { icon: FiAlertCircle, color: 'emerald', label: 'Importante' },
  success: { icon: FiCheckCircle, color: 'emerald', label: 'Éxito' },
  check: { icon: FiCheckCircle, color: 'emerald', label: 'Hecho' },
  done: { icon: FiCheckCircle, color: 'emerald', label: 'Completado' },
  question: { icon: FiHelpCircle, color: 'amber', label: 'Pregunta' },
  help: { icon: FiHelpCircle, color: 'amber', label: 'Ayuda' },
  faq: { icon: FiHelpCircle, color: 'amber', label: 'FAQ' },
  warning: { icon: FiAlertTriangle, color: 'orange', label: 'Advertencia' },
  caution: { icon: FiAlertTriangle, color: 'orange', label: 'Precaución' },
  attention: { icon: FiAlertTriangle, color: 'orange', label: 'Atención' },
  failure: { icon: FiXCircle, color: 'red', label: 'Fallo' },
  fail: { icon: FiXCircle, color: 'red', label: 'Fallo' },
  missing: { icon: FiXCircle, color: 'red', label: 'Falta' },
  danger: { icon: FiAlertTriangle, color: 'red', label: 'Peligro' },
  error: { icon: FiXCircle, color: 'red', label: 'Error' },
  bug: { icon: FiAlertCircle, color: 'red', label: 'Error' },
  example: { icon: FiFileText, color: 'violet', label: 'Ejemplo' },
  quote: { icon: FiMessageSquare, color: 'zinc', label: 'Cita' },
  cite: { icon: FiMessageSquare, color: 'zinc', label: 'Cita' },
};

interface CalloutMetadata {
  type: string;
  title: React.ReactNode;
}

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
  inline?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language, className, inline, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const codeString = Array.isArray(children) 
      ? children.join('') 
      : String(children).replace(/\n$/, '');

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = codeString;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) setCopied(true);
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const match = /language-(\w+)/.exec(className || '');
  const lang = language || (match ? match[1] : '');

  if (lang === 'mermaid') {
    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
  }

  if (inline || !lang) {
    return (
      <code 
        className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-violet-600 dark:text-violet-400 font-mono text-[0.9em] before:content-none after:content-none" 
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 transition-all duration-200 z-20 shadow-md border border-white/10"
        title="Copiar código"
      >
        {copied ? <FiCheck size={16} className="text-emerald-500" /> : <FiCopy size={16} />}
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={lang}
        PreTag="div"
        className="rounded-lg !my-0"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, allNotes = [], imageMap = {} }) => {
  // Función para procesar resaltados de Obsidian ==texto==
  const processHighlights = (text: string): string => {
    return text.replace(/==([^=]+)==/g, '<mark>$1</mark>');
  };

  // Función para procesar transclusiones ![[Note Name]] e imágenes ![[Image Name]]
  const processTransclusionsAndImages = (text: string, depth = 0): string => {
    // Límite de seguridad para evitar bucles infinitos (máximo 3 niveles)
    if (depth > 3) return text;

    return text.replace(/!\[\[([^\]]+)\]\]/g, (match, target) => {
      const targetName = target.trim();

      // 1. Intentamos buscar si es una imagen en el mapa de imágenes
      const imageUrl = imageMap[targetName];
      if (imageUrl) {
        return `![${targetName}](${imageUrl})`;
      }

      // 2. Si no es imagen, buscamos si es una nota para transclusión
      const targetNote = allNotes.find(n => n.slug.toLowerCase() === targetName.toLowerCase() || n.slug === targetName);

      if (targetNote) {
        // Quitamos el título principal si existe (# Título) para no duplicarlo
        const importedContent = targetNote.content.replace(/^#\s+.*$/m, '').trim();
        return processTransclusionsAndImages(importedContent, depth + 1);
      }
      
      return `> [!WARNING] Archivo no encontrado: ${targetName}`;
    });
  };

  // Función para corregir rutas de imágenes estándar que apunten a adjuntos
  const fixStandardImages = (text: string) => {
    return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, path) => {
      // Si el path contiene 'adjuntos/', intentamos resolverlo con el nombre del archivo
      if (path.includes('adjuntos/')) {
        const filename = decodeURIComponent(path.split('/').pop() || '');
        const imageUrl = imageMap[filename];
        if (imageUrl) {
          return `![${alt}](${imageUrl})`;
        }
      }
      return match;
    });
  };

  // Función para emular WikiLinks [[Note Name]] o [[Note Name|Alias]]
  const processWikiLinks = (text: string) => {
    return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target, alias) => {
      const targetName = target.trim();
      const title = alias || targetName;
      
      // Buscamos si la nota existe por su nombre de archivo
      const note = allNotes.find(n => n.slug.toLowerCase() === targetName.toLowerCase() || n.slug === targetName);
      
      if (note) {
        return `[${title}](/notes?note=${note.slug})`;
      }
      
      // Si no existe, creamos un link al posible slug (estilo tradicional)
      const fallbackSlug = targetName.replace(/\s+/g, '-').toLowerCase();
      return `[${title}](/notes?note=${fallbackSlug})`;
    });
  };

  // Función para identificar callouts y marcarlos con un elemento HTML que rehype-raw procesará
  const processCallouts = (text: string) => {
    return text.replace(/^>\s*\[!(\w+)\]\s*(.*)$/gm, (_match, type, title) => {
      return `> <callout-meta data-type="${type.toLowerCase()}">${title || ''}</callout-meta>`;
    });
  };

  const highlightedContent = processHighlights(content);
  const transcludedContent = processTransclusionsAndImages(highlightedContent);
  const fixedImagesContent = fixStandardImages(transcludedContent);
  const calloutContent = processCallouts(fixedImagesContent);
  const processedContent = processWikiLinks(calloutContent);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-transparent prose-mark:bg-amber-200 dark:prose-mark:bg-amber-500/30 prose-mark:text-amber-900 dark:prose-mark:text-amber-100 prose-mark:px-1 prose-mark:rounded-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          blockquote({ children }: { children: React.ReactNode }) {
            // Función recursiva para buscar el marcador de callout en el árbol de nodos
            const findCalloutMetadata = (nodes: React.ReactNode): CalloutMetadata | null => {
              let metadata: CalloutMetadata | null = null;
              React.Children.forEach(nodes, (node) => {
                if (metadata) return;
                if (React.isValidElement(node) && node.type === 'callout-meta') {
                  const props = node.props as { 'data-type': string; children: React.ReactNode };
                  metadata = {
                    type: props['data-type'],
                    title: props.children
                  };
                } else if (React.isValidElement(node) && node.props.children) {
                  metadata = findCalloutMetadata(node.props.children as React.ReactNode);
                }
              });
              return metadata;
            };

            const metadata = findCalloutMetadata(children);

            if (metadata) {
              const type = metadata.type;
              const customTitle = metadata.title;
              const callout = CALLOUT_TYPES[type] || CALLOUT_TYPES.note;
              const Icon = callout.icon;

              // Función para limpiar el marcador del árbol de renderizado
              const cleanNodes = (nodes: React.ReactNode): React.ReactNode => {
                return React.Children.map(nodes, (node) => {
                  if (React.isValidElement(node) && node.type === 'callout-meta') return null;
                  
                  if (React.isValidElement(node) && node.props.children) {
                    const cleanedChildren = cleanNodes(node.props.children as React.ReactNode);
                    // Si el nodo quedó vacío (como un párrafo que solo tenía el meta), lo eliminamos
                    if (React.Children.count(cleanedChildren) === 0 && node.type === 'p') return null;
                    
                    return React.cloneElement(node, {
                      children: cleanedChildren
                    } as React.Attributes & { children: React.ReactNode });
                  }
                  return node;
                });
              };

              const cleanedBody = cleanNodes(children);

              const colorMap: Record<string, string> = {
                blue: 'border-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-100',
                emerald: 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100',
                amber: 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-100',
                orange: 'border-orange-500 bg-orange-500/10 text-orange-900 dark:text-orange-100',
                red: 'border-red-500 bg-red-500/10 text-red-900 dark:text-red-100',
                violet: 'border-violet-500 bg-violet-500/10 text-violet-900 dark:text-violet-100',
                zinc: 'border-zinc-500 bg-zinc-500/10 text-zinc-900 dark:text-zinc-100',
              };

              return (
                <div className={`my-6 border-l-4 rounded-r-lg overflow-hidden not-italic shadow-sm border-opacity-100 ${colorMap[callout.color]}`}>
                  <div className="flex items-center gap-2 px-4 py-2 font-bold bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                    <Icon className="shrink-0" size={18} />
                    <span className="text-sm uppercase tracking-wide">
                      {customTitle && React.Children.count(customTitle) > 0 ? customTitle : callout.label}
                    </span>
                  </div>
                  <div className="px-4 py-2 prose-p:my-2 prose-blockquote:before:content-none prose-blockquote:after:content-none prose-blockquote:border-none prose-blockquote:pl-0">
                    {cleanedBody}
                  </div>
                </div>
              );
            }

            return <blockquote className="border-l-4 border-zinc-200 dark:border-zinc-800 pl-4 my-6 italic text-zinc-600 dark:text-zinc-400">{children}</blockquote>;
          },
          // Usamos Link de react-router para enlaces internos
          a({ href, children, ...props }) {
            const isInternal = href?.startsWith('/notes?note=') || href?.startsWith('#');
            
            if (isInternal && href?.startsWith('/notes')) {
              return (
                <Link to={href} className="text-violet-600 dark:text-violet-400 no-underline hover:underline font-medium">
                  {children}
                </Link>
              );
            }
            
            return (
              <a 
                href={href} 
                target={href?.startsWith('http') ? '_blank' : undefined} 
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-violet-600 dark:text-violet-400 no-underline hover:underline font-medium"
                {...props}
              >
                {children}
              </a>
            );
          },
          code({ inline, className, children, ...props }) {
            return (
              <CodeBlock 
                inline={inline} 
                className={className} 
                {...props} 
              >
                {children}
              </CodeBlock>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
