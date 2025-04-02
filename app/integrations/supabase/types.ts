
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          name: string | null
          avatar_url: string | null
          course: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          course?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          course?: string | null
        }
      }
      tcc_plans: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          deadline: string | null
          weekly_hours: number | null
          stage: number
          completed: boolean
          plan_data: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          deadline?: string | null
          weekly_hours?: number | null
          stage?: number
          completed?: boolean
          plan_data?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          deadline?: string | null
          weekly_hours?: number | null
          stage?: number
          completed?: boolean
          plan_data?: Json | null
        }
      }
    }
  }
}
