import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - BlackCube Solutions LLC",
  description: "Read our terms of service to understand the rules and guidelines for using BlackCube Solutions LLC's services and website.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
