import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';
import Mermaid from './Mermaid';

interface Note {
  slug: string;
  title: string;
  content: string;
}

interface MarkdownRendererProps {
  content: string;
  allNotes?: Note[];
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, allNotes = [] }) => {
  // Función para procesar transclusiones ![[Note Name]] (importar contenido)
  const processTransclusions = (text: string, depth = 0): string => {
    // Límite de seguridad para evitar bucles infinitos (máximo 3 niveles)
    if (depth > 3) return text;

    return text.replace(/^!\[\[([^\]]+)\]\]/gm, (_match, target) => {
      const targetName = target.trim();
      // Buscamos la nota que coincida exactamente con el nombre del archivo (slug)
      // Obsidian es insensible a mayúsculas/minúsculas en la búsqueda pero prefiere el nombre del archivo
      const targetNote = allNotes.find(n => n.slug.toLowerCase() === targetName.toLowerCase() || n.slug === targetName);

      if (targetNote) {
        // Quitamos el título principal si existe (# Título) para no duplicarlo
        let importedContent = targetNote.content.replace(/^#\s+.*$/m, '').trim();
        return processTransclusions(importedContent, depth + 1);
      }
      
      return `> [!WARNING] Archivo no encontrado: ${targetName}.md`;
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

  const transcludedContent = processTransclusions(content);
  const processedContent = processWikiLinks(transcludedContent);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-transparent">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Usamos Link de react-router para enlaces internos
          a({ node, href, children, ...props }: any) {
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
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (language === 'mermaid') {
              return <Mermaid chart={String(children).replace(/\n$/, '')} />;
            }

            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                className="rounded-lg !my-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
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
