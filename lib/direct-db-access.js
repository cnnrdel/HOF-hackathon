"use server"

import { getSupabaseServerClient } from "./supabase-client"

// Direct database access function to save user responses
// This is a fallback in case the regular function fails
export async function directSaveUserResponses(userId, responses) {
  try {
    console.log("Starting directSaveUserResponses for user:", userId)

    const supabase = getSupabaseServerClient()

    if (!userId) {
      throw new Error("User ID is required")
    }

    // Format the data for insertion
    const data = responses.map((response) => ({
      user_id: userId,
      question_id: response.question_id,
      response: response.response,
    }))

    // First try to delete existing responses
    await supabase.from("user_responses").delete().eq("user_id", userId)

    // Then insert the new responses
    const { error } = await supabase.from("user_responses").insert(data)

    if (error) {
      console.error("Error in directSaveUserResponses:", error)
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Direct save error:", error)
    throw error
  }
}

// Function to verify if responses were saved correctly
export async function verifyUserResponses(userId) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.from("user_responses").select("question_id, response").eq("user_id", userId)

    if (error) {
      console.error("Error verifying responses:", error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      count: data.length,
      responses: data,
    }
  } catch (error) {
    console.error("Verification error:", error)
    return { success: false, error: error.message }
  }
}
