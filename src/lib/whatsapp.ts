import { site } from "@/config/site";

export function whatsappHref(message: string): string {
  const digits = site.contact.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
