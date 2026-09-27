export const siteConfig = {
  name: "IB-Klima",
  url: "https://ib-klima.pl",
  phoneDisplay: "696\u00a0658\u00a0661",
  phoneHref: "tel:+48696658661",
  phoneE164: "+48696658661",
  street: "Prof. Wojciecha Marii Bartla 19G/87",
  postalCode: "30-386",
  city: "Kraków",
  region: "Województwo małopolskie",
  nip: "9442234633",
  area: "Cała Małopolska",
  /** Street-level pin near ul. Prof. Wojciecha Marii Bartla 19G, Kraków. */
  geo: { latitude: 49.9985, longitude: 19.899 },
  title: "Montaż klimatyzacji Kraków i Małopolska | IB-Klima",
  description:
    "IB-Klima z Krakowa montuje i serwisuje klimatyzację w całej Małopolsce. Montaż od 1999 zł, darmowa wycena na miejscu. Tel. 696 658 661.",
  priceLabel: "Montaż od 1999\u00a0zł*",
  priceNote:
    "* Montaż od 1999 zł – cena dotyczy samego montażu bez jednostki klimatyzacyjnej",
  priceDisclaimer:
    "* Cena montażu od 1999 zł dotyczy standardowego montażu jednostki ściennej bez urządzenia klimatyzacyjnego. Ostateczna cena zależy od zakresu prac.",
} as const;

export const services = [
  {
    id: "montaz",
    title: "Montaż klimatyzacji",
    text: "Profesjonalny montaż jednostek ściennych, kasetonowych i kanałowych w domach i firmach. Szybko, czysto i z gwarancją.",
  },
  {
    id: "serwis",
    title: "Serwis klimatyzacji",
    text: "Przeglądy, czyszczenie, odgrzybianie i uzupełnianie czynnika. Regularny serwis wydłuża żywotność urządzenia.",
  },
  {
    id: "wycena",
    title: "Darmowa wycena",
    text: "Przyjeżdżamy na miejsce, doradzamy i podajemy konkretną cenę bez zobowiązań.",
  },
] as const;

export const serviceRegions = [
  {
    name: "Kraków i okolice",
    places: ["Kraków", "Wieliczka", "Skawina", "Niepołomice", "Myślenice", "Krzeszowice"],
  },
  {
    name: "Zachodnia Małopolska",
    places: ["Oświęcim", "Chrzanów", "Trzebinia", "Olkusz", "Wadowice", "Andrychów", "Sucha Beskidzka"],
  },
  {
    name: "Północ i wschód",
    places: ["Tarnów", "Bochnia", "Brzesko", "Dąbrowa Tarnowska", "Miechów", "Proszowice"],
  },
  {
    name: "Sądecczyzna i Podhale",
    places: ["Nowy Sącz", "Gorlice", "Krynica-Zdrój", "Limanowa", "Nowy Targ", "Zakopane", "Rabka-Zdrój"],
  },
] as const;

export const servicePlaces = serviceRegions.flatMap((region) => region.places);

export const processSteps = [
  {
    title: "Kontakt / formularz",
    text: "Zostaw numer albo zadzwoń. Oddzwoniamy i ustalamy termin, który Ci pasuje.",
  },
  {
    title: "Darmowa wycena na miejscu",
    text: "Przyjeżdżamy, oglądamy warunki montażu i podajemy konkretną cenę — bez zobowiązań.",
  },
  {
    title: "Dobór odpowiedniego urządzenia",
    text: "Dobieramy moc i typ jednostki do metrażu, nasłonecznienia i sposobu użytkowania pomieszczeń.",
  },
  {
    title: "Profesjonalny montaż",
    text: "Montujemy czysto i sprawnie: jednostki ścienne, kasetonowe i kanałowe. Po pracy zostawiamy porządek.",
  },
  {
    title: "Serwis i gwarancja",
    text: "Uruchamiamy urządzenie, omawiamy obsługę i zostajemy pod telefonem przy przeglądach oraz gwarancji.",
  },
] as const;

export const faqs = [
  {
    question: "Ile kosztuje montaż klimatyzacji w Małopolsce?",
    answer:
      "W IB-Klima montaż zaczyna się od 1999 zł. Ta kwota dotyczy standardowego montażu jednostki ściennej i nie obejmuje urządzenia klimatyzacyjnego. Ostateczną cenę podajemy po bezpłatnej wycenie na miejscu, bo zależy od zakresu prac.",
  },
  {
    question: "Gdzie IB-Klima montuje i serwisuje klimatyzację?",
    answer:
      "Na terenie całego województwa małopolskiego. Siedziba jest w Krakowie, przy ul. Prof. Wojciecha Marii Bartla 19G/87. Dojeżdżamy m.in. do Krakowa, Wieliczki, Tarnowa, Nowego Sącza, Zakopanego, Oświęcimia i Olkusza oraz do pozostałych miejscowości w Małopolsce.",
  },
  {
    question: "Czy wycena montażu jest płatna?",
    answer:
      "Nie. Wycena na miejscu jest bezpłatna i bez zobowiązań. Przyjeżdżamy, sprawdzamy warunki montażu i podajemy konkretną cenę.",
  },
  {
    question: "Jakie klimatyzatory montujecie?",
    answer:
      "Jednostki ścienne, kasetonowe i kanałowe — w domach i w firmach. Dobieramy moc i typ urządzenia do metrażu, nasłonecznienia i sposobu użytkowania pomieszczeń.",
  },
  {
    question: "Czy wykonujecie serwis klimatyzacji?",
    answer:
      "Tak. Serwis obejmuje przeglądy, czyszczenie, odgrzybianie i uzupełnianie czynnika. Regularny serwis wydłuża żywotność urządzenia.",
  },
  {
    question: "Jak zamówić montaż lub serwis?",
    answer:
      "Zadzwoń pod 696 658 661 albo zostaw numer w formularzu na tej stronie. Oddzwonimy i umówimy termin darmowej wyceny.",
  },
] as const;

export const navItems = [
  { id: "oferta", label: "Oferta" },
  { id: "obszar", label: "Obszar" },
  { id: "proces", label: "Proces" },
  { id: "pytania", label: "Pytania" },
  { id: "kontakt", label: "Kontakt" },
] as const;
