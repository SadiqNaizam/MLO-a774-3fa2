import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import APILinkableListItem, { ApiEntityType } from '@/components/APILinkableListItem'; // Custom component
import { Input } from '@/components/ui/input'; // shadcn/ui
import { ScrollArea } from '@/components/ui/scroll-area'; // shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui for structure
import { Home, BookOpen, Share2, List } from 'lucide-react'; // Icons for navigation

// Placeholder data for API entities
// Make sure 'type' conforms to ApiEntityType from APILinkableListItem
const initialApiEntities: { name: string; type: ApiEntityType; description: string }[] = [
  { name: 'AnimationDriver', type: 'interface', description: 'Provides an interface for drivers that power animations.' },
  { name: 'AnimationEngine', type: 'class', description: 'Core animation engine that drives animations.' },
  { name: 'AnimationBuilder', type: 'class', description: 'A service for programmatic construction of reusable animations.' },
  { name: 'AnimationFactory', type: 'class', description: 'Produces an AnimationPlayer instance.' },
  { name: 'AnimationMetadata', type: 'interface', description: 'Base interface for all animation metadata structures.' },
  { name: 'AnimationOptions', type: 'interface', description: 'Options to be passed to the animation player.' },
  { name: 'AnimationPlayer', type: 'interface', description: 'Provides control over an animation instance.' },
  { name: 'AnimationSequenceMetadata', type: 'interface', description: 'Metadata for a sequence of animations.' },
  { name: 'AnimationStyleMetadata', type: 'interface', description: 'Metadata for styles to be applied by an animation.' },
  { name: 'AnimationTriggerMetadata', type: 'interface', description: 'Metadata for an animation trigger.' },
  { name: 'animate', type: 'function', description: 'Function to create an animation step.' },
  { name: 'group', type: 'function', description: 'Function to run animations in parallel.' },
  { name: 'sequence', type: 'function', description: 'Function to run animations in sequence.' },
  { name: 'state', type: 'function', description: 'Declares an animation state within a trigger.' },
  { name: 'style', type: 'function', description: 'Declares a style object that can be used to define an animation state.' },
  { name: 'trigger', type: 'function', description: 'Creates a reusable animation trigger.' },
  { name: 'NoopAnimationDriver', type: 'class', description: 'A driver that does basically nothing.' },
  { name: 'ɵAnimationEngine', type: 'class', description: 'Internal Animation Engine implementation.' },
  { name: 'AnimationEvent', type: 'interface', description: 'An event that is fired when an animation starts or ends.' },
  { name: 'AnimationKeyframesSequenceMetadata', type: 'interface', description: 'Metadata for a keyframes sequence.' },
  { name: 'AnimationQueryOptions', type: 'interface', description: 'Options for animation queries.' },
  { name: 'AUTO_STYLE', type: 'const', description: 'A special animation style value.' },
  { name: 'Builder', type: 'type-alias', description: 'Type alias for animation builder functions.' },
  { name: 'AnimationModuleType', type: 'enum', description: 'Enum for animation module types.'},
];

// Simple Header Component for this page
const PageHeader: React.FC = () => (
  <header className="bg-gray-800 text-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        Angular Animation Internals Explorer
      </Link>
      <nav className="flex space-x-4 items-center">
        <Link to="/" className="flex items-center text-sm hover:text-gray-300 transition-colors">
          <Home className="h-4 w-4 mr-1" /> Home
        </Link>
        <Link to="/a-p-i-browser" className="flex items-center text-sm font-semibold text-blue-300 border-b-2 border-blue-300 pb-px">
          <List className="h-4 w-4 mr-1" /> API Browser
        </Link>
        <Link to="/key-concepts" className="flex items-center text-sm hover:text-gray-300 transition-colors">
          <BookOpen className="h-4 w-4 mr-1" /> Key Concepts
        </Link>
        <Link to="/interactive-diagram" className="flex items-center text-sm hover:text-gray-300 transition-colors">
          <Share2 className="h-4 w-4 mr-1" /> Interactive Diagram
        </Link>
      </nav>
    </div>
  </header>
);

// Simple Footer Component for this page
const PageFooter: React.FC = () => (
  <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Angular Animation Internals Explorer.
    </p>
  </footer>
);

const APIBrowserPage: React.FC = () => {
  console.log('APIBrowserPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntities = useMemo(() => {
    if (!searchTerm.trim()) {
      return initialApiEntities;
    }
    return initialApiEntities.filter(entity =>
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PageHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            API Entity Browser
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore Angular animation system entities. Use the search below to filter.
          </p>
        </section>

        <Card className="shadow-lg mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Search Entities</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="search"
              placeholder="Search by name or description (e.g., AnimationDriver, animate, engine...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-base"
              aria-label="Search API entities"
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">
                    Found Entities ({filteredEntities.length})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0"> {/* Remove padding to allow ScrollArea to manage it */}
                 <ScrollArea className="h-[calc(100vh-420px)] min-h-[300px] border-t"> {/* Adjust height dynamically or fixed */}
                    {filteredEntities.length > 0 ? (
                    <div className="divide-y divide-border">
                        {filteredEntities.map(entity => (
                        <APILinkableListItem
                            key={entity.name}
                            name={entity.name}
                            type={entity.type} // Type is already ApiEntityType from initialApiEntities
                        />
                        ))}
                    </div>
                    ) : (
                    <div className="p-6 text-center text-muted-foreground">
                        <p className="text-lg mb-2">No entities found matching "{searchTerm}".</p>
                        <p>Try a different search term or clear the search.</p>
                    </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>

      </main>
      <PageFooter />
    </div>
  );
};

export default APIBrowserPage;