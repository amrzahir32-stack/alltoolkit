"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RefreshCw, ShieldCheck } from "lucide-react";

const optionClass =
  "flex cursor-pointer items-center gap-3 rounded-2xl border border-[#E7D8C7] bg-[#FFFCF8] p-4 font-semibold text-[#4A3B2F] transition hover:border-[#C8A47F] hover:bg-[#FFF8F0]";

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (length >= 16) score++;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;

    if (score <= 2) return { label: "Weak", width: "33%", color: "bg-[#C96D5D]" };
    if (score <= 4) return { label: "Good", width: "66%", color: "bg-[#D7A54A]" };
    return { label: "Strong", width: "100%", color: "bg-[#6F9B73]" };
  }, [length, uppercase, lowercase, numbers, symbols]);

  function randomCharacter(chars: string) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return chars[array[0] % chars.length];
  }

  function generatePassword() {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_-+=<>?{}[]";

    if (!chars.length) {
      setPassword("Select at least one option.");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) result += randomCharacter(chars);
    setPassword(result);
  }

  async function copyPassword() {
    if (!password || password === "Select at least one option.") return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-[2rem] border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_24px_70px_rgba(91,62,38,.12)] backdrop-blur sm:p-8">
      <div className="flex items-center gap-3 border-b border-[#EEE1D5] pb-6">
        <div className="rounded-xl bg-[#F3E6D8] p-3 text-[#A7744D]">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#2D241C] sm:text-2xl">Generate a secure password</h2>
          <p className="mt-1 text-sm text-[#7A6858]">Adjust the settings, then generate and copy.</p>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-[#E4D3C1] bg-[#F8F1E9] p-5 sm:p-6">
        <p className="min-h-8 break-all font-mono text-lg font-semibold text-[#2D241C] sm:text-xl">
          {password || "Your password will appear here"}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={generatePassword} className="flex items-center gap-2 rounded-xl bg-[#A7744D] px-6 py-3 font-bold text-white shadow-[0_10px_24px_rgba(167,116,77,.25)] transition hover:-translate-y-0.5 hover:bg-[#8F613F]">
          <RefreshCw size={18} /> Generate
        </button>
        <button onClick={copyPassword} className="flex items-center gap-2 rounded-xl border border-[#DCC6B0] bg-[#FFFCF8] px-6 py-3 font-bold text-[#4A3B2F] transition hover:bg-[#F7EEE5]">
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-9">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#4A3B2F]">Password length</span>
          <span className="rounded-lg bg-[#F3E6D8] px-3 py-1 font-black text-[#A7744D]">{length}</span>
        </div>
        <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="accent-[#A7744D] mt-5 w-full" />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <label className={optionClass}><input className="h-4 w-4 accent-[#A7744D]" type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />Uppercase letters</label>
        <label className={optionClass}><input className="h-4 w-4 accent-[#A7744D]" type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />Lowercase letters</label>
        <label className={optionClass}><input className="h-4 w-4 accent-[#A7744D]" type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} />Numbers</label>
        <label className={optionClass}><input className="h-4 w-4 accent-[#A7744D]" type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />Symbols</label>
      </div>

      <div className="mt-9 rounded-2xl bg-[#F8F1E9] p-5">
        <div className="mb-3 flex justify-between text-sm font-bold text-[#4A3B2F]"><span>Password strength</span><span>{strength.label}</span></div>
        <div className="h-2.5 overflow-hidden rounded-full bg-[#E7D8C7]"><div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} /></div>
      </div>
    </section>
  );
}
