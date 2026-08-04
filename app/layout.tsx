import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RouteTracker from "@/components/shared/RouteTracker";
import Analytics from "@/components/shared/Analytics";
import ScrollManager from "@/components/shared/ScrollManager";
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
    default: "AllToolkit",
    template: "%s | AllToolkit",
  },
  description:
    "Free online tools for PDF files, documents, images, text, calculations, studying and development. Fast, secure and easy to use on any device.",
  applicationName: "AllToolkit",
  authors: [{ name: "AllToolkit", url: siteUrl }],
  creator: "AllToolkit",
  publisher: "AllToolkit",
  category: "productivity",
  keywords: [
    "AllToolkit",
    "free online tools",
    "PDF tools",
    "document converter",
    "image tools",
    "text tools",
    "student tools",
    "developer tools",
    "online calculators",
    "productivity tools",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "AllToolkit",
    title: "AllToolkit",
    description:
      "Free online tools for PDF files, documents, images, text, calculations, studying and development.",
    url: siteUrl,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AllToolkit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllToolkit",
    description:
      "Free online tools for PDF files, documents, images, text, calculations, studying and development.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/alltoolkit-favicon-v3.ico", sizes: "any" },
      { url: "/alltoolkit-icon-v3-48.png", type: "image/png", sizes: "48x48" },
      { url: "/alltoolkit-icon-v3-192.png", type: "image/png", sizes: "192x192" },
      { url: "/alltoolkit-icon-v3-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/alltoolkit-favicon-v3.ico",
    apple: [{ url: "/alltoolkit-apple-icon-v3.png", type: "image/png", sizes: "180x180" }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "AllToolkit",
  alternateName: "All Toolkit",
  url: siteUrl,
  description:
    "Free online tools for PDF files, documents, images, text, calculations, studying and development.",
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#organization` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "AllToolkit",
  url: siteUrl,
  email: contactEmail,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/alltoolkit-icon-v3-512.png`,
    width: 512,
    height: 512,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
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
        <ScrollManager />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
