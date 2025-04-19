// Resource data structure
export interface Resource {
  id?: number
  title: string
  description: string
  type: string
  link: string
  phone?: string
  priority?: "high" | "medium" | "low"
  related_questions?: number[]
  show_if_marked?: boolean
  address?: string
  hours?: string
  eligibility?: string
  details?: string
  location: string // Added location field
}

// Available locations for the location selector
export const availableLocations = [
  { id: "nyc", name: "New York City" },
  { id: "boston", name: "Boston" },
  { id: "chicago", name: "Chicago" },
  { id: "la", name: "Los Angeles" },
  { id: "miami", name: "Miami" },
]

// Comprehensive resource database
export const resourcesData = {
  healthcare: [
    {
      id: 1,
      title: "NYC Health + Hospitals",
      description: "City-run hospitals and community clinics offering free or low-cost care.",
      type: "healthcare",
      link: "https://www.nychealthandhospitals.org/locations/",
      priority: "high",
      related_questions: [7, 8, 9, 10],
      show_if_marked: true,
      address: "Various locations throughout NYC",
      hours: "Hours vary by location. Many facilities offer 24/7 emergency services.",
      eligibility: "Services available to all NYC residents regardless of ability to pay or immigration status.",
      details:
        "NYC Health + Hospitals is the largest public healthcare system in the United States. They provide essential inpatient, outpatient, and home-based services to more than one million New Yorkers every year across the city's five boroughs.",
      location: "nyc",
    },
    {
      id: 2,
      title: "NYC Care",
      description: "Healthcare program for NYC residents regardless of immigration status.",
      type: "healthcare",
      link: "https://www.nyccare.nyc/",
      priority: "high",
      related_questions: [5, 7, 8, 10],
      show_if_marked: true,
      address: "Available at all NYC Health + Hospitals locations",
      hours: "Enrollment available during regular business hours",
      eligibility:
        "NYC residents who cannot afford or do not qualify for health insurance, including undocumented immigrants",
      details:
        "NYC Care provides access to primary care, specialty care, medications, and more. Members receive a membership card, access to a primary care provider, and affordable medications.",
      location: "nyc",
    },
    {
      id: 3,
      title: "HRSA Health Center Finder",
      description: "Federally funded health centers offering sliding-scale care.",
      type: "healthcare",
      link: "https://findahealthcenter.hrsa.gov/",
      priority: "medium",
      related_questions: [2, 7, 8],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 4,
      title: "NY State of Health",
      description: "Marketplace for Medicaid and other insurance plans.",
      type: "healthcare",
      link: "https://nystateofhealth.ny.gov/",
      priority: "high",
      related_questions: [7, 9],
      show_if_marked: true,
      location: "nyc",
    },
    {
      id: 5,
      title: "Free Community Clinics",
      description: "Locations offering no-cost or sliding scale healthcare services.",
      type: "healthcare",
      link: "/resources/healthcare/free-clinics",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 6,
      title: "Mental Health Services",
      description: "Counseling, therapy, and crisis intervention resources.",
      type: "healthcare",
      link: "/resources/healthcare/mental-health",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 7,
      title: "Health Insurance Assistance",
      description: "Help applying for Medicaid, Medicare, or marketplace insurance.",
      type: "healthcare",
      link: "/resources/healthcare/insurance",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 8,
      title: "Prescription Assistance Programs",
      description: "Resources to help cover the cost of necessary medications.",
      type: "healthcare",
      link: "/resources/healthcare/prescriptions",
      priority: "medium",
      location: "nyc",
    },
  ],

  food: [
    {
      id: 1,
      title: "NYC Food Help Map",
      description: "Interactive map of food pantries and meal sites in NYC.",
      type: "food",
      link: "https://www.nyc.gov/assets/dsny/contact/services/food-scraps-drop-off/food-assistance.html",
      priority: "high",
      related_questions: [12, 13],
      show_if_marked: true,
      address: "Online resource with locations throughout NYC",
      hours: "24/7 online access; physical locations have varying hours",
      eligibility: "All NYC residents",
      details:
        "The NYC Food Help Map provides an interactive way to find food assistance resources near you. It includes food pantries, soup kitchens, SNAP enrollment centers, and more.",
      location: "nyc",
    },
    {
      id: 2,
      title: "ACCESS HRA (SNAP/WIC)",
      description: "Apply for food benefits like SNAP and WIC online.",
      type: "food",
      link: "https://access.nyc.gov/programs/snap/",
      priority: "high",
      related_questions: [11, 13],
      show_if_marked: true,
      location: "nyc",
    },
    {
      id: 3,
      title: "Food Bank for NYC Pantry Finder",
      description: "Locate nearby pantries and soup kitchens supported by Food Bank for NYC.",
      type: "food",
      link: "https://www.foodbanknyc.org/get-help/",
      priority: "medium",
      related_questions: [12, 13],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 4,
      title: "City Harvest Mobile Markets",
      description: "Free community markets offering fresh produce.",
      type: "food",
      link: "https://www.cityharvest.org/food-map/",
      priority: "medium",
      related_questions: [12, 13],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 5,
      title: "Food Pantries Near You",
      description: "Locations where you can get free groceries and food supplies.",
      type: "food",
      link: "/resources/food/pantries",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 6,
      title: "SNAP Benefits Application",
      description: "Help applying for Supplemental Nutrition Assistance Program (food stamps).",
      type: "food",
      link: "/resources/food/snap",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 7,
      title: "WIC Program for Families",
      description: "Special supplemental nutrition program for Women, Infants, and Children.",
      type: "food",
      link: "/resources/food/wic",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 8,
      title: "Free School Meals for NYC Public School Children",
      description: "Information about free breakfast and lunch programs for all NYC public school students.",
      type: "food",
      link: "https://www.schools.nyc.gov/school-life/food",
      priority: "medium",
      related_questions: [11, 13],
      show_if_marked: true,
      location: "nyc",
    },
    {
      id: 9,
      title: "Map of Food Banks and Soup Kitchens in NYC",
      description: "Interactive map to find food assistance locations throughout New York City.",
      type: "food",
      link: "https://finder.nyc.gov/foodhelp/locations?mView=map",
      priority: "high",
      related_questions: [12, 13],
      show_if_marked: true,
      location: "nyc",
    },
  ],

  housing: [
    {
      id: 1,
      title: "DHS Provider List",
      description: "Comprehensive list of emergency and transitional housing providers in NYC.",
      type: "housing",
      link: "https://www.nyc.gov/assets/dhs/downloads/pdf/dhs-provider-list-2024.pdf",
      priority: "high",
      related_questions: [14, 15, 17],
      show_if_marked: true,
      address: "Multiple locations throughout NYC",
      hours: "Hours vary by provider",
      eligibility: "Individuals and families experiencing homelessness or housing instability",
      details:
        "The Department of Homeless Services (DHS) works with various providers to offer emergency and transitional housing options. Services include shelter, case management, housing placement assistance, and supportive services.",
      location: "nyc",
    },
    {
      id: 2,
      title: "Homebase Centers",
      description: "Eviction prevention and housing stability services.",
      type: "housing",
      link: "https://www.nyc.gov/site/hra/help/homebase.page",
      priority: "high",
      related_questions: [15],
      show_if_marked: true,
      location: "nyc",
    },
    {
      id: 3,
      title: "Safe Horizon",
      description: "Emergency housing and legal services for domestic violence survivors.",
      type: "housing",
      link: "https://www.safehorizon.org/",
      priority: "high",
      related_questions: [16, 17],
      show_if_marked: true,
      location: "nyc",
    },
    {
      id: 4,
      title: "NYC Housing Connect",
      description: "Affordable housing lottery and application portal.",
      type: "housing",
      link: "https://housingconnect.nyc.gov/",
      priority: "medium",
      related_questions: [17],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 5,
      title: "HERRC Centers",
      description: "Temporary housing support for asylum seekers and migrants.",
      type: "housing",
      link: "https://www.nyc.gov/site/immigrants/resources/asylum-seekers.page",
      priority: "high",
      related_questions: [5, 14],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 6,
      title: "Emergency Shelter Program",
      description: "Immediate shelter for individuals and families in crisis.",
      type: "housing",
      link: "/resources/housing/emergency-shelter",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 7,
      title: "Rental Assistance Program",
      description: "Financial help for those struggling to pay rent or facing eviction.",
      type: "housing",
      link: "/resources/housing/rental-assistance",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 8,
      title: "Affordable Housing Directory",
      description: "Listings of subsidized and affordable housing options in your area.",
      type: "housing",
      link: "/resources/housing/affordable-directory",
      priority: "medium",
      location: "nyc",
    },
    {
      id: 9,
      title: "Housing Rights Information",
      description: "Learn about tenant rights, fair housing laws, and legal protections.",
      type: "housing",
      link: "/resources/housing/rights",
      priority: "medium",
      location: "nyc",
    },
  ],

  legal: [
    {
      id: 1,
      title: "ActionNYC",
      description: "Free, safe immigration legal help from the City of New York.",
      type: "legal",
      link: "https://www.nyc.gov/actionnyc",
      priority: "high",
      related_questions: [5],
      show_if_marked: true,
      location: "nyc",
    },
    {
      id: 2,
      title: "NYLAG (New York Legal Assistance Group)",
      description: "Legal help for housing, immigration, and healthcare issues.",
      type: "legal",
      link: "https://nylag.org/",
      priority: "medium",
      related_questions: [5, 15],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 3,
      title: "CUNY Citizenship Now!",
      description: "Free legal services to help you apply for citizenship and other immigration processes.",
      type: "legal",
      link: "https://www.cuny.edu/about/citizenship-now/",
      priority: "medium",
      related_questions: [5],
      show_if_marked: false,
      location: "nyc",
    },
  ],

  emergency: [
    {
      id: 1,
      title: "NYC WELL",
      description: "24/7 mental health and crisis support hotline.",
      type: "emergency",
      link: "https://nycwell.cityofnewyork.us/",
      phone: "1-888-692-9355",
      priority: "high",
      related_questions: [8, 9],
      show_if_marked: false,
      address: "Available by phone, text, and chat",
      hours: "24 hours a day, 7 days a week, 365 days a year",
      eligibility: "All NYC residents",
      details:
        "NYC Well provides free, confidential mental health support to New Yorkers. Trained counselors can provide crisis counseling, peer support, short-term counseling, and assistance in finding ongoing care. Available in multiple languages.",
      location: "nyc",
    },
    {
      id: 2,
      title: "Safe Horizon Hotline",
      description: "Hotline for survivors of domestic violence, trafficking, and other trauma.",
      type: "emergency",
      link: "https://www.safehorizon.org/contact-us/",
      phone: "1-800-621-4673",
      priority: "high",
      related_questions: [16],
      show_if_marked: false,
      location: "nyc",
    },
    {
      id: 3,
      title: "24/7 Housing Crisis Hotline",
      description: "Immediate assistance for those needing shelter tonight.",
      type: "emergency",
      phone: "1-800-555-4567",
      link: "/resources/emergency/housing-hotline",
      priority: "high",
      location: "nyc",
    },
    {
      id: 4,
      title: "Domestic Violence Shelter",
      description: "Safe, confidential housing for those fleeing domestic violence.",
      type: "emergency",
      phone: "1-800-555-7890",
      link: "/resources/emergency/domestic-violence",
      priority: "high",
      location: "nyc",
    },
  ],
}

