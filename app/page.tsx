"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Heart } from "lucide-react"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/lib/i18n/language-context"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { t, language } = useLanguage()
  const [browseHovered, setBrowseHovered] = useState(false)

  // Force re-render when language changes
  useEffect(() => {
    // This empty effect will cause the component to re-render when language changes
  }, [language])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/*<header className="bg-gradient-to-r from-teal-600 to-blue-500 text-white">*/}
      <header className=" text-teal">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex justify-between mb-4">
            <div>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:bg-white/20">
                  {t("Login") || "Sign In"}
                </Button>
              </Link>
            </div>
            <LanguageSelector variant="outline" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img src="/images/logo.png" alt="CareCompass Logo" className="h-20" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("hero.title") || "Find Housing & Healthcare Resources"}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t("hero.subtitle") ||
                "Access critical information and support services tailored to your specific needs."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 w-full sm:w-auto">
                  {t("hero.getStarted")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard?preview=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-none w-full sm:w-auto 
                    transition-all duration-300 ease-in-out border-yellow-300 text-yellow-300 
                    hover:scale-105 font-medium text-lg shadow-lg z-10"
                  onMouseEnter={() => setBrowseHovered(true)}
                  onMouseLeave={() => setBrowseHovered(false)}
                >
                  {t("features.content.title") || "Browse Resources"}
                  <ArrowRight
                    className={`ml-2 h-5 w-5 transition-transform duration-300 ${browseHovered ? "translate-x-1" : ""}`}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("cta.title") || "Need Help Right Now?"}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("cta.subtitle") ||
              "If you're in an emergency situation, these resources can provide immediate assistance."}
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <EmergencyCard
              title={t("emergency.housing") || "Emergency Housing"}
              phone="1-800-555-4567"
              description={t("emergency.housing.description") || "24/7 emergency shelter hotline"}
            />
            <EmergencyCard
              title={t("emergency.healthcare") || "Healthcare Crisis"}
              phone="1-800-555-7890"
              description={t("emergency.healthcare.description") || "Medical emergency assistance"}
            />
            <EmergencyCard
              title={t("emergency.family") || "Family Services"}
              phone="1-800-555-1234"
              description={t("emergency.family.description") || "Support for families in crisis"}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function ResourceCard({ icon, title, description, link }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={link}>
      <div
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex justify-center mb-4 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Link>
  )
}

function EmergencyCard({ title, phone, description }) {
  return (
    <div className="bg-white border-l-4 border-red-500 rounded-lg p-6 shadow-sm text-left hover:shadow-md transition-all duration-300 hover:border-l-8">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-xl font-bold text-red-500 mb-1">{phone}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
