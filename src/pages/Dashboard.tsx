import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [totalClientes, setTotalClientes] = useState(0);
  const [casosAtivos, setCasosAtivos] = useState(0);
  const [atendimentosHoje, setAtendimentosHoje] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('anna_luiza_clientes')
        .select('STATUS,last_message_timestamp');

      if (!error && data) {
        setTotalClientes(data.length);
        setCasosAtivos(
          data.filter(
            (c) =>
              c.STATUS !== 'EM_ATENDIMENTO' &&
              c.STATUS !== 'CONSULTORIA_AGENDADA'
          ).length
        );

        // Atendimentos hoje: status EM_ATENDIMENTO ou CONSULTORIA_AGENDADA e last_message_timestamp é hoje
        const hoje = new Date();
        const atendimentos = data.filter((c) => {
          if (
            c.STATUS === 'EM_ATENDIMENTO' ||
            c.STATUS === 'CONSULTORIA_AGENDADA'
          ) {
            if (c.last_message_timestamp) {
              const msgDate = new Date(c.last_message_timestamp);
              return (
                msgDate.getDate() === hoje.getDate() &&
                msgDate.getMonth() === hoje.getMonth() &&
                msgDate.getFullYear() === hoje.getFullYear()
              );
            }
          }
          return false;
        });
        setAtendimentosHoje(atendimentos.length);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total de Clientes",
      value: loading ? '...' : totalClientes.toString(),
      description: (totalClientes != 1 ? "Clientes " : "Cliente ") + "cadastrados",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Casos Ativos",
      value: loading ? '...' : casosAtivos.toString(),
      description: (casosAtivos != 1 ? "Clientes " : "Cliente ") + "com casos ativos",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Atendimentos Hoje",
      value: loading ? '...' : atendimentosHoje.toString(),
      description: (atendimentosHoje != 1 ? "Clientes atendidos " : "Cliente atendido ") + "hoje",
      icon: Clock,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Inteligência Artificial</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta, {user?.nome}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="crm-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="crm-card">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse as funcionalidades principais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/dashboard/clientes')}
              className="w-full justify-start crm-button-primary"
            >
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Clientes
            </Button>
          </CardContent>
        </Card>

        <Card className="crm-card">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas atividades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma atividade recente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;