import { faqs, processSteps, servicePlaces, serviceRegions, services, siteConfig } from "@/lib/site";

export function GET() {
  const regions = serviceRegions
    .map((region) => `- ${region.name}: ${region.places.join(", ")}`)
    .join("\n");

  const serviceLines = services.map((service) => `- ${service.title}: ${service.text}`).join("\n");
  const steps = processSteps.map((step, index) => `${index + 1}. ${step.title} — ${step.text}`).join("\n");
  const answers = faqs.map((item) => `### ${item.question}\n${item.answer}`).join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

IB-Klima montuje i serwisuje klimatyzację dla domów i firm w całym województwie małopolskim. Siedziba: ${siteConfig.street}, ${siteConfig.postalCode} ${siteConfig.city}. NIP: ${siteConfig.nip}.

## Kontakt
- Telefon: ${siteConfig.phoneE164}
- Strona: ${siteConfig.url}
- Adres: ${siteConfig.street}, ${siteConfig.postalCode} ${siteConfig.city}, Polska
- Obszar: ${siteConfig.region}

## Usługi
${serviceLines}

## Cena
Montaż od 1999 PLN. Cena dotyczy standardowego montażu jednostki ściennej bez urządzenia klimatyzacyjnego. Ostateczna cena zależy od zakresu prac i jest podawana po darmowej wycenie na miejscu.

## Obszar działania
Całe województwo małopolskie. Miejscowości, do których dojeżdżamy, to między innymi: ${servicePlaces.join(", ")}.

${regions}

## Jak wygląda współpraca
${steps}

## Pytania i odpowiedzi
${answers}

## Strony
- [Strona główna](${siteConfig.url}): montaż i serwis klimatyzacji w Małopolsce
- [Polityka prywatności](${siteConfig.url}/polityka-prywatnosci): zasady przetwarzania danych z formularza
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
