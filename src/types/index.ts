// =====================================
// Types de base pour l'application ENAA
// =====================================

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';
export type GradeLevel = 'CP' | 'CE1' | 'CE2';
export type Subject = 'mathematics' | 'french' | 'science';

// =====================================
// Utilisateurs et Profils
// =====================================

export interface Profile {
  id: string;
  user_id: string;
  role: UserRole;
  name: string;
  avatar_url?: string;
  class_id?: string;
  grade_level?: GradeLevel;
  preferences: UserPreferences;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en';
  accessibility: AccessibilitySettings;
  learning: LearningPreferences;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  contrast: 'normal' | 'high';
  animations: boolean;
  audioSupport: boolean;
}

export interface LearningPreferences {
  preferredRepresentation: 'concrete' | 'pictorial' | 'abstract';
  learningRhythm: 'slow' | 'normal' | 'fast';
  motivationalFactors: string[];
}

export interface Class {
  id: string;
  name: string;
  teacher_id: string;
  grade_level: GradeLevel;
  academic_year: string;
  settings: ClassSettings;
  created_at: string;
}

export interface ClassSettings {
  maxStudents: number;
  adaptationLevel: 'basic' | 'advanced';
  aiTutorEnabled: boolean;
  parentNotifications: boolean;
}

// =====================================
// Modules et Contenus Pédagogiques
// =====================================

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  grade_level: GradeLevel;
  subject: Subject;
  order_index: number;
  is_active: boolean;
  competencies: Competency[];
  sequences: Sequence[];
  adaptation_rules: AdaptationRule[];
}

export interface Competency {
  id: string;
  name: string;
  description: string;
  type: 'conceptual' | 'procedural' | 'strategic';
  prerequisites: string[];
  progression_markers: ProgressionMarker[];
}

export interface ProgressionMarker {
  level: number;
  description: string;
  criteria: string[];
}

export interface Sequence {
  id: string;
  module_id: string;
  name: string;
  description: string;
  objectives: LearningObjective[];
  duration_minutes: number;
  prerequisites: string[];
  order_index: number;
  phases: Phase[];
}

export interface LearningObjective {
  id: string;
  description: string;
  type: 'knowledge' | 'skill' | 'application';
  assessment_criteria: string[];
}

export interface Phase {
  id: string;
  name: string;
  type: 'introduction' | 'discovery' | 'construction' | 'practice' | 'assessment';
  duration_minutes: number;
  activities: Activity[];
}

export interface Activity {
  id: string;
  sequence_id: string;
  phase_id: string;
  name: string;
  type: 'manipulation' | 'problem_solving' | 'drilling' | 'assessment' | 'game';
  interaction_mode: 'individual' | 'guided' | 'autonomous';
  config: ActivityConfig;
  content: ActivityContent;
  success_criteria: SuccessCriteria;
  order_index: number;
}

export interface ActivityConfig {
  difficulty_level: number; // 1-5
  adaptive_parameters: AdaptiveParameters;
  time_limit?: number;
  hints_enabled: boolean;
  ai_tutor_level: 'minimal' | 'guided' | 'scaffolded';
}

export interface AdaptiveParameters {
  difficulty_adjustment: number; // -2 to +2
  representation_mode: 'concrete' | 'pictorial' | 'abstract';
  support_level: 'minimal' | 'guided' | 'scaffolded';
  feedback_frequency: 'immediate' | 'delayed' | 'on_completion';
}

export interface ActivityContent {
  title: string;
  instructions: string;
  materials: Material[];
  interactions: Interaction[];
  media: MediaAsset[];
}

export interface Material {
  id: string;
  type: 'manipulative' | 'visual' | 'audio' | 'text';
  properties: Record<string, unknown>;
}

export interface Interaction {
  id: string;
  type: 'drag_drop' | 'click' | 'input' | 'drawing' | 'speech';
  target: string;
  validation: ValidationRule[];
}

export interface ValidationRule {
  condition: string;
  feedback: string;
  next_action: 'continue' | 'retry' | 'hint' | 'skip';
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'audio' | 'animation';
  url: string;
  alt_text?: string;
  caption?: string;
}

export interface SuccessCriteria {
  completion_threshold: number; // 0-100%
  accuracy_threshold: number; // 0-100%
  time_threshold?: number; // seconds
  attempts_threshold?: number;
}

// =====================================
// Suivi et Analytics
// =====================================

