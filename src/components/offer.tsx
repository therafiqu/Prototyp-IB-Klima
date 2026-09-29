import { AirVent, ClipboardCheck, ShieldCheck } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import montazImage from "@/images/montaz.jpg";
import serwisImage from "@/images/serwis.jpg";
import wycenaImage from "@/images/wycena.jpg";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { services, siteConfig } from "@/lib/site";
import { cn, interactiveCardClass, primaryButtonClass } from "@/lib/styles";

const visuals: Record<(typeof services)[number]["id"], { icon: LucideIcon; image: StaticImageData; alt: string }> = {
  montaz: {
    icon: AirVent,
    image: montazImage,
    alt: "Klimatyzator ścienny zamontowany w nowoczesnym wnętrzu",
  },
  serwis: {
    icon: ShieldCheck,
    image: serwisImage,
    alt: "Jednostka ścienna klimatyzacji przygotowana do przeglądu",
  },
  wycena: {
    icon: ClipboardCheck,
    image: wycenaImage,
    alt: "Nowoczesny salon z nawiewami klimatyzacji kanałowej",
  },
};

const offers = services.map((service) => ({ ...service, ...visuals[service.id] }));

export function Offer() {
  return (
    <section id="oferta" aria-labelledby="oferta-tytul" className="bg-surface-muted py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
            Oferta
          </p>
          <h2
            id="oferta-tytul"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Montaż i serwis klimatyzacji
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            IB-Klima wykonuje montaż i serwis klimatyzacji na terenie całej Małopolski. Dobieramy
            rozwiązanie do domu i firmy — jednostki ścienne, kasetonowe i kanałowe, bez ukrytych
            kosztów.
          </p>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {offers.map((offer) => (
            <StaggerItem key={offer.title} as="li" className="h-full">
              <article
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card dark:shadow-card-dark",
                  interactiveCardClass,
                )}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="card-parallax absolute -inset-y-[22%] inset-x-0">
                    <Image
                      src={offer.image}
                      alt={offer.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  </div>
                  <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#1565C0] shadow-md transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-lg">
                    <offer.icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-foreground">{offer.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{offer.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#12375c] px-6 py-10 text-white shadow-card md:px-12 md:py-12">
            <div
              className="ambient-drift pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#1E88E5]/30 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{siteConfig.priceLabel}</h3>
                <p className="mt-3 text-white/75">
                  Umów darmową wycenę na terenie całej Małopolski. Oddzwonimy i ustalimy termin.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{siteConfig.priceNote}</p>
              </div>
              <a href="#formularz" className={`${primaryButtonClass} shrink-0 px-8 text-lg`}>
                {siteConfig.priceLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
