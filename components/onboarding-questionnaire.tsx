"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveUserPreferences } from "@/lib/actions"
import { useLanguage } from "@/lib/i18n/language-context"

// Define the questions for the onboarding flow
const questions = [
  {
    id: "location",
    title: "Where are you located?",
    description: "This helps us show resources available in your area.",
    type: "select",
    options: [
      { value: "nyc", label: "New York City" },
      { value: "boston", label: "Boston" },
      { value: "chicago", label: "Chicago" },
      { value: "la", label: "Los Angeles" },
      { value: "miami", label: "Miami" },
    ],
  },
  {
    id: "housingStatus",
    title: "What is your current housing situation?",
    description: "This helps us prioritize housing resources if needed.",
    type: "select",
    options: [
      { value: "stable", label: "I have stable housing" },
      { value: "temporary", label: "I'm in temporary housing" },
      { value: "risk", label: "I'm at risk of losing my housing" },
      { value: "homeless", label: "I'm currently homeless or in a shelter" },
      { value: "other", label: "Other/Prefer not to say" },
    ],
  },
  {
    id: "healthcareNeeds",
    title: "Do you have any healthcare needs?",
    description: "Select all that apply.",
    type: "checkbox",
    options: [
      { value: "insurance", label: "I need help finding health insurance" },
      { value: "primary", label: "I need a primary care doctor" },
      { value: "mental", label: "I need mental health services" },
      { value: "dental", label: "I need dental care" },
      { value: "medication", label: "I need help paying for medications" },
      { value: "none", label: "None of the above" },
    ],
  },
  {
    id: "foodSecurity",
    title: "In the past month, have you worried about having enough food?",
    description: "This helps us determine if you need food assistance resources.",
    type: "radio",
    options: [
      { value: "never", label: "Never" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    id: "hasChildren",
    title: "Do you have children under 18 in your household?",
    description: "This helps us show family-specific resources.",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "immigrationStatus",
    title: "What is your immigration status?",
    description: "This helps us show relevant immigration resources. This information is kept private.",
    type: "select",
    options: [
      { value: "citizen", label: "U.S. Citizen" },
      { value: "permanent_resident", label: "Permanent Resident (Green Card)" },
      { value: "visa_holder", label: "Visa Holder" },
      { value: "asylum_seeker", label: "Asylum Seeker/Refugee" },
      { value: "undocumented", label: "Undocumented" },
      { value: "other", label: "Other" },
      { value: "prefer_not_to_say", label: "Prefer not to say" },
    ],
  },
  {
    id: "language",
    title: "What is your preferred language?",
    description: "We'll try to show resources in your preferred language when available.",
    type: "select",
    options: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish (Español)" },
      { value: "zh", label: "Chinese (中文)" },
      { value: "ru", label: "Russian (Русский)" },
      { value: "fr", label: "French (Français)" },
      { value: "ar", label: "Arabic (العربية)" },
    ],
  },
  {
    id: "zipCode",
    title: "What is your ZIP code?",
    description: "This helps us show resources closest to you.",
    type: "text",
    placeholder: "Enter your ZIP code",
  },
]

export default function OnboardingQuestionnaire({ onComplete }) {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Calculate progress percentage
  const progress = ((currentStep + 1) / questions.length) * 100

  // Handle response changes
  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Handle checkbox changes (multiple selection)
  const handleCheckboxChange = (questionId, value, checked) => {
    setResponses((prev) => {
      const currentValues = Array.isArray(prev[questionId]) ? prev[questionId] : []

      if (checked) {
        // If "None of the above" is selected, clear other selections
        if (value === "none") {
          return { ...prev, [questionId]: ["none"] }
        }

        // If another option is selected, remove "None of the above"
        const newValues = currentValues.filter((v) => v !== "none")
        return { ...prev, [questionId]: [...newValues, value] }
      } else {
        return { ...prev, [questionId]: currentValues.filter((v) => v !== value) }
      }
    })
  }

  // Check if current question has been answered
  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentStep]

    if (currentQuestion.type === "checkbox") {
      return Array.isArray(responses[currentQuestion.id]) && responses[currentQuestion.id].length > 0
    }

    return !!responses[currentQuestion.id]
  }

  // Handle next button click
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  // Handle back button click
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle completion of the questionnaire
  const handleComplete = async () => {
    try {
      setLoading(true)
      setError("")

      // Format the responses for saving
      const preferences = {
        location: responses.location || "nyc",
        housingStatus: responses.housingStatus || "stable",
        healthcareNeeds: responses.healthcareNeeds || [],
        foodSecurity: responses.foodSecurity || "never",
        hasChildren: responses.hasChildren === "yes",
        immigrationStatus: responses.immigrationStatus || "prefer_not_to_say",
        language: responses.language || "en",
        zipCode: responses.zipCode || "",
        onboardingCompleted: true,
      }

      // Save the preferences
      const result = await saveUserPreferences(preferences)

      if (result.success) {
        // Call the onComplete callback
        if (onComplete) {
          onComplete(preferences)
        }

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        throw new Error("Failed to save preferences")
      }
    } catch (err) {
      console.error("Error completing onboarding:", err)
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Render the current question
  const renderQuestion = () => {
    const question = questions[currentStep]

    switch (question.type) {
      case "select":
        return (
          <Select
            value={responses[question.id] || ""}
            onValueChange={(value) => handleResponseChange(question.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "radio":
        return (
          <RadioGroup
            value={responses[question.id] || ""}
            onValueChange={(value) => handleResponseChange(question.id, value)}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "checkbox":
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${option.value}`}
                  checked={Array.isArray(responses[question.id]) && responses[question.id].includes(option.value)}
                  onCheckedChange={(checked) => handleCheckboxChange(question.id, option.value, checked)}
                />
                <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        )

      case "text":
        return (
          <Input
            type="text"
            placeholder={question.placeholder}
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
          />
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="mb-2">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>
            Question {currentStep + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <CardTitle>{questions[currentStep].title}</CardTitle>
        <CardDescription>{questions[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {renderQuestion()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || loading}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered() || loading}
          className="bg-teal-600 hover:bg-teal-700"
        >
          {loading ? (
            "Saving..."
          ) : currentStep === questions.length - 1 ? (
            <>
              Complete
              <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
