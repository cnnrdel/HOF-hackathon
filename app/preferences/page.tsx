"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveUserPreferences } from "@/lib/actions"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"

// Replace the topics array with these new categories that match the site's mission
const topics = [
  { id: "housing-assistance", label: "Housing Assistance" },
  { id: "rental-support", label: "Rental Support" },
  { id: "healthcare-services", label: "Healthcare Services" },
  { id: "mental-health", label: "Mental Health Resources" },
  { id: "food-assistance", label: "Food Assistance" },
  { id: "immigration-services", label: "Immigration Services" },
  { id: "family-support", label: "Family Support" },
  { id: "employment-help", label: "Employment Help" },
]

export default function PreferencesPage() {
  const router = useRouter()
  const [selectedTopics, setSelectedTopics] = useState([])
  // Update the initial state for experienceLevel
  const [experienceLevel, setExperienceLevel] = useState("immediate")
  const [isLoading, setIsLoading] = useState(false)
  const { t, language } = useLanguage()

  const handleTopicChange = (topicId) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await saveUserPreferences({
        topics: selectedTopics,
        experienceLevel,
        language, // Save the user's language preference
      })
      router.push("/dashboard")
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-end">
            <LanguageSelector />
          </div>
          {/* Update the page title and description */}
          <CardTitle className="text-2xl font-bold text-center">
            {t("preferences.title") || "Your Resource Preferences"}
          </CardTitle>
          <CardDescription className="text-center">
            {t("preferences.description") ||
              "Select the types of resources you're interested in to personalize your dashboard."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("preferences.topics")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topics.map((topic) => (
                  <div key={topic.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={topic.id}
                      checked={selectedTopics.includes(topic.id)}
                      onCheckedChange={() => handleTopicChange(topic.id)}
                    />
                    <Label htmlFor={topic.id}>{topic.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Replace the experience level section with this needs-based section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {t("preferences.experience") || "What is your current situation?"}
              </h3>
              <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="immediate" id="immediate" />
                  <Label htmlFor="immediate">{t("preferences.immediate") || "I need immediate assistance"}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="planning" id="planning" />
                  <Label htmlFor="planning">{t("preferences.planning") || "I'm planning for future needs"}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="supporting" id="supporting" />
                  <Label htmlFor="supporting">{t("preferences.supporting") || "I'm supporting someone else"}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("language.preference")}</h3>
              <div className="flex justify-center">
                <LanguageSelector />
              </div>
            </div>

            {/* Update the button text */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading || selectedTopics.length === 0}
            >
              {isLoading ? t("preferences.saving") || "Saving..." : t("preferences.continue") || "Save Preferences"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
