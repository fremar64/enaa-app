/**
 * Configuration principale de l'application ENAA
 * Centralise tous les paramètres de configuration
 */

// Configuration de l'environnement
export const env = {
  // Supabase
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,

  // IA
  GEMMA_API_KEY: process.env.GEMMA_API_KEY!,
  GEMMA_API_URL: process.env.GEMMA_API_URL!,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,

  // App
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NODE_ENV: process.env.NODE_ENV!,
} as const;

// Configuration de l'application
export const appConfig = {
  name: 'ENAA',
  description: 'Environnement Numérique d\'Apprentissage Adaptatif',
  version: '1.0.0',
  
  // Paramètres pédagogiques
  learning: {
    // Niveaux de difficulté (1-5)
    difficultyLevels: 5,
    
    // Seuils de réussite
    successThreshold: 70, // Pourcentage
    masteryThreshold: 85, // Pourcentage
    
    // Paramètres d'adaptation
    adaptation: {
      minAttemptsBeforeAdaptation: 3,
      maxDifficultyAdjustment: 2, // -2 à +2
      adaptationSensitivity: 0.1, // 0-1
    },
    
    // Sessions d'apprentissage
    session: {
      recommendedDurationMinutes: 20,
      maxDurationMinutes: 45,
      breakIntervalMinutes: 15,
    },
    
    // IA Tuteur
    aiTutor: {
      maxHintsPerActivity: 3,
      hintDelaySeconds: 30,
      encouragementFrequency: 0.3, // 0-1
    },
  },
  
  // Paramètres d'accessibilité
  accessibility: {
    fontSizes: {
      small: '14px',
      medium: '16px',
      large: '20px',
    },
    contrasts: {
      normal: 'normal',
      high: 'high-contrast',
    },
    animationDuration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
  },
  
  // Configuration par niveau scolaire
  gradeConfigs: {
    CP: {
      sessionDuration: 15,
      maxActivitiesPerSession: 3,
      adaptationSensitivity: 0.2,
      aiTutorLevel: 'scaffolded',
    },
    CE1: {
      sessionDuration: 20,
      maxActivitiesPerSession: 4,
      adaptationSensitivity: 0.15,
      aiTutorLevel: 'guided',
    },
    CE2: {
      sessionDuration: 25,
      maxActivitiesPerSession: 5,
      adaptationSensitivity: 0.1,
      aiTutorLevel: 'minimal',
    },
  },
  
  // Gamification
  gamification: {
    pointsPerActivity: 10,
    bonusPerMastery: 50,
    streakBonus: 5,
    achievements: {
      firstCompletion: { points: 20, badge: 'first-steps' },
      perfectStreak: { points: 100, badge: 'perfectionist' },
      persistence: { points: 50, badge: 'persistent' },
      fastLearner: { points: 75, badge: 'speedy' },
    },
  },
  
  // Analytics et monitoring
  analytics: {
    sampleRate: 1.0, // 0-1
    maxEventsPerSession: 100,
    batchSize: 10,
    
    // Événements trackés
    events: {
      activityStart: 'activity_start',
      activityComplete: 'activity_complete',
      errorMade: 'error_made',
      hintRequested: 'hint_requested',
      adaptationTriggered: 'adaptation_triggered',
      sessionEnd: 'session_end',
    },
  },
  
  // Limites et quotas
  limits: {
    maxStudentsPerClass: 30,
    maxClassesPerTeacher: 5,
    maxProgressHistoryDays: 365,
    maxAIInteractionsPerDay: 100,
    maxFileUploadSizeMB: 5,
  },
  
  // URLs et endpoints
  urls: {
    support: 'https://enaa.support',
    documentation: 'https://docs.enaa.app',
    privacy: 'https://enaa.app/privacy',
    terms: 'https://enaa.app/terms',
  },
  
  // Configuration des modules MVP
  mvpModules: [
    {
      id: 'structures-additives',
      name: 'Structures Additives',
      gradeLevel: 'CE1',
      subject: 'mathematics',
      priority: 1,
    },
    {
      id: 'multiplication',
      name: 'Multiplication',
      gradeLevel: 'CE2',
      subject: 'mathematics',
      priority: 2,
    },
    {
      id: 'division',
      name: 'Division',
      gradeLevel: 'CE2',
      subject: 'mathematics',
      priority: 3,
    },
  ],
} as const;

// Types dérivés de la configuration
export type GradeLevel = keyof typeof appConfig.gradeConfigs;
export type Achievement = keyof typeof appConfig.gamification.achievements;
export type AnalyticsEvent = typeof appConfig.analytics.events[keyof typeof appConfig.analytics.events];

// Validation de la configuration au runtime
export function validateConfig() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];
  
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Variables d'environnement manquantes: ${missing.join(', ')}`);
  }
  
  return true;
}

// Utilitaire pour obtenir la configuration par niveau
export function getGradeConfig(grade: GradeLevel) {
  return appConfig.gradeConfigs[grade];
}

// Utilitaire pour obtenir la configuration d'un module MVP
export function getMVPModule(id: string) {
  return appConfig.mvpModules.find(module => module.id === id);
}