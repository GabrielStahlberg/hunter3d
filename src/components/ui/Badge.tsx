import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "accent" | "muted";
  className?: string;
};

export function Badge({ children, tone = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2.5 py-1 text-xs font-medium",
        tone === "accent" ? "bg-accent text-accent-foreground" : "bg-surface text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
