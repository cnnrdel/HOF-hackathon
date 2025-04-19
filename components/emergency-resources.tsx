import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { PhoneCall } from "lucide-react"

// Changed to default export
export default function EmergencyResources() {
  const emergencyContacts = [
    {
      name: "NYC Well Mental Health Crisis",
      phone: "888-692-9355",
      description: "24/7 mental health support",
    },
    {
      name: "NYC DHS Housing/Shelter",
      phone: "800-994-6494",
      description: "Emergency housing assistance",
    },
    {
      name: "Safe Horizon Domestic Violence",
      phone: "800-621-4673",
      description: "24/7 domestic violence support",
    },
    {
      name: "NYC 311",
      phone: "311",
      description: "General city services assistance",
    },
  ]

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="p-3">
        <CardTitle className="text-sm text-yellow-800 mb-2 flex items-center gap-1">
          <PhoneCall className="h-3 w-3" />
          Emergency Resources
        </CardTitle>
        <div className="space-y-2">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="text-xs">
              <div className="font-medium">{contact.name}</div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{contact.description}</span>
                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                  {contact.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
