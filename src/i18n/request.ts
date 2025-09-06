import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  console.log('Request config called with locale:', locale);
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !['en', 'ne'].includes(locale)) {
    console.error('Invalid locale:', locale);
    // Instead of notFound(), let's default to 'en'
    locale = 'en';
  }

  console.log('Using locale:', locale);
  
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
