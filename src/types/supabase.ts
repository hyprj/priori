export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      project: {
        Row: {
          created_at: string | null;
          display: string;
          id: number;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          display?: string;
          id?: number;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          display?: string;
          id?: number;
          name?: string;
          user_id?: string;
        };
      };
      sections: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          order: number | null;
          project_id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          order?: number | null;
          project_id: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          order?: number | null;
          project_id?: number;
        };
      };
      tasks: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          note: string | null;
          order: number;
          priority: number;
          section_id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          note?: string | null;
          order: number;
          priority: number;
          section_id: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          note?: string | null;
          order?: number;
          priority?: number;
          section_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
