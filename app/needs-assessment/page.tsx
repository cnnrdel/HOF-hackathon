"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveUserNeeds } from "@/lib/actions"
import LanguageSelector from "@/components/language-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

export default function NeedsAssessmentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [housingStatus, setHousingStatus] = useState("stable")
  const [hasChildren, setHasChildren] = useState(false)
  const [gender, setGender] = useState("")
  const [healthcareNeeds, setHealthcareNeeds] = useState([])

  // Check authentication on page load
  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          // Redirect to login if not authenticated
          router.push("/login?redirect=/needs-assessment")
          return
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Auth check error:", err)
        setError("Authentication error. Please try logging in again.")
        router.push("/login?redirect=/needs-assessment")
      }
    }

    checkAuth()
  }, [router])

  const handleHealthcareNeedsChange = (need) => {
    setHealthcareNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Check authentication again before submitting
      const supabase = getSupabaseBrowserClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error("Please log in to continue")
      }

      const result = await saveUserNeeds({
        housingStatus,
        hasChildren,
        healthcareNeeds,
      })

      if (result.success) {
        router.push("/dashboard")
      } else {
        throw new Error("Failed to save your information")
      }
    } catch (err) {
      console.error("Error saving needs assessment:", err)
      setError(err.message || "Failed to save your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-end">
            <LanguageSelector />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Tell us about your needs</CardTitle>
          <CardDescription className="text-center">
            This information helps us provide resources that are most relevant to your situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">What is your current housing situation?</h3>
              <RadioGroup value={housingStatus} onValueChange={setHousingStatus}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label htmlFor="emergency">I need emergency shelter tonight</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unstable" id="unstable" />
                  <Label htmlFor="unstable">My housing is unstable or at risk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stable" id="stable" />
                  <Label htmlFor="stable">I have stable housing but need assistance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seeking" id="seeking" />
                  <Label htmlFor="seeking">I'm seeking affordable housing options</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Do you have children in your care?</h3>
              <RadioGroup value={hasChildren.toString()} onValueChange={(value) => setHasChildren(value === "true")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="has-children-yes" />
                  <Label htmlFor="has-children-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="has-children-no" />
                  <Label htmlFor="has-children-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">What is your gender?</h3>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-binary" id="non-binary" />
                  <Label htmlFor="non-binary">Non-binary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">What healthcare services are you interested in?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "primary-care", label: "Primary Care" },
                  { id: "mental-health", label: "Mental Health Services" },
                  { id: "dental", label: "Dental Care" },
                  { id: "vision", label: "Vision Care" },
                  { id: "prenatal", label: "Prenatal/Maternal Care" },
                  { id: "pediatric", label: "Pediatric Care" },
                  { id: "insurance", label: "Health Insurance Assistance" },
                  { id: "prescription", label: "Prescription Assistance" },
                ].map((need) => (
                  <div key={need.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={need.id}
                      checked={healthcareNeeds.includes(need.id)}
                      onCheckedChange={() => handleHealthcareNeedsChange(need.id)}
                    />
                    <Label htmlFor={need.id}>{need.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting || !gender}>
              {isSubmitting ? "Saving your information..." : "Continue to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
