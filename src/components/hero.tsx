import { Phone } from "lucide-react";
import Image from "next/image";
import heroImage from "@/images/hero.jpg";
import { siteConfig } from "@/lib/site";
import { primaryButtonClass, secondaryOnDarkClass } from "@/lib/styles";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
      <div className="hero-parallax absolute -inset-y-[14%] inset-x-0">
        <Image
          src={heroImage}
          alt="Nowoczesny salon z zamontowaną klimatyzacją ścienną"
          fill
          priority
          sizes="100vw"
          quality={75}
          placeholder="blur"
          className="hero-media object-cover object-[30%_16%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061828] via-[#061828]/72 to-[#061828]/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061828]/80 via-transparent to-[#061828]/25" />

      <div className="relative z-10 mx-auto w-full max-w-content px-4 pb-28 pt-36 sm:px-6 md:pb-20 md:pt-40">
        <div className="hero-rise max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            <span className="signal-dot h-1.5 w-1.5 rounded-full bg-[#7EC8FF]" aria-hidden />
            {siteConfig.area}
          </p>
          <h1 className="max-w-[16ch] text-balance text-[1.85rem] font-bold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_24px_rgb(6_24_40_/_0.45)] sm:max-w-3xl sm:text-5xl lg:text-6xl">
            Profesjonalny montaż klimatyzacji w całej Małopolsce
          </h1>
          <p className="mt-5 text-lg font-medium text-white/90 sm:text-xl">
            Montaż od 1999&nbsp;zł* • Darmowa wycena • Gwarancja jakości
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#formularz" className={primaryButtonClass}>
              Zamów darmową wycenę
            </a>
            <a href={siteConfig.phoneHref} className={secondaryOnDarkClass}>
              <Phone className="h-5 w-5" aria-hidden />
              Zadzwoń: {siteConfig.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">{siteConfig.priceNote}</p>
        </div>
      </div>
    </section>
  );
}
