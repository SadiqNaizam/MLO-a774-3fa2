import React from 'react';
import SourceCodeViewer from '@/components/SourceCodeViewer'; // Assuming this path

// Define types for the sections
interface TextSection {
  type: 'text';
  content: string | React.ReactNode;
}

interface SubheadingSection {
  type: 'subheading';
  level: 3 | 4 | 5; // Renders <h3>, <h4>, <h5>
  content: string;
}

interface BlockquoteSection {
  type: 'blockquote';
  content: string;
  citation?: string;
}

interface CodeSection {
  type: 'code';
  code: string;
  language?: string; // e.g., 'typescript', 'javascript'
  title?: string;
}

interface ImageSection {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

interface SvgSection {
  type: 'svg';
  svgContent: React.ReactNode; // User provides the SVG as JSX
  caption?: string;
  className?: string;
}

export type ConceptSection = 
  | TextSection 
  | SubheadingSection 
  | BlockquoteSection 
  | CodeSection 
  | ImageSection 
  | SvgSection;

export interface ConceptExplainerBlockProps {
  /** Optional main title for the block, rendered as an H2. */
  title?: string;
  /** Array of content sections that make up the explainer. */
  sections: ConceptSection[];
  /** Additional class names for the root element. */
  className?: string;
}

const ConceptExplainerBlock: React.FC<ConceptExplainerBlockProps> = ({ title, sections, className }) => {
  console.log('ConceptExplainerBlock loaded', { title });

  const renderSection = (section: ConceptSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <p key={index} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {section.content}
          </p>
        );
      case 'subheading':
        const Tag = `h${section.level}` as keyof JSX.IntrinsicElements;
        let headingClass = '';
        if (section.level === 3) headingClass = "text-2xl font-semibold mt-6 mb-3";
        if (section.level === 4) headingClass = "text-xl font-semibold mt-5 mb-2";
        if (section.level === 5) headingClass = "text-lg font-semibold mt-4 mb-1";
        return (
          <Tag key={index} className={headingClass}>
            {section.content}
          </Tag>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="mt-4 mb-4 border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400">
            <p>{section.content}</p>
            {section.citation && <footer className="text-sm mt-1">- {section.citation}</footer>}
          </blockquote>
        );
      case 'code':
        return (
          <div key={index} className="my-4">
            {section.title && <h4 className="text-md font-medium mb-2 text-gray-600 dark:text-gray-400">{section.title}</h4>}
            <SourceCodeViewer code={section.code} language={section.language || 'typescript'} />
          </div>
        );
      case 'image':
        return (
          <figure key={index} className="my-4">
            <img 
              src={section.src} 
              alt={section.alt} 
              className={`max-w-full h-auto rounded-md shadow-sm ${section.className || ''}`} 
            />
            {section.caption && <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">{section.caption}</figcaption>}
          </figure>
        );
      case 'svg':
        return (
          <figure key={index} className={`my-4 ${section.className || ''}`}>
            {section.svgContent}
            {section.caption && <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">{section.caption}</figcaption>}
          </figure>
        );
      default:
        // Ensure exhaustiveness with a type assertion or throw error
        const _exhaustiveCheck: never = section;
        console.warn('Unknown section type:', _exhaustiveCheck);
        return null;
    }
  };

  return (
    <div className={`py-6 ${className || ''}`}>
      {title && <h2 className="text-3xl font-bold tracking-tight mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">{title}</h2>}
      <div className="space-y-4">
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
};

export default ConceptExplainerBlock;