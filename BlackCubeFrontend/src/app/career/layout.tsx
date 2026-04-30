import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at BlackCube Solutions LLC - Join Our Team",
  description: "Explore career opportunities at BlackCube Solutions LLC. Join our team of experts in AI, software development, and digital transformation.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/career",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
