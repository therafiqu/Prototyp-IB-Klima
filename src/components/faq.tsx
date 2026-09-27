import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { faqs } from "@/lib/site";
import { cn, interactiveCardClass } from "@/lib/styles";

export function Faq() {
  return (
    <section id="pytania" aria-labelledby="pytania-tytul" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1565C0] dark:text-[#90CAF9]">
            Pytania
          </p>
          <h2
            id="pytania-tytul"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Pytania o montaż i serwis klimatyzacji
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Krótkie odpowiedzi na to, o co najczęściej pytają klienci z Małopolski.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4" stagger={0.08}>
          {faqs.map((item) => (
            <StaggerItem key={item.question}>
              <article
                className={cn(
                  "rounded-3xl border border-line bg-card p-6 shadow-card dark:shadow-card-dark sm:p-8",
                  interactiveCardClass,
                )}
              >
                <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
