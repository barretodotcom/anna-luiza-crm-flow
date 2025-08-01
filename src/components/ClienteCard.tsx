
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Lock, User, Briefcase, Scale } from 'lucide-react';

interface Cliente {
  id: number;
  name: string;
  remote_jid: string;
  thread_id: string;
  last_message_timestamp: string;
  agendamento_realizado: boolean;
  follow_up_1_realizado: boolean;
  informacoes_adicionais: string;
  interesse: string;
  STATUS: string;
  created_at: string;
}

interface ClienteCardProps {
  cliente: Cliente;
  processosCount: number;
  onClick: () => void;
  onGerenciarProcessos?: (cliente: Cliente, event: React.MouseEvent) => void;
  locked: boolean;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ 
  cliente, 
  processosCount, 
  onClick, 
  onGerenciarProcessos,
  locked 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: cliente.id.toString(),
    disabled: false // Always allow dragging for animation
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick();
  };

  const handleGerenciarProcessos = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onGerenciarProcessos) {
      onGerenciarProcessos(cliente, e);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-pointer transition-all duration-300 crm-card hover:shadow-lg hover:scale-[1.01] hover:-translate-y-0.5 hover:border-primary/30 ${
        isDragging ? 'shadow-xl rotate-1 scale-105 ring-2 ring-primary/50' : ''
      }`}
      onClick={handleCardClick}
    >
      <CardContent className="p-3">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-1">
              <h3 className="font-medium text-sm flex items-center gap-1.5 text-foreground">
                <User className="h-3.5 w-3.5 text-primary" />
                {cliente.name || 'Nome não informado'}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {cliente.interesse || 'Interesse não informado'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {formatDate(cliente.created_at)}
              </span>
            </div>
            
            {processosCount > 0 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-1.5 py-0.5"
              >
                <Briefcase className="h-3 w-3 mr-0.5" />
                {processosCount}
              </Badge>
            )}
          </div>

          {cliente.informacoes_adicionais && (
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <div className="flex items-start gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {cliente.informacoes_adicionais}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1.5 border-t border-border/30">
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full transition-colors ${cliente.agendamento_realizado ? 'bg-success shadow-success/50 shadow-sm' : 'bg-muted-foreground/30'}`}></div>
                <span className="text-muted-foreground">Agenda</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full transition-colors ${cliente.follow_up_1_realizado ? 'bg-success shadow-success/50 shadow-sm' : 'bg-muted-foreground/30'}`}></div>
                <span className="text-muted-foreground">Follow-up</span>
              </div>
            </div>
            
            {onGerenciarProcessos && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGerenciarProcessos}
                className="h-6 w-6 p-0 hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Gerenciar Processos"
              >
                <Scale className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClienteCard;
