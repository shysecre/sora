import Providers from "@/components/providers"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { languages } from "@/i18n/settings"

const montserrat = Montserrat({
  weight: ["500"],
  subsets: ["cyrillic-ext", "latin-ext"],
})

export const metadata: Metadata = {
  title: "Sora",
  applicationName: "Sora",
  authors: [{ name: "Secre", url: "https://github.com/shysecre" }],
  description:
    "Sora - service that helps you to manage your channel points rewards on twitch!",
  icons: [
    "https://i.pinimg.com/564x/bf/d3/9a/bfd39a3a620a253a30520ceeb84eacae.jpg",
  ],
  creator: "Secre<github.com/shysecre>",
  keywords: [
    "Twitch",
    "twitch",
    "twitch rewards",
    "custom rewards",
    "channel points rewards",
  ],
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="no-scrollbar overflow-hidden">
      <Providers>
        <body className={montserrat.className}>{children}</body>
      </Providers>
    </html>
  )
}
