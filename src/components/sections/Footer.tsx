import Image from "next/image";
import { site } from "@/config/site";
import { common } from "@/content/common";
import { whatsappHref } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo-mark.webp" alt="" width={28} height={27} className="h-7 w-auto" />
            <p className="font-display text-lg text-foreground">{site.name}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{common.footer.disclaimer}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">{common.footer.contactHeading}</p>
          <ul className="mt-3 flex items-center gap-3">
            <li>
              <a
                href={whatsappHref(common.whatsapp.genericMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={common.whatsapp.ctaLabel}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-primary"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={site.contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={site.contact.instagram.handle}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.legalName}. {common.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
