import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";
import { common } from "@/content/common";

type CTASectionContent = {
  title: string;
  description: string;
  primaryCta: { label: string };
};

export function CTASection({ content }: { content: CTASectionContent }) {
  return (
    <Section surface>
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading level={2} size={3}>
            {content.title}
          </Heading>
          <p className="mt-2 max-w-md text-muted-foreground">{content.description}</p>
        </div>
        <WhatsAppButton message={common.whatsapp.genericMessage} label={content.primaryCta.label} size="lg" />
      </Container>
    </Section>
  );
}
