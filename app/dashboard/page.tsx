"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserProfile } from "@/lib/actions"
import { Home, Heart, Phone, Search, Menu, X, Apple, MapPin, LogIn, UserPlus, Navigation } from "lucide-react"
import ChatbotWidget from "@/components/chatbot-widget"
import LanguageSelector from "@/components/language-selector"
import LocationSelector from "@/components/location-selector"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLanguage } from "@/lib/i18n/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { getResourcesByLocation, availableLocations } from "@/lib/resources-data"
import EmergencyResources from "@/components/emergency-resources"
import { type UserNeeds, isResourceHighPriority } from "@/lib/resource-relevance"

export default function DashboardPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const isPreview = searchParams?.get("preview") === "true"
  const previewCategory = searchParams?.get("category") || "all"
  const initialLocation = searchParams?.get("location") || "nyc"

  const [profile, setProfile] = useState(null)
  const [userNeeds, setUserNeeds] = useState<UserNeeds | null>(null)
  const [resources, setResources] = useState({ housing: [], healthcare: [], food: [], emergency: [] })
  const [loading, setLoading] = useState(true)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [authChecked, setAuthChecked] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)

  // Separate authentication check function for better error handling and clarity
  const checkAuthentication = async () => {
    try {
      const supabase = getSupabaseBrowserClient()

      // Get the current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Session error:", sessionError)
        setIsAuthenticated(false)
        return false
      }

      if (!sessionData.session) {
        console.log("No active session found")
        setIsAuthenticated(false)
        return false
      }

      // Verify the session is valid by trying to get the user
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        console.error("User verification error:", userError)
        // Session is invalid, sign out completely
        await supabase.auth.signOut()
        setIsAuthenticated(false)
        return false
      }

      // Session is valid
      console.log("Valid session found for user:", userData.user.id)
      console.log("User metadata:", userData.user.user_metadata)

      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Authentication check error:", error)
      setIsAuthenticated(false)
      return false
    } finally {
      setAuthChecked(true)
    }
  }

  // Direct method to get user name from auth
  const getUserNameFromAuth = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        console.error("Error getting user from auth:", error)
        return null
      }

      // Get name from user metadata
      const name = data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User"
      console.log("Got user name from auth:", name)
      return name
    } catch (error) {
      console.error("Error in getUserNameFromAuth:", error)
      return null
    }
  }

  // Load resources based on selected location
  const loadResourcesByLocation = (location) => {
    try {
      setLoading(true)
      const locationResources = getResourcesByLocation(location)
      setResources(locationResources)
    } catch (error) {
      console.error("Error loading resources for location:", error)
      setError("Failed to load resources for the selected location.")
    } finally {
      setLoading(false)
    }
  }

  // Handle location change
  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    loadResourcesByLocation(location)

    // Update URL with the new location
    const url = new URL(window.location.href)
    url.searchParams.set("location", location)
    window.history.pushState({}, "", url)
  }

  // Extract user needs from profile data
  const extractUserNeeds = (profileData) => {
    if (!profileData || profileData.isGuest) return null

    return {
      housingStatus: profileData.housingStatus,
      foodSecurity: profileData.foodSecurity,
      healthcareNeeds: profileData.healthcareNeeds || [],
      immigrationStatus: profileData.immigrationStatus,
      hasChildren: profileData.hasChildren,
      responses: profileData.responses || [],
      location: profileData.location,
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError("")

        // Check authentication status first
        const isUserAuthenticated = await checkAuthentication()
        console.log("Authentication check result:", isUserAuthenticated)

        // Only fetch user profile if authenticated AND not in preview mode
        if (isUserAuthenticated && !isPreview) {
          try {
            // First try to get the name directly from auth
            const authName = await getUserNameFromAuth()

            // Then try to get the full profile
            const profileData = await getUserProfile()
            console.log("Profile data loaded:", profileData)

            // Check if user needs to complete onboarding
            if (!profileData.onboardingCompleted) {
              console.log("User needs to complete onboarding")
              setNeedsOnboarding(true)
              router.push("/initial-setup")
              return
            }

            // If we got a profile, use it
            if (profileData && !profileData.isGuest) {
              setProfile(profileData)

              // Extract user needs from profile data
              const needs = extractUserNeeds(profileData)
              setUserNeeds(needs)
              console.log("User needs extracted:", needs)

              // Use the user's preferred location if available
              if (profileData.location) {
                setSelectedLocation(profileData.location)
                loadResourcesByLocation(profileData.location)
              } else {
                loadResourcesByLocation(initialLocation)
              }
            }
            // If profile failed but we have auth name, create a minimal profile
            else if (authName) {
              setProfile({
                name: authName,
                isGuest: false,
              })
              loadResourcesByLocation(initialLocation)
            }
            // Fallback to default
            else {
              const supabase = getSupabaseBrowserClient()
              const { data } = await supabase.auth.getUser()

              setProfile({
                name: data?.user?.user_metadata?.name || "User",
                isGuest: false,
              })
              loadResourcesByLocation(initialLocation)
            }
          } catch (profileError) {
            console.error("Error fetching profile:", profileError)

            // Try to get name directly from auth as fallback
            const authName = await getUserNameFromAuth()

            // Set a default profile if there's an error
            setProfile({
              name: authName || "User",
              isGuest: false,
            })
            loadResourcesByLocation(initialLocation)
          }
        } else {
          // Set a guest profile for non-authenticated users or preview mode
          setProfile({
            name: "Guest",
            isGuest: true,
          })
          setUserNeeds(null)
          loadResourcesByLocation(initialLocation)
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error)
        setError("Failed to load resources. Please try refreshing the page.")
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Set up auth state listener to detect sign-outs
    const supabase = getSupabaseBrowserClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event)

      if (event === "SIGNED_OUT") {
        console.log("User signed out, updating state")
        setIsAuthenticated(false)
        setUserNeeds(null)
        setProfile({
          name: "Guest",
          isGuest: true,
        })

        // If not in preview mode, redirect to home page
        if (!isPreview) {
          router.push("/")
        }
      } else if (event === "SIGNED_IN" && session) {
        console.log("User signed in, updating state")
        setIsAuthenticated(true)
        // Reload the page to get fresh data
        window.location.reload()
      }
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [isPreview, router, initialLocation])

  // Force re-render when language changes
  useEffect(() => {
    // This empty effect will cause the component to re-render when language changes
  }, [language])

  if (needsOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Redirecting to initial setup...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">{t("dashboard.loading") || "Loading resources..."}</p>
      </div>
    )
  }

  // Determine whether to show the personalized welcome card
  const showPersonalizedWelcome = isAuthenticated && !isPreview

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="CareCompass Logo" className="h-10" />
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              <LocationSelector selectedLocation={selectedLocation} onLocationChange={handleLocationChange} />
              <LanguageSelector />
              <Button variant="ghost" onClick={() => setChatbotOpen(true)}>
                <Phone className="h-5 w-5 mr-2" />
                {t("dashboard.askAI") || "Get Help"}
              </Button>

              {isAuthenticated ? (
                <Link href="/profile">
                  <Button variant="outline">{t("dashboard.profile") || "My Profile"}</Button>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login">
                    <Button variant="outline">
                      <LogIn className="h-4 w-4 mr-2" />
                      {t("hero.login") || "Log In"}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t("hero.getStarted") || "Sign Up"}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 space-y-3">
              <div className="flex justify-center mb-2">
                <LocationSelector
                  selectedLocation={selectedLocation}
                  onLocationChange={handleLocationChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-center">
                <LanguageSelector />
              </div>
              <Button variant="ghost" className="w-full justify-center" onClick={() => setChatbotOpen(true)}>
                <Phone className="h-5 w-5 mr-2" />
                {t("dashboard.askAI") || "Get Help"}
              </Button>

              {isAuthenticated ? (
                <Link href="/profile" className="block">
                  <Button variant="outline" className="w-full">
                    {t("dashboard.profile") || "My Profile"}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full">
                      <LogIn className="h-4 w-4 mr-2" />
                      {t("hero.login") || "Log In"}
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t("hero.getStarted") || "Sign Up"}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Location Selector for Mobile (Sticky) */}
        <div className="md:hidden sticky top-[73px] z-10 bg-gray-50 pt-2 pb-4">
          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            className="w-full"
          />
        </div>

        {/* Preview Mode Banner - Only show for non-authenticated users */}
        {!isAuthenticated && (
          <Alert className="mb-8 bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800 font-medium">
              {t("dashboard.previewMode") || "You're viewing a general resource dashboard"}
            </AlertTitle>
            <AlertDescription className="text-blue-700">
              {t("dashboard.previewDescription") ||
                "Sign up or log in to get personalized resources based on your specific needs and situation."}
              <div className="mt-4">
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 mr-2">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("hero.getStarted") || "Sign Up"}
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <LogIn className="h-4 w-4 mr-2" />
                    {t("hero.login") || "Log In"}
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Welcome Section */}
        <section className="mb-8">
          <Card>
            <CardContent className="p-6">
              {showPersonalizedWelcome ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">
                    {t("dashboard.welcome", { name: profile?.name || "User" }) ||
                      `Welcome back, ${profile?.name || "User"}!`}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile?.zipCode && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {profile.zipCode}
                      </Badge>
                    )}
                    {profile?.language && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Globe className="h-3 w-3" /> {profile.language.toUpperCase()}
                      </Badge>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />{" "}
                      {availableLocations.find((loc) => loc.id === selectedLocation)?.name || "New York City"}
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    {t("dashboard.interests") || "Here are resources personalized for your needs."}
                    {profile?.housingStatus?.includes("homeless") && (
                      <span className="block mt-2 text-red-600 font-semibold">
                        {t("dashboard.emergencyHousing") || "We've prioritized emergency housing resources for you."}
                      </span>
                    )}
                    {profile?.foodSecurity === "often" || profile?.foodSecurity === "always" ? (
                      <span className="block mt-2 text-red-600 font-semibold">
                        {t("dashboard.foodInsecurity") || "We've prioritized food assistance resources for you."}
                      </span>
                    ) : null}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">
                    {t("dashboard.generalWelcome") || "Housing & Healthcare Resources"}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />{" "}
                      {availableLocations.find((loc) => loc.id === selectedLocation)?.name || "New York City"}
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    {t("dashboard.generalDescription") ||
                      "Browse available resources for housing assistance, healthcare services, and emergency support."}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("dashboard.searchPlaceholder") || "Search for resources..."}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue={previewCategory !== "all" ? previewCategory : "all"} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">{t("dashboard.all") || "All"}</TabsTrigger>
            <TabsTrigger value="emergency">{t("dashboard.emergency") || "Emergency"}</TabsTrigger>
            <TabsTrigger value="housing">{t("dashboard.housing") || "Housing"}</TabsTrigger>
            <TabsTrigger value="healthcare">{t("dashboard.healthcare") || "Healthcare"}</TabsTrigger>
            <TabsTrigger value="food">{t("dashboard.food") || "Food"}</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {resources.emergency?.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-4 text-red-600">
                  {t("dashboard.emergencyResources") || "Emergency Resources"}
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {resources.emergency.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      userNeeds={userNeeds}
                      isAuthenticated={isAuthenticated}
                      isPreview={isPreview}
                    />
                  ))}
                </div>
              </>
            )}

            <h3 className="text-xl font-bold mb-4">{t("dashboard.housingResources") || "Housing Resources"}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {resources.housing?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4">{t("dashboard.healthcareResources") || "Healthcare Resources"}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {resources.healthcare?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4">{t("dashboard.foodResources") || "Food Resources"}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.food?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency">
            <div className="grid md:grid-cols-2 gap-6">
              {resources.emergency?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="housing">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.housing?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="healthcare">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.healthcare?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="food">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.food?.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userNeeds={userNeeds}
                  isAuthenticated={isAuthenticated}
                  isPreview={isPreview}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        {/* Add the EmergencyResources component to the dashboard */}
        <div className="mt-6">
          <EmergencyResources />
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget isOpenExternal={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  )
}

// Updated ResourceCard to include dynamic priority based on user needs
function ResourceCard({ resource, userNeeds, isAuthenticated, isPreview }) {
  const { t } = useLanguage()
  const { id, title, description, type, link, phone, priority, location } = resource

  // Determine if this resource should be high priority based on user needs and preview mode
  const isHighPriority = isPreview
    ? false
    : isAuthenticated && userNeeds
      ? isResourceHighPriority(resource, userNeeds)
      : priority === "high"

  // Get location name from location ID
  const getLocationName = (locationId) => {
    const locationObj = availableLocations.find((loc) => loc.id === locationId)
    return locationObj ? locationObj.name : "New York City"
  }

  const getIcon = () => {
    switch (type) {
      case "housing":
        return <Home className="h-5 w-5 text-teal-500" />
      case "healthcare":
        return <Heart className="h-5 w-5 text-teal-500" />
      case "food":
        return <Apple className="h-5 w-5 text-teal-500" />
      case "emergency":
        return <Phone className="h-5 w-5 text-red-500" />
      default:
        return <Search className="h-5 w-5 text-teal-500" />
    }
  }

  const getPriorityBadge = () => {
    if (isHighPriority) {
      return <Badge className="bg-red-500">{t("dashboard.highPriority") || "High Priority"}</Badge>
    }
    return null
  }

  // Add a special class for high priority resources, but not in preview mode
  const cardClass = isHighPriority
    ? `${type === "emergency" ? "border-l-4 border-red-500" : ""} ring-2 ring-red-200`
    : `${type === "emergency" && !isPreview ? "border-l-4 border-red-500" : ""}`

  return (
    <Card className={cardClass}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {getPriorityBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">{description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {phone && <p className="font-bold text-red-500">{phone}</p>}
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {getLocationName(location)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/resources/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            {t("dashboard.viewDetails") || "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function Globe({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
