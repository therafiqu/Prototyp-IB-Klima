import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności IB-Klima. Zasady przetwarzania danych z formularza kontaktowego zgodnie z RODO.",
  alternates: { canonical: "/polityka-prywatnosci" },
  openGraph: { url: "/polityka-prywatnosci" },
};

const sections = [
  { id: "administrator", label: "Administrator danych" },
  { id: "dane", label: "Jakie dane przetwarzamy" },
  { id: "cele", label: "Cele i podstawy prawne" },
  { id: "okres", label: "Okres przechowywania" },
  { id: "odbiorcy", label: "Odbiorcy danych" },
  { id: "transfer", label: "Przekazywanie poza EOG" },
  { id: "prawa", label: "Prawa osób" },
  { id: "dobrowolnosc", label: "Dobrowolność podania danych" },
  { id: "automat", label: "Zautomatyzowane decyzje" },
  { id: "cookies", label: "Cookies i pamięć lokalna" },
  { id: "bezpieczenstwo", label: "Bezpieczeństwo" },
  { id: "zmiany", label: "Zmiany polityki" },
];

export default function PrivacyPage() {
  return (
    <article className="bg-surface pb-28 pt-28 md:pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rise-in">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
            RODO
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Polityka prywatności</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Ta polityka wyjaśnia, w jaki sposób IB-Klima przetwarza dane osobowe osób korzystających
            ze strony i formularza kontaktowego. Obowiązuje od 27 września 2026 r.
          </p>
        </div>

        <nav aria-label="Spis treści" className="mt-8 rounded-3xl border border-line bg-surface-muted p-6">
          <p className="text-sm font-semibold text-foreground">Spis treści</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[#1565C0] dark:text-[#90CAF9]">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:underline">
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10 text-base leading-relaxed text-muted">
          <section id="administrator" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">1. Administrator danych</h2>
            <p className="mt-3">
              Administratorem danych osobowych jest IB-Klima, {siteConfig.street}, {siteConfig.postalCode}{" "}
              {siteConfig.city}, NIP: {siteConfig.nip}.
            </p>
            <p className="mt-3">
              W sprawach danych osobowych można zadzwonić pod numer{" "}
              <a href={siteConfig.phoneHref} className="font-semibold text-[#1565C0] hover:underline dark:text-[#90CAF9]">
                {siteConfig.phoneDisplay}
              </a>{" "}
              albo napisać na adres administratora. Administrator nie wyznaczył inspektora ochrony
              danych.
            </p>
          </section>

          <section id="dane" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">2. Jakie dane przetwarzamy</h2>
            <p className="mt-3">Z formularza kontaktowego przetwarzamy:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>imię i nazwisko,</li>
              <li>numer telefonu,</li>
              <li>typ nieruchomości,</li>
              <li>lokalizację inwestycji, jeśli ją podasz,</li>
              <li>metraż i liczbę pomieszczeń, jeśli je podasz,</li>
              <li>dodatkowe informacje, jeśli je podasz,</li>
              <li>datę zgłoszenia.</li>
            </ul>
            <p className="mt-3">
              Gdy dzwonisz, przetwarzamy numer telefonu oraz informacje, które sam przekażesz w
              rozmowie — na przykład adres montażu albo zakres prac.
            </p>
            <p className="mt-3">
              Serwer strony może zapisywać techniczne logi: adres IP, datę połączenia i podstawowe
              informacje o przeglądarce. Służą one bezpieczeństwu serwisu.
            </p>
            <p className="mt-3">
              Wybrany motyw strony (jasny albo ciemny) zapisuje się lokalnie w przeglądarce
              (localStorage) i nie jest wysyłany do administratora.
            </p>
            <p className="mt-3">Nie zbieramy adresu e-mail i nie prowadzimy newslettera.</p>
          </section>

          <section id="cele" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">3. Cele i podstawy prawne</h2>
            <ul className="mt-3 list-disc space-y-3 pl-5">
              <li>
                Odpowiedź na zgłoszenie, przygotowanie darmowej wyceny i podjęcie działań przed
                zawarciem umowy — art. 6 ust. 1 lit. b RODO.
              </li>
              <li>
                Ustalenie, dochodzenie lub obrona roszczeń oraz bezpieczeństwo strony — prawnie
                uzasadniony interes administratora, art. 6 ust. 1 lit. f RODO.
              </li>
              <li>
                Obowiązki rachunkowe i podatkowe, jeśli dojdzie do umowy — art. 6 ust. 1 lit. c RODO.
              </li>
            </ul>
            <p className="mt-3">
              Numer telefonu wykorzystujemy do kontaktu w sprawie zapytania o montaż lub serwis. Nie
              używamy go do marketingu bez odrębnej podstawy prawnej.
            </p>
          </section>

          <section id="okres" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">4. Okres przechowywania</h2>
            <p className="mt-3">
              Dane z formularza i z rozmowy przechowujemy przez czas potrzebny do obsługi zapytania.
              Jeśli nie dojdzie do współpracy — nie dłużej niż 12 miesięcy od ostatniego kontaktu.
            </p>
            <p className="mt-3">
              Jeśli zawrzemy umowę, dane przechowujemy przez czas jej trwania, a następnie przez
              okres przedawnienia roszczeń wynikający z Kodeksu cywilnego (co do zasady 6 lat, a dla
              roszczeń o świadczenia okresowe oraz związanych z prowadzeniem działalności
              gospodarczej — 3 lata) oraz przez okres wymagany przepisami podatkowymi i o
              rachunkowości, zwykle 5 lat od końca roku kalendarzowego.
            </p>
            <p className="mt-3">Logi techniczne przechowujemy nie dłużej niż 12 miesięcy.</p>
          </section>

          <section id="odbiorcy" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">5. Odbiorcy danych</h2>
            <p className="mt-3">
              Dane mogą otrzymywać podmioty, które przetwarzają je na nasze zlecenie, w szczególności
              dostawca hostingu. Dostęp mają wyłącznie osoby upoważnione i tylko w zakresie
              potrzebnym do obsługi zlecenia.
            </p>
            <p className="mt-3">Danych nie sprzedajemy.</p>
          </section>

          <section id="transfer" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">6. Przekazywanie poza EOG</h2>
            <p className="mt-3">
              Nie przekazujemy danych poza Europejski Obszar Gospodarczy.
            </p>
          </section>

          <section id="prawa" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">7. Prawa osób, których dane dotyczą</h2>
            <p className="mt-3">Przysługuje Ci:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>prawo dostępu do danych,</li>
              <li>prawo sprostowania,</li>
              <li>prawo usunięcia,</li>
              <li>prawo ograniczenia przetwarzania,</li>
              <li>prawo przenoszenia danych, gdy podstawą jest umowa,</li>
              <li>prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
              <li>
                prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2,
                00-193 Warszawa,{" "}
                <a
                  href="https://uodo.gov.pl"
                  className="font-semibold text-[#1565C0] hover:underline dark:text-[#90CAF9]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  uodo.gov.pl
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              Aby skorzystać z praw, zadzwoń pod {siteConfig.phoneDisplay} lub napisz na adres
              administratora. Odpowiadamy bez zbędnej zwłoki, nie później niż w ciągu miesiąca. Gdy
              sprawa jest skomplikowana, termin może wydłużyć się o kolejne dwa miesiące — wtedy
              wcześniej o tym poinformujemy.
            </p>
          </section>

          <section id="dobrowolnosc" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">8. Dobrowolność podania danych</h2>
            <p className="mt-3">
              Podanie imienia, numeru telefonu i typu nieruchomości jest dobrowolne, ale potrzebne,
              żebyśmy mogli oddzwonić i przygotować wycenę. Bez tych danych nie zrealizujemy
              zgłoszenia z formularza. Lokalizacja, metraż, liczba pomieszczeń i dodatkowe
              informacje są opcjonalne.
            </p>
          </section>

          <section id="automat" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">9. Zautomatyzowane decyzje</h2>
            <p className="mt-3">
              Nie podejmujemy decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym
              profilowaniu, które wywoływałyby wobec Ciebie skutki prawne lub w podobny sposób
              istotnie na Ciebie wpływały.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">10. Cookies i pamięć lokalna</h2>
            <p className="mt-3">
              Strona nie używa cookies analitycznych ani marketingowych i nie wyświetla banera
              zgody, bo takich plików nie zapisujemy przy samym wejściu na stronę.
            </p>
            <p className="mt-3">
              W pamięci localStorage zapisujemy wyłącznie wybraną wersję kolorystyczną (jasną albo
              ciemną). To ustawienie techniczne zostaje w Twojej przeglądarce. Możesz je usunąć,
              czyszcząc dane witryny.
            </p>
          </section>

          <section id="bezpieczenstwo" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">11. Bezpieczeństwo</h2>
            <p className="mt-3">
              Stosujemy środki odpowiednie do skali działalności: ograniczony dostęp do zgłoszeń,
              połączenie szyfrowane (HTTPS), gdy strona jest tak udostępniana, oraz zasadę
              minimalizacji — prosimy tylko o dane potrzebne do oddzwonienia.
            </p>
          </section>

          <section id="zmiany" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-foreground">12. Zmiany polityki</h2>
            <p className="mt-3">
              Aktualna wersja polityki jest opublikowana na tej stronie. O istotnej zmianie
              informujemy przez aktualizację daty na początku dokumentu.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#12375c] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Kontakt w sprawach danych</h2>
          <p className="mt-3 text-white/80">
            IB-Klima
            <br />
            {siteConfig.street}
            <br />
            {siteConfig.postalCode} {siteConfig.city}
            <br />
            NIP: {siteConfig.nip}
          </p>
          <a href={siteConfig.phoneHref} className="mt-4 inline-block text-lg font-semibold hover:underline">
            {siteConfig.phoneDisplay}
          </a>
          <p className="mt-6">
            <Link href="/" className="text-sm font-semibold text-[#90CAF9] hover:underline">
              Wróć na stronę główną
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
