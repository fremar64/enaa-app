/**
 * Store principal de l'application ENAA utilisant Zustand
 * Gère l'état global de l'application (utilisateur, apprentissage, UI)
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {
  Profile,
  LearningModule,
  Activity,
  StudentProgress,
  LearningAnalytics,
  AdaptationDecision,
  Notification,
} from '../types';

// =====================================
// Types des états
// =====================================

interface UserState {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LearningState {
  currentModule: LearningModule | null;
  currentActivity: Activity | null;
  progress: StudentProgress[];
  analytics: LearningAnalytics | null;
  adaptationHistory: AdaptationDecision[];
  aiTutorActive: boolean;
  sessionStartTime: Date | null;
}

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modalOpen: boolean;
  notifications: Notification[];
  isFullscreen: boolean;
}

// =====================================
// Actions des stores
// =====================================

interface UserActions {
  setUser: (user: Profile | null) => void;
  updateUserPreferences: (preferences: Partial<Profile['preferences']>) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

interface LearningActions {
  setCurrentModule: (module: LearningModule | null) => void;
  setCurrentActivity: (activity: Activity | null) => void;
  updateProgress: (progress: StudentProgress) => void;
  updateAnalytics: (analytics: LearningAnalytics) => void;
  addAdaptationDecision: (decision: AdaptationDecision) => void;
  toggleAITutor: () => void;
  startLearningSession: () => void;
  endLearningSession: () => void;
  resetLearningState: () => void;
}

interface UIActions {
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setModalOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  toggleFullscreen: () => void;
  setFullscreen: (fullscreen: boolean) => void;
}

// =====================================
// Types combinés
// =====================================

type AppState = UserState & LearningState & UIState;
type AppActions = UserActions & LearningActions & UIActions;
type AppStore = AppState & AppActions;

// =====================================
// Store principal
// =====================================

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set) => ({
        // État initial - User
        user: null,
        isAuthenticated: false,
        isLoading: false,

        // État initial - Learning
        currentModule: null,
        currentActivity: null,
        progress: [],
        analytics: null,
        adaptationHistory: [],
        aiTutorActive: false,
        sessionStartTime: null,

        // État initial - UI
        theme: 'light',
        sidebarOpen: false,
        modalOpen: false,
        notifications: [],
        isFullscreen: false,

        // Actions - User
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
            state.isLoading = false;
          }),

        updateUserPreferences: (preferences) =>
          set((state) => {
            if (state.user) {
              state.user.preferences = {
                ...state.user.preferences,
                ...preferences,
              };
            }
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        logout: () =>
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.currentModule = null;
            state.currentActivity = null;
            state.progress = [];
            state.analytics = null;
            state.adaptationHistory = [];
            state.aiTutorActive = false;
            state.sessionStartTime = null;
          }),

        // Actions - Learning
        setCurrentModule: (module) =>
          set((state) => {
            state.currentModule = module;
            state.currentActivity = null; // Reset activity when changing module
          }),

        setCurrentActivity: (activity) =>
          set((state) => {
            state.currentActivity = activity;
          }),

        updateProgress: (progress) =>
          set((state) => {
            const existingIndex = state.progress.findIndex(
              (p: StudentProgress) => p.activity_id === progress.activity_id && 
                     p.student_id === progress.student_id
            );
            
            if (existingIndex >= 0) {
              state.progress[existingIndex] = progress;
            } else {
              state.progress.push(progress);
            }
          }),

        updateAnalytics: (analytics) =>
          set((state) => {
            state.analytics = analytics;
          }),

        addAdaptationDecision: (decision) =>
          set((state) => {
            state.adaptationHistory.push(decision);
            // Garder seulement les 20 dernières décisions
            if (state.adaptationHistory.length > 20) {
              state.adaptationHistory = state.adaptationHistory.slice(-20);
            }
          }),

        toggleAITutor: () =>
          set((state) => {
            state.aiTutorActive = !state.aiTutorActive;
          }),

        startLearningSession: () =>
          set((state) => {
            state.sessionStartTime = new Date();
          }),

        endLearningSession: () =>
          set((state) => {
            state.sessionStartTime = null;
          }),

        resetLearningState: () =>
          set((state) => {
            state.currentModule = null;
            state.currentActivity = null;
            state.progress = [];
            state.analytics = null;
            state.adaptationHistory = [];
            state.sessionStartTime = null;
          }),

        // Actions - UI
        setTheme: (theme) =>
          set((state) => {
            state.theme = theme;
          }),

        toggleSidebar: () =>
          set((state) => {
            state.sidebarOpen = !state.sidebarOpen;
          }),

        setSidebarOpen: (open) =>
          set((state) => {
            state.sidebarOpen = open;
          }),

        setModalOpen: (open) =>
          set((state) => {
            state.modalOpen = open;
          }),

        addNotification: (notification) =>
          set((state) => {
            const id = crypto.randomUUID();
            state.notifications.push({ ...notification, id });
          }),

        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter((n: Notification) => n.id !== id);
          }),

        clearNotifications: () =>
          set((state) => {
            state.notifications = [];
          }),

        toggleFullscreen: () =>
          set((state) => {
            state.isFullscreen = !state.isFullscreen;
          }),

        setFullscreen: (fullscreen) =>
          set((state) => {
            state.isFullscreen = fullscreen;
          }),
      })),
      {
        name: 'enaa-app-storage',
        partialize: (state) => ({
          // Persister seulement certaines parties de l'état
          theme: state.theme,
          user: state.user,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'ENAA App Store',
    }
  )
);

// =====================================
// Sélecteurs utilitaires
// =====================================

export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useCurrentModule = () => useAppStore((state) => state.currentModule);
export const useCurrentActivity = () => useAppStore((state) => state.currentActivity);
export const useTheme = () => useAppStore((state) => state.theme);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useProgress = () => useAppStore((state) => state.progress);
export const useAnalytics = () => useAppStore((state) => state.analytics);
export const useAITutorActive = () => useAppStore((state) => state.aiTutorActive);

// =====================================
// Sélecteurs composés
// =====================================

export const useUserRole = () => useAppStore((state) => state.user?.role);
export const useGradeLevel = () => useAppStore((state) => state.user?.grade_level);
export const useClassId = () => useAppStore((state) => state.user?.class_id);

export const useCurrentActivityProgress = () => 
  useAppStore((state) => {
    if (!state.currentActivity || !state.user) return null;
    return state.progress.find(
      (p) => p.activity_id === state.currentActivity!.id && 
             p.student_id === state.user!.id
    );
  });

export const useModuleProgress = (moduleId: string) =>
  useAppStore((state) => {
    if (!state.user) return [];
    // TODO: Filtrer par moduleId une fois la relation activity -> module établie
    return state.progress.filter(
      (p: StudentProgress) => p.student_id === state.user!.id
    );
  });