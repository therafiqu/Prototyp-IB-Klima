"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn, primaryButtonClass } from "@/lib/styles";

export function MobileCallBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("kontakt");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "call-bar-in fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-3 backdrop-blur-md transition-transform duration-300 dark:bg-[#0F172A]/95 md:hidden",
        hidden && "pointer-events-none translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={hidden}
    >
      <a
        href={siteConfig.phoneHref}
        tabIndex={hidden ? -1 : 0}
        className={cn(primaryButtonClass, "w-full")}
      >
        <Phone className="h-5 w-5" aria-hidden />
        Zadzwoń: {siteConfig.phoneDisplay}
      </a>
    </div>
  );
}
