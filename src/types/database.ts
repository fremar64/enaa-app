// Types générés automatiquement par Supabase CLI
// Pour générer ce fichier : npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts

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
          user_id: string
          role: 'student' | 'teacher' | 'parent' | 'admin'
          name: string
          avatar_url: string | null
          class_id: string | null
          grade_level: 'CP' | 'CE1' | 'CE2' | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'student' | 'teacher' | 'parent' | 'admin'
          name: string
          avatar_url?: string | null
          class_id?: string | null
          grade_level?: 'CP' | 'CE1' | 'CE2' | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          name?: string
          avatar_url?: string | null
          class_id?: string | null
          grade_level?: 'CP' | 'CE1' | 'CE2' | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          name: string
          teacher_id: string
          grade_level: 'CP' | 'CE1' | 'CE2'
          academic_year: string
          settings: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          teacher_id: string
          grade_level: 'CP' | 'CE1' | 'CE2'
          academic_year: string
          settings?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          teacher_id?: string
          grade_level?: 'CP' | 'CE1' | 'CE2'
          academic_year?: string
          settings?: Json
          created_at?: string
        }
      }
      learning_modules: {
        Row: {
          id: string
          name: string
          description: string
          grade_level: 'CP' | 'CE1' | 'CE2'
          subject: 'mathematics' | 'french' | 'science'
          order_index: number
          is_active: boolean
          competencies: Json
          adaptation_rules: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          grade_level: 'CP' | 'CE1' | 'CE2'
          subject: 'mathematics' | 'french' | 'science'
          order_index: number
          is_active?: boolean
          competencies?: Json
          adaptation_rules?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          grade_level?: 'CP' | 'CE1' | 'CE2'
          subject?: 'mathematics' | 'french' | 'science'
          order_index?: number
          is_active?: boolean
          competencies?: Json
          adaptation_rules?: Json
          created_at?: string
        }
      }
      sequences: {
        Row: {
          id: string
          module_id: string
          name: string
          description: string
          objectives: Json
          duration_minutes: number
          prerequisites: Json
          order_index: number
          phases: Json
          created_at: string
        }
        Insert: {
          id?: string
          module_id: string
          name: string
          description: string
          objectives: Json
          duration_minutes: number
          prerequisites?: Json
          order_index: number
          phases?: Json
          created_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          name?: string
          description?: string
          objectives?: Json
          duration_minutes?: number
          prerequisites?: Json
          order_index?: number
          phases?: Json
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          sequence_id: string
          phase_id: string
          name: string
          type: 'manipulation' | 'problem_solving' | 'drilling' | 'assessment' | 'game'
          interaction_mode: 'individual' | 'guided' | 'autonomous'
          config: Json
          content: Json
          success_criteria: Json
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          sequence_id: string
          phase_id: string
          name: string
          type: 'manipulation' | 'problem_solving' | 'drilling' | 'assessment' | 'game'
          interaction_mode: 'individual' | 'guided' | 'autonomous'
          config: Json
          content: Json
          success_criteria: Json
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          sequence_id?: string
          phase_id?: string
          name?: string
          type?: 'manipulation' | 'problem_solving' | 'drilling' | 'assessment' | 'game'
          interaction_mode?: 'individual' | 'guided' | 'autonomous'
          config?: Json
          content?: Json
          success_criteria?: Json
          order_index?: number
          created_at?: string
        }
      }
      student_progress: {
        Row: {
          id: string
          student_id: string
          activity_id: string
          status: 'not_started' | 'in_progress' | 'completed' | 'mastered' | 'needs_review'
          score: number
          attempts_count: number
          strategies_used: Json
          errors: Json
          time_spent: number
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          activity_id: string
          status?: 'not_started' | 'in_progress' | 'completed' | 'mastered' | 'needs_review'
          score?: number
          attempts_count?: number
          strategies_used?: Json
          errors?: Json
          time_spent?: number
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          activity_id?: string
          status?: 'not_started' | 'in_progress' | 'completed' | 'mastered' | 'needs_review'
          score?: number
          attempts_count?: number
          strategies_used?: Json
          errors?: Json
          time_spent?: number
          completed_at?: string | null
          created_at?: string
        }
      }
      learning_analytics: {
        Row: {
          id: string
          student_id: string
          module_id: string
          competency_scores: Json
          difficulties: Json
          preferred_strategies: Json
          cognitive_profile: Json
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          module_id: string
          competency_scores?: Json
          difficulties?: Json
          preferred_strategies?: Json
          cognitive_profile?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          module_id?: string
          competency_scores?: Json
          difficulties?: Json
          preferred_strategies?: Json
          cognitive_profile?: Json
          updated_at?: string
        }
      }
      ai_generated_content: {
        Row: {
          id: string
          student_id: string
          activity_id: string
          content_type: 'hint' | 'problem' | 'explanation' | 'encouragement'
          prompt_used: string
          generated_content: Json
          effectiveness_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          activity_id: string
          content_type: 'hint' | 'problem' | 'explanation' | 'encouragement'
          prompt_used: string
          generated_content: Json
          effectiveness_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          activity_id?: string
          content_type?: 'hint' | 'problem' | 'explanation' | 'encouragement'
          prompt_used?: string
          generated_content?: Json
          effectiveness_score?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'student' | 'teacher' | 'parent' | 'admin'
      grade_level: 'CP' | 'CE1' | 'CE2'
      subject: 'mathematics' | 'french' | 'science'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}