export interface StudentProgress {
  id: string;
  student_id: string;
  activity_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered' | 'needs_review';
  score: number; // 0-100
  attempts_count: number;
  strategies_used: Strategy[];
  errors: ErrorPattern[];
  time_spent: number; // seconds
  completed_at?: string;
  created_at: string;
}

export interface Strategy {
  name: string;
  frequency: number;
  effectiveness: number; // 0-100
}

export interface ErrorPattern {
  type: string;
  description: string;
  frequency: number;
  misconception?: string;
}

export interface LearningAnalytics {
  id: string;
  student_id: string;
  module_id: string;
  competency_scores: CompetencyScore[];
  difficulties: Difficulty[];
  preferred_strategies: Strategy[];
  cognitive_profile: CognitiveProfile;
  updated_at: string;
}

export interface CompetencyScore {
  competency_id: string;
  current_level: number; // 0-100
  progression: number; // -100 to +100
  confidence: number; // 0-100
  last_assessed: string;
}

export interface Difficulty {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  detected_at: string;
  interventions: Intervention[];
}

export interface Intervention {
  type: 'remediation' | 'reinforcement' | 'acceleration';
  description: string;
  effectiveness?: number; // 0-100
  applied_at: string;
}

export interface CognitiveProfile {
  conceptual_understanding: CompetencyLevel[];
  procedural_fluency: ProcedureLevel[];
  problem_solving_strategies: StrategyPreference[];
  learning_rhythm: TemporalProfile;
  motivational_factors: MotivationProfile;
}

export interface CompetencyLevel {
  domain: string;
  level: number; // 0-100
  confidence: number; // 0-100
}

export interface ProcedureLevel {
  procedure: string;
  fluency: number; // 0-100
  accuracy: number; // 0-100
}

export interface StrategyPreference {
  strategy: string;
  preference_score: number; // 0-100
  effectiveness: number; // 0-100
}

export interface TemporalProfile {
  average_session_duration: number; // minutes
  preferred_session_length: number; // minutes
  optimal_time_of_day: string;
  fatigue_indicators: string[];
}

export interface MotivationProfile {
  intrinsic_factors: string[];
  extrinsic_factors: string[];
  engagement_patterns: EngagementPattern[];
}

export interface EngagementPattern {
  context: string;
  engagement_level: number; // 0-100
  duration: number; // minutes
}

// =====================================
// Système d'Adaptation
// =====================================

export interface AdaptationRule {
  id: string;
  condition: string;
  action: AdaptationAction;
  priority: number;
  is_active: boolean;
}

export interface AdaptationAction {
  type: 'adjust_difficulty' | 'change_representation' | 'provide_scaffolding' | 'suggest_break';
  parameters: Record<string, unknown>;
}

export interface AdaptationDecision {
  next_activity: Activity;
  difficulty_adjustment: number; // -2 to +2
  support_level: 'minimal' | 'guided' | 'scaffolded';
  representation_mode: 'concrete' | 'pictorial' | 'abstract';
  ai_hint_strategy: HintStrategy;
  rationale: string;
}

export interface HintStrategy {
  level: 'minimal' | 'moderate' | 'detailed';
  type: 'procedural' | 'conceptual' | 'strategic';
  timing: 'immediate' | 'delayed' | 'on_request';
}

// =====================================
// IA et Contenu Génératif
// =====================================

export interface AIGeneratedContent {
  id: string;
  student_id: string;
  activity_id: string;
  content_type: 'hint' | 'problem' | 'explanation' | 'encouragement';
  prompt_used: string;
  generated_content: Record<string, unknown>;
  effectiveness_score?: number; // 0-100
  created_at: string;
}

export interface AITutorSession {
  id: string;
  student_id: string;
  activity_id: string;
  interactions: AIInteraction[];
  session_summary: string;
  effectiveness_rating?: number; // 1-5
  created_at: string;
}

export interface AIInteraction {
  timestamp: string;
  student_input: string;
  ai_response: string;
  interaction_type: 'question' | 'hint' | 'encouragement' | 'correction';
  effectiveness?: number; // 1-5
}

// =====================================
// API et Réponses
// =====================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: 'success' | 'error' | 'loading';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// =====================================
// États d'Interface
// =====================================

export interface AppState {
  user: Profile | null;
  currentModule: LearningModule | null;
  currentActivity: Activity | null;
  isLoading: boolean;
  error: string | null;
}

export interface LearningState {
  progress: StudentProgress[];
  analytics: LearningAnalytics | null;
  adaptationHistory: AdaptationDecision[];
  aiTutorActive: boolean;
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modalOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary';
}