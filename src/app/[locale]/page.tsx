"use client";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from '../../components/theme-toggle';
import styles from "../page.module.css";

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
  };

  const getCurrentLocale = () => {
    return pathname.split('/')[1] || 'en';
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Language Switcher */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          alignItems: "center"
        }}>
          <span style={{ marginRight: "0.5rem", fontSize: "0.9rem" }}>
            {t('lang.toggle')}:
          </span>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: getCurrentLocale() === 'en' ? "#0070f3" : "var(--background)",
              color: getCurrentLocale() === 'en' ? "white" : "var(--foreground)",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
            onClick={() => switchLanguage('en')}
          >
            English
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: getCurrentLocale() === 'ne' ? "#0070f3" : "var(--background)",
              color: getCurrentLocale() === 'ne' ? "white" : "var(--foreground)",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
            onClick={() => switchLanguage('ne')}
          >
            नेपाली
          </button>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle 
          style={{
            marginBottom: "1rem",
          }}
        />
        
        <h1>{t('greeting')}</h1>
        <p>{t('welcome')}</p>
      </main>
    </div>
  );
}