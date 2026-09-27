"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/styles";

export function ThemeToggle({ tone = "default" }: { tone?: "default" | "onDark" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    if (!mounted) return;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#0F172A" : "#FFFFFF");
  }, [mounted, isDark]);

  return (
    <button
      type="button"
      aria-label={isDark ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border transition duration-200 active:scale-95",
        tone === "onDark"
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-line bg-card text-foreground hover:bg-surface-muted",
      )}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
