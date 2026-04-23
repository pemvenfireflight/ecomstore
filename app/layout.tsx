import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.defendfreedomindustries.com"),
  title: {
    default: "Defend Freedom Industries | Premium First Responder Apparel",
    template: "%s | Defend Freedom Industries",
  },
  description:
    "Premium apparel built for those who serve and protect — firefighters, police, EMS, and military heroes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-100 text-zinc-900">
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
