# ENAA - Environnement Numérique d'Apprentissage Adaptatif

[![GitHub](https://img.shields.io/badge/GitHub-fremar64%2Fenaa--app-blue)](https://github.com/fremar64/enaa-app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Recherche-orange)](LICENSE)

Application d'apprentissage adaptatif pour l'enseignement primaire (Cycle 2) développée avec Next.js 14+, TypeScript, et Supabase.

## 🚀 Technologies utilisées

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL), tRPC
- **State Management:** Zustand
- **UI Components:** Shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Testing:** Jest, Testing Library, Playwright
- **IA:** Integration Gemma + OpenAI (fallback)

## 📚 Modules d'apprentissage

### Phase MVP
1. **Structures Additives (CE1)** - Addition/Soustraction avec 3 sens
2. **Multiplication (CE2)** - Construction du sens et mémorisation des tables
3. **Division (CE2)** - Partage vs Quotition, division euclidienne

## 🛠️ Installation et configuration

### Prérequis
- Node.js 18+
- npm/yarn/pnpm
- Compte Supabase

### Configuration

1. **Cloner et installer les dépendances :**
```bash
npm install
```

2. **Configuration des variables d'environnement :**
Copier `.env.example` vers `.env.local` et remplir les valeurs :
- Configuration Supabase (URL, clés API)
- Clés API IA (Gemma, OpenAI)
- Secrets NextAuth

3. **Configuration Supabase :**
- Créer les tables selon le schéma dans `/database/schema.sql`
- Configurer les politiques RLS (Row Level Security)
- Activer l'authentification par email

### Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Lancer les tests
npm run test

# Tests E2E avec Playwright
npm run test:e2e

# Build de production
npm run build
```

## 📁 Structure du projet

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes d'authentification
│   ├── dashboard/         # Dashboard élèves/enseignants
│   ├── learn/             # Modules d'apprentissage
│   └── api/               # API Routes
├── components/            # Composants React réutilisables
│   ├── ui/               # Composants UI de base (Shadcn)
│   ├── learning/         # Composants pédagogiques
│   ├── auth/             # Composants d'authentification
│   └── dashboard/        # Composants tableau de bord
├── lib/                  # Utilitaires et configurations
│   ├── supabase/         # Configuration Supabase
│   ├── trpc/             # Configuration tRPC
│   ├── ai/               # Services IA (Gemma, OpenAI)
│   └── utils/            # Utilitaires généraux
├── types/                # Types TypeScript
├── stores/               # Stores Zustand
└── hooks/                # Hooks React personnalisés
```

## 🧠 Système d'adaptation

L'application utilise un système d'IA adaptatif qui :
- Analyse les patterns d'apprentissage en temps réel
- Adapte la difficulté et le type d'exercices
- Fournit un accompagnement personnalisé
- Génère du contenu contextualisé

## 🎯 Fonctionnalités principales

### Pour les élèves
- Interface intuitive avec avatar personnalisable
- Parcours d'apprentissage adaptatif
- Activités interactives avec manipulations virtuelles
- Feedback immédiat et encouragements IA
- Système de progression gamifié

### Pour les enseignants
- Dashboard de suivi de classe
- Analytics détaillées par élève
- Configuration des parcours
- Détection automatique des difficultés
- Recommandations d'intervention

## 🔒 Sécurité et conformité

- Conformité RGPD stricte
- Chiffrement des données sensibles
- Consentement parental explicite
- Audit de sécurité régulier
- Anonymisation des données d'analyse

## 📊 Métriques de succès

- Progression des compétences : +20% vs méthodes traditionnelles
- Réduction des difficultés : -30% d'élèves en difficulté
- Engagement : >85% de completion des activités
- Satisfaction enseignants : NPS >60

## 🚀 Déploiement

### Déploiement automatique sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffremar64%2Fenaa-app&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,GEMMA_API_KEY,OPENAI_API_KEY,NEXTAUTH_SECRET&envDescription=Variables%20d'environnement%20requises%20pour%20ENAA&project-name=enaa-app&repository-name=enaa-app)

### Configuration manuelle

1. **Fork ce repository**
2. **Connecter à Vercel** depuis votre dashboard
3. **Configurer les variables d'environnement** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMMA_API_KEY`
   - `OPENAI_API_KEY`
   - `NEXTAUTH_SECRET`

### Infrastructure

- **Production:** Vercel (recommandé)
- **Base de données:** Supabase
- **Monitoring:** Vercel Analytics
- **CDN:** Vercel Edge Network

## 📝 Licence

Projet développé dans le cadre de la recherche en ingénierie cognitive des expériences d'apprentissage.

## 🤝 Contribution

Pour contribuer au projet :
1. Fork du repository
2. Création d'une branche feature
3. Tests et validation pédagogique
4. Pull request avec description détaillée
