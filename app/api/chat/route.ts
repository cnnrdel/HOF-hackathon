import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-client"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Basic pattern matching responses for common questions
const PATTERN_RESPONSES = {
  housing: [
    "For emergency housing in NYC, you can contact the Department of Homeless Services at 800-994-6494 or visit a Prevention Assistance and Temporary Housing (PATH) center.",
    "NYC offers several housing assistance programs including Section 8 vouchers, NYCHA public housing, and affordable housing lotteries through NYC Housing Connect.",
    "If you're facing eviction, you may qualify for free legal representation through the Right to Counsel program. Call 311 to be connected to legal services.",
  ],
  food: [
    "NYC has over 500 food pantries and soup kitchens. You can find the nearest one by texting 'FOOD' to 877-877 or calling 311.",
    "SNAP benefits (food stamps) can help you purchase groceries. Apply online at ACCESS HRA or call 718-557-1399 for assistance.",
    "Emergency food assistance is available through GetFoodNYC. Visit nyc.gov/getfood or call 311 to learn more.",
  ],
  healthcare: [
    "NYC Health + Hospitals provides care to all New Yorkers regardless of ability to pay or immigration status. Call 844-NYC-4NYC to make an appointment.",
    "NYC Care provides affordable healthcare access for those who don't qualify for or can't afford health insurance. Enroll by calling 646-NYC-CARE.",
    "For mental health support, NYC Well offers free, confidential counseling 24/7. Call 888-NYC-WELL, text WELL to 65173, or chat online.",
  ],
  emergency: [
    "If this is a life-threatening emergency, please call 911 immediately.",
    "NYC Well provides 24/7 mental health crisis support at 888-692-9355.",
    "For domestic violence emergencies, call NYC's 24-hour hotline at 800-621-HOPE (4673).",
  ],
}

// More varied fallback responses
const FALLBACK_RESPONSES = [
  "I'm currently unable to process your request due to technical limitations. Please try again later or contact support for assistance.",
  "Our AI service is temporarily unavailable. In the meantime, you can call NYC 311 for immediate assistance with city services.",
  "I apologize, but I can't generate a personalized response right now. For urgent housing needs, please call the NYC DHS at 800-994-6494.",
  "Service is currently undergoing maintenance. For immediate mental health support, please contact NYC Well at 888-692-9355.",
  "I'm here to help with housing, healthcare, and emergency resources in NYC. What specific assistance are you looking for today?",
  "I can provide information about NYC resources for housing, food, healthcare, and other essential services. How can I assist you?",
  "NYC offers many support services for residents. Could you tell me more about what kind of help you're looking for?",
  "I'd be happy to help you find resources in NYC. What specific needs do you have right now?",
]

// Function to get a response based on pattern matching
function getPatternResponse(message: string): string | null {
  message = message.toLowerCase()

  // Check for housing-related keywords
  if (
    message.includes("housing") ||
    message.includes("homeless") ||
    message.includes("shelter") ||
    message.includes("evict") ||
    message.includes("rent") ||
    message.includes("apartment")
  ) {
    return PATTERN_RESPONSES.housing[Math.floor(Math.random() * PATTERN_RESPONSES.housing.length)]
  }

  // Check for food-related keywords
  if (
    message.includes("food") ||
    message.includes("hungry") ||
    message.includes("eat") ||
    message.includes("meal") ||
    message.includes("snap") ||
    message.includes("pantry")
  ) {
    return PATTERN_RESPONSES.food[Math.floor(Math.random() * PATTERN_RESPONSES.food.length)]
  }

  // Check for healthcare-related keywords
  if (
    message.includes("health") ||
    message.includes("doctor") ||
    message.includes("medical") ||
    message.includes("sick") ||
    message.includes("insurance") ||
    message.includes("therapy") ||
    message.includes("mental")
  ) {
    return PATTERN_RESPONSES.healthcare[Math.floor(Math.random() * PATTERN_RESPONSES.healthcare.length)]
  }

  // Check for emergency-related keywords
  if (
    message.includes("emergency") ||
    message.includes("crisis") ||
    message.includes("urgent") ||
    message.includes("suicide") ||
    message.includes("kill myself") ||
    message.includes("die") ||
    message.includes("violence") ||
    message.includes("abuse")
  ) {
    return PATTERN_RESPONSES.emergency[Math.floor(Math.random() * PATTERN_RESPONSES.emergency.length)]
  }

  // No pattern match found
  return null
}

// Add this sanitization function after the getPatternResponse function
function sanitizeResponse(text: string): string {
  if (!text) return "I'm sorry, I couldn't generate a response. Please try again."

  // Replace common problematic characters
  return (
    text
      // Remove excessive newlines (keep max 2 consecutive)
      .replace(/\n{3,}/g, "\n\n")
      // Replace special quotes with standard quotes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      // Replace em dashes and en dashes with regular dashes
      .replace(/[—–]/g, "-")
      // Replace bullet points with standard hyphens
      .replace(/[•●]/g, "- ")
      // Remove zero-width spaces and other invisible characters
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      // Remove control characters
      .replace(/[\x00-\x1F\x7F]/g, "")
      // Trim whitespace
      .trim()
  )
}

