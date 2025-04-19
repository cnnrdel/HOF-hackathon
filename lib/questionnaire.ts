import { getSupabaseServerClient } from "./supabase-client"

export type QuestionType = "select" | "text" | "number" | "yes_no" | "multi_text"

export interface Question {
  id: number
  category: string
  question: string
  required: boolean
  type: QuestionType
  conditional_on: number | null
  options?: QuestionOption[]
}

export interface QuestionOption {
  id: string
  question_id: number
  option_text: string
  option_value: string
}

export interface UserResponse {
  question_id: number
  response: string
}

export async function getQuestionnaire(): Promise<Question[]> {
  const supabase = getSupabaseServerClient()

  // Get all questions
  const { data: questions, error } = await supabase.from("questionnaire").select("*").order("id")

  if (error) {
    console.error("Error fetching questionnaire:", error)
    return []
  }

  // Get all options
  const { data: options, error: optionsError } = await supabase.from("question_options").select("*")

  if (optionsError) {
    console.error("Error fetching question options:", optionsError)
    return questions || []
  }

  // Attach options to their respective questions
  const questionsWithOptions = questions?.map((question) => {
    const questionOptions = options?.filter((option) => option.question_id === question.id) || []
    return {
      ...question,
      options: questionOptions,
    }
  })

  return questionsWithOptions || []
}

export async function getUserResponses(userId: string): Promise<UserResponse[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("user_responses").select("question_id, response").eq("user_id", userId)

  if (error) {
    console.error("Error fetching user responses:", error)
    return []
  }

  return data || []
}

export async function saveUserResponses(userId: string, responses: UserResponse[]): Promise<boolean> {
  const supabase = getSupabaseServerClient()

  // Prepare the data for upsert
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
    console.error("Error saving user responses:", error)
    return false
  }

  return true
}
