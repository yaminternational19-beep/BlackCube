import type { Metadata } from "next";
import "./globals.css";


const baseUrl = "https://blackcube.ae";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "BlackCube Solutions LLC - AI & Software Company",
  description: "BlackCube provides AI, automation, and software solutions.",
  keywords: [
    "digital transformation",
    "digital transformation UAE",
    "Dubai",
    "UAE",
    "web development",
    "mobile app development",
    "cloud migration",
    "UX",
    "UI",
    "digital strategy",
    "IT consulting",
    "enterprise software",
  ],
  authors: [{ name: "BlackCube Solutions LLC", url: baseUrl }],
  creator: "BlackCube Solutions LLC",
  publisher: "BlackCube Solutions LLC",
  manifest: "/manifest.json",
  openGraph: {
    title: "BlackCube Solutions LLC - AI & Software Company",
    description: "BlackCube provides AI, automation, and software solutions.",
    url: baseUrl,
    type: "website",
    locale: "en_US",
    siteName: "BlackCube Solutions LLC",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BlackCube Solutions LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackCube Solutions LLC - AI & Software Company",
    description: "BlackCube provides AI, automation, and software solutions.",
    creator: "@blackcubesolutions",
    site: "@blackcubesolutions",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  verification: {
    google: "YOUR_ACTUAL_GOOGLE_VERIFICATION_CODE", // Replace with actual code from Google Search Console
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BlackCube Solutions LLC",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Leading IT solutions provider in Dubai, UAE offering web development, mobile apps, UI/UX design, digital marketing, and cloud solutions by BlackCube Solutions LLC.",
    "sameAs": [
      "https://www.facebook.com/blackcubesolutions",
      "https://www.linkedin.com/company/blackcubesolutions",
      "https://twitter.com/blackcubesolutions",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+971-XXXXXXXXX",
      "email": "contact@blackcube.ae",
      "areaServed": "AE",
      "availableLanguage": ["en"],
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dubai, UAE",
      "addressCountry": "AE",
    },
  };

  return (
    <html lang="en">
      <body className="antialiased">
        {/* Organization JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
