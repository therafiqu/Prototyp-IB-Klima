"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

const propertyTypeLabels: Record<string, string> = {
  "mieszkanie-w-bloku": "Mieszkanie w bloku",
  "dom-jednorodzinny": "Dom jednorodzinny",
  "biuro-lokal-uslugowy": "Biuro/lokal usługowy",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export type ContactEmailInput = {
  name: string;
  phone: string;
  propertyType: string;
  location: string;
  area: string;
  rooms: string;
  message: string;
};

export async function sendContactEmail(
  input: ContactEmailInput,
): Promise<{ ok: true } | { ok: false }> {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const propertyType = input.propertyType.trim();
  const location = input.location.trim();
  const area = input.area.trim();
  const rooms = input.rooms.trim();
  const message = input.message.trim();
  const propertyLabel = propertyTypeLabels[propertyType];

  if (
    name.length < 2 ||
    name.length > 80 ||
    !propertyLabel ||
    phone.length < 9 ||
    phone.length > 20 ||
    location.length > 120 ||
    area.length > 8 ||
    rooms.length > 3 ||
    message.length > 1000
  ) {
    return { ok: false };
  }

  const rows: Array<[string, string]> = [
    ["Imię i nazwisko", name],
    ["Telefon", phone],
    ["Typ nieruchomości", propertyLabel],
    ["Lokalizacja", location || "—"],
    ["Metraż (m2)", area || "—"],
    ["Liczba pomieszczeń", rooms || "—"],
    ["Dodatkowe informacje", message || "—"],
  ];

  const html = `<p>Nowe zgłoszenie z formularza IB-Klima.</p><ul>${rows
    .map(([label, value]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`)
    .join("")}</ul>`;

  const { error } = await resend.emails.send({
    from: "kontakt@ib-klima.pl",
    to: siteConfig.email,
    subject: "Nowe zgłoszenie z formularza IB-Klima",
    html,
  });

  if (error) {
    console.error("Resend email failed:", error.name, error.message);
    return { ok: false };
  }

  return { ok: true };
}
