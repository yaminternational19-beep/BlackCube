import { pageApi } from "@/lib/api";
import AboutClient from "@/components/pages/AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BlackCube Solutions LLC - Leading AI & Software Solutions Provider",
  description: "Learn about BlackCube Solutions LLC, our mission, vision, and the team behind our innovative AI and software solutions.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/about",
  },
};

export default async function AboutPage() {
  let initialData = null;
  
  try {
    const res = await pageApi.get('about');
    if (res.success) {
      initialData = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch initial data for About Page:", error);
  }

  return <AboutClient initialData={initialData} />;
}
