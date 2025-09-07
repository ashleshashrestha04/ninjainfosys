import { create } from 'zustand';

interface LocaleState {
  locale: 'en' | 'ne';
  setLocale: (locale: 'en' | 'ne') => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}));
