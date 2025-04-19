"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useLanguage } from "@/lib/i18n/language-context"
import ResendVerificationEmail from "@/components/resend-verification-email"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    async function verifyEmail() {
      try {
        // Get the token and type from URL parameters
        const token = searchParams?.get("token")
        const type = searchParams?.get("type")
        const email = searchParams?.get("email") || ""

        // Store the email for potential resend
        setUserEmail(email)

        // If parameters are missing, show error
        if (!token || !type) {
          setVerificationStatus("error")
          setErrorMessage("Invalid verification link. Please check your email and try again.")
          return
        }

        // Initialize Supabase client
        const supabase = getSupabaseBrowserClient()

        // Verify the email using Supabase
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type === "signup" ? "signup" : "email",
        })

        if (error) {
          console.error("Verification error:", error)
          setVerificationStatus("error")

          // Set specific error messages based on the error
          if (error.message.includes("expired")) {
            setErrorMessage("This verification link has expired. Please request a new verification email.")
          } else if (error.message.includes("invalid")) {
            setErrorMessage("This verification link is invalid. Please request a new verification email.")
          } else {
            setErrorMessage(
              error.message || "There was a problem verifying your email. Please try again or contact support.",
            )
          }
        } else {
          setVerificationStatus("success")
        }
      } catch (err) {
        console.error("Verification error:", err)
        setVerificationStatus("error")
        setErrorMessage("An unexpected error occurred. Please try again or contact support.")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {verificationStatus === "loading"
              ? t("verify.loading") || "Verifying your email..."
              : verificationStatus === "success"
                ? t("verify.success") || "Email Verified!"
                : t("verify.error") || "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-center">
            {verificationStatus === "loading"
              ? t("verify.loadingDesc") || "Please wait while we verify your email address."
              : verificationStatus === "success"
                ? t("verify.successDesc") || "Your email has been successfully verified. Your account is now active."
                : t("verify.errorDesc") || "We encountered a problem verifying your email."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {verificationStatus === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-16 w-16 text-teal-500 animate-spin" />
              <p className="text-gray-500">{t("verify.pleaseWait") || "This may take a moment..."}</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-center text-gray-700">
                {t("verify.accountReady") ||
                  "Your account is now ready to use. You can now access all features of CareCompass."}
              </p>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="w-full space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>

              {/* Add resend verification option */}
              <div className="border-t pt-6">
                <ResendVerificationEmail initialEmail={userEmail} />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {verificationStatus === "success" && (
            <div className="flex flex-col w-full space-y-4">
              <Link href="/login" className="w-full">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  {t("verify.login") || "Log In to Your Account"}
                </Button>
              </Link>
              <Link href="/dashboard?preview=true" className="w-full">
                <Button variant="outline" className="w-full">
                  {t("verify.browse") || "Browse Resources"}
                </Button>
              </Link>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="flex flex-col w-full space-y-4">
              <Link href="/signup" className="w-full">
                <Button variant="outline" className="w-full">
                  {t("verify.tryAgain") || "Try Signing Up Again"}
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  {t("verify.home") || "Return to Home"}
                </Button>
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
