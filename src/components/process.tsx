import { ProcessLine } from "@/components/process-line";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section id="proces" aria-labelledby="proces-tytul" className="bg-surface-muted py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
            Współpraca
          </p>
          <h2
            id="proces-tytul"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Jak wygląda montaż klimatyzacji?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Pięć kroków — od pierwszego telefonu do uruchomienia urządzenia w domu albo w firmie.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <ProcessLine />
          <Stagger as="ol" className="relative md:grid md:grid-cols-5 md:gap-6" stagger={0.1}>
            {processSteps.map((step, index) => (
              <StaggerItem
                key={step.title}
                as="li"
                className="relative flex gap-5 pb-10 last:pb-0 md:flex-col md:items-center md:pb-0 md:text-center"
              >
                {index < processSteps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[calc(1.75rem-0.5px)] top-14 w-px bg-line md:hidden"
                  />
                ) : null}
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#1E88E5] bg-surface text-base font-bold text-[#1565C0] dark:text-[#90CAF9]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
