import { pageApi } from "@/lib/api";
import HomeClient from "@/components/pages/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlackCube Solutions LLC - AI & Software Company",
  description: "BlackCube Solutions LLC provides AI, automation, and software solutions.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/",
  },
};

export default async function HomePage() {
  let initialData = null;
  
  try {
    const res = await pageApi.get('home');
    if (res.success) {
      initialData = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch initial data for Home Page:", error);
  }

  return <HomeClient initialData={initialData} />;
}
