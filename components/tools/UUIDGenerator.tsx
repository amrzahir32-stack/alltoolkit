"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  function generateUUID() { setUuid(crypto.randomUUID()); setCopied(false); }
  async function copyUUID() { if (!uuid) return; await navigator.clipboard.writeText(uuid); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <section className="rounded-[2rem] border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_24px_70px_rgba(91,62,38,.12)] sm:p-8">
      <div className="rounded-2xl border border-[#DCC6B0] bg-[#F8F1E9] p-6 sm:p-8">
        <p className="break-all text-center font-mono text-lg font-semibold tracking-wide text-[#2D241C] sm:text-2xl">{uuid || "Generate a UUID to get started"}</p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={generateUUID} className="flex items-center gap-2 rounded-xl bg-[#A7744D] px-6 py-3 font-bold text-white shadow-[0_10px_24px_rgba(167,116,77,.25)] transition hover:-translate-y-0.5 hover:bg-[#8F613F]"><RefreshCw size={18} />Generate UUID</button>
        <button onClick={copyUUID} disabled={!uuid} className="flex items-center gap-2 rounded-xl border border-[#DCC6B0] bg-[#FFFCF8] px-6 py-3 font-bold text-[#4A3B2F] transition hover:bg-[#F7EEE5] disabled:cursor-not-allowed disabled:opacity-45">{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Copied" : "Copy"}</button>
      </div>
      <p className="mt-6 text-center text-sm leading-6 text-[#7A6858]">Generated locally with your browser&apos;s secure random UUID function.</p>
    </section>
  );
}
