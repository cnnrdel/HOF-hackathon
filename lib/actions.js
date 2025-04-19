"use server"

import { getSupabaseServerClient } from "./supabase-client"
import { revalidatePath } from "next/cache"
import { directSaveUserResponses } from "./direct-db-access"

export async function resendVerificationEmail(email) {
  const supabase = getSupabaseServerClient()

  try {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    })

    if (error) {
      console.error("Error resending verification email:", error)
      throw error
    }

    console.log("Verification email resent successfully")
    return { success: true, data }
  } catch (err) {
    console.error("Error in resendVerificationEmail:", err)
    return { success: false, error: err.message || "Failed to resend verification email" }
  }
}

export async function loginUser({ email, password }) {
  const supabase = getSupabaseServerClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      throw error
    }

    revalidatePath("/dashboard")
    revalidatePath("/profile")
    return { success: true, data }
  } catch (err) {
    console.error("Error in loginUser:", err)
    return { success: false, error: err.message || "Failed to log in" }
  }
}

export async function saveUserNeeds({ housingStatus, hasChildren, healthcareNeeds }) {
  const supabase = getSupabaseServerClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User fetch error:", userError)
      throw new Error("Failed to authenticate user")
    }

    if (!user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await supabase
      .from("preferences")
      .update({
        housing_status: housingStatus,
        has_children: hasChildren,
        healthcare_needs: healthcareNeeds,
      })
      .eq("user_id", user.id)
      .select()

    if (error) {
      console.error("Error saving user needs:", error)
      throw new Error("Failed to save user needs")
    }

    revalidatePath("/needs-assessment")
    revalidatePath("/dashboard")
    return { success: true, data }
  } catch (err) {
    console.error("Error in saveUserNeeds:", err)
    return { success: false, error: err.message || "Failed to save user needs" }
  }
}

export async function saveUserResponses(userId, responses) {
  const supabase = getSupabaseServerClient()

  try {
    console.log("Starting saveUserResponses for user:", userId)

    if (!userId) {
      throw new Error("User ID is required")
    }

    // Format the data for insertion
    const data = responses.map((response) => ({
      user_id: userId,
      question_id: response.question_id,
      response: response.response,
    }))

    // Use upsert to handle both insert and update
    const { error } = await supabase.from("user_responses").upsert(data, {
      onConflict: "user_id,question_id",
      ignoreDuplicates: false,
    })

    if (error) {
      console.error("Error in saveUserResponses:", error)
      throw error
    }

    revalidatePath("/questionnaire")
    revalidatePath("/profile")
    revalidatePath("/onboarding")
    return { success: true }
  } catch (error) {
    console.error("Error in saveUserResponses:", error)

    // Attempt direct database save as fallback
    try {
      console.log("Attempting direct database save as fallback")
      await directSaveUserResponses(userId, responses)
      console.log("Direct save successful")
      return { success: true }
    } catch (directSaveError) {
      console.error("Direct save failed:", directSaveError)
      return { success: false, error: error.message || "Failed to save user responses" }
    }
  }
}

export async function completeOnboarding() {
  const supabase = getSupabaseServerClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User fetch error:", userError)
      throw new Error("Failed to authenticate user")
    }

    if (!user) {
      throw new Error("User not authenticated")
    }

    const { error } = await supabase.from("profiles").update({ onboarding_completed: true }).eq("id", user.id)

    if (error) {
      console.error("Error completing onboarding:", error)
      throw new Error("Failed to complete onboarding")
    }

    revalidatePath("/onboarding")
    revalidatePath("/dashboard")
    revalidatePath("/profile")
    return { success: true }
  } catch (err) {
    console.error("Error in completeOnboarding:", err)
    return { success: false, error: err.message || "Failed to complete onboarding" }
  }
}

export async function signOutUser() {
  const supabase = getSupabaseServerClient()

  try {
    // Sign out the user
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error)
      throw new Error("Failed to sign out")
    }

    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/profile")
    return { success: true }
  } catch (err) {
    console.error("Error in signOutUser:", err)
    return { success: false, error: err.message || "Failed to sign out" }
  }
}

