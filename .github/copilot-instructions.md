# Instructions Copilot pour ENAA

## Vue d'ensemble du projet

ENAA (Environnement Numérique d'Apprentissage Adaptatif) est une plateforme d'apprentissage personnalisée pour l'enseignement primaire (Cycle 2) utilisant l'IA pour s'adapter aux besoins de chaque élève.

## Architecture technique

### Stack principal
- **Frontend:** Next.js 14+ (App Router), TypeScript strict, Tailwind CSS
- **Backend:** Supabase (PostgreSQL), API Routes Next.js, tRPC
- **State Management:** Zustand avec middleware Immer
- **UI:** Shadcn/ui, Radix UI, Lucide React
- **Animations:** Framer Motion
- **Validation:** Zod + React Hook Form
- **Tests:** Jest, Testing Library, Playwright E2E
- **IA:** Gemma API (avec fallback OpenAI)

### Structure des dossiers

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes d'authentification
│   ├── dashboard/         # Dashboard élèves/enseignants
│   ├── learn/             # Modules d'apprentissage
│   └── api/               # API Routes & tRPC
├── components/            # Composants React
│   ├── ui/               # Composants UI de base (Shadcn)
│   ├── learning/         # Composants pédagogiques spécialisés
│   ├── auth/             # Composants d'authentification
│   └── dashboard/        # Composants tableau de bord
├── lib/                  # Utilitaires et configurations
│   ├── supabase/         # Configuration Supabase + RLS
│   ├── trpc/             # Configuration tRPC type-safe
│   ├── ai/               # Services IA (Gemma, OpenAI)
│   ├── config.ts         # Configuration centralisée
│   └── utils.ts          # Utilitaires généraux
├── types/                # Types TypeScript
│   ├── database.ts       # Types générés Supabase
│   └── index.ts          # Types métier ENAA
├── stores/               # Stores Zustand
│   └── app-store.ts      # Store principal avec sélecteurs
└── hooks/                # Hooks React personnalisés
    └── useAuth.ts        # Hook d'authentification
```

## Domaine métier

### Modules d'apprentissage MVP
1. **Structures Additives (CE1)** - Addition/soustraction avec 3 sens
2. **Multiplication (CE2)** - Construction du sens + tables
3. **Division (CE2)** - Partage vs quotition + euclidienne

### Utilisateurs
- **Élèves:** CP, CE1, CE2 avec parcours adaptatifs personnalisés
- **Enseignants:** Suivi classe, analytics, configuration parcours
- **Parents:** Consultation progrès (phase ultérieure)
- **Admin:** Gestion contenu, paramétrage système

### Système d'adaptation IA
- Analyse temps réel des patterns d'apprentissage
- Adaptation dynamique difficulté/type exercices
- Génération contenu contextualisé
- Détection précoce difficultés
- Recommandations d'intervention

## Conventions de développement

### Nommage
- **Composants:** PascalCase (`LearningActivity.tsx`)
- **Hooks:** camelCase avec préfixe `use` (`useAdaptiveLearning.ts`)
- **Types:** PascalCase (`StudentProgress`, `LearningModule`)
- **Fonctions:** camelCase (`calculateDifficultyLevel`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_ATTEMPTS_PER_ACTIVITY`)

### Types et validation
- Utiliser Zod pour toute validation de données
- Types stricts avec `satisfies` pour les objets config
- Pas de `any`, préférer `unknown` si nécessaire
- Types métier dans `src/types/index.ts`
- Types DB générés dans `src/types/database.ts`

### Composants React
- Composants fonctionnels avec TypeScript
- Props interfaces explicites
- Forward refs pour les composants UI
- Gestion d'erreur avec Error Boundaries
- Accessibilité (ARIA) intégrée

### Style et UI
- Tailwind CSS avec classes personnalisées ENAA
- Système de design tokens (couleurs, espacements)
- Mode sombre/clair avec CSS variables
- Responsive design mobile-first
- Animations avec Framer Motion pour feedback

