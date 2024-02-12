import Providers from "@/providers/providers"
import "./globals.css"
import type { Metadata } from "next"
import i18nConfig from "@/../i18nConfig"
import { dir } from "i18next"
import { montserrat } from "@/common/fonts"

export const metadata: Metadata = {
  title: "Sora",
  applicationName: "Sora",
  authors: [{ name: "Secre", url: "https://github.com/shysecre" }],
  description:
    "Sora - service that helps you manage your channel points rewards on twitch!",
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

export function generateStaticParams() {
  return i18nConfig.locales.map((lng: string) => ({ lng }))
}

type Props = Readonly<{
  children: React.ReactNode
  params: { lng: string }
}>

export default function RootLayout({ children, params }: Props) {
  return (
    <html
      lang={params.lng}
      dir={dir(params.lng)}
      className="no-scrollbar overflow-hidden"
    >
      <Providers>
        <body className={montserrat.className}>{children}</body>
      </Providers>
    </html>
  )
}
