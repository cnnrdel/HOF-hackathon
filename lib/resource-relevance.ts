import type { Resource } from "./resources-data"

// Define user needs interface
export interface UserNeeds {
  housingStatus?: string
  foodSecurity?: string
  healthcareNeeds?: string[]
  immigrationStatus?: string
  hasChildren?: boolean
  responses?: Array<{ question_id: number; response: string }>
  location?: string
}

/**
 * Determines if a resource is high priority for a specific user
 */
export function isResourceHighPriority(resource: Resource, userNeeds: UserNeeds | null): boolean {
  // If no user needs data, return the default priority
  if (!userNeeds) {
    return resource.priority === "high"
  }

  // Check resource type against user needs
  switch (resource.type) {
    case "housing":
      // Housing is high priority if user has unstable housing
      if (
        userNeeds.housingStatus &&
        ["unstable", "temporary", "homeless", "at_risk"].some((status) => userNeeds.housingStatus?.includes(status))
      ) {
        return true
      }
      break

    case "food":
      // Food is high priority if user has food insecurity
      if (userNeeds.foodSecurity && ["sometimes", "often", "always"].includes(userNeeds.foodSecurity)) {
        return true
      }
      break

    case "healthcare":
      // Healthcare is high priority if user has healthcare needs
      if (userNeeds.healthcareNeeds && userNeeds.healthcareNeeds.length > 0) {
        return true
      }
      break

    case "emergency":
      // Emergency resources are always high priority
      return true

    case "legal":
      // Legal is high priority for immigration status needs
      if (userNeeds.immigrationStatus && userNeeds.immigrationStatus !== "citizen") {
        return true
      }
      break
  }

  // Check if resource is related to any of the user's questionnaire responses
  if (resource.related_questions && userNeeds.responses) {
    const matchingResponses = userNeeds.responses.filter(
      (response) =>
        resource.related_questions?.includes(Number.parseInt(response.question_id.toString())) &&
        response.response === "yes",
    )

    if (matchingResponses.length > 0) {
      return true
    }
  }

  // Check if resource should be shown for marked questions
  if (resource.show_if_marked && userNeeds.responses) {
    const hasMarkedQuestions = userNeeds.responses.some((response) => response.response === "yes")

    if (hasMarkedQuestions) {
      return true
    }
  }

  // If none of the conditions match, return the default priority
  return resource.priority === "high"
}