### État et données
- Zustand pour l'état global application
- React Query via tRPC pour état serveur
- État local avec useState/useReducer si nécessaire
- Pas de prop drilling, utiliser les stores

### API et données
- tRPC pour type-safety client/serveur
- Supabase RLS pour sécurité fine
- Validation Zod côté client ET serveur
- Gestion d'erreur standardisée
- Cache intelligent avec React Query

### Tests
- Tests unitaires avec Jest + Testing Library
- Tests E2E critiques avec Playwright
- Mocks des services externes (Supabase, IA)
- Coverage minimum 70% sur logique métier

### Pédagogie et IA
- Prompts IA contextuels par domaine
- Système de hints progressifs
- Analytics apprentissage temps réel
- Gamification équilibrée (pas excessive)
- Respect des théories cognitives

### Sécurité et conformité
- RGPD strict, consentement parental
- Chiffrement données sensibles
- Audit logs des actions critiques
- Anonymisation pour recherche
- Politique RLS Supabase stricte

### Performance
- Code splitting automatique Next.js
- Images optimisées avec next/image
- Lazy loading composants lourds
- Debounce interactions utilisateur
- Cache stratégique IA/API

## Commandes utiles

```bash
# Développement
npm run dev              # Démarrer serveur dev
npm run build            # Build production
npm run type-check       # Vérification TypeScript

# Tests
npm run test             # Tests unitaires
npm run test:e2e         # Tests E2E Playwright
npm run test:coverage    # Coverage des tests

# Qualité code
npm run lint             # ESLint
npm run format           # Prettier
npm run db:generate-types # Types Supabase

# Base de données
npm run db:reset         # Reset DB locale
supabase start           # Démarrer Supabase local
```

## Bonnes pratiques spécifiques

### Composants d'apprentissage
```typescript
// Toujours typer les props d'activité
interface ActivityProps {
  activity: Activity;
  student: Profile;
  onProgress: (progress: StudentProgress) => void;
  adaptationLevel: 1 | 2 | 3 | 4 | 5;
}

// Gestion des erreurs pédagogiques
const handleStudentError = (error: StudentError) => {
  logAnalytics('student_error', { 
    type: error.type,
    conceptual: error.isConceptual 
  });
  
  if (error.requiresIntervention) {
    triggerAITutor(error.context);
  }
};
```

### Services IA
```typescript
// Prompts contextuels structurés
const createHintPrompt = (context: LearningContext) => ({
  role: 'educational_assistant',
  grade: context.student.gradeLevel,
  difficulty: context.activity.difficulty,
  previousErrors: context.recentErrors,
  learningObjective: context.activity.objective
});

// Fallback robuste
const generateHint = async (context: LearningContext) => {
  try {
    return await gemmaAPI.generateHint(context);
  } catch (error) {
    console.warn('Gemma API error, falling back to OpenAI');
    return await openaiAPI.generateHint(context);
  }
};
```

### Analytics et adaptation
```typescript
// Événements d'apprentissage typés
type LearningEvent = 
  | { type: 'activity_start'; activityId: string; timestamp: Date }
  | { type: 'error_made'; error: StudentError; strategy: string }
  | { type: 'success'; timeSpent: number; attemptsCount: number }
  | { type: 'adaptation_triggered'; reason: string; adjustment: number };

// Calcul de difficulté adaptatif
const calculateNextDifficulty = (
  currentLevel: number,
  recentPerformance: number[],
  studentProfile: CognitiveProfile
): number => {
  const trend = calculatePerformanceTrend(recentPerformance);
  const personalityFactor = studentProfile.preferredChallenge;
  
  return Math.max(1, Math.min(5, 
    currentLevel + (trend * personalityFactor)
  ));
};
```

Cette application prioritise l'expérience d'apprentissage de l'élève tout en fournissant aux enseignants les outils nécessaires pour un suivi pédagogique efficace.