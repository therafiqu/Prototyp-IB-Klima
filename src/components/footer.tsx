import { Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A2540] text-white dark:bg-[#061828]">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 md:py-16">
        <div>
          <Logo size="footer" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
            Montaż i serwis klimatyzacji w całej Małopolsce. Darmowa wycena i gwarancja jakości.
          </p>
        </div>

        <nav aria-label="Stopka">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">Nawigacja</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className="text-sm font-medium text-white/85 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/polityka-prywatnosci"
                className="text-sm font-medium text-white/85 hover:text-white hover:underline"
              >
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">Kontakt</p>
          <a
            href={siteConfig.phoneHref}
            className="mt-4 inline-flex items-center gap-2 text-lg font-semibold hover:underline"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
          <address className="mt-3 text-sm not-italic leading-relaxed text-white/80">
            {siteConfig.street}
            <br />
            {siteConfig.postalCode} {siteConfig.city}
            <br />
            {siteConfig.region}
          </address>
          <p className="mt-2 text-sm text-white/80">NIP: {siteConfig.nip}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-content space-y-3 px-4 py-6 pb-28 sm:px-6 md:pb-6">
          <p className="text-xs leading-relaxed text-white/60">{siteConfig.priceDisclaimer}</p>
          <p className="text-sm text-white/70">Copyright © 2026 IB-Klima</p>
        </div>
      </div>
    </footer>
  );
}
