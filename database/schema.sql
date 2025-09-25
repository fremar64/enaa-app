-- =====================================
-- Schéma de base de données pour ENAA
-- Environnement Numérique d'Apprentissage Adaptatif
-- =====================================

-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================
-- Types énumérés
-- =====================================

CREATE TYPE user_role AS ENUM ('student', 'teacher', 'parent', 'admin');
CREATE TYPE grade_level AS ENUM ('CP', 'CE1', 'CE2');
CREATE TYPE subject AS ENUM ('mathematics', 'french', 'science');
CREATE TYPE activity_status AS ENUM ('not_started', 'in_progress', 'completed', 'mastered', 'needs_review');
CREATE TYPE activity_type AS ENUM ('manipulation', 'problem_solving', 'drilling', 'assessment', 'game');
CREATE TYPE interaction_mode AS ENUM ('individual', 'guided', 'autonomous');
CREATE TYPE content_type AS ENUM ('hint', 'problem', 'explanation', 'encouragement');

-- =====================================
-- Table des profils utilisateurs
-- =====================================

CREATE TABLE profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    role user_role NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    class_id UUID,
    grade_level grade_level,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Table des classes
-- =====================================

CREATE TABLE classes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    grade_level grade_level NOT NULL,
    academic_year TEXT NOT NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Modules d'apprentissage
-- =====================================

CREATE TABLE learning_modules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    grade_level grade_level NOT NULL,
    subject subject NOT NULL,
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    competencies JSONB DEFAULT '[]',
    adaptation_rules JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Séquences d'apprentissage
-- =====================================

CREATE TABLE sequences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    objectives JSONB DEFAULT '[]',
    duration_minutes INTEGER NOT NULL,
    prerequisites JSONB DEFAULT '[]',
    order_index INTEGER NOT NULL,
    phases JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Activités d'apprentissage
-- =====================================

CREATE TABLE activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sequence_id UUID REFERENCES sequences(id) ON DELETE CASCADE NOT NULL,
    phase_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type activity_type NOT NULL,
    interaction_mode interaction_mode NOT NULL,
    config JSONB DEFAULT '{}',
    content JSONB DEFAULT '{}',
    success_criteria JSONB DEFAULT '{}',
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Progrès des élèves
-- =====================================

CREATE TABLE student_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
    status activity_status DEFAULT 'not_started',
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    attempts_count INTEGER DEFAULT 0,
    strategies_used JSONB DEFAULT '[]',
    errors JSONB DEFAULT '[]',
    time_spent INTEGER DEFAULT 0, -- en secondes
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, activity_id)
);

-- =====================================
-- Analytics d'apprentissage
-- =====================================

CREATE TABLE learning_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE NOT NULL,
    competency_scores JSONB DEFAULT '[]',
    difficulties JSONB DEFAULT '[]',
    preferred_strategies JSONB DEFAULT '[]',
    cognitive_profile JSONB DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, module_id)
);

-- =====================================
-- Contenu généré par IA
-- =====================================

CREATE TABLE ai_generated_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
    content_type content_type NOT NULL,
    prompt_used TEXT NOT NULL,
    generated_content JSONB NOT NULL,
    effectiveness_score INTEGER CHECK (effectiveness_score >= 0 AND effectiveness_score <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Sessions de tutorat IA
-- =====================================

CREATE TABLE ai_tutor_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
    interactions JSONB DEFAULT '[]',
    session_summary TEXT,
    effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- Contraintes et index
-- =====================================

-- Contrainte de clé étrangère pour class_id dans profiles
ALTER TABLE profiles ADD CONSTRAINT fk_profiles_class_id 
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL;

-- Index pour améliorer les performances
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_class_id ON profiles(class_id);
CREATE INDEX idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX idx_sequences_module_id ON sequences(module_id);
CREATE INDEX idx_activities_sequence_id ON activities(sequence_id);
CREATE INDEX idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX idx_student_progress_activity_id ON student_progress(activity_id);
CREATE INDEX idx_student_progress_status ON student_progress(status);
CREATE INDEX idx_learning_analytics_student_id ON learning_analytics(student_id);
CREATE INDEX idx_learning_analytics_module_id ON learning_analytics(module_id);
CREATE INDEX idx_ai_generated_content_student_id ON ai_generated_content(student_id);
CREATE INDEX idx_ai_tutor_sessions_student_id ON ai_tutor_sessions(student_id);

-- =====================================
-- Fonctions utilitaires
-- =====================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour la table profiles
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour la table learning_analytics
CREATE TRIGGER update_learning_analytics_updated_at 
    BEFORE UPDATE ON learning_analytics 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================
-- Politiques RLS (Row Level Security)
-- =====================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tutor_sessions ENABLE ROW LEVEL SECURITY;

-- Politiques pour profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view profiles in their classes" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles teacher_profile 
            WHERE teacher_profile.user_id = auth.uid() 
            AND teacher_profile.role = 'teacher'
            AND profiles.class_id IN (
                SELECT id FROM classes WHERE teacher_id = teacher_profile.id
            )
        )
    );

-- Politiques pour classes
CREATE POLICY "Teachers can view their own classes" ON classes
    FOR ALL USING (
        teacher_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'teacher'
        )
    );

