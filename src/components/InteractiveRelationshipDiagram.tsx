import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Constants for node dimensions, can be customized
const NODE_WIDTH = 160; // px
const NODE_HEIGHT = 60; // px

export interface DiagramNode {
  id: string;
  label: string;
  x: number; // Absolute X position in pixels for the top-left corner of the node
  y: number; // Absolute Y position in pixels for the top-left corner of the node
  data?: {
    description?: string;
    type?: string; // e.g., 'Class', 'Interface', 'Function'
  };
  // entityPagePath could be used if specific entity routes were like /entity-detail/:id
  // For now, we link to /entity-detail and EntityDetailPage handles specifics.
}

export interface DiagramEdge {
  id: string;
  source: string; // ID of the source DiagramNode
  target: string; // ID of the target DiagramNode
  label?: string;
  animated?: boolean; // For styling, e.g., dashed line for optional relationship
}

interface InteractiveRelationshipDiagramProps {
  nodes?: DiagramNode[];
  edges?: DiagramEdge[];
  onNodeClick?: (node: DiagramNode) => void;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const InteractiveRelationshipDiagram: React.FC<InteractiveRelationshipDiagramProps> = ({
  nodes = [],
  edges = [],
  onNodeClick,
  className,
  width = '100%',
  height = 500, // Default height in pixels
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const diagramContainerRef = useRef<HTMLDivElement>(null);

  console.log('InteractiveRelationshipDiagram loaded');

  const handleNodeClick = (node: DiagramNode) => {
    setSelectedNodeId(node.id);
    if (onNodeClick) {
      onNodeClick(node);
    }
    console.log('Node clicked:', node);
  };

  return (
    <div
      ref={diagramContainerRef}
      className={cn(
        "relative border rounded-lg overflow-auto bg-background shadow-sm",
        className
      )}
      style={{ width, height }}
      aria-label="Interactive Relationship Diagram"
    >
      {/* Render Edges (SVG layer) */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        style={{ minWidth: '100%', minHeight: '100%', pointerEvents: 'none' }} // Ensure SVG scales if content overflows
      >
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (!sourceNode || !targetNode) {
            console.warn(`Edge ${edge.id} references a non-existent node. Source: ${edge.source}, Target: ${edge.target}`);
            return null;
          }

          // Calculate center points of nodes for edge connection
          const x1 = sourceNode.x + NODE_WIDTH / 2;
          const y1 = sourceNode.y + NODE_HEIGHT / 2;
          const x2 = targetNode.x + NODE_WIDTH / 2;
          const y2 = targetNode.y + NODE_HEIGHT / 2;

          return (
            <g key={edge.id} aria-label={`Edge from ${sourceNode.label} to ${targetNode.label} ${edge.label ? 'labeled ' + edge.label : ''}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={cn(
                  "stroke-muted-foreground transition-all",
                  selectedNodeId === sourceNode.id || selectedNodeId === targetNode.id ? "stroke-primary stroke-[3px]" : "stroke-[2px]",
                  edge.animated ? "stroke-dasharray-4" : "" // Basic animation example
                )}
              />
              {edge.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2}
                  dy="-6px" // Offset text slightly above the line
                  className="fill-foreground text-xs font-medium pointer-events-auto"
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Render Nodes (HTML elements on top of SVG) */}
      {nodes.map((node) => (
        <Popover key={node.id}>
          <PopoverTrigger asChild>
            <div
              onClick={() => handleNodeClick(node)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNodeClick(node); } }}
              className={cn(
                "absolute cursor-pointer p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out",
                "flex flex-col items-center justify-center text-center",
                "border-2",
                selectedNodeId === node.id 
                  ? "border-primary ring-2 ring-primary ring-offset-2 bg-primary-foreground scale-105 z-10" 
                  : "border-border bg-card hover:shadow-xl hover:border-primary/50",
                "text-card-foreground"
              )}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${NODE_WIDTH}px`,
                minHeight: `${NODE_HEIGHT}px`,
              }}
              role="button"
              tabIndex={0}
              aria-pressed={selectedNodeId === node.id}
              aria-label={`Node: ${node.label}. Type: ${node.data?.type || 'N/A'}. Click for more details.`}
            >
              <div className="font-bold text-sm truncate w-full" title={node.label}>{node.label}</div>
              {node.data?.type && (
                <div className="text-xs text-muted-foreground mt-1">{node.data.type}</div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 shadow-xl z-20" side="bottom" align="center">
            <div className="space-y-3 p-1">
              <h4 className="font-bold leading-none text-lg">{node.label}</h4>
              {node.data?.type && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Type:</span> {node.data.type}
                </p>
              )}
              {node.data?.description && (
                <p className="text-sm">
                  <span className="font-medium">Description:</span> {node.data.description}
                </p>
              )}
              
              {/* Link to the generic EntityDetailPage. */}
              {/* The EntityDetailPage needs to handle how it displays info for 'node.label'. */}
              {/* This could be via query params (e.g., /entity-detail?entity=...) or app state. */}
              <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                <Link to={`/entity-detail?entity=${encodeURIComponent(node.label)}`}>
                  View Details for {node.label}
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground italic mt-1">
                Navigates to Entity Detail Page. Ensure that page can handle the 'entity' query parameter.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default InteractiveRelationshipDiagram;