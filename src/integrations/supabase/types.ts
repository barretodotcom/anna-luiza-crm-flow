export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      anna_luiza_clientes: {
        Row: {
          agendamento_realizado: boolean | null
          created_at: string
          follow_up_1_realizado: boolean
          id: number
          informacoes_adicionais: string | null
          interesse: string | null
          last_message_timestamp: string | null
          name: string | null
          remote_jid: string | null
          STATUS: string
          thread_id: string | null
        }
        Insert: {
          agendamento_realizado?: boolean | null
          created_at?: string
          follow_up_1_realizado?: boolean
          id?: number
          informacoes_adicionais?: string | null
          interesse?: string | null
          last_message_timestamp?: string | null
          name?: string | null
          remote_jid?: string | null
          STATUS?: string
          thread_id?: string | null
        }
        Update: {
          agendamento_realizado?: boolean | null
          created_at?: string
          follow_up_1_realizado?: boolean
          id?: number
          informacoes_adicionais?: string | null
          interesse?: string | null
          last_message_timestamp?: string | null
          name?: string | null
          remote_jid?: string | null
          STATUS?: string
          thread_id?: string | null
        }
        Relationships: []
      }
      anna_luiza_propostas: {
        Row: {
          created_at: string
          description: string | null
          id: number
          link: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          link?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          link?: string | null
          title?: string | null
        }
        Relationships: []
      }
      anna_luiza_usuarios: {
        Row: {
          ativo: boolean
          created_at: string
          email: string
          id: string
          nome: string
          senha_hash: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          email: string
          id?: string
          nome: string
          senha_hash: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          email?: string
          id?: string
          nome?: string
          senha_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_user: {
        Args: { email_input: string; senha_input: string }
        Returns: {
          id: string
          email: string
          nome: string
          ativo: boolean
        }[]
      }
      get_user_concessionaria_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ...restante do