import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { common } from "@/content/common";

export default function NotFound() {
  return (
    <Section as="div" className="flex min-h-[60vh] items-center">
      <Container className="text-center">
        <Heading level={1} size={2}>
          {common.notFound.title}
        </Heading>
        <p className="mt-3 text-muted-foreground">{common.notFound.description}</p>
        <Button href="/" className="mt-6">
          {common.notFound.cta}
        </Button>
      </Container>
    </Section>
  );
}
