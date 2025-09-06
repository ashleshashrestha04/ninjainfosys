"use client";

import { useEffect } from 'react';
import { useTheme } from '../hooks/use-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { initializeTheme } = useTheme();

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();
  }, [initializeTheme]);

  return <>{children}</>;
}
