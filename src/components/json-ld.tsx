import { faqs, processSteps, servicePlaces, services, siteConfig } from "@/lib/site";

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd() {
  const businessId = `${siteConfig.url}/#firma`;
  const websiteId = `${siteConfig.url}/#witryna`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": businessId,
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.phoneE164,
        image: `${siteConfig.url}/opengraph-image`,
        logo: `${siteConfig.url}/icon`,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.street,
          postalCode: siteConfig.postalCode,
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.region,
          addressCountry: "PL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: siteConfig.region,
            containedInPlace: { "@type": "Country", name: "Polska" },
          },
          ...servicePlaces.map((name) => ({
            "@type": "City",
            name,
            containedInPlace: { "@type": "AdministrativeArea", name: siteConfig.region },
          })),
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Montaż i serwis klimatyzacji",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.text,
              serviceType: service.title,
              areaServed: siteConfig.region,
              provider: { "@id": businessId },
            },
          })),
        },
        makesOffer: {
          "@type": "Offer",
          name: "Montaż klimatyzacji",
          priceCurrency: "PLN",
          areaServed: siteConfig.region,
          description: siteConfig.priceDisclaimer.replace(/^\*\s*/, ""),
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "PLN",
            minPrice: 1999,
            description: siteConfig.priceDisclaimer.replace(/^\*\s*/, ""),
          },
        },
        priceRange: "od 1999 PLN",
        currenciesAccepted: "PLN",
        taxID: siteConfig.nip,
        knowsAbout: [
          "Montaż klimatyzacji",
          "Serwis klimatyzacji",
          "Klimatyzacja ścienna",
          "Klimatyzacja kasetonowa",
          "Klimatyzacja kanałowa",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "pl-PL",
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#strona`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "pl-PL",
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
        primaryImageOfPage: `${siteConfig.url}/opengraph-image`,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#pytania`,
        url: `${siteConfig.url}/#pytania`,
        inLanguage: "pl-PL",
        isPartOf: { "@id": websiteId },
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${siteConfig.url}/#proces`,
        name: "Jak wygląda montaż klimatyzacji w IB-Klima",
        description: "Pięć kroków od pierwszego kontaktu do uruchomienia klimatyzacji w Małopolsce.",
        inLanguage: "pl-PL",
        step: processSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.text,
          url: `${siteConfig.url}/#proces`,
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  );
}
