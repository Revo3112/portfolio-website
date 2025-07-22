import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revo Rahmat - Full-Stack Developer & BASIC Founder",
  description: "Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript. Improved database performance by 25% and impact analysis accuracy by 90% using LLMs. Founded BASIC, organizing blockchain hackathons.",
  keywords: "Revo Rahmat, Full-Stack Developer, React, Laravel, Python, SQL, JavaScript, Blockchain, BASIC, PKM-KC VISTA, AI, Machine Learning, Indonesia",
  authors: [{ name: "Revo Rahmat" }],
  openGraph: {
    title: "Revo Rahmat - Full-Stack Developer & BASIC Founder",
    description: "Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript. Founded BASIC, organizing blockchain hackathons.",
    type: "website",
    locale: "en_US",
    url: "https://revorahmat.dev",
    images: [
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "Revo Rahmat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revo Rahmat - Full-Stack Developer & BASIC Founder",
    description: "Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript. Founded BASIC, organizing blockchain hackathons.",
    images: ["/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
