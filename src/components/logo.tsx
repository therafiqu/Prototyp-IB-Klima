import { AirVent } from "lucide-react";
import { cn } from "@/lib/styles";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-lg font-bold tracking-tight",
        inverted ? "text-white" : "text-foreground",
      )}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-xl bg-[#1E88E5] text-white shadow-sm shadow-[#1E88E5]/30"
        aria-hidden
      >
        <AirVent className="h-5 w-5" />
      </span>
      IB-Klima
    </span>
  );
}
