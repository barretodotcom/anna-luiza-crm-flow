export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      "(TABELA_MODELO_LEADS_CLIENTES)": {
        Row: {
          created_at: string
          id: number
          name: string | null
          remotejid: string | null
          response_id: string | null
          timestamp: string | null
          tokens_input: number | null
          tokens_output: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Relationships: []
      }
      acoes: {
        Row: {
          created_at: string
          id: number
          name: string | null
          yield: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          yield?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          yield?: number | null
        }
        Relationships: []
      }
      acoes_historico: {
        Row: {
          cotacao: number | null
          created_at: string | null
          date: string | null
          id: number
          name: string | null
          vp: number | null
          yield: number | null
        }
        Insert: {
          cotacao?: number | null
          created_at?: string | null
          date?: string | null
          id?: number
          name?: string | null
          vp?: number | null
          yield?: number | null
        }
        Update: {
          cotacao?: number | null
          created_at?: string | null
          date?: string | null
          id?: number
          name?: string | null
          vp?: number | null
          yield?: number | null
        }
        Relationships: []
      }
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
      carros: {
        Row: {
          ano: number
          concessionaria_id: string
          cor: string
          created_at: string
          fotos: Json | null
          funcionario_id: string
          id: string
          informacoes_adicionais: string | null
          marca: string
          modelo: string
          preco: number
          status: string
          updated_at: string
          valor_desconto: number | null
        }
        Insert: {
          ano: number
          concessionaria_id: string
          cor: string
          created_at?: string
          fotos?: Json | null
          funcionario_id: string
          id?: string
          informacoes_adicionais?: string | null
          marca: string
          modelo: string
          preco: number
          status?: string
          updated_at?: string
          valor_desconto?: number | null
        }
        Update: {
          ano?: number
          concessionaria_id?: string
          cor?: string
          created_at?: string
          fotos?: Json | null
          funcionario_id?: string
          id?: string
          informacoes_adicionais?: string | null
          marca?: string
          modelo?: string
          preco?: number
          status?: string
          updated_at?: string
          valor_desconto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "carros_concessionaria_id_fkey"
            columns: ["concessionaria_id"]
            isOneToOne: false
            referencedRelation: "concessionarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carros_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string
          email: string | null
          id: string
          nome: string
          observacoes: string | null
          remote_jid: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          remote_jid?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          remote_jid?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      clientes_acoes_financeiras: {
        Row: {
          created_at: string
          ExpiresIn: string | null
          firstAccess: boolean | null
          id: number
          name: string | null
          phone_number: string | null
          remote_jid: string | null
          thread_id: string | null
        }
        Insert: {
          created_at?: string
          ExpiresIn?: string | null
          firstAccess?: boolean | null
          id?: number
          name?: string | null
          phone_number?: string | null
          remote_jid?: string | null
          thread_id?: string | null
        }
        Update: {
          created_at?: string
          ExpiresIn?: string | null
          firstAccess?: boolean | null
          id?: number
          name?: string | null
          phone_number?: string | null
          remote_jid?: string | null
          thread_id?: string | null
        }
        Relationships: []
      }
      concessionarias: {
        Row: {
          ativo: boolean
          configuracoes: Json | null
          created_at: string
          id: string
          nome: string
          remote_jid: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          configuracoes?: Json | null
          created_at?: string
          id?: string
          nome: string
          remote_jid?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          configuracoes?: Json | null
          created_at?: string
          id?: string
          nome?: string
          remote_jid?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          ativo: boolean
          cargo: string | null
          concessionaria_id: string
          created_at: string
          id: string
          nome: string
          telefone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          cargo?: string | null
          concessionaria_id: string
          created_at?: string
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          cargo?: string | null
          concessionaria_id?: string
          created_at?: string
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_concessionaria_id_fkey"
            columns: ["concessionaria_id"]
            isOneToOne: false
            referencedRelation: "concessionarias"
            referencedColumns: ["id"]
          },
        ]
      }
      interesses: {
        Row: {
          carro_id: string
          cliente_id: string
          created_at: string
          data_interesse: string
          id: string
          observacoes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          carro_id: string
          cliente_id: string
          created_at?: string
          data_interesse?: string
          id?: string
          observacoes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          carro_id?: string
          cliente_id?: string
          created_at?: string
          data_interesse?: string
          id?: string
          observacoes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interesses_carro_id_fkey"
            columns: ["carro_id"]
            isOneToOne: false
            referencedRelation: "carros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interesses_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          atendimento_finalizado: boolean | null
          created_at: string
          have_thread: boolean | null
          id: number
          name: string | null
          remote_jid: string | null
          thread_id: string | null
        }
        Insert: {
          atendimento_finalizado?: boolean | null
          created_at?: string
          have_thread?: boolean | null
          id?: number
          name?: string | null
          remote_jid?: string | null
          thread_id?: string | null
        }
        Update: {
          atendimento_finalizado?: boolean | null
          created_at?: string
          have_thread?: boolean | null
          id?: number
          name?: string | null
          remote_jid?: string | null
          thread_id?: string | null
        }
        Relationships: []
      }
      leads_cliente_vila_pizza: {
        Row: {
          created_at: string
          id: number
          name: string | null
          remotejid: string | null
          response_id: string | null
          timestamp: string | null
          tokens_input: number | null
          tokens_output: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Relationships: []
      }
      setores: {
        Row: {
          code: number | null
          created_at: string
          id: number
        }
        Insert: {
          code?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          code?: number | null
          created_at?: string
          id?: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
