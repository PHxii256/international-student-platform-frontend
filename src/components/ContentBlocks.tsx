/**
 * Content Block Renderer
 * Renders various types of content blocks from Strapi CMS
 */

import { ContentBlock as ContentBlockType } from '../types/strapi';
import { getStrapiMediaUrl } from '../services/cmsApi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ContentBlocksProps {
  blocks?: ContentBlockType[];
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => (
        <section key={idx} id={block.anchor || undefined} className="scroll-mt-28">
          <ContentBlock block={block} />
        </section>
      ))}
    </div>
  );
}

interface ContentBlockProps {
  block: ContentBlockType;
}

function ContentBlock({ block }: ContentBlockProps) {
  const component = block.__component;
  const safeContent = component === 'shared.rich-text' ? sanitizeHtml(block.body) : '';
  const renderHeading = (Tag: 'h1' | 'h2' | 'h3', className: string) => {
    return ({ children, ...props }: any) => {
      const text = getTextContent(children);
      const id = text ? slugify(text) : undefined;

      return <Tag id={id} className={className} {...props}>{children}</Tag>;
    };
  };

  const markdownComponents = {
    h1: renderHeading('h1', 'text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white scroll-mt-28'),
    h2: renderHeading('h2', 'text-2xl md:text-3xl font-bold mt-7 mb-3 text-gray-900 dark:text-white scroll-mt-28'),
    h3: renderHeading('h3', 'text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white scroll-mt-28'),
    p: (props: any) => <p className="text-base md:text-lg leading-8 mb-4 text-gray-800 dark:text-gray-200" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-base md:text-lg text-gray-800 dark:text-gray-200" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-base md:text-lg text-gray-800 dark:text-gray-200" {...props} />,
    li: (props: any) => <li className="leading-7" {...props} />,
    a: (props: any) => <a className="text-green-700 dark:text-green-400 underline hover:opacity-80" {...props} />,
    table: ({ children }: any) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
        <table className="min-w-full text-left text-sm md:text-base">{children}</table>
      </div>
    ),
    thead: (props: any) => <thead className="bg-gray-100 dark:bg-slate-800" {...props} />,
    tbody: (props: any) => <tbody className="bg-white dark:bg-slate-900" {...props} />,
    tr: (props: any) => <tr className="border-b border-gray-200 dark:border-slate-700" {...props} />,
    th: (props: any) => <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white" {...props} />,
    td: (props: any) => <td className="px-4 py-3 text-gray-800 dark:text-gray-200" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-green-500 pl-4 my-5 italic text-gray-700 dark:text-gray-300" {...props} />,
    pre: (props: any) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
    code: (props: any) => <code className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm" {...props} />,
  };

  switch (component) {
    case 'shared.rich-text':
      return (
        <div className="max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {safeContent}
          </ReactMarkdown>
        </div>
      );
    
    case 'shared.quote':
      return (
        <figure className="border-l-4 border-green-500 pl-4 my-4">
          {block.title && <figcaption className="text-sm font-semibold uppercase tracking-wide text-green-700 dark:text-green-400 mb-2">{block.title}</figcaption>}
          <blockquote className="italic text-gray-700 dark:text-gray-300">
            <p className="text-lg mb-2">{block.body}</p>
          </blockquote>
        </figure>
      );
    
    case 'shared.media': {
      const file = block.file;

      if (!file?.url) {
        return null;
      }

      const mediaUrl = getStrapiMediaUrl(file.url);
      const mediaAlt = file.alternativeText || file.name || 'Content media';

      if (file.mime?.startsWith('video/')) {
        return (
          <figure className="my-6">
            <video controls className="w-full max-h-[32rem] rounded-lg bg-black">
              <source src={mediaUrl} type={file.mime} />
              Your browser does not support the video tag.
            </video>
            {file.caption && (
              <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                {file.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      if (file.mime?.startsWith('image/') || !file.mime) {
        return (
          <figure className="my-6">
            <img
              src={mediaUrl}
              alt={mediaAlt}
              className="w-full max-h-96 object-cover rounded-lg"
            />
            {file.caption && (
              <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                {file.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      return (
        <div className="my-6 rounded-lg border border-gray-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
          <a
            href={mediaUrl}
            target="_blank"
            rel="noreferrer"
            className="text-green-700 dark:text-green-400 underline hover:opacity-80"
          >
            Download {mediaAlt}
          </a>
          {file.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{file.caption}</p>
          )}
        </div>
      );
    }

    case 'shared.slider':
      return (
        <figure className="my-6 mx-auto max-w-6xl px-2">
          <div className="flex flex-wrap justify-center gap-4">
            {block.files.map((file, idx) => (
              <div key={idx} className="w-full max-w-md overflow-hidden rounded-lg shadow-md">
                <img
                  src={getStrapiMediaUrl(file.url)}
                  alt={file.alternativeText || file.name || `Slide ${idx + 1}`}
                  className="w-full h-48 object-cover"
                />
                {file.caption && (
                  <div className="p-3 bg-white dark:bg-slate-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {file.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </figure>
      );
    
    default:
      return null;
  }
}

/**
 * Basic HTML sanitization to prevent XSS
 * For production, consider using a library like DOMPurify
 */
function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*['"]/gi, 'data-event="');
  return sanitized;
}

function getTextContent(node: any): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join(' ');
  }

  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent((node as any).props?.children);
  }

  return '';
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

