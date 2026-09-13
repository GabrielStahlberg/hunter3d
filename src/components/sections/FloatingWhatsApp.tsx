import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/whatsapp";
import { common } from "@/content/common";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(common.whatsapp.genericMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={common.whatsapp.ctaLabel}
      className="fixed bottom-5 right-5 z-50 block h-16 w-16 transition-transform hover:scale-105 motion-reduce:transition-none sm:bottom-6 sm:right-6"
    >
      <span className="block h-full w-full overflow-hidden rounded-full shadow-lg ring-2 ring-background">
        <Image src="/Avatar.webp" alt="" width={64} height={64} className="h-full w-full object-cover" />
      </span>
      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white ring-2 ring-background">
        <WhatsAppIcon className="h-3.5 w-3.5" />
      </span>

      <span
        aria-hidden="true"
        className="absolute right-full top-1/2 mr-3 hidden w-max max-w-[190px] -translate-y-1/2 rounded-2xl bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-lg sm:block"
      >
        {common.whatsapp.bubbleMessage}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-background" />
      </span>
    </a>
  );
}
