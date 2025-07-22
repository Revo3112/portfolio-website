import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revo Rahmat - Full Stack Developer",
  description: "Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript. Founder of BASIC blockchain community. Experienced in AI/ML, database optimization, and mentoring.",
  keywords: "Revo Rahmat, Full Stack Developer, React, Laravel, Python, AI, Machine Learning, Blockchain, Indonesia",
  authors: [{ name: "Revo Rahmat" }],
  openGraph: {
    title: "Revo Rahmat - Full Stack Developer",
    description: "Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript.",
    type: "website",
    locale: "en_US",
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
    title: "Revo Rahmat - Full Stack Developer",
    description: "Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript.",
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
