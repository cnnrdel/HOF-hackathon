"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import OnboardingQuestionnaire from "@/components/onboarding-questionnaire"
import { getUserProfile } from "@/lib/actions"

export default function InitialSetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    async function checkAuthAndOnboarding() {
      try {
        setLoading(true)

        // Check if user is authenticated
        const supabase = getSupabaseBrowserClient()
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !sessionData.session) {
          console.log("No active session, redirecting to login")
          router.push("/login?redirect=/initial-setup")
          return
        }

        setIsAuthenticated(true)

        // Check if user has already completed onboarding
        try {
          const profileData = await getUserProfile()

          if (profileData && profileData.onboardingCompleted) {
            console.log("User has already completed onboarding, redirecting to dashboard")
            setHasCompletedOnboarding(true)
            router.push("/dashboard")
            return
          }
        } catch (profileError) {
          console.error("Error fetching profile:", profileError)
          // Continue with onboarding even if profile fetch fails
        }

        setLoading(false)
      } catch (error) {
        console.error("Error checking auth and onboarding:", error)
        setLoading(false)
      }
    }

    checkAuthAndOnboarding()
  }, [router])

  const handleOnboardingComplete = (preferences) => {
    console.log("Onboarding completed with preferences:", preferences)
    // The redirect is handled in the onboarding component
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Please log in to continue.</p>
      </div>
    )
  }

  if (hasCompletedOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">You have already completed the initial setup. Redirecting to dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to CareCompass</h1>
          <p className="mt-2 text-lg text-gray-600">Let's personalize your experience by answering a few questions.</p>
        </div>

        <OnboardingQuestionnaire onComplete={handleOnboardingComplete} />
      </div>
    </div>
  )
}