// Add some sample resources for other locations
export const bostonResources = {
  healthcare: [
    {
      id: 101,
      title: "Boston Medical Center",
      description: "Boston's safety-net hospital providing accessible healthcare to all residents.",
      type: "healthcare",
      link: "https://www.bmc.org/",
      priority: "high",
      location: "boston",
    },
    {
      id: 102,
      title: "Health Care For All",
      description: "Assistance with health insurance enrollment and healthcare access.",
      type: "healthcare",
      link: "https://www.hcfama.org/",
      priority: "medium",
      location: "boston",
    },
  ],
  housing: [
    {
      id: 103,
      title: "Boston Housing Authority",
      description: "Public housing and rental assistance programs for Boston residents.",
      type: "housing",
      link: "https://www.bostonhousing.org/",
      priority: "high",
      location: "boston",
    },
  ],
  food: [
    {
      id: 104,
      title: "Greater Boston Food Bank",
      description: "Food distribution network serving eastern Massachusetts.",
      type: "food",
      link: "https://www.gbfb.org/",
      priority: "high",
      location: "boston",
    },
  ],
  emergency: [
    {
      id: 105,
      title: "Boston Emergency Services Team",
      description: "24/7 mental health crisis services.",
      type: "emergency",
      link: "https://www.boston.gov/departments/recovery-services/recovery-services-resources",
      phone: "1-800-981-4357",
      priority: "high",
      location: "boston",
    },
  ],
}

// Function to get resources for a specific location
export function getResourcesByLocation(location: string) {
  if (location === "boston") {
    return bostonResources
  }

  // Default to NYC resources
  return resourcesData
}
