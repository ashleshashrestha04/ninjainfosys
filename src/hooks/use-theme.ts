import { useThemeStore } from '../store/theme-store';

/**
 * Custom hook for accessing theme state and actions
 * Provides a convenient interface for theme management
 */
export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  return {
    theme,
    setTheme,
    toggleTheme,
    initializeTheme,
    isDark: theme === 'g90',
    isLight: theme === 'g10',
  };
}
