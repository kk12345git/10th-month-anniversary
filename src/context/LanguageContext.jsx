import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to null so we can check if it has been set (for the entry gate)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('anniversary_lang') || null;
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('anniversary_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, isGateRequired: lang === null }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
