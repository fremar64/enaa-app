# 🔧 Guide de Configuration ENAA avec Coolify + Vercel

## Étape 1 : Déploiement Supabase sur Coolify

### 1.1 Création du service Supabase

1. **Accédez à Coolify** : https://coolify.ceredis.net
2. **Créer un nouveau projet** : `enaa-supabase`
3. **Déployer Supabase** via "One-click services"

### 1.2 Configuration recommandée

```yaml
Service: Supabase
Domain: supabase.ceredis.net
Database:
  - PostgreSQL Password: [générer un mot de passe fort]
  - Database Name: enaa_db
Environment:
  - JWT_SECRET: [générer 32+ caractères]
  - SITE_URL: https://enaa.ceredis.net
  - ADDITIONAL_REDIRECT_URLS: https://enaa.ceredis.net/auth/callback
```

### 1.3 DNS Cloudflare

Ajouter l'enregistrement CNAME :
```
Type: CNAME
Name: supabase
Target: [IP-de-votre-serveur-coolify]
Proxy: 🟠 Activé
```

## Étape 2 : Initialisation de la base de données

### 2.1 Récupération des clés

Une fois Supabase déployé, récupérez depuis Coolify :
- `ANON_KEY` (clé publique)
- `SERVICE_ROLE_KEY` (clé privée)
- `JWT_SECRET`

### 2.2 Exécution du schéma SQL

**Option A : Via l'interface Supabase**
1. Aller sur `https://supabase.ceredis.net`
2. Se connecter avec les credentials
3. Aller dans "SQL Editor"
4. Copier/coller le contenu de `database/schema.sql`
5. Exécuter

**Option B : Via psql (ligne de commande)**
```bash
# Se connecter à la base
psql postgresql://postgres:[PASSWORD]@supabase.ceredis.net:5432/enaa_db

# Exécuter le schéma
\i database/schema.sql
```

## Étape 3 : Configuration des variables d'environnement

### 3.1 Mise à jour de .env.local

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://supabase.ceredis.net
NEXT_PUBLIC_SUPABASE_ANON_KEY=[VOTRE_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[VOTRE_SERVICE_ROLE_KEY]

# AI Configuration (à configurer plus tard)
GEMMA_API_KEY=your_gemma_api_key
GEMMA_API_URL=your_gemma_api_url
OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXTAUTH_SECRET=[VOTRE_JWT_SECRET]
NEXTAUTH_URL=https://enaa.ceredis.net

# Development
NODE_ENV=production
```

## Étape 4 : Déploiement sur Vercel

### 4.1 Configuration du domaine personnalisé

1. **Importer le projet** depuis GitHub
2. **Configurer les variables d'environnement** dans Vercel
3. **Ajouter le domaine personnalisé** : `enaa.ceredis.net`

### 4.2 DNS Cloudflare pour Vercel

Ajouter l'enregistrement CNAME :
```
Type: CNAME
Name: enaa
Target: cname.vercel-dns.com
Proxy: 🟠 Activé
```

### 4.3 Variables d'environnement Vercel

Dans le dashboard Vercel, ajouter :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## Étape 5 : Test et validation

### 5.1 Vérifications
- [ ] Supabase accessible sur `https://supabase.ceredis.net`
- [ ] Base de données créée avec le schéma ENAA
- [ ] Application accessible sur `https://enaa.ceredis.net`
- [ ] Authentification fonctionnelle
- [ ] Pas d'erreurs dans les logs Vercel

### 5.2 Tests de fonctionnement
```bash
# Test local avec les nouvelles variables
npm run dev

# Test de build
npm run build

# Test des types
npm run type-check
```

## 🚨 Points d'attention

1. **Sécurité** : Jamais commit les vraies clés API
2. **CORS** : Vérifier la configuration Supabase pour `enaa.ceredis.net`
3. **SSL** : S'assurer que tous les services sont en HTTPS
4. **Monitoring** : Activer les logs Coolify et Vercel

## 📞 Support

En cas de problème :
1. Vérifier les logs Coolify pour Supabase
2. Vérifier les logs Vercel pour l'application
3. Tester les connexions réseau entre services