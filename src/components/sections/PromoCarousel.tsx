"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ChevronDownIcon } from "@/components/ui/Icon";
import { useCatalogFilter } from "@/lib/catalog-filter-context";

type Slide = {
  category: string;
  label: string;
  image: string;
  alt: string;
};

// Seasonal promo banners — each filters the catalog below to its category
// (see useCatalogFilter) and scrolls to it. Add a product in that category
// in src/content/products.ts to start showing results.
const slides: Slide[] = [
  {
    category: "halloween",
    label: "Ver produtos de Halloween",
    image: "/halloween.png",
    alt: "Especial de Halloween — decoração e outros produtos impressos em 3D temáticos",
  },
  {
    category: "natal",
    label: "Ver produtos de Natal",
    image: "/natal.png",
    alt: "Especial de Natal — decoração e outros produtos impressos em 3D temáticos",
  },
];

const AUTOPLAY_MS = 2000;
const TRANSITION_MS = 700;

// Crossfades between slides instead of sliding + cloning — index always
// stays a valid 0..slides.length-1 via modulo, so (unlike a translateX
// slide track with cloned end-slides to fake an infinite loop) there is no
// out-of-range index the carousel could ever get stuck on.
export function PromoCarousel() {
  const { requestCategory } = useCatalogFilter();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Debounces manual clicks so spamming next/prev doesn't stack up jarring,
  // overlapping crossfades — purely a polish guard, not load-bearing for
  // correctness (modulo already makes an invalid index impossible).
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    timeoutRef.current = setTimeout(() => advance(1), AUTOPLAY_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  function advance(delta: 1 | -1) {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, TRANSITION_MS);
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  function goToNext() {
    advance(1);
  }

  function goToPrevious() {
    advance(-1);
  }

  function handleSlideClick(category: string) {
    requestCategory(category);
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="py-6 sm:py-8" aria-roledescription="carousel" aria-label="Promoções de datas especiais">
      <Container>
        <div className="relative aspect-[1983/680] w-full overflow-hidden rounded border border-border">
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.category}
                type="button"
                onClick={() => handleSlideClick(slide.category)}
                aria-label={slide.label}
                aria-hidden={!isActive || undefined}
                tabIndex={isActive ? undefined : -1}
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity ${TRANSITION_MS}ms ease`,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                className="absolute inset-0"
              >
                <Image src={slide.image} alt={slide.alt} fill sizes="100vw" className="object-cover" priority={i === 0} />
              </button>
            );
          })}

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/30 p-2 text-foreground opacity-60 backdrop-blur-sm transition hover:bg-background/60 hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronDownIcon className="h-5 w-5 rotate-90" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Próximo slide"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/30 p-2 text-foreground opacity-60 backdrop-blur-sm transition hover:bg-background/60 hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronDownIcon className="h-5 w-5 -rotate-90" />
          </button>
        </div>
      </Container>
    </section>
  );
}
