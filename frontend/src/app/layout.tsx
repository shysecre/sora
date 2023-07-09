import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sora",
  applicationName: "Sora",
  authors: [{ name: "Secre", url: "https://github.com/shysecre" }],
  description:
    "Sora - service that helps you to manage your channel points rewards on twitch!",
  icons: [
    "https://i.pinimg.com/564x/bf/d3/9a/bfd39a3a620a253a30520ceeb84eacae.jpg",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>{children}</body>
    </html>
  );
}
