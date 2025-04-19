"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

interface ConfirmationDialogProps {
  title: string
  description: string
  confirmText: string
  cancelText?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  children: React.ReactNode
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}

export default function ConfirmationDialog({
  title,
  description,
  confirmText,
  cancelText,
  variant = "default",
  children,
  onConfirm,
  disabled = false,
}: ConfirmationDialogProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      await onConfirm()
    } catch (error) {
      console.error("Error during confirmation action:", error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button variant={variant} disabled={disabled} onClick={() => setIsOpen(true)}>
        {children}
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>{cancelText || t("common.cancel") || "Cancel"}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleConfirm()
              }}
              disabled={isLoading}
              className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {isLoading ? t("common.loading") || "Loading..." : confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
