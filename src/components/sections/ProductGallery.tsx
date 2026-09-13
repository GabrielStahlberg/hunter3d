"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded border border-border">
        <ProductImage src={images[activeIndex]} alt={productName} priority sizes="(min-width: 1024px) 40vw, 100vw" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3" aria-label={`Fotos de ${productName}`}>
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              aria-current={index === activeIndex}
              aria-label={`Ver foto ${index + 1} de ${productName}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-[85px] overflow-hidden rounded border",
                index === activeIndex ? "border-primary" : "border-border",
              )}
            >
              <ProductImage src={image} alt="" sizes="85px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
