import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RouteTracker from "@/components/shared/RouteTracker";
import Analytics from "@/components/shared/Analytics";
import Script from "next/script";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltoolkit.org").replace(/\/$/, "");
const base = new URL(siteUrl);
const contactEmail = "amrzahir32@gmail.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: base,
  title: {
    default: "AllToolkit — 120 Free Online Tools for Everyday Tasks",
    template: "%s | AllToolkit",
  },
  description:
    "Use 120 free online tools for PDFs, images, studying, writing, development, calculators and everyday productivity. Fast, mobile-friendly and browser-based.",
  applicationName: "AllToolkit",
  authors: [{ name: "AllToolkit", url: siteUrl }],
  creator: "AllToolkit",
  publisher: "AllToolkit",
  category: "productivity",
  keywords: [
    "free online tools",
    "student tools",
    "PDF tools",
    "image tools",
    "developer tools",
    "calculators",
    "browser tools",
    "productivity tools",
  ],
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: "AllToolkit",
    title: "AllToolkit — 120 Free Online Tools",
    description: "Fast, private and mobile-friendly tools for everyday work.",
    url: siteUrl,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AllToolkit free online tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllToolkit — 120 Free Online Tools",
    description: "Fast, private and mobile-friendly browser tools for everyday work.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AllToolkit",
  url: siteUrl,
  description:
    "Free browser-based tools for PDFs, images, students, developers, writing and everyday productivity.",
  inLanguage: "en",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AllToolkit",
  url: siteUrl,
  email: contactEmail,
  logo: `${siteUrl}/logo.png`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          />
        ) : null}
        <Analytics />
        <RouteTracker />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
