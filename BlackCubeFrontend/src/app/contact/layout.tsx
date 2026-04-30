import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BlackCube Solutions LLC - Get in Touch",
  description: "Contact BlackCube Solutions LLC for your next AI or software project. We're here to help with your digital transformation needs.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
