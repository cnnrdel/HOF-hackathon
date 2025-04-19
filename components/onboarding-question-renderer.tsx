"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Question } from "@/lib/questionnaire"

interface OnboardingQuestionRendererProps {
  question: Question
  value: string
  onChange: (value: string) => void
}

export default function OnboardingQuestionRenderer({ question, value, onChange }: OnboardingQuestionRendererProps) {
  // Render different input types based on question type
  const renderQuestionInput = () => {
    switch (question.type) {
      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.id} value={option.option_value}>
                  {option.option_text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "text":
        return <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter your answer" />

      case "number":
        return (
          <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter a number" />
        )

      case "yes_no":
        return (
          <RadioGroup value={value} onValueChange={onChange} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`}>No</Label>
            </div>
          </RadioGroup>
        )

      case "multi_text":
        return (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your answer (you can list multiple items)"
            className="min-h-[100px]"
          />
        )

      default:
        return <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter your answer" />
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`question-${question.id}`} className="flex items-start">
        <span>{question.question}</span>
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderQuestionInput()}
    </div>
  )
}
