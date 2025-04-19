"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { getQuestionnaire, type Question, type UserResponse } from "@/lib/questionnaire"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { saveUserResponses } from "@/lib/actions"
import { Progress } from "@/components/ui/progress"

export default function QuestionnairePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [currentCategory, setCurrentCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Check authentication and load questions on page load
  useEffect(() => {
    async function initialize() {
      try {
        // Check authentication
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login?redirect=/questionnaire")
          return
        }

        // Fetch questionnaire
        const questionsData = await getQuestionnaire()
        setQuestions(questionsData)

        // Extract unique categories in order
        const uniqueCategories = Array.from(new Set(questionsData.map((q) => q.category)))
        setCategories(uniqueCategories)

        if (uniqueCategories.length > 0) {
          setCurrentCategory(uniqueCategories[0])
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Initialization error:", err)
        setError("Failed to load questionnaire. Please try again.")
        setIsLoading(false)
      }
    }

    initialize()
  }, [router])

  // Update progress when category changes
  useEffect(() => {
    const newProgress = ((currentCategoryIndex + 1) / categories.length) * 100
    setProgress(newProgress)
  }, [currentCategoryIndex, categories.length])

  // Get questions for current category
  const currentQuestions = questions.filter((q) => q.category === currentCategory)

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

  // Handle response changes
  const handleResponseChange = (questionId: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Navigate to next category
  const handleNext = () => {
    // Validate required questions in current category
    const requiredQuestions = currentQuestions.filter((q) => q.required && shouldShowQuestion(q))

    const missingRequired = requiredQuestions.some((q) => !responses[q.id])

    if (missingRequired) {
      setError("Please answer all required questions before continuing.")
      return
    }

    setError("")

    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1)
      setCurrentCategory(categories[currentCategoryIndex + 1])
      window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  // Navigate to previous category
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1)
      setCurrentCategory(categories[currentCategoryIndex - 1])
      window.scrollTo(0, 0)
    }
  }

  // Submit all responses
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Check authentication again
      const supabase = getSupabaseBrowserClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error("Please log in to continue")
      }

      // Format responses for saving
      const userResponses: UserResponse[] = Object.entries(responses)
        .filter(([_, value]) => value !== "") // Filter out empty responses
        .map(([key, value]) => ({
          question_id: Number.parseInt(key),
          response: value,
        }))

      // Save responses
      const result = await saveUserResponses(session.user.id, userResponses)

      if (result.success) {
        router.push("/dashboard")
      } else {
        throw new Error("Failed to save your responses")
      }
    } catch (err) {
      console.error("Error saving responses:", err)
      setError(err.message || "Failed to save your responses. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render different input types based on question type
  const renderQuestionInput = (question: Question) => {
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
              {question.options?.map((option) => (
                <SelectItem key={option.id} value={option.option_value}>
                  {option.option_text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "text":
        return (
          <Input
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your answer"
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter a number"
          />
        )

      case "yes_no":
        return (
          <RadioGroup
            value={responses[question.id] || ""}
            onValueChange={(value) => handleResponseChange(question.id, value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`}>No</Label>
            </div>
          </RadioGroup>
        )

      case "multi_text":
        return (
          <Textarea
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your answer (you can list multiple items)"
            className="min-h-[100px]"
          />
        )

      default:
        return (
          <Input
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your answer"
          />
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p>Loading questionnaire...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Progress value={progress} className="mb-8" />

        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{currentCategory} Information</CardTitle>
            <CardDescription>
              Please answer the following questions to help us provide the most relevant resources for you.
              {currentCategoryIndex === categories.length - 1
                ? " This is the final section."
                : ` (Section ${currentCategoryIndex + 1} of ${categories.length})`}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {currentQuestions.map(
              (question) =>
                shouldShowQuestion(question) && (
                  <div key={question.id} className="space-y-2">
                    <Label htmlFor={`question-${question.id}`} className="flex items-start">
                      <span>{question.question}</span>
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {renderQuestionInput(question)}
                  </div>
                ),
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentCategoryIndex === 0 || isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            <Button onClick={handleNext} disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
              {currentCategoryIndex === categories.length - 1 ? (
                <>
                  {isSubmitting ? "Saving..." : "Complete"} <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