CREATE POLICY "Students can view their class" ON classes
    FOR SELECT USING (
        id IN (
            SELECT class_id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

-- Politiques pour student_progress
CREATE POLICY "Students can view their own progress" ON student_progress
    FOR SELECT USING (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Students can update their own progress" ON student_progress
    FOR INSERT WITH CHECK (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Students can modify their own progress" ON student_progress
    FOR UPDATE USING (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Teachers can view progress of their students" ON student_progress
    FOR SELECT USING (
        student_id IN (
            SELECT p.id FROM profiles p
            JOIN classes c ON p.class_id = c.id
            JOIN profiles teacher ON c.teacher_id = teacher.id
            WHERE teacher.user_id = auth.uid() AND teacher.role = 'teacher'
        )
    );

-- Politiques pour learning_analytics
CREATE POLICY "Students can view their own analytics" ON learning_analytics
    FOR SELECT USING (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Teachers can view analytics of their students" ON learning_analytics
    FOR SELECT USING (
        student_id IN (
            SELECT p.id FROM profiles p
            JOIN classes c ON p.class_id = c.id
            JOIN profiles teacher ON c.teacher_id = teacher.id
            WHERE teacher.user_id = auth.uid() AND teacher.role = 'teacher'
        )
    );

-- Politiques pour les modules, séquences et activités (lecture publique pour les utilisateurs authentifiés)
CREATE POLICY "Authenticated users can view learning modules" ON learning_modules
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view sequences" ON sequences
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view activities" ON activities
    FOR SELECT USING (auth.role() = 'authenticated');

-- Politiques pour le contenu IA
CREATE POLICY "Students can view their AI content" ON ai_generated_content
    FOR SELECT USING (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Students can insert their AI content" ON ai_generated_content
    FOR INSERT WITH CHECK (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Students can view their AI tutor sessions" ON ai_tutor_sessions
    FOR SELECT USING (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "Students can insert their AI tutor sessions" ON ai_tutor_sessions
    FOR INSERT WITH CHECK (
        student_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'student'
        )
    );

-- =====================================
-- Données de démonstration (optionnel)
-- =====================================

-- Modules de démonstration
INSERT INTO learning_modules (name, description, grade_level, subject, order_index, competencies) VALUES
('Structures Additives', 'Addition et soustraction avec différentes représentations', 'CE1', 'mathematics', 1, 
'[
    {
        "id": "add_sub_concrete",
        "name": "Addition/Soustraction concrète",
        "description": "Maîtriser l''addition et la soustraction avec du matériel concret",
        "type": "procedural"
    },
    {
        "id": "add_sub_pictorial", 
        "name": "Addition/Soustraction imagée",
        "description": "Résoudre des problèmes additifs avec des représentations imagées",
        "type": "conceptual"
    },
    {
        "id": "add_sub_symbolic",
        "name": "Addition/Soustraction symbolique", 
        "description": "Utiliser les écritures mathématiques pour additionner et soustraire",
        "type": "procedural"
    }
]'),

('Multiplication', 'Construction du sens de la multiplication et mémorisation des tables', 'CE2', 'mathematics', 2,
'[
    {
        "id": "mult_repeated_addition",
        "name": "Multiplication comme addition répétée",
        "description": "Comprendre la multiplication comme une addition répétée",
        "type": "conceptual"
    },
    {
        "id": "mult_tables",
        "name": "Tables de multiplication",
        "description": "Mémoriser les tables de multiplication",
        "type": "procedural"
    },
    {
        "id": "mult_problem_solving",
        "name": "Résolution de problèmes multiplicatifs",
        "description": "Résoudre des problèmes impliquant la multiplication",
        "type": "strategic"
    }
]'),

('Division', 'Partage, quotition et division euclidienne', 'CE2', 'mathematics', 3,
'[
    {
        "id": "div_sharing",
        "name": "Division-partage",
        "description": "Comprendre la division comme un partage équitable",
        "type": "conceptual"
    },
    {
        "id": "div_quotition",
        "name": "Division-quotition",
        "description": "Comprendre la division comme une soustraction répétée",
        "type": "conceptual"
    },
    {
        "id": "div_euclidean",
        "name": "Division euclidienne",
        "description": "Maîtriser l''algorithme de la division euclidienne",
        "type": "procedural"
    }
]');

-- Commentaires sur le schéma
COMMENT ON TABLE profiles IS 'Profils utilisateurs avec informations pédagogiques';
COMMENT ON TABLE classes IS 'Classes gérées par les enseignants';
COMMENT ON TABLE learning_modules IS 'Modules d''apprentissage par niveau et matière';
COMMENT ON TABLE sequences IS 'Séquences pédagogiques au sein des modules';
COMMENT ON TABLE activities IS 'Activités interactives d''apprentissage';
COMMENT ON TABLE student_progress IS 'Suivi des progrès individuels des élèves';
COMMENT ON TABLE learning_analytics IS 'Analytics d''apprentissage pour l''adaptation';
COMMENT ON TABLE ai_generated_content IS 'Contenu généré par IA pour chaque élève';
COMMENT ON TABLE ai_tutor_sessions IS 'Sessions de tutorat intelligent';