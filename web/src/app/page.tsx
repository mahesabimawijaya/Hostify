"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/section/HeroSection";
import PricingSection from "@/components/section/PricingSection";
import ServiceSection from "@/components/section/ServiceSection";
import WhyUsSection from "@/components/section/WhyUsSection";
import Loading from "@/components/ui/Loading";
import "./globals.css";
import { fetchData } from "@/lib/axios";
import {
  IHeroSection,
  IPricingSection,
  IServiceSection,
  IWhyUsSection,
  PurpleAttributes,
} from "@/types/asset";
import { useEffect, useState } from "react";

export default function Home() {
  const [asset, setAsset] = useState<PurpleAttributes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetchData("cms", "landing-page");
        setAsset(res.data.attributes);
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAsset();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <HeroSection heroSection={asset?.heroSection as IHeroSection} />
      <WhyUsSection whyUsSection={asset?.whyUsSection as IWhyUsSection} />
      <PricingSection
        pricingSection={asset?.pricingSection as IPricingSection}
      />
      <ServiceSection
        serviceSection={asset?.serviceSection as IServiceSection}
      />
      <Footer />
    </>
  );
}
