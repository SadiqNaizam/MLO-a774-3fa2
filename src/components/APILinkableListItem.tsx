import React from 'react';
import { Link } from 'react-router-dom';
import {
  SquareCode,
  Network,
  FunctionSquare,
  ListOrdered,
  Baseline,
  TypeSquare,
  Variable,
  Package,
  FileText,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

export type ApiEntityType = 'class' | 'interface' | 'function' | 'enum' | 'const' | 'type-alias' | 'variable' | 'module';

interface APILinkableListItemProps {
  name: string;
  type: ApiEntityType;
  className?: string;
}

const iconMap: Record<ApiEntityType, LucideIcon> = {
  class: SquareCode,
  interface: Network,
  function: FunctionSquare,
  enum: ListOrdered,
  const: Baseline,
  'type-alias': TypeSquare,
  variable: Variable,
  module: Package,
};

const APILinkableListItem: React.FC<APILinkableListItemProps> = ({ name, type, className }) => {
  console.log(`APILinkableListItem loaded for: ${name}, type: ${type}`);

  const IconComponent = iconMap[type] || FileText;
  const entityPath = `/entity-detail?entity=${encodeURIComponent(name)}&type=${type}`;

  return (
    <Link
      to={entityPath}
      className={cn(
        "flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors duration-150 w-full text-sm group",
        "border-b border-border last:border-b-0", // Add a border for list item separation
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
        <span className="font-medium group-hover:text-primary">{name}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
    </Link>
  );
};

export default APILinkableListItem;