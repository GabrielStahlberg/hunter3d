import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap font-display text-lg text-foreground sm:text-xl">
          <Image src="/logo-mark.webp" alt="" width={32} height={31} className="h-7 w-auto sm:h-8" priority />
          {site.name}
        </Link>
      </div>
    </header>
  );
}
