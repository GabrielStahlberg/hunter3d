type IconProps = {
  className?: string;
};

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 17.5 5 21l3.6-1.4A8 8 0 1 0 6.5 17.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 10.2c.3 2.4 2.4 4.5 4.8 4.8.8.1 1-.4 1-.9v-.9c0-.3-.2-.5-.5-.6l-1.4-.4c-.2-.1-.5 0-.6.2l-.3.5a5 5 0 0 1-2.2-2.2l.5-.3c.2-.1.3-.4.2-.6l-.4-1.4c-.1-.3-.3-.5-.6-.5h-.9c-.5 0-1 .2-.9 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20 16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ShoppingCartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.5 4.5h2l2.2 11a1.6 1.6 0 0 0 1.6 1.3h7.6a1.6 1.6 0 0 0 1.58-1.36l1.1-7.14H6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 7V5.5h5V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7l.8 12.2a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}
