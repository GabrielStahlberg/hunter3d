import { cn } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  size?: 1 | 2 | 3 | 4;
  className?: string;
};

const sizeStyles: Record<number, string> = {
  1: "font-display text-4xl sm:text-5xl leading-tight",
  2: "font-display text-3xl sm:text-4xl leading-tight",
  3: "font-display text-2xl sm:text-3xl leading-snug",
  4: "font-display text-xl leading-snug",
};

export function Heading({ children, level, size, className }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return <Tag className={cn(sizeStyles[size ?? level], className)}>{children}</Tag>;
}
