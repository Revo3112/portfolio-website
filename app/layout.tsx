import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "./components/StructuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revo Rahmat - Full Stack Developer & AI/ML Engineer | Web3 Blockchain Expert",
  description: "Experienced Full Stack Developer & AI/ML Engineer specializing in Web3, Blockchain, and modern web technologies. Winner of PKM-KC funding, published IEEE researcher, founder of BASIC blockchain community. Expert in React, Laravel, Python, JavaScript with proven track record of improving database performance by 25% and AI accuracy by 90%. Teaching Assistant at Universitas Pembangunan Jaya with 40+ students mentored.",
  keywords: "Revo Rahmat, Full Stack Developer, AI Machine Learning Engineer, Web3 Developer, Blockchain Expert, React Developer, Laravel Expert, Python Developer, JavaScript, SQL Database Expert, IEEE Published Researcher, PKM-KC Winner, BASIC Founder, Universitas Pembangunan Jaya, Teaching Assistant, Maxy Academy, Computer Vision, VISTA Project, Cybersecurity Expert, IoT Developer, Arduino Raspberry Pi, Embedded Systems, Database Optimization, API Integration, Agile Scrum, Git Version Control, WordPress Developer, Figma UI UX, Object Oriented Programming, Smart Contracts, Cryptocurrency, DeFi, NFT, Blockchain Hackathon, Manta Partner, Xellar Partner, Jakarta Indonesia Developer, Indonesian Tech Talent, PAUD Khairani Developer, Google Classroom Training, Interactive Learning Materials, WhatsApp API Integration, Academic Research Publications, Computer Science Student, Technology Innovation, Open Source Contributor",
  authors: [{ name: "Revo Rahmat", url: "https://revo3112.vercel.app" }],
  creator: "Revo Rahmat",
  publisher: "Revo Rahmat",
  category: "Technology",
  classification: "Portfolio Website",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["revorahmat@gmail.com", "https://github.com/Revo3112"],
    },
  },
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://revo3112.vercel.app"),
  alternates: {
    canonical: "https://revo3112.vercel.app",
    languages: {
      "en-US": "https://revo3112.vercel.app",
      "id-ID": "https://revo3112.vercel.app/id",
    },
    types: {
      "application/rss+xml": "https://revo3112.vercel.app/rss.xml",
    },
  },
  openGraph: {
    title: "Revo Rahmat - Full Stack Developer & AI/ML Engineer | Web3 Blockchain Expert",
    description: "🚀 Experienced Full Stack Developer & AI/ML Engineer from Jakarta, Indonesia. PKM-KC Winner 🏆 | IEEE Published Researcher 📝 | BASIC Blockchain Community Founder 🔗 | Teaching Assistant at Universitas Pembangunan Jaya 🎓 | Expert in React, Laravel, Python, Web3, Computer Vision, IoT & Database Optimization. Proven track record: 25% database performance improvement, 90% AI accuracy enhancement, 40+ students mentored with 80% securing tech roles.",
    url: "https://revo3112.vercel.app",
    siteName: "Revo Rahmat - Full Stack Developer Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Revo Rahmat - Full Stack Developer & AI/ML Engineer Portfolio Preview",
      },
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "Revo Rahmat - Professional Developer Photo",
      },
    ],
    locale: "en_US",
    type: "profile",
    countryName: "Indonesia",
    determiner: "the",
    ttl: 604800,
  },
  twitter: {
    card: "summary_large_image",
    site: "@revorahmat",
    creator: "@revorahmat",
    title: "Revo Rahmat - Full Stack Developer & AI/ML Engineer | Web3 Expert",
    description: "🚀 PKM-KC Winner | IEEE Researcher | BASIC Founder | Teaching Assistant UPJ | Expert in React, Laravel, Python, Web3, AI/ML, Computer Vision | 25% DB Performance ⬆️ | 90% AI Accuracy ⬆️ | Jakarta, Indonesia 🇮🇩",
    images: {
      url: "/og-image.png",
      alt: "Revo Rahmat - Full Stack Developer Portfolio",
    },
  },
  appleWebApp: {
    title: "Revo Rahmat Portfolio",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  applicationName: "Revo Rahmat Portfolio",
  generator: "Next.js",
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Revo Rahmat",
    "application-name": "Revo Rahmat Portfolio",
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#8b5cf6",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nositelinkssearchbox: false,
    notranslate: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Enhanced SEO Meta Tags */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="ICBM" content="-6.2088, 106.8456" />
        <meta name="language" content="en-US" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Revo Rahmat" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Revo Rahmat Portfolio" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="dark light" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/profile.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/og-image.png" as="image" type="image/png" />

        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="//vercel.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />

        {/* Canonical and Alternate Links */}
        <link rel="canonical" href="https://revo3112.vercel.app" />
        <link rel="alternate" href="https://revo3112.vercel.app" hrefLang="en" />
        <link rel="alternate" href="https://revo3112.vercel.app/id" hrefLang="id" />

        {/* Feed Links */}
        <link rel="alternate" type="application/rss+xml" title="Revo Rahmat Portfolio RSS" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Revo Rahmat Portfolio Atom" href="/atom.xml" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* Performance Hints */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <StructuredData />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
