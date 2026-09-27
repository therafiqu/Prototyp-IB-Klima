import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/footer";
import { HashScroll } from "@/components/hash-scroll";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | IB-Klima",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Klimatyzacja",
  keywords: [
    "montaż klimatyzacji Małopolska",
    "montaż klimatyzacji Kraków",
    "serwis klimatyzacji Małopolska",
    "klimatyzacja Kraków",
    "wycena klimatyzacji",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "PL-12",
    "geo.placename": "Kraków, Małopolska",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning className={montserrat.variable}>
      <body className="min-h-screen bg-surface font-sans text-foreground antialiased">
        <Providers>
          <div className="scroll-progress" aria-hidden />
          <JsonLd />
          <HashScroll />
          <a
            href="#tresc"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
          >
            Przejdź do treści
          </a>
          <Header />
          <main id="tresc">{children}</main>
          <Footer />
          <MobileCallBar />
        </Providers>
      </body>
    </html>
  );
}
