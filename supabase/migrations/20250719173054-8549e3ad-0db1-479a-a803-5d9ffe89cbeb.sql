-- Criar extensão para hash de senhas
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Criar tabela anna_luiza_usuarios com senha hasheada
CREATE TABLE public.anna_luiza_usuarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  nome TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.anna_luiza_usuarios ENABLE ROW LEVEL SECURITY;

-- Criar política para administradores poderem gerenciar usuários
CREATE POLICY "Administradores podem gerenciar usuarios" 
ON public.anna_luiza_usuarios 
FOR ALL 
USING (true);

-- Criar trigger para updated_at
CREATE TRIGGER update_anna_luiza_usuarios_updated_at
  BEFORE UPDATE ON public.anna_luiza_usuarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir usuário padrão com senha criptografada (senha: admin123)
INSERT INTO public.anna_luiza_usuarios (email, senha_hash, nome) 
VALUES ('lucasbarreto.dev@gmail.com', crypt('admin123', gen_salt('bf')), 'Lucas Barreto');

-- Criar função para autenticar usuário
CREATE OR REPLACE FUNCTION public.authenticate_user(email_input TEXT, senha_input TEXT)
RETURNS TABLE(
  id UUID,
  email TEXT,
  nome TEXT,
  ativo BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT u.id, u.email, u.nome, u.ativo
  FROM public.anna_luiza_usuarios u
  WHERE u.email = email_input 
    AND u.senha_hash = crypt(senha_input, u.senha_hash)
    AND u.ativo = true;
$$;