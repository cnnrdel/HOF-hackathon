"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function GlobalLanguageStyles() {
  const { language } = useLanguage()

  useEffect(() => {
    // Define languages that use RTL (right-to-left) writing
    const rtlLanguages = ["ar", "ur"]
    const isRtl = rtlLanguages.includes(language)

    // Set the dir attribute on the html element
    document.documentElement.dir = isRtl ? "rtl" : "ltr"

    // Set the lang attribute for accessibility and SEO
    document.documentElement.lang = language

    // Add or remove a global class for RTL styling
    if (isRtl) {
      document.documentElement.classList.add("rtl")
    } else {
      document.documentElement.classList.remove("rtl")
    }

    // Apply RTL-specific styles
    if (isRtl) {
      // For RTL languages, we need to flip many UI elements
      document.body.style.textAlign = "right"
    } else {
      document.body.style.textAlign = ""
    }

    return () => {
      // Clean up when component unmounts
      document.body.style.textAlign = ""
    }
  }, [language])

  // This component doesn't render anything visible
  return null
}
