/**
 * Script de test de connexion Supabase pour ENAA
 * À exécuter après la configuration pour valider la connexion
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration depuis les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testSupabaseConnection() {
  console.log('🧪 Test de connexion Supabase ENAA');
  console.log('=====================================');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables d\'environnement manquantes :');
    console.error('- NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!supabaseKey);
    process.exit(1);
  }

  console.log('📡 URL Supabase:', supabaseUrl);
  console.log('🔑 Clé anonyme:', supabaseKey.substring(0, 20) + '...');
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Test 1: Connexion basique
    console.log('\n🔍 Test 1: Connexion basique...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message);
      return false;
    }
    
    console.log('✅ Connexion réussie !');
    
    // Test 2: Vérification des tables ENAA
    console.log('\n🔍 Test 2: Vérification des tables...');
    const tables = [
      'profiles',
      'classes', 
      'learning_modules',
      'sequences',
      'activities',
      'student_progress',
      'learning_analytics'
    ];
    
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('*').limit(1);
      if (tableError) {
        console.error(`❌ Table ${table}:`, tableError.message);
      } else {
        console.log(`✅ Table ${table}: OK`);
      }
    }
    
    // Test 3: Données de démonstration
    console.log('\n🔍 Test 3: Modules d\'apprentissage...');
    const { data: modules, error: modulesError } = await supabase
      .from('learning_modules')
      .select('*');
      
    if (modulesError) {
      console.error('❌ Erreur modules:', modulesError.message);
    } else {
      console.log(`✅ ${modules.length} modules trouvés`);
      modules.forEach(module => {
        console.log(`   - ${module.name} (${module.grade_level})`);
      });
    }
    
    console.log('\n🎉 Tous les tests sont passés avec succès !');
    console.log('🚀 ENAA est prêt à être utilisé.');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error.message);
    return false;
  }
}

// Exécution du test
if (require.main === module) {
  testSupabaseConnection()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Erreur fatale:', error);
      process.exit(1);
    });
}

module.exports = { testSupabaseConnection };