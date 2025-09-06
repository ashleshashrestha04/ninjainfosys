import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ne'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always use prefix for the locale
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ne)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
