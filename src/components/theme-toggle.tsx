"use client";

import { useTranslations } from 'next-intl';
import { useTheme } from '../hooks/use-theme';

interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeToggle({ className, style }: ThemeToggleProps) {
  const t = useTranslations();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      className={className}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "var(--background)",
        color: "var(--foreground)",
        cursor: "pointer",
        ...style,
      }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {t('theme.toggle')}
    </button>
  );
}
