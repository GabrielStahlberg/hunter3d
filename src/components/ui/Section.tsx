import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  surface?: boolean;
  as?: "section" | "div";
  id?: string;
};

export function Section({ children, className, surface, as: Tag = "section", id }: SectionProps) {
  return (
    <Tag id={id} className={cn("py-14 sm:py-20", surface && "bg-surface", className)}>
      {children}
    </Tag>
  );
}
