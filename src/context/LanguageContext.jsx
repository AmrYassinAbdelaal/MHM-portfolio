import { createContext, useContext, useState, useEffect } from 'react'
import * as en from '../data/content'
import * as ar from '../data/content.ar'

const LanguageContext = createContext()

const contentByLang = { en, ar }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const content = contentByLang[lang]

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
