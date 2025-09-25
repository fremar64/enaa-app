#!/bin/bash

# Script de configuration ENAA Supabase
# À exécuter après le déploiement de Supabase sur Coolify

echo "🚀 Configuration de Supabase pour ENAA"
echo "======================================="

# Configuration des variables (à adapter selon votre déploiement Coolify)
SUPABASE_URL="https://supabase.ceredis.net"
SUPABASE_API_URL="$SUPABASE_URL/rest/v1"

echo "📋 Informations nécessaires pour la suite :"
echo ""
echo "1. URL Supabase : $SUPABASE_URL"
echo "2. URL API : $SUPABASE_API_URL"
echo ""
echo "⚠️  Vous devez récupérer ces informations depuis votre dashboard Coolify :"
echo "   - Anon Key (clé publique)"
echo "   - Service Role Key (clé privée)"
echo "   - JWT Secret"
echo ""
echo "📁 Ces informations se trouvent dans :"
echo "   - Coolify > Votre projet Supabase > Variables d'environnement"
echo "   - Ou dans les logs de démarrage du conteneur Supabase"
echo ""
echo "🔧 Prochaines étapes :"
echo "1. Copier le fichier database/schema.sql"
echo "2. L'exécuter via l'interface Supabase ou psql"
echo "3. Configurer les variables d'environnement dans .env.local"
echo "4. Déployer sur Vercel avec le domaine enaa.ceredis.net"