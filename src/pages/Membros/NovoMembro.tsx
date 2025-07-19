import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Membros = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Exemplo simples de hash (substitua por bcrypt/scrypt em produção)
  const hashSenha = (senha: string) => {
    return btoa(senha); // NÃO USE EM PRODUÇÃO!
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('anna_luiza_usuarios')
        .insert({
          nome: form.nome,
          email: form.email,
          senha_hash: hashSenha(form.senha),
        });

      if (error) throw error;

      toast({
        title: "Membro cadastrado",
        description: "O membro foi cadastrado com sucesso.",
      });

      setForm({ nome: '', email: '', senha: '' });
      navigate('/dashboard/membros/listagem');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível cadastrar o membro.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Membro</CardTitle>
          <CardDescription>Adicione um novo membro do escritório</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            <Button type="submit" className="w-full crm-button-primary" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Membros;