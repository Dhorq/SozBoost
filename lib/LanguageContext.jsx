'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id')

  useEffect(() => {
    const saved = localStorage.getItem('sozboost-lang')
    if (saved === 'en' || saved === 'id') setLang(saved)
  }, [])

  const setLanguage = (l) => {
    setLang(l)
    localStorage.setItem('sozboost-lang', l)
    document.documentElement.lang = l
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
