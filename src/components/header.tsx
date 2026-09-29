"use client";

import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, siteConfig } from "@/lib/site";
import { cn, primaryButtonClass } from "@/lib/styles";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";
  const solid = !onHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        solid
          ? "border-b border-line bg-white/90 text-foreground shadow-sm shadow-navy/5 backdrop-blur-md dark:bg-[#0F172A]/90"
          : "border-b border-transparent bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-[7.25rem] max-w-content items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="InsideBeta, strona główna"
          className="rounded-xl"
          onClick={() => setOpen(false)}
        >
          <Logo priority tone={solid ? "surface" : "onDark"} />
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Główne">
          {navItems.map((item) => (
            <SectionLink
              key={item.id}
              id={item.id}
              onHome={onHome}
              className={cn(
                "relative text-sm font-semibold after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100",
                solid ? "text-muted hover:text-foreground" : "text-white/85 hover:text-white",
              )}
            >
              {item.label}
            </SectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className={cn(primaryButtonClass, "hidden min-h-11 px-4 py-2 text-sm md:inline-flex")}
            aria-label={`Zadzwoń: ${siteConfig.phoneDisplay}`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border md:hidden",
              solid
                ? "border-line text-foreground hover:bg-surface-muted"
                : "border-white/30 text-white hover:bg-white/10",
            )}
            aria-expanded={open}
            aria-controls="menu-mobilne"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <ThemeToggle tone={solid ? "default" : "onDark"} />
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="menu-mobilne"
            aria-label="Mobilne"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-surface md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: reduce ? 0 : 0.05 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SectionLink
                    id={item.id}
                    onHome={onHome}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-semibold text-foreground hover:bg-surface-muted"
                  >
                    {item.label}
                  </SectionLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function SectionLink({
  id,
  onHome,
  className,
  children,
  onClick,
}: {
  id: string;
  onHome: boolean;
  className?: string;
  children: string;
  onClick?: () => void;
}) {
  if (onHome) {
    return (
      <a href={`#${id}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={`/#${id}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
