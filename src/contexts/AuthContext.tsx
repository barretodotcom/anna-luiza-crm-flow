import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  nome: string;
  ativo: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('anna_luiza_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const { data, error } = await supabase.rpc('authenticate_user', {
        email_input: email,
        senha_input: senha
      });

      if (error) {
        console.error('Erro de autenticação:', error);
        return { success: false, error: 'Erro interno do servidor' };
      }

      if (!data || data.length === 0) {
        return { success: false, error: 'Email ou senha incorretos' };
      }

      const userData = data[0];
      setUser(userData);
      localStorage.setItem('anna_luiza_user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('anna_luiza_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}