"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { Phone, Heart, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

export default function SiteFooter() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Only run on client-side to avoid hydration issues
  useEffect(() => {
    setIsClient(true)

    // Set up auth state listener
    const supabase = getSupabaseBrowserClient()

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session)
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Render static links until client-side code runs
  if (!isClient) {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-8 py-8">
          {/* Static footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold mb-4">CareCompass</h2>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4">CareCompass</h2>
            <p className="text-gray-300 text-sm">
              {t("footer.description") || "Connecting people with essential housing and healthcare resources."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">{t("footer.quickLinks") || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={isAuthenticated ? "/dashboard" : "/"}
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t("footer.home") || "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href={isAuthenticated ? "/profile" : "/signup"}
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {t("footer.account") || "My Account"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">{t("footer.emergency") || "Emergency"}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 text-red-400" />
                <div>
                  <p className="text-white">Emergency</p>
                  <p className="text-gray-300 text-sm">911</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 text-blue-400" />
                <div>
                  <p className="text-white">NYC General City Help</p>
                  <p className="text-gray-300 text-sm">311 (not life-threatening)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">{t("footer.about") || "About"}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {t("footer.aboutText") ||
                "CareCompass is dedicated to helping vulnerable populations access critical housing and healthcare resources."}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>
            © {currentYear} CareCompass. {t("footer.copyright") || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
