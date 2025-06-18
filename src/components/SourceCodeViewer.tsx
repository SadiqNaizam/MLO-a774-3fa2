import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SourceCodeViewerProps {
  /** The code string to display. */
  code: string;
  /** The language of the code (e.g., 'typescript', 'javascript'). Currently used for informational purposes, future syntax highlighting could use this. */
  language?: string;
  /** Whether to show line numbers. Defaults to true. */
  showLineNumbers?: boolean;
  /** An optional title for the code block. */
  title?: string;
  /** Maximum height for the scrollable area. Defaults to '400px'. Can be 'none' for no limit. */
  maxHeight?: string;
}

const SourceCodeViewer: React.FC<SourceCodeViewerProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  title,
  maxHeight = '400px',
}) => {
  console.log(`SourceCodeViewer loaded. Title: ${title || 'N/A'}, Language: ${language}`);

  const codeToDisplay = code || ""; // Ensure code is always a string
  const lines = codeToDisplay.trim() ? codeToDisplay.trim().split('\n') : [];

  return (
    <Card className="w-full overflow-hidden shadow-sm">
      {title && (
        <CardHeader className="py-2 px-4 border-b bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ScrollArea
          className="w-full"
          style={{ maxHeight: maxHeight !== 'none' ? maxHeight : undefined }}
        >
          <div className="p-4 bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[60px]">
            {lines.length > 0 ? (
              lines.map((line, index) => (
                <div key={index} className="flex whitespace-pre">
                  {showLineNumbers && (
                    <span
                      className="mr-4 text-right text-gray-500 select-none pt-px" // pt-px for minor vertical alignment adjustment
                      style={{ minWidth: '3ch' }} // Accommodates up to 999 lines
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                  )}
                  <span className="flex-1">{line || ' '}</span> {/* Render a space for empty lines to maintain height */}
                </div>
              ))
            ) : (
              <div className="text-gray-500 select-none">No code to display.</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SourceCodeViewer;