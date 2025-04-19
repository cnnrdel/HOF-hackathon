import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import SiteFooter from "@/components/site-footer"
import GlobalLanguageStyles from "@/components/global-language-styles"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CareCompass",
  description: "Access personalized housing and healthcare resources based on your needs",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <GlobalLanguageStyles />
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
