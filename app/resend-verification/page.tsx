"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"
import ResendVerificationEmail from "@/components/resend-verification-email"

export default function ResendVerificationPage() {
  const { t } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render until client-side hydration is complete
  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-end">
            <LanguageSelector />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {t("verify.resendTitle") || "Resend Verification Email"}
          </CardTitle>
          <CardDescription className="text-center">
            {t("verify.resendDesc") || "Enter your email address below to receive a new verification link."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResendVerificationEmail />
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex flex-col space-y-4 w-full">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                {t("login.button") || "Back to Login"}
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                {t("verify.home") || "Return to Home"}
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
