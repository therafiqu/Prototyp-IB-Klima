import Image from "next/image";
import lockup from "@/images/logo-insidebeta.png";
import lockupOnLight from "@/images/logo-insidebeta-on-light.png";
import { cn } from "@/lib/styles";

const sizes = {
  header: "h-24 w-auto",
  footer: "h-auto w-44 sm:w-52",
} as const;

export function Logo({
  size = "header",
  priority = false,
  tone = "onDark",
}: {
  size?: keyof typeof sizes;
  priority?: boolean;
  /** `surface` swaps in a darker legal line on light backgrounds. The blue stays the same. */
  tone?: "onDark" | "surface";
}) {
  const className = sizes[size];

  if (tone === "surface") {
    return (
      <>
        <Image
          src={lockupOnLight}
          alt="InsideBeta Sp. z o.o."
          priority={priority}
          className={cn(className, "dark:hidden")}
        />
        <Image
          src={lockup}
          alt="InsideBeta Sp. z o.o."
          priority={priority}
          className={cn(className, "hidden dark:block")}
        />
      </>
    );
  }

  return (
    <Image src={lockup} alt="InsideBeta Sp. z o.o." priority={priority} className={className} />
  );
}
