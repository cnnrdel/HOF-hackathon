"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { getQuestionnaire, type Question } from "@/lib/questionnaire"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { saveUserResponses, completeOnboarding, getUserProfile } from "@/lib/actions"
import OnboardingQuestionRenderer from "@/components/onboarding-question-renderer"
import { useLanguage } from "@/lib/i18n/language-context"

export default function OnboardingPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [profile, setProfile] = useState(null)

  // Load questions and check if user is authenticated
  useEffect(() => {
    async function loadData() {
      try {
        // Check authentication
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login?redirect=/onboarding")
          return
        }

        // Check if user has already completed onboarding
        const profileData = await getUserProfile()
        setProfile(profileData)

        if (profileData.onboarding_completed) {
          // User has already completed onboarding, redirect to dashboard
          router.push("/dashboard")
          return
        }

        // Fetch questionnaire
        const questionsData = await getQuestionnaire()
        setQuestions(questionsData)

        // Extract unique categories for steps
        const uniqueCategories = Array.from(new Set(questionsData.map((q) => q.category)))
        setCategories(uniqueCategories)

        // Create step titles
        const stepTitles = uniqueCategories.map(
          (category) =>
            t(`onboarding.category.${category.toLowerCase()}`) || category.charAt(0).toUpperCase() + category.slice(1),
        )

        // Add final confirmation step
        stepTitles.push(t("onboarding.confirmation") || "Confirmation")
        setSteps(stepTitles)

        setIsLoading(false)
      } catch (err) {
        console.error("Error loading onboarding data:", err)
        setError("Failed to load onboarding questions. Please try again.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [router, t])

  // Handle response changes
  const handleResponseChange = (questionId: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Check if a question should be shown based on conditional logic
  const shouldShowQuestion = (question: Question) => {
    if (question.conditional_on === null) return true

    const conditionalQuestion = questions.find((q) => q.id === question.conditional_on)
    if (!conditionalQuestion) return true

    // For yes_no conditional questions, only show if the answer was "yes"
    if (conditionalQuestion.type === "yes_no") {
      return responses[conditionalQuestion.id] === "yes"
    }

    // For other types, show if there's any response
    return !!responses[conditionalQuestion.id]
  }

  // Get current step questions
  const getCurrentStepQuestions = () => {
    if (currentStep >= categories.length) return [] // Confirmation step

    return questions.filter((q) => q.category === categories[currentStep]).filter(shouldShowQuestion)
  }

  // Check if current step is valid (all required questions answered)
  const isCurrentStepValid = () => {
    if (currentStep >= categories.length) return true // Confirmation step is always valid

    const currentQuestions = getCurrentStepQuestions()
    return currentQuestions.every((q) => !q.required || responses[q.id])
  }

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Complete onboarding and save responses
  const handleComplete = async () => {
    try {
      setIsSaving(true)
      setError("")

      // Check authentication
      const supabase = getSupabaseBrowserClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error("Please log in to continue")
      }

      // Format responses for saving
      const userResponses = Object.entries(responses)
        .filter(([_, value]) => value !== "") // Filter out empty responses
        .map(([key, value]) => ({
          question_id: Number.parseInt(key),
          response: value,
        }))

      // Save responses
      const saveResult = await saveUserResponses(session.user.id, userResponses)

      if (!saveResult.success) {
        throw new Error("Failed to save your responses")
      }

      // Mark onboarding as completed
      const completeResult = await completeOnboarding()

      if (!completeResult.success) {
        throw new Error("Failed to complete onboarding")
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error completing onboarding:", err)
      setError(err.message || "Failed to complete onboarding. Please try again.")
      setIsSaving(false)
    }
  }

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p>Loading onboarding...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="mb-2">
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              {currentStep < categories.length
                ? t(`onboarding.title.${categories[currentStep].toLowerCase()}`) ||
                  `Tell us about your ${categories[currentStep].toLowerCase()}`
                : t("onboarding.confirmationTitle") || "Confirm Your Information"}
            </CardTitle>
            <CardDescription>
              {currentStep < categories.length
                ? t(`onboarding.description.${categories[currentStep].toLowerCase()}`) ||
                  `Help us personalize your experience by sharing your ${categories[currentStep].toLowerCase()} information.`
                : t("onboarding.confirmationDescription") ||
                  "Please review your information before completing the onboarding process."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {currentStep < categories.length ? (
              <div className="space-y-6">
                {getCurrentStepQuestions().map((question) => (
                  <OnboardingQuestionRenderer
                    key={question.id}
                    question={question}
                    value={responses[question.id] || ""}
                    onChange={(value) => handleResponseChange(question.id, value)}
                  />
                ))}
              </div>
            ) : (
              // Confirmation step
              <div className="space-y-6">
                <p className="text-gray-700">
                  {t("onboarding.reviewPrompt") ||
                    "Please review your information below. You can always update these details later in your profile."}
                </p>

                {categories.map((category) => (
                  <div key={category} className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">{category}</h3>
                    <dl className="space-y-2">
                      {questions
                        .filter((q) => q.category === category)
                        .filter((q) => responses[q.id])
                        .map((question) => (
                          <div key={question.id} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <dt className="text-gray-600 md:col-span-1">{question.question}</dt>
                            <dd className="font-medium md:col-span-2">{responses[question.id]}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isSaving}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("onboarding.back") || "Back"}
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid() || isSaving}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {t("onboarding.next") || "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700">
                {isSaving ? (
                  t("onboarding.completing") || "Completing..."
                ) : (
                  <>
                    {t("onboarding.complete") || "Complete"}
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
