import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";

type HeroContent = {
  title: string;
  description: string;
};

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="relative hidden aspect-[1983/793] w-full sm:block">
        <Image
          src="/Hero.webp"
          alt="Peças impressas em 3D com texturas e formatos variados ao lado de uma impressora 3D"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <Container className="absolute inset-0 flex items-center">
          <div className="max-w-md">
            <Heading level={1} size={2} className="text-balance">
              {content.title}
            </Heading>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{content.description}</p>
          </div>
        </Container>
      </div>

      <div className="sm:hidden">
        <Container className="py-12">
          <Heading level={1} size={2} className="text-balance">
            {content.title}
          </Heading>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{content.description}</p>
        </Container>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/Hero.webp"
            alt="Peças impressas em 3D com texturas e formatos variados ao lado de uma impressora 3D"
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
      </div>
    </section>
  );
}
