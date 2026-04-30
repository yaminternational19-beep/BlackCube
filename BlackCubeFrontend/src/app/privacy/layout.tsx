import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - BlackCube Solutions LLC",
  description: "Read our privacy policy to understand how BlackCube Solutions LLC collects, uses, and protects your personal data.",
  robots: "noindex, follow",
  alternates: {
    canonical: "https://blackcube.ae/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
