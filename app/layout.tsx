import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SalesPop } from "@/components/SalesPop";
import { StickyHeader } from "@/components/StickyHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firehouse Apparel | Built for First Responders",
  description:
    "Premium apparel inspired by fire, rescue, and service professionals. Durable everyday tees with station-pride design language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StickyHeader />
        {children}
        <SalesPop />
      </body>
    </html>
  );
}
