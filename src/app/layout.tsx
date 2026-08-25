import type { Metadata } from "next";
import { Press_Start_2P, Cinzel } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const siteUrl = "https://ielbanbuena.online";
const siteName = "Irvin Elbanbuena";
const title = "Irvin Elbanbuena | Frontend-Focused Fullstack Developer";
const description =
  "Portfolio of Irvin Elbanbuena, a frontend-focused fullstack developer building React, TypeScript, and Next.js applications with FastAPI and PostgreSQL backends.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Irvin Elbanbuena",
  },
  description,
  keywords: [
    "Irvin Elbanbuena",
    "Frontend Developer",
    "Fullstack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer Philippines",
    "Portfolio",
  ],
  authors: [{ name: "Irvin Elbanbuena", url: siteUrl }],
  creator: "Irvin Elbanbuena",
  publisher: "Irvin Elbanbuena",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Irvin Elbanbuena Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixel.variable} ${cinzel.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
