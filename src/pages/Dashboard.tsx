import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total de Clientes",
      value: "0",
      description: "Clientes cadastrados",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Casos Ativos",
      value: "0",
      description: "Em andamento",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Consultas Hoje",
      value: "0",
      description: "Agendadas para hoje",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      title: "Crescimento",
      value: "0%",
      description: "Este mês",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
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