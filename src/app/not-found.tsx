import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { primaryButtonClass } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="rise-in mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 pb-28 pt-32 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Nie znaleziono strony</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Ten adres nie istnieje. Wróć na stronę główną albo zadzwoń — pomożemy z montażem i serwisem.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={primaryButtonClass}>
          Strona główna
        </Link>
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-surface-muted active:scale-[0.98]"
        >
          Zadzwoń: {siteConfig.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
