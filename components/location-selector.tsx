"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { availableLocations } from "@/lib/resources-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { Navigation } from "lucide-react"

export default function LocationSelector({ selectedLocation, onLocationChange, className = "" }) {
  const { t } = useLanguage()

  return (
    <div className={`flex items-center ${className}`}>
      <Select value={selectedLocation} onValueChange={onLocationChange}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            <SelectValue placeholder="Select location" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {availableLocations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
