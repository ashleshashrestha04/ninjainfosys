import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'g10' | 'g90';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'g10',
      
      setTheme: (theme: Theme) => {
        set({ theme });
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },
      
      toggleTheme: () => {
        const { theme } = get();
        const newTheme: Theme = theme === 'g10' ? 'g90' : 'g10';
        get().setTheme(newTheme);
      },
      
      initializeTheme: () => {
        const { theme } = get();
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },
    }),
    {
      name: 'theme-storage',
      // Only persist the theme value
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
