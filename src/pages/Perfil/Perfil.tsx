import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Perfil = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('anna_luiza_usuarios')
        .update({
          nome: form.nome,
          email: form.email,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });

      setUser && setUser({ ...user, nome: form.nome, email: form.email });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível atualizar o perfil.",
      });
    } finally {
      setLoading(false);
    }
  };

    const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.senhaAtual || !form.novaSenha || !form.confirmarSenha) {
        toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha todos os campos de senha.",
        });
        return;
    }
    if (form.novaSenha !== form.confirmarSenha) {
        toast({
        variant: "destructive",
        title: "Erro",
        description: "A nova senha e a confirmação não coincidem.",
        });
        return;
    }
    setLoading(true);
    try {
        // Verifica senha atual
        const { data, error } = await supabase.rpc('authenticate_user', {
        email_input: user?.email,
        senha_input: form.senhaAtual,
        });
        if (error || !data || data.length === 0) {
        toast({
            variant: "destructive",
            title: "Senha atual incorreta",
            description: "A senha atual informada está incorreta.",
        });
        setLoading(false);
        return;
        }

        // Atualiza senha usando função segura do banco
        const { error: updateError } = await supabase.rpc('update_user_password', {
        user_id: user?.id,
        nova_senha: form.novaSenha,
        });

        if (updateError) throw updateError;

        toast({
        title: "Senha alterada",
        description: "Sua senha foi atualizada com sucesso.",
        });

        setForm({ ...form, senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    } catch (error: any) {
        toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível alterar a senha.",
        });
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="max-w-md mx-auto py-10">
      <Card className="crm-card mb-6">
        <CardHeader>
          <CardTitle>Editar Perfil</CardTitle>
          <CardDescription>Atualize suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            <Button type="submit" className="w-full crm-button-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="crm-card">
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Troque sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div>
              <Label htmlFor="senhaAtual">Senha atual</Label>
              <Input
                id="senhaAtual"
                name="senhaAtual"
                type="password"
                value={form.senhaAtual}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="novaSenha">Nova senha</Label>
              <Input
                id="novaSenha"
                name="novaSenha"
                type="password"
                value={form.novaSenha}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
              <Input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={form.confirmarSenha}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            <Button type="submit" className="w-full crm-button-primary" disabled={loading}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;