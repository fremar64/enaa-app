import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Configuration Supabase manquante. Vérifiez vos variables d\'environnement.');
}

// Client Supabase principal pour les opérations côté client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Configuration pour l'authentification avec Row Level Security
export const createSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'enaa-app',
      },
    },
  });
};

// Types pour l'authentification
export type AuthUser = {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  profile?: {
    name: string;
    avatar_url?: string;
    grade_level?: string;
    class_id?: string;
  };
};