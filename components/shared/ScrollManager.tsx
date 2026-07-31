"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps navigation predictable:
 * - normal routes always open at the top;
 * - hash links land below the sticky navbar;
 * - browser back/forward restores the requested section.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToRequestedPosition = () => {
      const hash = window.location.hash;

      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(scrollToRequestedPosition);
    window.addEventListener("hashchange", scrollToRequestedPosition);
    window.addEventListener("popstate", scrollToRequestedPosition);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToRequestedPosition);
      window.removeEventListener("popstate", scrollToRequestedPosition);
    };
  }, [pathname]);

  return null;
}
