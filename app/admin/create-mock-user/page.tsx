"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createMockUser } from "@/lib/create-mock-user"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function CreateMockUserPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  const handleCreateMockUser = async () => {
    setIsLoading(true)
    try {
      const result = await createMockUser()
      setResult(result)
    } catch (error) {
      console.error("Error creating mock user:", error)
      setResult({ success: false, error: "Unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Mock User</CardTitle>
          <CardDescription>
            Create a mock user account for demonstration purposes with the following credentials:
            <ul className="mt-2 list-disc list-inside">
              <li>Email: hofhackathon@nyu.edu</li>
              <li>Password: HelloWorld</li>
              <li>Name: HOF Hackathon</li>
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result && (
            <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{result.success ? result.message : result.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateMockUser} disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Mock User"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
