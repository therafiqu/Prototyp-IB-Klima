export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1565C0] to-[#0A4FA3] px-6 py-3 text-center text-base font-semibold text-white shadow-lg shadow-[#1565C0]/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1565C0]/35 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E88E5] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0";

export const secondaryOnDarkClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-center text-base font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/20 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const interactiveCardClass =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[#1E88E5]/40 hover:shadow-[0_28px_60px_-24px_rgb(30_136_229_/_0.38)]";
