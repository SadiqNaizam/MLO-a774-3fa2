import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ConceptExplainerBlock, { ConceptSection } from '@/components/ConceptExplainerBlock'; // Custom component
import { Home, BookOpenText, Share2, Settings, LayoutDashboard, GitBranch } from 'lucide-react'; // Icons for header

// Simple Header Component for this page
const AppHeader: React.FC = () => {
  const navItems = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
    { href: '/a-p-i-browser', label: 'API Browser', icon: <BookOpenText className="h-4 w-4 mr-2" /> },
    { href: '/key-concepts', label: 'Key Concepts', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { href: '/interactive-diagram', label: 'Diagrams', icon: <Share2 className="h-4 w-4 mr-2" /> },
    // Example: { href: '/entity-detail?entity=AnimationDriver', label: 'Entity Detail (Example)', icon: <GitBranch className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-gray-300">
          Angular Animation Explorer
        </Link>
        <ul className="flex items-center space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// Simple Footer Component for this page
const AppFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Angular Animation Internals Explorer. All rights reserved.
      </p>
    </footer>
  );
};


// Placeholder data for ConceptExplainerBlock sections
const animationDriverSections: ConceptSection[] = [
  {
    type: 'text',
    content: 'The AnimationDriver is a fundamental low-level abstraction within Angular\'s animation system. It provides a common interface for different rendering engines (like the browser\'s DOM or a custom renderer) to perform animation tasks such as reading element styles, setting styles, and executing animations.'
  },
  {
    type: 'subheading',
    level: 3,
    content: 'Core Responsibilities'
  },
  {
    type: 'text',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Validating style properties against the current rendering environment.</li>
        <li>Computing styles for elements at various animation states.</li>
        <li>Executing the actual animation steps (e.g., by manipulating CSS properties or using Web Animations API).</li>
        <li>Querying for elements within an animation scope.</li>
      </ul>
    )
  },
  {
    type: 'code',
    title: 'Simplified Interface Example',
    code: `export interface AnimationDriver {
  validateStyleProperty(prop: string): boolean;
  computeStyle(element: any, prop: string, defaultValue?: string): string;
  animate(
    element: any,
    keyframes: Array<Map<string, string | number>>,
    duration: number,
    delay: number,
    easing?: string | null,
    previousPlayers?: any[]
  ): any; // Returns an AnimationPlayer instance
}`,
    language: 'typescript'
  },
  {
    type: 'blockquote',
    content: 'Think of the AnimationDriver as the engine-specific "driver" that knows how to talk to the underlying rendering system to make animations happen.',
    citation: 'Angular Animations Documentation (Conceptual)'
  }
];

const animationPlayerSections: ConceptSection[] = [
  {
    type: 'text',
    content: 'An AnimationPlayer is an object that controls the playback of an animation instance. When you trigger an animation in Angular, an AnimationPlayer is created and returned. This player allows you to interact with the running animation.'
  },
  {
    type: 'subheading',
    level: 3,
    content: 'Key Methods'
  },
  {
    type: 'text',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li><code>play()</code>: Starts or resumes the animation.</li>
        <li><code>pause()</code>: Pauses the animation at its current state.</li>
        <li><code>finish()</code>: Jumps to the end state of the animation.</li>
        <li><code>reset()</code>: Resets the animation to its initial state.</li>
        <li><code>destroy()</code>: Cleans up resources associated with the animation player.</li>
        <li><code>onDone(callback)</code>: Executes a callback when the animation finishes.</li>
        <li><code>onStart(callback)</code>: Executes a callback when the animation starts.</li>
      </ul>
    )
  },
  {
    type: 'svg',
    svgContent: (
      <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md mx-auto my-2">
        <line x1="10" y1="40" x2="290" y2="40" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="40" r="5" fill="green" />
        <text x="10" y="30" fontSize="10" textAnchor="middle" fill="currentColor">Start</text>
        <circle cx="150" cy="40" r="5" fill="orange" />
        <text x="150" y="30" fontSize="10" textAnchor="middle" fill="currentColor">Pause/Play</text>
        <circle cx="290" cy="40" r="5" fill="red" />
        <text x="290" y="30" fontSize="10" textAnchor="middle" fill="currentColor">Finish</text>
        <path d="M10 40 Q 80 20, 150 40 T 290 40" stroke="blue" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
        <text x="150" y="65" fontSize="12" textAnchor="middle" fill="currentColor">Animation Timeline Control</text>
      </svg>
    ),
    caption: 'Conceptual representation of AnimationPlayer controls over a timeline.'
  }
];

const animationTimelineSections: ConceptSection[] = [
  {
    type: 'text',
    content: 'Angular animations provide powerful constructs for defining complex animation sequences and groups. This allows for precise control over how and when different animation steps occur.'
  },
  {
    type: 'subheading',
    level: 3,
    content: 'Core Functions'
  },
  {
    type: 'text',
    content: (
      <>
        <p className="mb-2"><strong><code>sequence()</code></strong>: Runs a series of animation steps one after another.</p>
        <p className="mb-2"><strong><code>group()</code></strong>: Runs a series of animation steps in parallel (simultaneously).</p>
        <p className="mb-2"><strong><code>query()</code></strong>: Finds and animates inner elements within the animating element.</p>
        <p className="mb-2"><strong><code>stagger()</code></strong>: Applies a delay between animations for multiple queried elements, creating a staggered effect.</p>
        <p>These functions can be nested to build sophisticated animation choreographies.</p>
      </>
    )
  },
  {
    type: 'code',
    title: 'Example: Sequence and Group',
    code: `import { trigger, transition, style, animate, sequence, group } from '@angular/animations';

trigger('myAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    sequence([
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      group([
        animate('500ms', style({ backgroundColor: 'lightblue' })),
        animate('800ms', style({ color: 'darkblue' }))
      ])
    ])
  ])
])`,
    language: 'typescript'
  }
];


const KeyConceptsPage: React.FC = () => {
  console.log('KeyConceptsPage loaded');

  const concepts = [
    { id: 'driver', title: 'The Role of AnimationDriver', sections: animationDriverSections },
    { id: 'player', title: 'Understanding AnimationPlayers', sections: animationPlayerSections },
    { id: 'timeline', title: 'Animation Timeline, Sequence, and Group', sections: animationTimelineSections },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-center">Key Concepts in Angular Animations</h1>
          <p className="mt-2 text-lg text-muted-foreground text-center">
            Explore fundamental ideas that underpin the Angular animation system.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {concepts.map((concept) => (
            <AccordionItem value={concept.id} key={concept.id}>
              <AccordionTrigger className="text-xl hover:no-underline">
                {concept.title}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-1">
                <ConceptExplainerBlock sections={concept.sections} className="bg-card p-4 rounded-md shadow" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <AppFooter />
    </div>
  );
};

export default KeyConceptsPage;