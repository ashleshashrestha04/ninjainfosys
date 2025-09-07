
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '../../components/theme-provider';
import "./globals.css";
import { AppHeader } from '@/components/header';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ne' }];
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  
  console.log('Layout received locale:', locale);
  console.log('Resolved params:', resolvedParams);
  
  // Get messages for the specific locale
  const messages = await getMessages({locale});
  
  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppHeader />
              {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
