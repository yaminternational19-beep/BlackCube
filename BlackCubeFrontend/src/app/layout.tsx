import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://blackcube.ae";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Black Cube Solutions LLC | Digital Transformation Company in UAE",
  description:
    "Black Cube Solutions LLC is a digital transformation company in the UAE delivering web & mobile development, cloud migration, UX/UI, digital strategy, and enterprise software solutions.",
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
  authors: [{ name: "Black Cube Solutions LLC", url: baseUrl }],
  creator: "Black Cube Solutions LLC",
  publisher: "Black Cube Solutions LLC",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Black Cube Solutions LLC | Digital Transformation Company in UAE",
    description:
      "Black Cube Solutions LLC is a digital transformation company in the UAE delivering web & mobile development, cloud migration, UX/UI, digital strategy, and enterprise software solutions.",
    url: baseUrl,
    type: "website",
    locale: "en_US",
    siteName: "Black Cube Solutions",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Black Cube Solutions LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Cube Solutions LLC | Digital Transformation Company in UAE",
    description:
      "Black Cube Solutions LLC is a digital transformation company in the UAE delivering web & mobile development, cloud migration, UX/UI, digital strategy, and enterprise software solutions.",
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
    google: "google-site-verification-code",
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
    "name": "Black Cube Solutions LLC",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Leading IT solutions provider in Dubai, UAE offering web development, mobile apps, UI/UX design, digital marketing, and cloud solutions.",
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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
          <meta name="robots" content="index, follow" />
        <link rel="canonical" href={baseUrl} />
        <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap.xml`} />
        {/* Organization JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href={baseUrl} />
        <link rel="dns-prefetch" href={baseUrl} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
