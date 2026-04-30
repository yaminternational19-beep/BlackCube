import { pageApi, portfolioApi } from "@/lib/api";
import PortfolioClient from "@/components/pages/PortfolioClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlackCube Solutions LLC Portfolio - Innovative Software Projects and AI Solutions",
  description: "View BlackCube Solutions LLC's portfolio of successful projects, including AI solutions, web development, and mobile applications.",
  robots: "index, follow",
  alternates: {
    canonical: "https://blackcube.ae/portfolio",
  },
};

export default async function PortfolioPage() {
  let initialData = null;
  let initialPortfolioItems = [];
  
  try {
    const [pageRes, listRes] = await Promise.all([
      pageApi.get('portfolio'),
      portfolioApi.list()
    ]);
    
    if (pageRes.success) initialData = pageRes.data;
    if (listRes.success) initialPortfolioItems = listRes.data;
  } catch (error) {
    console.error("Failed to fetch initial data for Portfolio Page:", error);
  }

  return <PortfolioClient initialData={initialData} initialPortfolioItems={initialPortfolioItems} />;
}