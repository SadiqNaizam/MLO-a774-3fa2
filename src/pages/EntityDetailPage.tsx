import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import SourceCodeViewer from '@/components/SourceCodeViewer'; // Custom component
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, BookOpen, Cpu, FileJson, Code, ExternalLink, Settings, ListTree } from 'lucide-react';

interface EntityProperty {
  name: string;
  type: string;
  description: string;
  optional?: boolean;
}

interface EntityMethodParameter {
  name: string;
  type: string;
  optional?: boolean;
  description?: string;
}

interface EntityMethod {
  name: string;
  signature: string;
  parameters: EntityMethodParameter[];
  returns: string;
  description: string;
}

interface RelatedEntity {
  name: string;
  type: 'class' | 'interface' | 'function' | 'enum' | 'const' | 'type-alias' | 'variable' | 'module';
  description?: string;
}

interface EntityDetails {
  id: string;
  name: string;
  type: 'class' | 'interface' | 'function' | 'enum' | 'const' | 'type-alias'| 'variable' | 'module';
  definition: string;
  summary?: string;
  properties: EntityProperty[];
  methods: EntityMethod[];
  relatedEntities: RelatedEntity[];
}

// Mock database for entities
const entityDatabase: Record<string, EntityDetails> = {
  AnimationDriver: {
    id: 'AnimationDriver',
    name: 'AnimationDriver',
    type: 'interface',
    summary: 'Provides an abstract way to query and animate elements within Angular animations.',
    definition: `
export interface AnimationDriver {
  validateStyleProperty(prop: string): boolean;
  matchesElement(element: any, selector: string): boolean;
  containsElement(element1: any, element2: any): boolean;
  query(element: any, selector: string, multi: boolean): any[];
  computeStyle(element: any, prop: string, defaultValue?: string): string;
  animate(
      element: any, 
      keyframes: AnimationKeyframesSequenceMetadata[], 
      duration: number, 
      delay: number,
      easing?: string | null, 
      previousPlayers?: any[], 
      options?: AnimationOptions
  ): AnimationPlayer; // Type AnimationPlayer assumed to exist
}`,
    properties: [], // Interfaces primarily define method contracts
    methods: [
      { name: 'validateStyleProperty', signature: 'validateStyleProperty(prop: string): boolean', parameters: [{ name: 'prop', type: 'string' }], returns: 'boolean', description: 'Reports whether a given style property is valid.' },
      { name: 'matchesElement', signature: 'matchesElement(element: any, selector: string): boolean', parameters: [{ name: 'element', type: 'any' }, { name: 'selector', type: 'string' }], returns: 'boolean', description: 'Checks if an element matches a given CSS selector.' },
      { name: 'animate', signature: 'animate(element: any, keyframes: AnimationKeyframesSequenceMetadata[], duration: number, delay: number, easing?: string | null, previousPlayers?: any[], options?: AnimationOptions): AnimationPlayer', parameters: [
        { name: 'element', type: 'any' },
        { name: 'keyframes', type: 'AnimationKeyframesSequenceMetadata[]' },
        { name: 'duration', type: 'number' },
        { name: 'delay', type: 'number' },
        { name: 'easing', type: 'string | null', optional: true },
      ], returns: 'AnimationPlayer', description: 'Runs an animation sequence on an element.' },
    ],
    relatedEntities: [
      { name: 'ɵAnimationEngine', type: 'class', description: 'The core engine that uses a driver.' },
      { name: 'AnimationPlayer', type: 'interface', description: 'Represents an individual animation player.' },
    ],
  },
  "ɵAnimationEngine": {
    id: "ɵAnimationEngine",
    name: "ɵAnimationEngine",
    type: "class",
    summary: "The main animation engine in Angular, responsible for orchestrating animations.",
    definition: `
export declare class ɵAnimationEngine {
  constructor(bodyNode: any, _driver: AnimationDriver, _normalizer: AnimationStyleNormalizer);
  
  onInsert(element: any, insertTriggerStyles?: () => void, microtaskId?: number): void;
  onRemove(element: any, microtaskId?: number, options?: AnimationOptions): void;
  setProperty(element: any, property: string, value: any): void;
  listen(
    element: any, eventName: string, eventPhase: string,
    callback: (event: any) => any): () => any;
  flush(microtaskId?: number): void;
  destroy(microtaskId?: number): void;
}`,
    properties: [
      { name: '_driver', type: 'AnimationDriver', description: 'The animation driver instance.', optional: false },
      { name: '_normalizer', type: 'AnimationStyleNormalizer', description: 'Style normalizer instance.', optional: false },
    ],
    methods: [
      { name: 'onInsert', signature: 'onInsert(element: any, insertTriggerStyles?: () => void, microtaskId?: number): void', parameters: [{name: 'element', type: 'any'}], returns: 'void', description: 'Callback for when an element is inserted.' },
      { name: 'flush', signature: 'flush(microtaskId?: number): void', parameters: [{name: 'microtaskId', type: 'number', optional: true}], returns: 'void', description: 'Flushes all pending animations.' },
    ],
    relatedEntities: [
      { name: 'AnimationDriver', type: 'interface', description: 'The driver used by this engine.' },
      { name: 'AnimationBuilder', type: 'class', description: 'Builds animations that can be run by the engine.' },
    ],
  },
};

