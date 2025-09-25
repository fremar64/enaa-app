/**
 * Hook personnalisé pour l'authentification avec Supabase
 * Gère la connexion, déconnexion et surveillance de l'état d'authentification
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase/client';
import { useAppStore } from '../stores/app-store';
import type { Profile } from '../types';

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, setLoading, logout } = useAppStore();

  useEffect(() => {
    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setLoading(true);
        
        // Récupérer le profil utilisateur
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Erreur lors de la récupération du profil:', error);
          logout();
        } else if (profile) {
          setUser(profile as Profile);
        }
        
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        logout();
        router.push('/auth/login');
      }
    });

    // Vérifier la session actuelle au montage
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user && !user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (profile) {
          setUser(profile as Profile);
        }
      }
      
      setLoading(false);
    };

    checkSession();

    return () => subscription.unsubscribe();
  }, [setUser, setLoading, logout, router, user]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setLoading(false);
      throw error;
    }
    
    // L'état sera mis à jour par le listener onAuthStateChange
  };

  const signUp = async (email: string, password: string, name: string, role: 'student' | 'teacher' = 'student') => {
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      throw error;
    }

    // TODO: Créer le profil utilisateur après setup Supabase
    if (data.user) {
      console.log('Utilisateur créé:', data.user.id, 'avec le rôle:', role);
      // Le profil sera créé manuellement pour le moment
    }

    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // L'état sera mis à jour par le listener onAuthStateChange
  };

  return {
    user,
    isAuthenticated,
    isLoading: useAppStore((state) => state.isLoading),
    signIn,
    signUp,
    signOut,
  };
}