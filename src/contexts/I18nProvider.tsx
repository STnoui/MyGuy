import React, { createContext, useState, useEffect, useMemo } from "react";
import { translations, Language } from "@/lib/translations";

type I18nContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
};

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "bg") {
      setLanguage("bg");
    } else {
      setLanguage("en");
    }
  }, []);

  const t = useMemo(
    () => (key: string) => {
      const keys = key.split(".");
      let result: any = translations[language];
      for (const k of keys) {
        result = result?.[k];
      }
      return result || key;
    },
    [language]
  );

  const value = {
    language,
    t,
    setLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};