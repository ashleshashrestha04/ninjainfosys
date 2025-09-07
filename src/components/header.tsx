"use client";

import { Header, HeaderName, HeaderGlobalBar, HeaderNavigation, HeaderMenuItem } from '@carbon/react';
import { useTranslations } from 'next-intl';
import { useLocaleStore } from '../store/locale-store';
import { useTheme } from '../hooks/use-theme';
import './header.css';
import { useRouter, usePathname } from 'next/navigation';
import { LightFilled, Moon, Language } from '@carbon/icons-react';

export function AppHeader() {
  const t = useTranslations();
  const { locale, setLocale } = useLocaleStore();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ne' : 'en';
    setLocale(newLocale);
    switchLanguage(newLocale);
  };

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(/^\/([a-z]{2})/, `/${newLocale}`);
    router.push(newPath);
  };

  const getCurrentLocale = () => {
    return pathname.split('/')[1] || 'en';
  };

  return (
    <Header aria-label="App Header" className={`header ${theme}`}>
      <HeaderName href="/" prefix="">
        LOGO
      </HeaderName>
      <HeaderNavigation aria-label="App Navigation" className="headerNavigation">
        <HeaderMenuItem href="/">{t('nav.home')}</HeaderMenuItem>
        <HeaderMenuItem href="/contact">{t('nav.contact')}</HeaderMenuItem>
        <HeaderMenuItem href="/about">{t('nav.about')}</HeaderMenuItem>
        <HeaderMenuItem href="/login">{t('nav.login')}</HeaderMenuItem>
        <HeaderMenuItem href="/citizen/submit">{t('nav.issueTicket')}</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar className="header-global-bar">
        <button
          style={{
            padding: "0.5rem",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: "var(--foreground)"
          }}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'g10' ? <LightFilled /> : <Moon />}
        </button>
        <button
          className="language-toggle"
          onClick={toggleLocale}
          aria-label="Toggle Language"
        >
          <Language />
          {getCurrentLocale() === 'en' ? 'ने' : 'EN'}
        </button>
      </HeaderGlobalBar>
    </Header>
  );
}
