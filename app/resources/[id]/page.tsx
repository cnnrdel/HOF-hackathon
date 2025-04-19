"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ExternalLink, MapPin, Phone, Calendar, Info, AlertCircle, Navigation } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { resourcesData, availableLocations, bostonResources } from "@/lib/resources-data"

export default function ResourceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()
  const [resource, setResource] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [relatedResources, setRelatedResources] = useState([])

  useEffect(() => {
    const fetchResourceDetails = () => {
      try {
        setLoading(true)
        setError("")

        // Get the resource ID from the URL params
        const resourceId = params.id

        if (!resourceId) {
          setError("Resource ID is missing")
          setLoading(false)
          return
        }

        // Find the resource in our data
        let foundResource = null
        let category = null

        // Search through all resource categories in NYC resources
        for (const [cat, resources] of Object.entries(resourcesData)) {
          const found = resources.find((r) => r.id?.toString() === resourceId.toString())
          if (found) {
            foundResource = found
            category = cat
            break
          }
        }

        // If not found in NYC resources, search in Boston resources
        if (!foundResource) {
          for (const [cat, resources] of Object.entries(bostonResources)) {
            const found = resources.find((r) => r.id?.toString() === resourceId.toString())
            if (found) {
              foundResource = found
              category = cat
              break
            }
          }
        }

        if (!foundResource) {
          setError("Resource not found")
          setLoading(false)
          return
        }

        setResource({ ...foundResource, category })

        // Find related resources (from the same category and location)
        if (category) {
          let relatedResourcesData = []

          // Get resources from the appropriate location
          const locationResources = foundResource.location === "boston" ? bostonResources : resourcesData

          if (locationResources[category]) {
            relatedResourcesData = locationResources[category]
              .filter((r) => r.id !== foundResource.id && r.location === foundResource.location)
              .slice(0, 3)
          }

          setRelatedResources(relatedResourcesData)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching resource details:", err)
        setError("Failed to load resource details")
        setLoading(false)
      }
    }

    fetchResourceDetails()
  }, [params.id])

  const handleGoBack = () => {
    router.back()
  }

  // Get location name from location ID
  const getLocationName = (locationId) => {
    const locationObj = availableLocations.find((loc) => loc.id === locationId)
    return locationObj ? locationObj.name : "New York City"
  }

  if (loading) {
    return <ResourceDetailSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={handleGoBack} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Resource Not Found</AlertTitle>
          <AlertDescription>The requested resource could not be found.</AlertDescription>
        </Alert>
        <Button onClick={handleGoBack} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={handleGoBack} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge
                  className={
                    resource.category === "emergency"
                      ? "bg-red-500"
                      : resource.category === "housing"
                        ? "bg-blue-500"
                        : resource.category === "healthcare"
                          ? "bg-green-500"
                          : "bg-amber-500"
                  }
                >
                  {capitalizeFirstLetter(resource.category)}
                </Badge>
                {resource.priority === "high" && <Badge className="bg-red-500">High Priority</Badge>}
                <Badge variant="outline" className="flex items-center gap-1">
                  <Navigation className="h-3 w-3" /> {getLocationName(resource.location)}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{resource.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <CardDescription className="text-base">{resource.description}</CardDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resource.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-lg font-semibold text-red-600">{resource.phone}</p>
                </div>
              </div>
            )}

            {resource.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p>{resource.address}</p>
                </div>
              </div>
            )}

            {resource.hours && (
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Hours</h4>
                  <p>{resource.hours}</p>
                </div>
              </div>
            )}

            {resource.eligibility && (
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Eligibility</h4>
                  <p>{resource.eligibility}</p>
                </div>
              </div>
            )}
          </div>

          {resource.details && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
              <p>{resource.details}</p>
            </div>
          )}

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-700">Disclaimer</AlertTitle>
            <AlertDescription className="text-blue-600">
              Information may change without notice. Please contact the organization directly to confirm details.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {resource.phone && (
            <a href={`tel:${resource.phone.replace(/[^0-9]/g, "")}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Call <Phone className="ml-2 h-4 w-4" />
              </Button>
            </a>
          )}
        </CardFooter>
      </Card>

      {relatedResources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((related) => (
              <RelatedResourceCard key={related.id} resource={related} category={resource.category} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RelatedResourceCard({ resource, category }) {
  // Get location name from location ID
  const getLocationName = (locationId) => {
    const locationObj = availableLocations.find((loc) => loc.id === locationId)
    return locationObj ? locationObj.name : "New York City"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">{resource.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {resource.phone && <p className="font-bold text-red-500">{resource.phone}</p>}
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {getLocationName(resource.location)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/resources/${resource.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function ResourceDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="mb-8">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
