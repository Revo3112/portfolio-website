"use client";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://revo3112.vercel.app/#person",
    "name": "Revo Rahmat",
    "givenName": "Revo",
    "familyName": "Rahmat",
    "alternateName": ["Revo3112", "Revo Rahmat Developer"],
    "description": "Experienced Full Stack Developer & AI/ML Engineer specializing in Web3, Blockchain, and modern web technologies. PKM-KC Winner, IEEE Published Researcher, BASIC Blockchain Community Founder, Teaching Assistant at Universitas Pembangunan Jaya.",
    "url": "https://revo3112.vercel.app",
    "image": [
      "https://revo3112.vercel.app/images/profile.jpg",
      "https://revo3112.vercel.app/images/Profile.png"
    ],
    "sameAs": [
      "https://github.com/Revo3112",
      "https://linkedin.com/in/revorahmat",
      "https://revo3112.vercel.app"
    ],
    "jobTitle": [
      "Full Stack Developer",
      "AI/ML Engineer",
      "Web3 Developer",
      "Blockchain Expert",
      "Teaching Assistant"
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Maxy Academy",
        "url": "https://maxyacademy.com",
        "description": "Fullstack Developer Sep 2024 - Jan 2025"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Universitas Pembangunan Jaya",
        "url": "https://upj.ac.id",
        "description": "Teaching Assistant & Web Developer"
      }
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Universitas Pembangunan Jaya",
      "url": "https://upj.ac.id"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "Indonesia"
    },
    "email": "revorahmat@gmail.com",
    "birthPlace": "Jakarta, Indonesia",
    "nationality": "Indonesian",
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "Indonesian",
        "alternateName": "Bahasa Indonesia"
      },
      {
        "@type": "Language",
        "name": "English"
      }
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Full Stack Developer",
        "description": "Developing full-stack web applications using React, Laravel, Python, and modern technologies",
        "skills": ["React", "Laravel", "Python", "JavaScript", "TypeScript", "SQL", "NoSQL"]
      },
      {
        "@type": "Occupation",
        "name": "AI/ML Engineer",
        "description": "Developing AI and machine learning solutions for real-world applications",
        "skills": ["Machine Learning", "Computer Vision", "AI", "Python", "TensorFlow", "PyTorch"]
      },
      {
        "@type": "Occupation",
        "name": "Web3 Developer",
        "description": "Building blockchain and Web3 applications, smart contracts, and DeFi solutions",
        "skills": ["Blockchain", "Smart Contracts", "Web3", "Solidity", "DeFi", "NFT"]
      }
    ],
    "award": [
      "PKM-KC (Program Kreativitas Mahasiswa - Karsa Cipta) Winner for VISTA Project",
      "Highest GPA Award (twice) - 3.92 GPA at Universitas Pembangunan Jaya",
      "Top 10 Finalist - Indonesia Hacker House hackathon with Manta",
      "IEEE Published Researcher",
      "Copyright Registration for VISTA (EC00202486481)"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "BASIC Blockchain Community",
        "description": "Founder of blockchain community partnered with Manta, Xellar, Lisk, Educhain, and Mancer"
      },
      {
        "@type": "EducationalOrganization",
        "name": "IEEE",
        "description": "Published researcher in IEEE Xplore"
      }
    ],
    "knowsAbout": [
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Web3 Technology",
      "Blockchain Development",
      "Smart Contracts",
      "React.js",
      "Laravel",
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL Database",
      "NoSQL Database",
      "API Development",
      "Cybersecurity",
      "IoT Development",
      "Embedded Systems",
      "Arduino",
      "Raspberry Pi",
      "Git Version Control",
      "Agile Methodology",
      "Database Optimization",
      "Teaching",
      "Mentoring"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://revo3112.vercel.app/#website",
    "url": "https://revo3112.vercel.app",
    "name": "Revo Rahmat - Full Stack Developer & AI/ML Engineer Portfolio",
    "description": "Professional portfolio showcasing innovative projects in Web3, AI/ML, and modern web development by Revo Rahmat",
    "publisher": {
      "@id": "https://revo3112.vercel.app/#person"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://revo3112.vercel.app/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US",
    "copyrightYear": 2025,
    "copyrightHolder": {
      "@id": "https://revo3112.vercel.app/#person"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://revo3112.vercel.app/#organization",
    "name": "BASIC Blockchain Community",
    "description": "Blockchain community founded by Revo Rahmat, partnered with leading Web3 companies",
    "founder": {
      "@id": "https://revo3112.vercel.app/#person"
    },
    "foundingDate": "2024",
    "url": "https://revo3112.vercel.app",
    "sameAs": [
      "https://github.com/Revo3112"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Manta Network"
      },
      {
        "@type": "Organization",
        "name": "Xellar"
      },
      {
        "@type": "Organization",
        "name": "Lisk"
      },
      {
        "@type": "Organization",
        "name": "Educhain"
      },
      {
        "@type": "Organization",
        "name": "Mancer"
      }
    ]
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://revo3112.vercel.app/#portfolio",
    "name": "Revo Rahmat Developer Portfolio",
    "description": "Comprehensive portfolio showcasing Full Stack Development, AI/ML Engineering, and Web3 projects",
    "creator": {
      "@id": "https://revo3112.vercel.app/#person"
    },
    "dateCreated": "2024-01-01",
    "dateModified": "2025-01-23",
    "url": "https://revo3112.vercel.app",
    "image": "https://revo3112.vercel.app/images/Profile.png",
    "keywords": [
      "Full Stack Developer Portfolio",
      "AI ML Engineer",
      "Web3 Developer",
      "Blockchain Expert",
      "React Developer",
      "Laravel Expert",
      "Python Developer",
      "JavaScript Expert",
      "Next.js Portfolio",
      "TypeScript Developer"
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Full Stack Development",
        "description": "Modern web application development using React, Laravel, Python"
      },
      {
        "@type": "Thing",
        "name": "AI/ML Engineering",
        "description": "Artificial Intelligence and Machine Learning solutions development"
      },
      {
        "@type": "Thing",
        "name": "Web3 Development",
        "description": "Blockchain applications and smart contracts development"
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://revo3112.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://revo3112.vercel.app/#overview"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Experience",
        "item": "https://revo3112.vercel.app/#experience"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Skills",
        "item": "https://revo3112.vercel.app/#skills"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Projects",
        "item": "https://revo3112.vercel.app/#projects"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contact",
        "item": "https://revo3112.vercel.app/#contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
