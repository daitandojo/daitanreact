'use client';

import { createContext, useContext, useState } from 'react';
import { initialLanguageState } from '@/defaults/initialStates'; // Import the initial language state
import { languageArray } from '@/defaults/languages'; // Adjust the import based on your project structure

// Create LanguageContext
const LanguageContext = createContext();

// Custom hook to manage the language state
export function useLanguageState() {
  const [currentLanguageObject, setCurrentLanguageObject] = useState(initialLanguageState);

  const setCurrentLanguage = (languageKey) => {
    const languageInfo = languageArray().find(lang => lang.key === languageKey);
    if (languageInfo) {
      setCurrentLanguageObject({
        key: languageInfo.key,
        name: languageInfo.name, // Get name in the selected language
        englishName: languageInfo.englishName, // Get English name
      });
    }
  };

  return {
    currentLanguageObject,
    currentLanguage: currentLanguageObject.key,
    currentLanguageName: currentLanguageObject.name,
    currentLanguageEnglishName: currentLanguageObject.englishName,
    setCurrentLanguage,
  };
}

// LanguageProvider that provides the language state to all children components
export function LanguageProvider({ children }) {
  const languageState = useLanguageState();

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use the LanguageContext in components
export function useLanguageContext() {
  return useContext(LanguageContext);
}
