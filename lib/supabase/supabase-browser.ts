import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    throw new Error("Missing required environment variables for Supabase")
  }

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
          return localStorage.getItem(key)
        },
        setItem: (key, value) => {
          if (typeof window === "undefined") {
            return
          }

          // Set in localStorage
          localStorage.setItem(key, value)
        },
        removeItem: (key) => {
          if (typeof window === "undefined") {
            return
          }

          // Remove from localStorage
          localStorage.removeItem(key)
        },
      },
    },
  })
}
