import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Translations, Language } from '../types';
import { translations } from '../constants';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize from localStorage or default to 'fr'
  const [lang, setLangState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('aizo_lang');
    return (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'fr';
  });

  const t = translations[lang];

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('aizo_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