export async function POST(req: Request) {
  try {
    // Log environment variables (without exposing sensitive values)
    console.log("Environment check:", {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    })

    // Get the request body
    const body = await req.json()
    const { messages, userId } = body

    // Get the latest user message
    const userMessage = messages[messages.length - 1]

    // Initialize Supabase client
    const supabase = getSupabaseServerClient()

    // Get user profile and preferences if userId is provided
    let userProfile = null
    let userResources = []

    if (userId) {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
      } else {
        userProfile = profile
      }

      // Get user preferences
      const { data: preferences, error: preferencesError } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", userId)
        .single()

      if (preferencesError) {
        console.error("Error fetching user preferences:", preferencesError)
      } else if (preferences) {
        // Fetch relevant resources based on user preferences
        const { data: resources, error: resourcesError } = await supabase.from("resources").select("*").limit(5)

        if (resourcesError) {
          console.error("Error fetching resources:", resourcesError)
        } else {
          userResources = resources || []
        }
      }
    }

    // Store conversation and message if userId is provided
    let conversationId = null
    if (userId && messages.length > 0) {
      try {
        // Check if there's an existing conversation or create a new one
        const { data: existingConversation, error: convError } = await supabase
          .from("chat_conversations")
          .select("id")
          .eq("user_id", userId)
          .order("last_message_at", { ascending: false })
          .limit(1)

        if (convError) {
          console.error("Error checking for existing conversation:", convError)
        } else if (existingConversation && existingConversation.length > 0) {
          conversationId = existingConversation[0].id

          // Update last_message_at
          await supabase
            .from("chat_conversations")
            .update({ last_message_at: new Date().toISOString() })
            .eq("id", conversationId)
        } else {
          // Create a new conversation
          const { data: newConversation, error: createError } = await supabase
            .from("chat_conversations")
            .insert({ user_id: userId })
            .select()

          if (createError) {
            console.error("Error creating conversation:", createError)
          } else if (newConversation) {
            conversationId = newConversation[0].id
          }
        }

        // Store the user message
        if (conversationId) {
          await supabase.from("chat_messages").insert({
            conversation_id: conversationId,
            role: userMessage.role,
            content: userMessage.content,
          })
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
        // Continue with the chat even if database operations fail
      }
    }

    let responseText = ""
    let isAIUnavailable = false

    // Try to use OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        // Prepare system message with context
        const systemMessage = `You are a helpful assistant for NYC residents seeking social services and resources.
    Your goal is to provide accurate, concise information about housing, healthcare, food assistance, and other essential services in NYC.
    Always prioritize emergency resources for urgent needs. Be empathetic but direct.
    ${userProfile ? `The user's profile indicates: ${JSON.stringify(userProfile)}` : ""}
    ${userResources.length > 0 ? `Relevant resources: ${JSON.stringify(userResources)}` : ""}`

        console.log("Sending request to OpenAI with prompt:", userMessage.content.substring(0, 100) + "...")

        // Generate response using OpenAI with proper error handling
        try {
          const { text } = await generateText({
            model: openai("gpt-4o"),
            system: systemMessage,
            prompt: userMessage.content,
            temperature: 0.7, // Add temperature for more reliable responses
            maxTokens: 500, // Limit response length
          })

          responseText = text
          console.log("Received response from OpenAI:", responseText.substring(0, 100) + "...")
        } catch (openaiError) {
          console.error("OpenAI API error details:", openaiError)
          throw new Error(`OpenAI API error: ${openaiError.message || "Unknown error"}`)
        }
      } catch (aiError) {
        console.error("Error with OpenAI:", aiError)
        isAIUnavailable = true

        // Try pattern matching as fallback
        responseText =
          getPatternResponse(userMessage.content) ||
          FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]

        console.log("Using fallback response:", responseText)
      }
    } else {
      console.warn("OpenAI API key is missing")
      isAIUnavailable = true

      // Try pattern matching first
      responseText =
        getPatternResponse(userMessage.content) ||
        FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]

      console.log("Using pattern response (no API key):", responseText)
    }

    // Store the assistant response if we have a conversation
    if (conversationId) {
      try {
        // Sanitize the response before storing
        const sanitizedResponse = sanitizeResponse(responseText)

        await supabase.from("chat_messages").insert({
          conversation_id: conversationId,
          role: "assistant",
          content: sanitizedResponse,
        })

        // Update responseText to use the sanitized version
        responseText = sanitizedResponse
      } catch (dbError) {
        console.error("Error storing assistant response:", dbError)
      }
    }

    return NextResponse.json({
      text: responseText,
      isAIUnavailable: isAIUnavailable,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      { error: "There was an error processing your request. Please try again later." },
      { status: 500 },
    )
  }
}
