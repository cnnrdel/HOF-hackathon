"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MessageCircle, Send, AlertTriangle, X } from "lucide-react"
import EmergencyResources from "./emergency-resources"

// Changed to default export
export default function ChatbotWidget({ isOpenExternal = false, onClose = () => {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAIUnavailable, setIsAIUnavailable] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Add this useEffect to respond to external open requests
  useEffect(() => {
    if (isOpenExternal) {
      setIsOpen(true)
    }
  }, [isOpenExternal])

  // Update the close handler to call the onClose callback
  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  // Simplified chat handling without the AI SDK
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call the API with error handling
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      // Parse the JSON response with error handling
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError)
        throw new Error("Invalid response format from server")
      }

      if (data.isAIUnavailable) {
        setIsAIUnavailable(true)
      }

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "Sorry, I couldn't generate a response. Please try again.",
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      setIsAIUnavailable(true)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Please try again later or use the emergency contacts.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Quick prompt suggestions
  const quickPrompts = [
    "I need emergency housing",
    "Where can I find food assistance?",
    "Mental health resources",
    "Healthcare for uninsured",
  ]

  // Function to detect if a message contains emergency keywords
  const containsEmergencyKeywords = (message: string) => {
    const emergencyKeywords = [
      "suicide",
      "kill myself",
      "want to die",
      "end my life",
      "domestic violence",
      "abuse",
      "emergency",
    ]
    return emergencyKeywords.some((keyword) => message.toLowerCase().includes(keyword))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Support Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {isAIUnavailable && (
            <div className="mx-4 mb-2 p-2 bg-yellow-50 text-yellow-800 rounded-md flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <p>
                AI assistance is temporarily unavailable. Please try again later or use the emergency contacts below.
              </p>
            </div>
          )}

          <ScrollArea className="h-[300px] px-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">
                <p className="mb-4">How can I help you today?</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs justify-start h-auto py-2 px-3"
                      onClick={() => {
                        setInput(prompt)
                        setTimeout(() => {
                          const form = document.getElementById("chat-form") as HTMLFormElement
                          if (form) form.requestSubmit()
                        }, 100)
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => {
                const isUser = message.role === "user"
                const showEmergencyResources = isUser && containsEmergencyKeywords(message.content)

                return (
                  <div key={index} className="mb-4">
                    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
                      {!isUser && (
                        <Avatar className="h-8 w-8">
                          <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-medium">
                            AI
                          </div>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        {message.content}
                      </div>
                      {isUser && (
                        <Avatar className="h-8 w-8">
                          <div className="bg-secondary text-secondary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-medium">
                            You
                          </div>
                        </Avatar>
                      )}
                    </div>

                    {showEmergencyResources && (
                      <div className="mt-2 mb-4">
                        <EmergencyResources />
                      </div>
                    )}
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          <CardFooter className="p-4 pt-2">
            <form id="chat-form" onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input placeholder="Type your message..." value={input} onChange={handleInputChange} className="flex-1" />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
              <MessageCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-64">
            <p className="text-sm">
              Need assistance with housing, healthcare, or other resources? Chat with our support assistant.
            </p>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
