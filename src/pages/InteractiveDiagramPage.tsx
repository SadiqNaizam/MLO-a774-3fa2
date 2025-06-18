import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InteractiveRelationshipDiagram, { DiagramNode, DiagramEdge } from '../components/InteractiveRelationshipDiagram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LayoutDashboard, Binary, GitFork, BookOpen, Github } from 'lucide-react';

const entityOptions = [
  { value: "AnimationDriver", label: "AnimationDriver" },
  { value: "ɵAnimationEngine", label: "ɵAnimationEngine" },
  { value: "AnimationBuilder", label: "AnimationBuilder" },
  { value: "AnimationPlayer", label: "AnimationPlayer" },
  { value: "Keyframe", label: "Keyframe" },
  { value: "AnimationStyleMetadata", label: "AnimationStyleMetadata" },
  { value: "ElementInstruction", label: "ElementInstruction" },
];

const InteractiveDiagramPage = () => {
  console.log('InteractiveDiagramPage loaded');

  const [selectedEntity1, setSelectedEntity1] = useState<string | undefined>("AnimationDriver");
  const [selectedEntity2, setSelectedEntity2] = useState<string | undefined>("ɵAnimationEngine");
  const [diagramNodes, setDiagramNodes] = useState<DiagramNode[]>([]);
  const [diagramEdges, setDiagramEdges] = useState<DiagramEdge[]>([]);

  const handleVisualizeClick = () => {
    const newNodes: DiagramNode[] = [];
    const newEdges: DiagramEdge[] = [];
    let nodeIdCounter = 1;

    if (!selectedEntity1 && !selectedEntity2) {
      setDiagramNodes([]);
      setDiagramEdges([]);
      // toast({ title: "No entities selected", description: "Please select at least one entity to visualize." });
      return;
    }

    if (selectedEntity1) {
      newNodes.push({
        id: `node-${selectedEntity1}-${nodeIdCounter++}`,
        label: selectedEntity1,
        x: 100,
        y: 150, // Adjusted y for better centering in default 500px height diagram
        data: { type: 'Entity', description: `Represents the ${selectedEntity1} API entity.` },
      });
    }

    if (selectedEntity2) {
      // If selectedEntity2 is the same as selectedEntity1, we still create a separate node object for it.
      // The diagram component will render them as distinct nodes (unless their IDs match perfectly, which here they won't if both are selected).
      // For a simple visualization, having two nodes even if they represent the same concept by label is fine.
      // A more sophisticated diagram might merge them or show a single node.
      newNodes.push({
        id: `node-${selectedEntity2}-${nodeIdCounter++}`,
        label: selectedEntity2,
        x: 400,
        y: 150, // Adjusted y
        data: { type: 'Entity', description: `Represents the ${selectedEntity2} API entity.` },
      });
    }
    
    // Connect if two distinct entities are selected and nodes for both exist
    if (selectedEntity1 && selectedEntity2 && selectedEntity1 !== selectedEntity2 && newNodes.length >= 2) {
      const node1 = newNodes.find(n => n.label === selectedEntity1);
      const node2 = newNodes.find(n => n.label === selectedEntity2);
      if (node1 && node2) {
        newEdges.push({
          id: 'edge-1',
          source: node1.id,
          target: node2.id,
          label: 'interacts with',
        });
      }
    } else if (selectedEntity1 && selectedEntity2 && selectedEntity1 === selectedEntity2 && newNodes.length > 0) {
      // If the same entity is selected for both, we'll have two nodes with the same label.
      // No edge is drawn between identical selections in this logic.
      // If only one distinct entity is chosen across both selects (e.g. E1=A, E2=A), newNodes will have two nodes.
      // If E1=A, E2=undefined, newNodes has one node.
      // The logic above ensures newNodes only has one entry for a given entity if selected once.
      // Corrected logic: if entity1 and entity2 labels are same, newNodes will have 2 nodes.
      // We need to ensure we get the correct nodes for the edge.
      // Let's simplify: if selectedEntity1 and selectedEntity2 point to DIFFERENT strings, then draw an edge.
      // The node array construction already handles creating distinct node objects.
      // The current logic with newNodes.length >= 2 and selectedEntity1 !== selectedEntity2 is correct for this.
    }


    setDiagramNodes(newNodes);
    setDiagramEdges(newEdges);
  };
  
  // Initial visualization
  useEffect(() => {
    handleVisualizeClick();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount with default selections

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Angular Animation Explorer
          </Link>
          <div className="space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center space-x-1">
                <LayoutDashboard className="h-4 w-4" /> <span>Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/a-p-i-browser" className="flex items-center space-x-1">
                <Binary className="h-4 w-4" /> <span>API Browser</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/key-concepts" className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" /> <span>Key Concepts</span>
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
              <Link to="/interactive-diagram" className="flex items-center space-x-1">
                <GitFork className="h-4 w-4" /> <span>Diagrams</span>
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                Interactive Relationship Diagram
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                Visualize connections between Angular animation API entities.
            </p>
        </div>

        <Card className="mb-8 shadow-lg dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl">Configure Diagram Entities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div>
                <Label htmlFor="entity1-select" className="text-sm font-medium mb-1 block">Select First Entity</Label>
                <Select onValueChange={setSelectedEntity1} value={selectedEntity1}>
                  <SelectTrigger id="entity1-select" className="w-full">
                    <SelectValue placeholder="Choose an entity..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Core Animation Entities</SelectLabel>
                      {entityOptions.map(opt => (
                        <SelectItem key={`e1-${opt.value}`} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="entity2-select" className="text-sm font-medium mb-1 block">Select Second Entity (Optional)</Label>
                <Select onValueChange={setSelectedEntity2} value={selectedEntity2}>
                  <SelectTrigger id="entity2-select" className="w-full">
                    <SelectValue placeholder="Choose another entity..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Core Animation Entities</SelectLabel>
                      {entityOptions.map(opt => (
                        <SelectItem key={`e2-${opt.value}`} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                       <SelectItem value="">None</SelectItem> {/* Allow unselecting */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleVisualizeClick} className="w-full md:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              Visualize Relationships
            </Button>
          </CardContent>
        </Card>

        <InteractiveRelationshipDiagram
          nodes={diagramNodes}
          edges={diagramEdges}
          className="border-gray-300 dark:border-gray-700"
          height="500px" 
        />
        {diagramNodes.length === 0 && (
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
                <p>Select entities and click "Visualize Relationships" to see the diagram.</p>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Angular Animation Internals Explorer.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Helping developers understand Angular animations.
        </p>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
            <Github className="h-4 w-4 mr-1" /> View on GitHub (Placeholder)
        </a>
      </footer>
    </div>
  );
};

export default InteractiveDiagramPage;