export async function deleteUserAccount() {
  const supabase = getSupabaseServerClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User fetch error:", userError)
      throw new Error("Failed to authenticate user")
    }

    if (!user) {
      throw new Error("User not authenticated")
    }

    // Call the stored procedure to mark the user as deleted
    const { error: markDeletedError } = await supabase.rpc("mark_user_as_deleted", {
      user_id: user.id,
    })

    if (markDeletedError) {
      console.error("Error marking user as deleted:", markDeletedError)
      throw new Error("Failed to mark user as deleted")
    }

    // Delete the user account
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

    if (deleteError) {
      console.error("Error deleting user account:", deleteError)
      throw new Error("Failed to delete user account")
    }

    revalidatePath("/")
    return { success: true }
  } catch (err) {
    console.error("Error in deleteUserAccount:", err)
    return { success: false, error: err.message || "Failed to delete user account" }
  }
}

export async function createUserWithProfile({ email, password, name }) {
  const supabase = getSupabaseServerClient()

  try {
    // Create the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    })

    if (error) {
      console.error("Signup error:", error)
      throw error
    }

    if (!data.user) {
      throw new Error("User not created")
    }

    // Check if email confirmation is required
    if (data.user.identities && data.user.identities.length === 0) {
      return { success: true, needsConfirmation: true }
    }

    // Create a profile for the user
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name: name,
      email: email,
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      // Attempt to delete the user if profile creation fails
      await supabase.auth.admin.deleteUser(data.user.id)
      throw new Error("Account created but profile setup failed")
    }

    revalidatePath("/signup")
    return { success: true, needsConfirmation: false }
  } catch (err) {
    console.error("Error in createUserWithProfile:", err)
    return { success: false, error: err.message || "Failed to create account" }
  }
}

export async function saveUserPreferences({
  topics,
  experienceLevel,
  language,
  housingStatus,
  foodSecurity,
  zipCode,
  immigrationStatus,
  location,
  onboardingCompleted,
}) {
  const supabase = getSupabaseServerClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User fetch error:", userError)
      throw new Error("Failed to authenticate user")
    }

    if (!user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await supabase
      .from("preferences")
      .upsert(
        {
          user_id: user.id,
          topics: topics,
          experience_level: experienceLevel,
          language: language,
          housing_status: housingStatus,
          food_security: foodSecurity,
          zip_code: zipCode,
          immigration_status: immigrationStatus,
          location: location,
          onboarding_completed: onboardingCompleted,
        },
        { onConflict: "user_id" },
      )
      .select()

    if (error) {
      console.error("Error saving user preferences:", error)
      throw new Error("Failed to save user preferences")
    }

    revalidatePath("/preferences")
    revalidatePath("/dashboard")
    return { success: true, data }
  } catch (err) {
    console.error("Error in saveUserPreferences:", err)
    return { success: false, error: err.message || "Failed to save user preferences" }
  }
}

export async function getUserProfile() {
  const supabase = getSupabaseServerClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User fetch error:", userError)
      throw new Error("Failed to authenticate user")
    }

    if (!user) {
      console.log("No user found, returning guest profile")
      return {
        name: "Guest",
        isGuest: true,
      }
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("name, email, onboarding_completed")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Profile fetch error:", profileError)
    }

    const { data: preferences, error: preferencesError } = await supabase
      .from("preferences")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (preferencesError) {
      console.error("Preferences fetch error:", preferencesError)
    }

    const { data: responses, error: responsesError } = await supabase
      .from("user_responses")
      .select("question_id, response")
      .eq("user_id", user.id)

    if (responsesError) {
      console.error("User responses fetch error:", responsesError)
    }

    return {
      id: user.id,
      name: profile?.name || user.email?.split("@")[0] || "User",
      email: profile?.email || user.email,
      onboardingCompleted: profile?.onboarding_completed || false,
      isGuest: false,
      housingStatus: preferences?.housing_status || "stable",
      foodSecurity: preferences?.food_security || "never",
      zipCode: preferences?.zip_code || "",
      immigrationStatus: preferences?.immigration_status || "",
      language: preferences?.language || "en",
      location: preferences?.location || "nyc",
      responses: responses || [],
    }
  } catch (err) {
    console.error("Error in getUserProfile:", err)
    return {
      name: "Guest",
      isGuest: true,
    }
  }
}
