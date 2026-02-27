'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Language, type Translation } from './translations'

type LanguageContextValue = {
  lang: Language
  setLanguage: (lang: Language) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('id')

  useEffect(() => {
    const saved = localStorage.getItem('sozboost-lang')
    if (saved === 'en' || saved === 'id') setLang(saved)
  }, [])

  const setLanguage = (l: Language) => {
    setLang(l)
    localStorage.setItem('sozboost-lang', l)
    document.documentElement.lang = l
  }

  const value = useMemo<LanguageContextValue>(() => {
    return { lang, setLanguage, t: translations[lang] }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

