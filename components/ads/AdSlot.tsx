"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slot?: string;
  label?: string;
  className?: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
};

/**
 * Ad-ready container for Google AdSense.
 * It renders nothing until both NEXT_PUBLIC_ADSENSE_CLIENT and a slot ID exist,
 * so the launch site stays clean before AdSense approval.
 */
export default function AdSlot({
  slot,
  label = "Advertisement",
  className = "",
  format = "auto",
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const enabled = Boolean(client && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or an unapproved account can prevent initialization.
    }
  }, [enabled, slot]);

  if (!enabled) return null;

  const minHeight =
    format === "horizontal" ? "min-h-[100px]" :
    format === "vertical" ? "min-h-[250px]" :
    "min-h-[180px]";

  return (
    <aside
      aria-label={label}
      className={`mx-auto my-8 w-full overflow-hidden ${minHeight} ${className}`}
    >
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9B8979]">
        {label}
      </p>
      <ins
        className="adsbygoogle block min-h-[inherit] w-full"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
