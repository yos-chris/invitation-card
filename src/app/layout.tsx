import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1st Anniversary · Bali Office · Modern Cancer Hospital Guangzhou",
  description:
    "Premium digital invitation — First Anniversary of the Bali Office, Modern Cancer Hospital Guangzhou / St. Stamford International Medical.",
  keywords: [
    "Modern Cancer Hospital Guangzhou",
    "St. Stamford International Medical",
    "Bali Office Anniversary",
    "Invitation",
  ],
  authors: [{ name: "Modern Cancer Hospital Guangzhou" }],
  icons: {
    icon: "/invitation/logo.png",
  },
  openGraph: {
    title: "1st Anniversary · Bali Office",
    description:
      "We warmly invite you to celebrate the First Anniversary of the Bali Office.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${jakarta.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
