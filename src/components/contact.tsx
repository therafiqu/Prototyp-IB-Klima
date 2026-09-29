import { Building2, Mail, Map, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { cn, interactiveCardClass } from "@/lib/styles";

const infoCardClass =
  "rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#12375c] p-6 text-white shadow-card ring-1 ring-white/10 sm:p-8";

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="text-sm text-white/65">{label}</p>
        {children}
      </div>
    </li>
  );
}

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-tytul" className="bg-surface-muted py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
            Kontakt
          </p>
          <h2
            id="kontakt-tytul"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Skontaktuj się z nami
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Zadzwoń albo zostaw numer. Oddzwonimy i umówimy darmową wycenę montażu lub serwisu na
            terenie całej Małopolski.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          <Stagger className="flex flex-col gap-6" stagger={0.12}>
            <StaggerItem>
              <div className={cn(infoCardClass, interactiveCardClass)}>
                <h3 className="text-2xl font-bold">Dane kontaktowe</h3>
                <p className="mt-3 text-white/75">
                  Zadzwoń — umówimy bezpłatną wycenę na miejscu, bez zobowiązań.
                </p>
                <ul className="mt-8 space-y-6">
                  <InfoRow icon={Phone} label="Telefon">
                    <a
                      href={siteConfig.phoneHref}
                      className="text-2xl font-bold tracking-tight hover:underline"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </InfoRow>
                  <InfoRow icon={Mail} label="E-mail">
                    <a
                      href={siteConfig.emailHref}
                      className="break-all text-lg font-bold tracking-tight hover:underline sm:text-xl"
                    >
                      {siteConfig.email}
                    </a>
                  </InfoRow>
                  <InfoRow icon={Map} label="Obszar">
                    <p className="font-semibold leading-relaxed">{siteConfig.area}</p>
                  </InfoRow>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className={cn(infoCardClass, interactiveCardClass)}>
                <h3 className="text-2xl font-bold">Dane firmy</h3>
                <p className="mt-3 text-white/75">Dane rejestrowe i adres siedziby.</p>
                <ul className="mt-8 space-y-6">
                  <InfoRow icon={Building2} label="NIP">
                    <p className="text-2xl font-bold tracking-tight">{siteConfig.nip}</p>
                  </InfoRow>
                  <InfoRow icon={MapPin} label="Adres">
                    <p className="font-semibold leading-relaxed">
                      {siteConfig.street}
                      <br />
                      {siteConfig.postalCode} {siteConfig.city}
                    </p>
                  </InfoRow>
                </ul>
              </div>
            </StaggerItem>
          </Stagger>
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
