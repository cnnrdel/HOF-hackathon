"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, CheckCircle } from "lucide-react"
import { resendVerificationEmail } from "@/lib/actions"
import { useLanguage } from "@/lib/i18n/language-context"

interface ResendVerificationEmailProps {
  initialEmail?: string
  compact?: boolean
  className?: string
}

export default function ResendVerificationEmail({
  initialEmail = "",
  compact = false,
  className = "",
}: ResendVerificationEmailProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState(initialEmail)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  async function handleResend(e) {
    e.preventDefault()

    if (cooldown > 0) return

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const result = await resendVerificationEmail(email)

      if (result.success) {
        setSuccess(true)
        // Set a 60-second cooldown to prevent abuse
        setCooldown(60)
        const timer = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (err) {
      console.error("Error resending verification email:", err)
      setError(err.message || "Failed to resend verification email")
    } finally {
      setIsLoading(false)
    }
  }

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 py-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-800">
              {t("verify.emailResent") || "Verification email has been resent. Please check your inbox."}
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleResend}
          disabled={isLoading || cooldown > 0 || !email}
          variant="outline"
          className="w-full"
        >
          <Mail className="mr-2 h-4 w-4" />
          {cooldown > 0
            ? `${t("verify.resendWait") || "Resend available in"} ${cooldown}s`
            : t("verify.resendEmail") || "Resend Verification Email"}
        </Button>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium">{t("verify.didntReceive") || "Didn't receive the verification email?"}</h3>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-800">
            {t("verify.emailResent") || "Verification email has been resent. Please check your inbox."}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleResend} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t("login.email") || "Email"}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || cooldown > 0 || !email}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          <Mail className="mr-2 h-4 w-4" />
          {isLoading
            ? t("verify.resending") || "Resending..."
            : cooldown > 0
              ? `${t("verify.resendWait") || "Resend available in"} ${cooldown}s`
              : t("verify.resendEmail") || "Resend Verification Email"}
        </Button>
      </form>
    </div>
  )
}
