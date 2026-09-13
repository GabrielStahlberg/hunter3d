import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export function WhatsAppButton({ message, label, variant = "primary", size, className }: WhatsAppButtonProps) {
  return (
    <Button href={whatsappHref(message)} external variant={variant} size={size} className={className}>
      {label}
    </Button>
  );
}
