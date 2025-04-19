"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { languages } from "@/lib/i18n/translations"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LanguageSelectorProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function LanguageSelector({
  variant = "default",
  size = "default",
  className = "",
}: LanguageSelectorProps) {
  // Use the language context
  const { language, setLanguage, t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Currently selected language
  const selectedLanguage = languages.find((lang) => lang.code === language)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle language change
  const handleLanguageChange = (code: string) => {
    setLanguage(code)
  }

  // Don't render until client-side hydration is complete
  if (!isMounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`gap-2 font-medium transition-all duration-300 ease-in-out ${
            variant === "outline"
              ? "border-2 bg-white/20 text-white hover:border-teal-300 hover:text-teal-100 hover:scale-105"
              : "bg-teal-600 hover:bg-teal-500 hover:scale-105"
          } ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={t("language.select") || "Select Language"}
        >
          <Globe className={`h-5 w-5 transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`} />
          <span className="sm:inline">{selectedLanguage?.name || "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <ScrollArea className="h-[300px]">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 ${language === lang.code ? "bg-muted font-medium" : ""} cursor-pointer`}
            >
              <span className="mr-2 text-lg" role="img" aria-label={lang.name}>
                {lang.flag}
              </span>
              <span>{lang.name}</span>
              {language === lang.code && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
