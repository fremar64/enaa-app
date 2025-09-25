/**
 * Configuration principale de tRPC pour ENAA
 * Définit les middlewares, les procédures et les transformations
 */

import { initTRPC, TRPCError } from '@trpc/server';
import { type Context } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

// Initialisation de tRPC avec le contexte
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Middleware d'authentification
const enforceUserIsAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Vous devez être connecté pour accéder à cette ressource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

// Middleware pour vérifier le rôle enseignant
const enforceUserIsTeacher = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Vous devez être connecté',
    });
  }

  // TODO: Vérifier le profil utilisateur pour confirmer le rôle
  // Temporairement désactivé jusqu'à ce que la base de données soit configurée
  const isTeacher = true; // À remplacer par une vraie vérification
  
  if (!isTeacher) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Accès réservé aux enseignants',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
      userRole: 'teacher' as const,
    },
  });
});

// Middleware pour vérifier le rôle élève
const enforceUserIsStudent = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Vous devez être connecté',
    });
  }

  // TODO: Vérifier le profil utilisateur pour confirmer le rôle étudiant
  // Temporairement désactivé jusqu'à ce que la base de données soit configurée
  const isStudent = true; // À remplacer par une vraie vérification
  
  if (!isStudent) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Accès réservé aux élèves',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
      userRole: 'student' as const,
    },
  });
});

// Export des constructeurs de procédures
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);
export const teacherProcedure = t.procedure.use(enforceUserIsTeacher);
export const studentProcedure = t.procedure.use(enforceUserIsStudent);