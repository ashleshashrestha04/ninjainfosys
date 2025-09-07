"use client";

import { useEffect } from 'react';
import { useTheme } from '../hooks/use-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { initializeTheme, theme } = useTheme();

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    // Apply theme class to the HTML element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
