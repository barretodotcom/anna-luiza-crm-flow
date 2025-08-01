import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Lock, Calendar, FileText, User } from 'lucide-react';
import ClienteCard from './ClienteCard';
import ProcessosDialog from './ProcessosDialog';
import { Cliente, Processo } from '@/types/processo';

const STATUS_COLUMNS = [
  { 
    id: 'EM_ATENDIMENTO', 
    title: 'Em Atendimento', 
    color: 'bg-card/80', 
    borderColor: 'border-border/50', 
    locked: true,
    icon: User 
  },
  { 
    id: 'CONSULTORIA_AGENDADA', 
    title: 'Consultoria Agendada', 
    color: 'bg-card/70', 
    borderColor: 'border-border/40', 
    locked: false,
    icon: Calendar
  },
  { 
    id: 'PROPOSTA_CUSTOMIZADA', 
    title: 'Proposta Customizada', 
    color: 'bg-card/60', 
    borderColor: 'border-border/30', 
    locked: false,
    icon: FileText
  },
  { 
    id: 'FINALIZADO', 
    title: 'Finalizado', 
    color: 'bg-card/50', 
    borderColor: 'border-border/20', 
    locked: false,
    icon: Plus
  },
  { 
    id: 'AGUARDANDO', 
    title: 'Aguardando', 
    color: 'bg-card/40', 
    borderColor: 'border-border/10', 
    locked: false,
    icon: Lock
  }
];

const KanbanBoard = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [processosDialogOpen, setProcessosDialogOpen] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetchClientes();
    fetchProcessos();
  }, []);

  const fetchClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('anna_luiza_clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os clientes",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProcessos = async () => {
    try {
      // Simulação até a tabela ser criada
      setProcessos([]);
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const clienteId = parseInt(active.id as string);
    const newStatus = over.id as string;
    
    // Verificar se o status é válido
    const validStatus = STATUS_COLUMNS.find(col => col.id === newStatus);
    if (!validStatus) {
      setActiveId(null);
      return;
    }

    try {
      const { error } = await supabase
        .from('anna_luiza_clientes')
        .update({ STATUS: newStatus })
        .eq('id', clienteId);

      if (error) throw error;

      // Atualizar estado local
      setClientes(prevClientes =>
        prevClientes.map(cliente =>
          cliente.id === clienteId
            ? { ...cliente, STATUS: newStatus }
            : cliente
        )
      );

      toast({
        title: "Status atualizado",
        description: "O cliente foi movido com sucesso",
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status",
      });
    }

    setActiveId(null);
  };

  const handleClienteClick = (cliente: Cliente) => {
    setSelectedClienteId(cliente.id);
    setProcessosDialogOpen(true);
  };

  const handleGerenciarProcessos = (cliente: Cliente, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedClienteId(cliente.id);
    setProcessosDialogOpen(true);
  };

  const getClientesByStatus = (status: string) => {
    return clientes.filter(cliente => cliente.STATUS === status);
  };

  const getProcessosCount = (clienteId: number) => {
    return processos.filter(p => p.anna_luiza_cliente_id === clienteId).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 px-1">
          {STATUS_COLUMNS.map((column) => {
            const columnClientes = getClientesByStatus(column.id);
            const IconComponent = column.icon;
            
            return (
              <div key={column.id} className="flex flex-col min-w-[280px] flex-shrink-0">
                <div className={`${column.color} ${column.borderColor} border rounded-t-lg backdrop-blur-sm`}>
                  <div className="p-3 border-b border-border/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm flex items-center gap-2 text-foreground">
                        <IconComponent className="h-4 w-4 text-primary" />
                        {column.title}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="text-xs font-medium px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary"
                      >
                        {columnClientes.length}
                      </Badge>
                    </div>
                  </div>
                </div>

                <SortableContext items={columnClientes.map(c => c.id.toString())} strategy={verticalListSortingStrategy}>
                  <div 
                    className={`flex-1 p-3 space-y-3 min-h-[400px] ${column.color} ${column.borderColor} border border-t-0 rounded-b-lg backdrop-blur-sm transition-all duration-300 hover:shadow-lg group`}
                  >
                    {columnClientes.map((cliente) => (
                      <ClienteCard
                        key={cliente.id}
                        cliente={cliente}
                        processosCount={getProcessosCount(cliente.id)}
                        onClick={() => handleClienteClick(cliente)}
                        onGerenciarProcessos={handleGerenciarProcessos}
                        locked={false}
                      />
                    ))}
                    {columnClientes.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-24 text-muted-foreground text-xs space-y-1">
                        <IconComponent className="h-6 w-6 opacity-50" />
                        <span>Nenhum cliente</span>
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-90 rotate-3 scale-105">
              <ClienteCard
                cliente={clientes.find(c => c.id.toString() === activeId)!}
                processosCount={getProcessosCount(parseInt(activeId))}
                onClick={() => {}}
                locked={false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <ProcessosDialog
        open={processosDialogOpen}
        onOpenChange={setProcessosDialogOpen}
        clienteId={selectedClienteId}
        processos={processos}
        onProcessosUpdate={fetchProcessos}
      />
    </div>
  );
};

export default KanbanBoard;
