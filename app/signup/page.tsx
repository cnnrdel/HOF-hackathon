"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createUserWithProfile } from "@/lib/actions"
import LanguageSelector from "@/components/language-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import ResendVerificationEmail from "@/components/resend-verification-email"

export default function SignupPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [accountCreated, setAccountCreated] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // More thorough email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    setAccountCreated(false)

    const { name, email, password } = formData

    // Client-side validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g., name@example.com)")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      // Trim the email to remove any whitespace
      const trimmedEmail = email.trim().toLowerCase()

      const result = await createUserWithProfile({
        email: trimmedEmail,
        password,
        name,
      })

      if (result.success) {
        if (result.needsConfirmation) {
          // If email confirmation is required
          setAccountCreated(true)
          setError("Account created! Please check your email to confirm your account before logging in.")
        } else {
          // Redirect to the questionnaire
          router.push("/questionnaire")
        }
      } else {
        throw new Error("Failed to create account")
      }
    } catch (err) {
      console.error("Signup error:", err)

      // Handle specific error messages
      if (err.message?.includes("already exists") || err.message?.includes("already registered")) {
        setError("This email is already registered. Please log in instead.")
      } else if (err.message?.includes("invalid") && err.message?.includes("email")) {
        setError("The email address format is invalid. Please use a valid email address.")
      } else if (err.message?.includes("foreign key constraint")) {
        setError("Account created but profile setup failed. Please try logging in.")
        setAccountCreated(true)
      } else if (err.message?.includes("Account created but profile setup failed")) {
        setError(err.message)
        setAccountCreated(true)
      } else if (err.message?.includes("Database setup")) {
        setError("System error: The application is not properly configured. Please contact support.")
      } else if (err.message?.includes("profiles table")) {
        setError("System error: Database configuration issue. Please contact support.")
      } else {
        setError(err.message || "Failed to create account. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

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
          <CardTitle className="text-2xl font-bold text-center">{t("signup.title") || "Create an account"}</CardTitle>
          <CardDescription className="text-center">
            {t("signup.description") || "Sign up to access personalized housing and healthcare resources"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant={accountCreated ? "default" : "destructive"} className="mb-6">
              {accountCreated ? <Info className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {accountCreated ? (
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800">Verification Email Sent</h3>
                    <p className="text-blue-700 mt-1">
                      {t("signup.verificationSent") ||
                        "We've sent a verification link to your email address. Please check your inbox (and spam folder) and click the link to verify your account."}
                    </p>
                  </div>
                </div>
              </Alert>
              <p className="text-center text-gray-600">
                {t("signup.afterVerification") ||
                  "After verifying your email, you'll be able to log in and access all features of CareCompass."}
              </p>

              {/* Add the resend verification email component */}
              <div className="mt-6 border-t pt-6">
                <ResendVerificationEmail initialEmail={formData.email} />
              </div>

              <div className="flex flex-col space-y-3 mt-4">
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">{t("login.button") || "Go to Login"}</Button>
                </Link>
                <Link href="/dashboard?preview=true" className="w-full">
                  <Button variant="outline" className="w-full">
                    {t("verify.browse") || "Browse Resources"}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("signup.name") || "Full Name"}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("signup.email") || "Email"}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  Use a valid email format (e.g., your.name@example.com). For testing, avoid using example.com domain.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("signup.password") || "Password"}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? t("signup.loading") || "Creating account..." : t("signup.button") || "Sign Up"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 mt-2 w-full">
            {t("signup.login") || "Already have an account?"}{" "}
            <Link href="/login" className="text-teal-600 hover:text-teal-500 font-medium">
              {t("signup.loginLink") || "Log in"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
