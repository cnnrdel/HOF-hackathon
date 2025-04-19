"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loginUser } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"
import { LogIn, AlertCircle } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-browser"

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Basic validation
      if (!email || !password) {
        setError("Please enter both email and password")
        setLoading(false)
        return
      }

      const result = await loginUser({ email, password })

      if (!result.success) {
        setError(result.error || "Login failed. Please check your credentials and try again.")
        setLoading(false)
        return
      }

      // Check if the user needs to complete onboarding
      if (result.data?.user) {
        const supabase = getSupabaseBrowserClient()
        const { data: profileData } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", result.data.user.id)
          .single()

        if (profileData && profileData.onboarding_completed === false) {
          // Redirect to questionnaire/onboarding
          console.log("User needs to complete onboarding, redirecting to initial setup")
          router.push("/initial-setup")
          return
        }
      }

      // Redirect to dashboard on successful login
      console.log("Login successful, redirecting to dashboard")
      router.push("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.png" alt="CareCompass Logo" className="h-10" />
          </Link>
          <LanguageSelector />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("login.title") || "Sign In"}</CardTitle>
            <CardDescription>
              {t("login.description") || "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email") || "Email"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">{t("login.password") || "Password"}</Label>
                  <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                    {t("login.forgotPassword") || "Forgot password?"}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("login.signingIn") || "Signing in..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("Login") || "Sign In"}
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center w-full">
              <span className="text-sm text-gray-500">
                {"Don't have an account?"}{" "}
                <Link href="/signup" className="text-teal-600 hover:underline">
                  {"Create one"}
                </Link>
              </span>
            </div>
            <div className="text-center w-full">
              <Link href="/dashboard?preview=true">
                <Button variant="outline" className="w-full">
                  {"Continue as guest"}
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
