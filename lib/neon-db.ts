import { neon } from "@neondatabase/serverless"

// Initialize the Neon SQL client
const sql = neon(process.env.NEON_NEON_DATABASE_URL || process.env.DATABASE_URL)

// Function to get resources by type
export async function getResourcesByType(type: string, limit = 10) {
  try {
    const resources = await sql`
      SELECT * FROM resources 
      WHERE type = ${type} AND location = 'nyc'
      LIMIT ${limit}
    `
    return resources
  } catch (error) {
    console.error(`Error fetching ${type} resources:`, error)
    return []
  }
}

// Function to get resources by user needs
export async function getResourcesByUserNeeds(userId: string) {
  try {
    // Get user preferences
    const preferences = await sql`
      SELECT * FROM preferences WHERE user_id = ${userId}
    `

    if (!preferences || preferences.length === 0) {
      return []
    }

    // Extract needs from preferences
    const userPrefs = preferences[0]
    const needs = []

    if (userPrefs.housing_status !== "stable") needs.push("housing")
    if (userPrefs.healthcare_needs && userPrefs.healthcare_needs.length > 0) needs.push("healthcare")
    if (userPrefs.food_security !== "never") needs.push("food")

    // If no specific needs, return general resources
    if (needs.length === 0) {
      return await sql`
        SELECT * FROM resources 
        WHERE location = 'nyc'
        LIMIT 10
      `
    }

    // Get resources matching user needs
    return await sql`
      SELECT * FROM resources 
      WHERE type = ANY(${needs}) AND location = 'nyc'
      LIMIT 15
    `
  } catch (error) {
    console.error("Error fetching resources by user needs:", error)
    return []
  }
}

// Function to search resources
export async function searchResources(query: string) {
  try {
    const resources = await sql`
      SELECT * FROM resources 
      WHERE 
        location = 'nyc' AND
        (
          title ILIKE ${"%" + query + "%"} OR
          description ILIKE ${"%" + query + "%"} OR
          type ILIKE ${"%" + query + "%"} OR
          eligibility ILIKE ${"%" + query + "%"}
        )
      LIMIT 20
    `
    return resources
  } catch (error) {
    console.error("Error searching resources:", error)
    return []
  }
}
