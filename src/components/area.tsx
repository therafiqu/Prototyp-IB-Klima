import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { serviceRegions, siteConfig } from "@/lib/site";
import { cn, interactiveCardClass } from "@/lib/styles";

export function Area() {
  return (
    <section id="obszar" aria-labelledby="obszar-tytul" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
            Obszar działania
          </p>
          <h2
            id="obszar-tytul"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Montaż klimatyzacji w całej Małopolsce
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            IB-Klima ma siedzibę w Krakowie i dojeżdża z montażem oraz serwisem klimatyzacji na teren
            całego województwa małopolskiego. Obsługujemy domy i firmy — od aglomeracji krakowskiej po
            Tarnów, Sądecczyznę i Podhale.
          </p>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {serviceRegions.map((region) => (
            <StaggerItem key={region.name} as="li" className="h-full">
              <article
                className={cn(
                  "h-full rounded-3xl border border-line bg-card p-6 shadow-card dark:shadow-card-dark",
                  interactiveCardClass,
                )}
              >
                <h3 className="text-lg font-semibold text-foreground">{region.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{region.places.join(", ")}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8" delay={0.12}>
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            Nie ma Twojej miejscowości na liście? Zadzwoń — obsługujemy całe województwo małopolskie.
            Adres siedziby: {siteConfig.street}, {siteConfig.postalCode} {siteConfig.city}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
