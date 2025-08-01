import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, List } from 'lucide-react';
import { useViewPreference } from '@/hooks/useViewPreference';
import KanbanBoard from './KanbanBoard';
import ClientesList from './ClientesList';

const ClientesView = () => {
  const { viewType, toggleView, isList, isBoard } = useViewPreference();

  return (
    <div className="space-y-6 p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gestão de Clientes
          </h1>
          <p className="text-muted-foreground text-lg">
            Gerencie seus clientes e acompanhe o processo jurídico
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-muted/30 rounded-lg p-1">
            <Button
              variant={isList ? "default" : "ghost"}
              size="sm"
              onClick={() => toggleView()}
              className={`flex items-center gap-2 ${isList ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <List className="h-4 w-4" />
              Lista
            </Button>
            <Button
              variant={isBoard ? "default" : "ghost"}
              size="sm"
              onClick={() => toggleView()}
              className={`flex items-center gap-2 ${isBoard ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              Board
            </Button>
          </div>
          
          <Badge variant="outline" className="text-sm px-4 py-2 border-primary/20 bg-primary/5">
            Visualização: {isList ? 'Lista' : 'Board'}
          </Badge>
        </div>
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {isList ? <ClientesList /> : <KanbanBoard />}
      </div>
    </div>
  );
};

export default ClientesView;