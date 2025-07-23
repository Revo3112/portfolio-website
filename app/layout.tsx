import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revo3112 - Full Stack Developer Portfolio",
  description: "Portfolio website showcasing my work as a Full Stack Developer specializing in Web3, AI/ML, and modern web technologies. Explore my projects in blockchain, artificial intelligence, and innovative web applications.",
  keywords: "Full Stack Developer, Web3, Blockchain, AI/ML, React, Next.js, TypeScript, Portfolio, Revo3112",
  authors: [{ name: "Revo3112" }],
  creator: "Revo3112",
  publisher: "Revo3112",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://revo3112.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Revo3112 - Full Stack Developer Portfolio",
    description: "Explore innovative projects in Web3, AI/ML, and modern web development",
    url: "https://revo3112.vercel.app",
    siteName: "Revo3112 Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Revo3112 Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revo3112 - Full Stack Developer Portfolio",
    description: "Explore innovative projects in Web3, AI/ML, and modern web development",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