const AppHeader: React.FC = () => (
  <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
    <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity">
        <ListTree className="h-6 w-6" />
        <span>Animation Explorer</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
        <Link to="/a-p-i-browser" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">API Browser</Link>
        <Link to="/key-concepts" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Key Concepts</Link>
        <Link to="/interactive-diagram" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Diagram</Link>
      </div>
    </nav>
  </header>
);

const AppFooter: React.FC = () => (
  <footer className="bg-card border-t border-border py-8 text-center">
    <p className="text-sm text-muted-foreground">
      Angular Animation Internals Explorer &copy; {new Date().getFullYear()}
    </p>
  </footer>
);


const EntityDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [entity, setEntity] = useState<EntityDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const entityName = searchParams.get('entity');
    // const entityType = searchParams.get('type'); // Type can be used for more specific lookup if needed

    if (entityName) {
      console.log(`EntityDetailPage: Loading entity - ${entityName}`);
      const foundEntity = entityDatabase[entityName];
      if (foundEntity) {
        setEntity(foundEntity);
        setError(null);
      } else {
        setEntity(null);
        setError(`Entity "${entityName}" not found in the mock database.`);
      }
    } else {
      setError('No entity specified in URL.');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading entity details...</p> {/* Or a Skeleton loader */}
        </main>
        <AppFooter />
      </div>
    );
  }
  
  console.log('EntityDetailPage loaded for:', entity.name);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home className="h-4 w-4 mr-1 inline-block" />Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/a-p-i-browser"><BookOpen className="h-4 w-4 mr-1 inline-block" />API Browser</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {entity.type === 'class' && <Cpu className="h-4 w-4 mr-1 inline-block" />}
                {entity.type === 'interface' && <FileJson className="h-4 w-4 mr-1 inline-block" />}
                {entity.type === 'function' && <Settings className="h-4 w-4 mr-1 inline-block" />}
                {entity.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
              {entity.type === 'class' && <Cpu className="h-8 w-8 mr-3 text-primary" />}
              {entity.type === 'interface' && <FileJson className="h-8 w-8 mr-3 text-primary" />}
              {entity.type === 'function' && <Settings className="h-8 w-8 mr-3 text-primary" />}
              {entity.name}
              <span className="ml-3 text-sm font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">{entity.type}</span>
            </CardTitle>
            {entity.summary && <CardDescription className="mt-2 text-lg text-muted-foreground">{entity.summary}</CardDescription>}
          </CardHeader>
          <CardContent>
            <SourceCodeViewer code={entity.definition} language="typescript" title="Source Definition" maxHeight="600px" />
          </CardContent>
        </Card>

        <Tabs defaultValue="methods" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="properties" disabled={entity.properties.length === 0}>Properties ({entity.properties.length})</TabsTrigger>
            <TabsTrigger value="methods" disabled={entity.methods.length === 0}>Methods ({entity.methods.length})</TabsTrigger>
            <TabsTrigger value="related" disabled={entity.relatedEntities.length === 0}>Related ({entity.relatedEntities.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
                <CardDescription>Publicly accessible properties of {entity.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                {entity.properties.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entity.properties.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell className="font-mono font-medium">{prop.name}{prop.optional && '?'}</TableCell>
                          <TableCell className="font-mono text-sky-600 dark:text-sky-400">{prop.type}</TableCell>
                          <TableCell>{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : <p className="text-muted-foreground">No properties defined for this entity.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods">
            <Card>
              <CardHeader>
                <CardTitle>Methods</CardTitle>
                <CardDescription>Functions available on {entity.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                {entity.methods.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {entity.methods.map((method) => (
                    <AccordionItem value={method.name} key={method.name}>
                      <AccordionTrigger className="text-base font-mono hover:no-underline">
                        <span className="text-purple-600 dark:text-purple-400">{method.name}</span>
                        <span className="text-sm text-muted-foreground ml-2 truncate">({method.parameters.map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ')})</span>
                        <span className="text-sm text-muted-foreground ml-1">: {method.returns}</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="text-sm">{method.description}</p>
                        {method.parameters.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Parameters:</h4>
                            <Table className="text-xs">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {method.parameters.map(param => (
                                        <TableRow key={param.name}>
                                            <TableCell className="font-mono">{param.name}{param.optional && '?'}</TableCell>
                                            <TableCell className="font-mono text-sky-600 dark:text-sky-400">{param.type}</TableCell>
                                            <TableCell>{param.description || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                          </div>
                        )}
                         <div>
                            <h4 className="font-semibold text-sm mb-1">Returns:</h4>
                            <p className="font-mono text-sm text-green-600 dark:text-green-400">{method.returns}</p>
                        </div>
                        <SourceCodeViewer code={method.signature} language="typescript" title="Full Signature" showLineNumbers={false} maxHeight="150px" />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                ) : <p className="text-muted-foreground">No methods defined for this entity.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related">
            <Card>
              <CardHeader>
                <CardTitle>Related Entities</CardTitle>
                <CardDescription>Other API entities that are closely related to {entity.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                {entity.relatedEntities.length > 0 ? (
                  <ul className="space-y-2">
                    {entity.relatedEntities.map((related) => (
                      <li key={related.name} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                        <Link
                          to={`/entity-detail?entity=${encodeURIComponent(related.name)}&type=${related.type}`}
                          className="flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-semibold group-hover:text-primary">{related.name}</span>
                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">{related.type}</span>
                            {related.description && <p className="text-xs text-muted-foreground mt-0.5">{related.description}</p>}
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground">No related entities specified.</p>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AppFooter />
    </div>
  );
};

// Minimal Alert components for error display if shadcn/ui Alert is not globally available or to avoid extra imports
// Normally, you'd import Alert, AlertTitle, AlertDescription from "@/components/ui/alert"
// For this example, a simplified version:
import { AlertTriangle } from 'lucide-react';
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}
const Alert: React.FC<AlertProps> = ({className, variant, ...props}) => (
  <div role="alert" className={`${className} p-4 border rounded ${variant === 'destructive' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300' : 'bg-blue-50 border-blue-200 text-blue-700'}`} {...props} />
);
const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({className, ...props}) => (
  <h5 className={`${className} mb-1 font-medium leading-none tracking-tight`} {...props} />
);
const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({className, ...props}) => (
  <div className={`${className} text-sm [&_p]:leading-relaxed`} {...props} />
);


export default EntityDetailPage;