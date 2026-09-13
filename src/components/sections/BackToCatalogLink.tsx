"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type BackToCatalogLinkProps = {
  label: string;
};

// Uses browser history instead of a fresh navigation to /#produtos, so
// returning from a product page restores the catalog exactly as it was —
// same scroll position, same filters, same "Ver mais" progress — instead of
// resetting to the top with only the first page of products.
export function BackToCatalogLink({ label }: BackToCatalogLinkProps) {
  const router = useRouter();
  // Starts false to match server-rendered output (window isn't available
  // during SSR); flips after mount once we can check real browser history,
  // avoiding a hydration mismatch.
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time check against a browser-only API, not derived/cascading state
    setHasHistory(window.history.length > 1);
  }, []);

  if (!hasHistory) {
    return (
      <Link href="/#produtos" className="text-sm font-medium text-primary hover:underline">
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="text-sm font-medium text-primary hover:underline"
    >
      {label}
    </button>
  );
}
