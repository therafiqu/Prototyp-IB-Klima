import type { Metadata } from "next";
import { Area } from "@/components/area";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Offer } from "@/components/offer";
import { Process } from "@/components/process";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Offer />
      <Area />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
