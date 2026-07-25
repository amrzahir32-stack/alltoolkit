import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedTools from "@/components/home/FeaturedTools";
import Categories from "@/components/home/Categories";
import WhyAllToolkit from "@/components/home/WhyAllToolkit";
import PersonalTools from "@/components/home/PersonalTools";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT} format="horizontal" />
      </div>
      <PersonalTools />
      <FeaturedTools />
      <Categories />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_MIDDLE_SLOT} format="horizontal" />
      </div>
      <WhyAllToolkit />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT} format="horizontal" />
      </div>
    </main>
  );
}
