"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Save, LogOut, Trash2 } from "lucide-react"
import { getQuestionnaire, type Question, type UserResponse } from "@/lib/questionnaire"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { saveUserResponses, getUserProfile, signOutUser, deleteUserAccount } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ConfirmationDialog from "@/components/confirmation-dialog"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [categories, setCategories] = useState<string[]>([])
  const [profile, setProfile] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [savedResponses, setSavedResponses] = useState<Record<number, string>>({})

  // Direct method to get user info from auth
  const getUserInfoFromAuth = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        console.error("Error getting user from auth:", error)
        setDebugInfo((prev) => prev + "\nError getting user from auth: " + JSON.stringify(error))
        return null
      }

      // Get user info from metadata
      const name = data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User"
      const email = data.user.email || ""
      const id = data.user.id

      console.log("Got user info from auth:", { name, email, id })
      setDebugInfo((prev) => prev + "\nGot user info from auth: " + JSON.stringify({ name, email, id }))

      return { name, email, id }
    } catch (error) {
      console.error("Error in getUserInfoFromAuth:", error)
      setDebugInfo((prev) => prev + "\nError in getUserInfoFromAuth: " + JSON.stringify(error))
      return null
    }
  }

  // Load user data from the server
  const loadUserData = async () => {
    try {
      setDebugInfo((prev) => prev + "\nLoading user data...")

      // First try to get user info directly from auth as a fallback
      const authUserInfo = await getUserInfoFromAuth()

      // Create a minimal profile with auth data
      if (authUserInfo) {
        setProfile({
          name: authUserInfo.name,
          email: authUserInfo.email,
          id: authUserInfo.id,
          isGuest: false,
        })
        setUserId(authUserInfo.id)
      }

      // Then try to get the full profile from the server
      try {
        const profileData = await getUserProfile()

        // Only update if we got a valid profile and it's not a guest profile
        if (profileData && !profileData.isGuest) {
          setProfile(profileData)
          setDebugInfo((prev) => prev + "\nProfile loaded from server: " + JSON.stringify(profileData))
        } else {
          setDebugInfo((prev) => prev + "\nServer returned guest profile, using auth data instead")
        }

        // Fetch user responses
        const userResponses = profileData.responses || []
        setDebugInfo((prev) => prev + "\nResponses loaded: " + userResponses.length)

        // Convert to record format
        const responsesRecord = userResponses.reduce((acc, item) => {
          acc[item.question_id] = item.response
          return acc
        }, {})

        setResponses(responsesRecord)
        setSavedResponses(responsesRecord) // Store the saved state
      } catch (profileError) {
        console.error("Error fetching profile from server:", profileError)
        setDebugInfo((prev) => prev + "\nError fetching profile from server: " + JSON.stringify(profileError))

        // We already set a minimal profile from auth data above, so we can continue
        console.log("Using auth data as fallback")
      }
    } catch (err) {
      console.error("Error in loadUserData:", err)
      setDebugInfo((prev) => prev + "\nError in loadUserData: " + JSON.stringify(err))
    }
  }

  // Check authentication and load data
  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        setDebugInfo("Starting profile data load...")

        // Check authentication
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          setDebugInfo((prev) => prev + "\nSession error: " + JSON.stringify(sessionError))
          redirectToLogin()
          return
        }

        if (!session) {
          console.log("No active session found")
          setDebugInfo((prev) => prev + "\nNo active session found")
          redirectToLogin()
          return
        }

        // Verify the session is valid by trying to get the user
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData.user) {
          console.error("User verification error:", userError)
          setDebugInfo((prev) => prev + "\nUser verification error: " + JSON.stringify(userError))
          // Session is invalid, sign out completely
          await supabase.auth.signOut()
          redirectToLogin()
          return
        }

        // User is authenticated
        setIsAuthenticated(true)
        setUserId(userData.user.id)
        setDebugInfo((prev) => prev + "\nUser authenticated: " + userData.user.id)
        console.log("User metadata:", userData.user.user_metadata)
        setDebugInfo((prev) => prev + "\nUser metadata: " + JSON.stringify(userData.user.user_metadata))

        // Fetch questionnaire
        const questionsData = await getQuestionnaire()
        setQuestions(questionsData)
        setDebugInfo((prev) => prev + "\nQuestionnaire loaded: " + questionsData.length + " questions")

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(questionsData.map((q) => q.category)))
        setCategories(uniqueCategories)

        // Load user data
        await loadUserData()

        setIsLoading(false)
      } catch (err) {
        console.error("Error loading profile data:", err)
        setDebugInfo((prev) => prev + "\nError loading profile data: " + JSON.stringify(err))
        setError("Failed to load your profile information. Please try again.")
        setIsLoading(false)

        // If there's an error, redirect to login after a short delay
        setTimeout(() => {
          redirectToLogin()
        }, 3000)
      }
    }

    function redirectToLogin() {
      router.push("/login?redirect=/profile")
    }

    checkAuthAndLoadData()

    // Set up auth state listener
    const supabase = getSupabaseBrowserClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        console.log("User signed out, redirecting to login")
        router.push("/login?redirect=/profile")
      }
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

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

  // Save all responses
  const handleSave = async () => {
    if (!isAuthenticated) {
      setError("You must be logged in to save changes")
      return
    }

    try {
      setIsSaving(true)
      setError("")
      setSuccess("")
      setDebugInfo((prev) => prev + "\nStarting save operation...")

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

      setDebugInfo((prev) => prev + "\nSaving " + userResponses.length + " responses")
      console.log("Responses to save:", userResponses)

      // Save responses
      const result = await saveUserResponses(session.user.id, userResponses)

      if (result.success) {
        setSuccess("Your profile has been updated successfully.")
        setDebugInfo((prev) => prev + "\nSave successful")

        // Update the saved responses state to match current responses
        setSavedResponses({ ...responses })

        // No automatic refresh - we'll keep the user's inputs visible
      } else {
        throw new Error("Failed to save your responses")
      }
    } catch (err) {
      console.error("Error saving responses:", err)
      setDebugInfo((prev) => prev + "\nSave error: " + JSON.stringify(err))
      setError(err.message || "Failed to save your responses. Please try again.")
    } finally {
      setIsSaving(false)
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

  const handleSignOut = async () => {
    try {
      setIsLoading(true)

      // First, sign out on the client side
      const supabase = getSupabaseBrowserClient()
      await supabase.auth.signOut()

      // Then call the server action to ensure complete sign-out
      const result = await signOutUser()

      if (result.success) {
        // Force a hard redirect to the home page to clear any cached state
        window.location.href = "/"
      } else {
        throw new Error("Failed to sign out")
      }
    } catch (err) {
      console.error("Error signing out:", err)
      setError("Failed to sign out. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!isAuthenticated) {
      setError("You must be logged in to delete your account")
      return
    }

    try {
      setIsDeletingAccount(true)
      setError("")

      // First, sign out on the client side
      const supabase = getSupabaseBrowserClient()

      // Call the server action to delete the account
      const result = await deleteUserAccount()

      if (result.success) {
        // Complete client-side sign-out
        await supabase.auth.signOut()

        // Force a hard redirect to clear any cached state
        window.location.href = "/"
      } else {
        throw new Error("Failed to delete account")
      }
    } catch (err) {
      console.error("Error deleting account:", err)
      setError("Failed to delete your account. Please try again or contact support.")
      setIsDeletingAccount(false)
    }
  }

  // If not authenticated, show a message and redirect
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>You need to be logged in to view this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You will be redirected to the login page...</p>
            <Button onClick={() => router.push("/login?redirect=/profile")} className="w-full">
              Log In Now
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p>Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
            <CardDescription>
              Update your information to help us provide the most relevant resources for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            {/* Debug Info - Only in development */}
            {process.env.NODE_ENV === "development" && debugInfo && (
              <Alert className="mb-6 bg-gray-100 border-gray-300">
                <AlertDescription>
                  <details>
                    <summary className="cursor-pointer">Debug Info</summary>
                    <pre className="whitespace-pre-wrap text-xs mt-2">{debugInfo}</pre>
                  </details>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>Name</Label>
                <p className="font-medium">{profile?.name || "User"}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="font-medium">{profile?.email || "Not available"}</p>
              </div>
            </div>

            <Tabs defaultValue={categories[0]}>
              <TabsList className="mb-6">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="space-y-6">
                  {questions
                    .filter((q) => q.category === category)
                    .map(
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
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>

          {/* Sign Out with Confirmation */}
          <ConfirmationDialog
            title={t("profile.signOutConfirmTitle") || "Sign Out"}
            description={t("profile.signOutConfirmDesc") || "Are you sure you want to sign out?"}
            confirmText={t("profile.signOutConfirm") || "Sign Out"}
            onConfirm={handleSignOut}
            disabled={isLoading}
            variant="outline"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoading ? "Signing out..." : "Sign Out"}
          </ConfirmationDialog>

          {/* Delete Account with Confirmation */}
          <ConfirmationDialog
            title={t("profile.deleteAccountTitle") || "Delete Account"}
            description={
              t("profile.deleteAccountDesc") ||
              "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
            }
            confirmText={t("profile.deleteAccountConfirm") || "Delete Account"}
            onConfirm={handleDeleteAccount}
            disabled={isDeletingAccount}
            variant="destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeletingAccount ? "Deleting Account..." : "Delete Account"}
          </ConfirmationDialog>
        </div>
      </div>
    </div>
  )
}
