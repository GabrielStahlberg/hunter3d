import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border text-foreground hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:text-primary",
};

const sizeStyles: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  if (isLinkProps(props)) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _c, variant: _v, size: _s, className: _cn, href: _h, ...rest } = props;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
