import { pageApi } from "@/lib/api";
import ServicesClient from "@/components/pages/ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlackCube Solutions LLC Services - AI, Automation, and Custom Software",
  description: "Explore BlackCube Solutions LLC's expert services in AI, custom software development, mobile apps, and automation solutions.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/services",
  },
};

export default async function ServicesPage() {
  let initialData = null;
  
  try {
    const res = await pageApi.get('services');
    if (res.success) {
      initialData = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch initial data for Services Page:", error);
  }

  return <ServicesClient initialData={initialData} />;
}