import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';
import Mermaid from './Mermaid';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Función para emular WikiLinks [[Note Name]] o [[Note Name|Alias]]
  const processWikiLinks = (text: string) => {
    return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target, alias) => {
      const title = alias || target;
      // Convertimos el objetivo en un slug (minúsculas, espacios a guiones)
      const slug = target.trim().toLowerCase().replace(/\s+/g, '-');
      return `[${title}](/notes?note=${slug})`;
    });
  };

  const processedContent = processWikiLinks(content);

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
