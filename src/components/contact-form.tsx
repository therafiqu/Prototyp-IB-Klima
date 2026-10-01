"use client";

import { ChevronDown, CircleCheck, LoaderCircle, Phone } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn, primaryButtonClass } from "@/lib/styles";

type Status = "idle" | "loading" | "success" | "error";
type Field = "name" | "phone" | "propertyType" | "location" | "area" | "rooms" | "message";
type Errors = Partial<Record<Field, string>>;

const CONTACT_ENDPOINT = "/api/contact.php";

const propertyTypes = [
  { value: "mieszkanie-w-bloku", label: "Mieszkanie w bloku" },
  { value: "dom-jednorodzinny", label: "Dom jednorodzinny" },
  { value: "biuro-lokal-uslugowy", label: "Biuro/lokal usługowy" },
] as const;

const propertyTypeValues = new Set<string>(propertyTypes.map((type) => type.value));

function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("0048")) digits = digits.slice(4);
  else if (digits.startsWith("48") && digits.length === 11) digits = digits.slice(2);
  return /^\d{9}$/.test(digits) ? digits : null;
}

function optionalNumber(value: string) {
  const trimmed = value.trim().replace(",", ".");
  if (!trimmed) return { empty: true as const };
  const amount = Number(trimmed);
  if (!Number.isFinite(amount)) return { empty: false as const, valid: false as const };
  return { empty: false as const, valid: true as const, amount };
}

const fieldClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-base text-foreground outline-none transition placeholder:text-slate-400 focus:border-[#1E88E5] focus:ring-4 focus:ring-[#1E88E5]/20 dark:placeholder:text-slate-500";

const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const propertyTypeRef = useRef<HTMLSelectElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (status !== "success" || !dialog || dialog.open) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [status]);

  function dismissSuccess() {
    dialogRef.current?.close();
    setStatus("idle");
    setErrors({});
  }

  function clearError(field: keyof Errors) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const propertyType = String(data.get("propertyType") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const area = optionalNumber(String(data.get("area") ?? ""));
    const rooms = optionalNumber(String(data.get("rooms") ?? ""));
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const nextErrors: Errors = {};

    if (name.length < 2 || !/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(name)) {
      nextErrors.name = "Podaj imię i nazwisko.";
    }
    if (!normalizePhone(phone)) {
      nextErrors.phone = "Podaj prawidłowy numer telefonu (9 cyfr).";
    }
    if (!propertyTypeValues.has(propertyType)) {
      nextErrors.propertyType = "Wybierz typ nieruchomości.";
    }
    if (location.length > 120) {
      nextErrors.location = "Lokalizacja może mieć maksymalnie 120 znaków.";
    }
    if (!area.empty && (!area.valid || area.amount <= 0 || area.amount > 100000)) {
      nextErrors.area = "Podaj metraż jako liczbę większą od 0.";
    }
    if (!rooms.empty && (!rooms.valid || !Number.isInteger(rooms.amount) || rooms.amount < 1 || rooms.amount > 500)) {
      nextErrors.rooms = "Podaj liczbę pomieszczeń jako liczbę całkowitą.";
    }
    if (message.length > 1000) {
      nextErrors.message = "Dodatkowe informacje mogą mieć maksymalnie 1000 znaków.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const focus: Record<Field, { current: { focus: () => void } | null }> = {
        name: nameRef,
        phone: phoneRef,
        propertyType: propertyTypeRef,
        location: locationRef,
        area: areaRef,
        rooms: roomsRef,
        message: messageRef,
      };
      (["name", "phone", "propertyType", "location", "area", "rooms", "message"] as const).find((field) => {
        if (!nextErrors[field]) return false;
        focus[field].current?.focus();
        return true;
      });
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          phone,
          propertyType,
          location,
          area: area.empty ? "" : String(area.amount),
          rooms: rooms.empty ? "" : String(rooms.amount),
          message,
          website,
        }),
      });

      let payload: { success?: boolean } | null = null;
      try {
        payload = (await response.json()) as { success?: boolean };
      } catch {
        payload = null;
      }

      const ok = response.ok && payload?.success === true;
      if (ok) formRef.current?.reset();
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
    {status === "success" ? (
      <dialog
        ref={dialogRef}
        aria-labelledby="formularz-dziekujemy"
        className="m-auto w-[min(100%-1.5rem,28rem)] rounded-3xl border-0 bg-transparent p-0 backdrop:bg-[#020617]/70"
        onCancel={(event) => {
          event.preventDefault();
          dismissSuccess();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dismissSuccess();
        }}
      >
        <div className="rise-in rounded-3xl border border-line bg-card p-6 shadow-card dark:shadow-card-dark sm:p-8">
          <span className="success-pop grid h-12 w-12 place-items-center rounded-2xl bg-[#1E88E5]/10 text-[#1565C0] dark:text-[#90CAF9]">
            <CircleCheck className="h-6 w-6" aria-hidden />
          </span>
          <h3 id="formularz-dziekujemy" className="mt-5 text-2xl font-bold text-foreground">
            Dziękujemy. Zgłoszenie przyjęte.
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            Oddzwonimy wkrótce, żeby umówić darmową wycenę. Wolisz szybciej? Zadzwoń — odbierzemy.
          </p>
          <a href={siteConfig.phoneHref} className={`${primaryButtonClass} mt-6`}>
            <Phone className="h-5 w-5" aria-hidden />
            Zadzwoń: {siteConfig.phoneDisplay}
          </a>
          <button
            type="button"
            className="mt-4 block text-sm font-semibold text-[#1565C0] hover:underline dark:text-[#90CAF9]"
            onClick={dismissSuccess}
          >
            Wyślij kolejne zgłoszenie
          </button>
        </div>
      </dialog>
    ) : null}
    <form
      ref={formRef}
      id="formularz"
      onSubmit={onSubmit}
      noValidate
      className="relative scroll-mt-28 rounded-3xl border border-line bg-card p-6 shadow-card dark:shadow-card-dark sm:p-8"
      aria-describedby="formularz-info"
    >
      <h3 className="text-2xl font-bold text-foreground">Formularz zgłoszenia</h3>
      <p id="formularz-info" className="mt-2 text-sm leading-relaxed text-muted">
        Pola oznaczone * są wymagane. Nie pytamy o adres e-mail — oddzwonimy.
      </p>

      <div className="mt-6 space-y-4">
        {/* Honeypot for bots — visually hidden, not part of the visible UI. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Strona WWW</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div>
          <label htmlFor="imie" className={labelClass}>
            Imię i nazwisko <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            ref={nameRef}
            id="imie"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder="Jan Kowalski"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "imie-blad" : undefined}
            onChange={() => clearError("name")}
            className={cn(fieldClass, errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
          />
          {errors.name ? (
            <p id="imie-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="telefon" className={labelClass}>
            Numer telefonu <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            ref={phoneRef}
            id="telefon"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={20}
            placeholder="np. 500 600 700"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "telefon-blad" : undefined}
            onChange={() => clearError("phone")}
            className={cn(fieldClass, errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
          />
          {errors.phone ? (
            <p id="telefon-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <fieldset className="space-y-4 border-0 p-0">
          <legend className="mb-4 w-full border-t border-line pt-5 text-lg font-bold text-foreground">
            Informacje o nieruchomości
          </legend>

          <div className="pt-1">
            <label htmlFor="typ-nieruchomosci" className={labelClass}>
              Typ nieruchomości <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                ref={propertyTypeRef}
                id="typ-nieruchomosci"
                name="propertyType"
                required
                defaultValue=""
                aria-invalid={Boolean(errors.propertyType)}
                aria-describedby={errors.propertyType ? "typ-nieruchomosci-blad" : undefined}
                onChange={() => clearError("propertyType")}
                className={cn(
                  fieldClass,
                  "appearance-none pr-11",
                  errors.propertyType && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              >
                <option value="" disabled>
                  Wybierz typ
                </option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </div>
            {errors.propertyType ? (
              <p id="typ-nieruchomosci-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.propertyType}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="lokalizacja" className={labelClass}>
              Lokalizacja inwestycji
            </label>
            <input
              ref={locationRef}
              id="lokalizacja"
              name="location"
              type="text"
              autoComplete="address-level2"
              maxLength={120}
              placeholder="np. Kraków, Nowa Huta"
              aria-invalid={Boolean(errors.location)}
              aria-describedby={errors.location ? "lokalizacja-blad" : undefined}
              onChange={() => clearError("location")}
              className={cn(
                fieldClass,
                errors.location && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              )}
            />
            {errors.location ? (
              <p id="lokalizacja-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.location}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="metraz" className={labelClass}>
              Metraż do klimatyzowania (m2)
            </label>
            <input
              ref={areaRef}
              id="metraz"
              name="area"
              type="text"
              inputMode="decimal"
              maxLength={8}
              placeholder="np. 45"
              aria-invalid={Boolean(errors.area)}
              aria-describedby={errors.area ? "metraz-blad" : undefined}
              onChange={() => clearError("area")}
              className={cn(fieldClass, errors.area && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
            />
            {errors.area ? (
              <p id="metraz-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.area}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="pomieszczenia" className={labelClass}>
              Liczba pomieszczeń do schłodzenia
            </label>
            <input
              ref={roomsRef}
              id="pomieszczenia"
              name="rooms"
              type="text"
              inputMode="numeric"
              maxLength={3}
              placeholder="np. 2"
              aria-invalid={Boolean(errors.rooms)}
              aria-describedby={errors.rooms ? "pomieszczenia-blad" : undefined}
              onChange={() => clearError("rooms")}
              className={cn(fieldClass, errors.rooms && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
            />
            {errors.rooms ? (
              <p id="pomieszczenia-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.rooms}
              </p>
            ) : null}
          </div>
        </fieldset>

        <div>
          <label htmlFor="wiadomosc" className={labelClass}>
            Dodatkowe informacje
          </label>
          <textarea
            ref={messageRef}
            id="wiadomosc"
            name="message"
            rows={5}
            maxLength={1000}
            placeholder="Napisz, czego dotyczy montaż lub serwis — opcjonalnie"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "wiadomosc-blad" : undefined}
            onChange={() => clearError("message")}
            className={cn(
              fieldClass,
              "resize-y",
              errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            )}
          />
          {errors.message ? (
            <p id="wiadomosc-blad" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-6 text-sm text-red-600 dark:text-red-400" role="alert">
          Nie udało się wysłać zgłoszenia. Spróbuj ponownie albo zadzwoń.
        </p>
      ) : null}

      <button
        type="submit"
        className={`${primaryButtonClass} w-full sm:w-auto ${status === "error" ? "mt-4" : "mt-6"}`}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />
            Wysyłanie…
          </>
        ) : (
          "Wyślij zgłoszenie – oddzwonimy"
        )}
      </button>
    </form>
    </>
  );
}
