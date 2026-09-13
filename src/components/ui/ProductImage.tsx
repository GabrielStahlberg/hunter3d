import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Product photos aren't all the same aspect ratio, so object-contain (never
// object-cover) keeps every photo fully visible inside its box. Any leftover
// space is filled with bg-image-fill, matching the studio background the
// product photos are shot on, so it doesn't show up as a mismatched bar.
export function ProductImage({ src, alt, className, sizes, priority }: ProductImageProps) {
  return (
    <div className="relative h-full w-full bg-image-fill">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
        priority={priority}
        className={cn("object-contain", className)}
      />
    </div>
  );
}
