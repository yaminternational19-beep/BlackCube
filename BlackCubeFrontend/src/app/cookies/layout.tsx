import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - BlackCube Solutions LLC",
  description: "Read our cookie policy to understand how BlackCube Solutions LLC uses cookies and similar technologies on our website.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/cookies",
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
