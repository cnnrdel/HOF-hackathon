"use server"

import { getSupabaseServerClient } from "./supabase-client"

export async function createMockUser() {
  const supabase = getSupabaseServerClient()

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", "hofhackathon@nyu.edu")
      .single()

    if (existingUser) {
      console.log("Mock user already exists, resetting onboarding status")

      // Reset onboarding status
      await supabase.from("profiles").update({ onboarding_completed: false }).eq("email", "hofhackathon@nyu.edu")

      return { success: true, message: "Mock user already exists, reset onboarding status" }
    }

    // Create the user using Supabase auth API
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: "hofhackathon@nyu.edu",
      password: "HelloWorld",
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: "HOF Hackathon",
      },
    })

    if (userError) {
      console.error("Error creating mock user:", userError)
      return { success: false, error: userError.message }
    }

    // Create profile for the user
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userData.user.id,
      name: "HOF Hackathon",
      email: "hofhackathon@nyu.edu",
      onboarding_completed: false,
    })

    if (profileError) {
      console.error("Error creating profile:", profileError)
      return { success: false, error: profileError.message }
    }

    // Create preferences for the user
    const { error: preferencesError } = await supabase.from("preferences").insert({
      user_id: userData.user.id,
      language: "en",
      location: "nyc",
    })

    if (preferencesError) {
      console.error("Error creating preferences:", preferencesError)
      // Continue anyway as this is not critical
    }

    return {
      success: true,
      message: "Mock user created successfully",
      userId: userData.user.id,
    }
  } catch (error) {
    console.error("Unexpected error creating mock user:", error)
    return { success: false, error: "Unexpected error creating mock user" }
  }
}
