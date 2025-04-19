"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "./translations"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, replacements?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export const useLanguage = () => useContext(LanguageContext)

type LanguageProviderProps = {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Default to "en" initially, will be updated from localStorage if available
  const [language, setLanguageState] = useState("en")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load language from localStorage on component mount
  useEffect(() => {
    try {
      // Check if we're in a browser environment
      if (typeof window !== "undefined") {
        // Load language from localStorage if available
        const storedLanguage = localStorage.getItem("userLanguage")

        if (storedLanguage) {
          setLanguageState(storedLanguage)
        } else {
          // Try to detect browser language as fallback
          const browserLang = navigator.language?.split("-")[0]
          // Check if the browser language is supported in our translations
          if (browserLang && translations[browserLang]) {
            setLanguageState(browserLang)
            localStorage.setItem("userLanguage", browserLang)
          }
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const setLanguage = (lang: string) => {
    if (!lang) return

    setLanguageState(lang)

    try {
      // Check if we're in a browser environment
      if (typeof window !== "undefined") {
        localStorage.setItem("userLanguage", lang)

        // Update HTML lang attribute for accessibility and SEO
        document.documentElement.lang = lang

        // For right-to-left languages, update the document direction
        const rtlLanguages = ["ar", "ur"]
        document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr"
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  const t = (key: string, replacements?: Record<string, string>): string => {
    if (!isLoaded) return key

    try {
      // First try to get the translation for the current language
      const langData = translations[language] || {}

      // Fallback to English if the translation doesn't exist in the current language
      let text = langData[key] || translations["en"][key] || key

      // Replace placeholders with actual values
      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          text = text.replace(new RegExp(`{${k}}`, "g"), v)
        })
      }

      return text
    } catch (error) {
      console.error("Translation error:", error)
      return key
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
