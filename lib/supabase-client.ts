import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    throw new Error("Missing required environment variables for Supabase")
  }

  console.log("Creating browser Supabase client with URL:", supabaseUrl)

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "carecompass-auth-token", // Use a unique storage key
      storage: {
        getItem: (key) => {
          if (typeof window === "undefined") {
            return null
          }

          // Get from localStorage
          const value = localStorage.getItem(key)

          // For debugging
          console.log(`Retrieved auth token: ${value ? "exists" : "not found"}`)

          return value
        },
        setItem: (key, value) => {
          if (typeof window === "undefined") {
            return
          }

          // For debugging
          console.log(`Setting auth token: ${value ? "exists" : "not found"}`)

          // Set in localStorage
          localStorage.setItem(key, value)
        },
        removeItem: (key) => {
          if (typeof window === "undefined") {
            return
          }

          // For debugging
          console.log(`Removing auth token`)

          // Remove from localStorage
          localStorage.removeItem(key)

          // Also clear any other potential auth tokens
          localStorage.removeItem("supabase.auth.token")
          localStorage.removeItem("sb-auth-token")

          // Clear session storage as well
          sessionStorage.removeItem(key)
          sessionStorage.removeItem("supabase.auth.token")
          sessionStorage.removeItem("sb-auth-token")
        },
      },
    },
  })
}

// Create a singleton instance for client-side
let browserClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    // Server-side - create a temporary client
    return createBrowserClient()
  }

  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Create a client for server components
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || (process.env.SUPABASE_URL as string)
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables for server client")
    throw new Error("Missing required environment variables for Supabase server client")
  }

  console.log("Creating server Supabase client with URL:", supabaseUrl)

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Helper function to check if Supabase connection is working
export async function checkSupabaseConnection() {
  try {
    const supabase = getSupabaseServerClient()

    // Try a simple query to check connection
    const { data, error } = await supabase.from("profiles").select("count").limit(1)

    if (error) {
      console.error("Supabase connection test failed:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Supabase connection check error:", error)
    return {
      success: false,
      error: error.message || "Unknown error",
    }
  }
}
