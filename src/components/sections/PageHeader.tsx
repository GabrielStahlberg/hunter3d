import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-border py-12 sm:py-16">
      <Container>
        <Heading level={1} size={2}>
          {title}
        </Heading>
        <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>
      </Container>
    </div>
  );
}
