import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

type Step = { title: string; description: string };

export function HowItWorks({ content }: { content: { title: string; steps: readonly Step[] } }) {
  return (
    <Section>
      <Container>
        <Heading level={2}>{content.title}</Heading>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {content.steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-primary pt-4">
              <span className="text-sm font-medium text-primary">{index + 1}</span>
              <Heading level={3} size={4} className="mt-2">
                {step.title}
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
