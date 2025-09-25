/**
 * Configuration tRPC pour l'application ENAA
 * Fournit une API type-safe entre le client et le serveur
 */

import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { createSupabaseClient } from '../supabase/client';

/**
 * Création du contexte tRPC avec accès à Supabase
 * Le contexte est accessible dans tous les procédures tRPC
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const supabase = createSupabaseClient();

  // Obtenir la session utilisateur depuis les cookies
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    supabase,
    session,
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;