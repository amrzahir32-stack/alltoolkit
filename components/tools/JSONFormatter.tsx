"use client";

import { useState } from "react";
import { AlertCircle, Check, CheckCircle2, Copy, Sparkles } from "lucide-react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function formatJSON() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON. Check the syntax and try again.");
    }
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-[2rem] border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_24px_70px_rgba(91,62,38,.12)] sm:p-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between"><label className="font-black text-[#2D241C]">Input JSON</label><span className="text-xs font-bold uppercase tracking-wider text-[#9A826E]">Editor</span></div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name":"AllToolkit","free":true}' spellCheck={false} className="h-[360px] w-full resize-none rounded-2xl border border-[#DCC6B0] bg-[#FCF7F1] p-5 font-mono text-sm leading-6 text-[#2D241C] outline-none transition placeholder:text-[#B09A87] focus:border-[#A7744D] focus:ring-4 focus:ring-[#D9BEA5]/30" />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between"><label className="font-black text-[#2D241C]">Formatted output</label>{output && <span className="flex items-center gap-1 text-xs font-bold text-[#63866A]"><CheckCircle2 size={14} /> Valid JSON</span>}</div>
          <pre className="h-[360px] overflow-auto whitespace-pre-wrap rounded-2xl border border-[#DCC6B0] bg-[#F8F1E9] p-5 font-mono text-sm leading-6 text-[#2D241C]">{output || <span className="text-[#A99685]">Formatted JSON will appear here.</span>}</pre>
        </div>
      </div>

      {error && <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#E5B8AE] bg-[#FFF0ED] p-4 font-semibold text-[#A95043]"><AlertCircle size={20} />{error}</div>}

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={formatJSON} className="flex items-center gap-2 rounded-xl bg-[#A7744D] px-6 py-3 font-bold text-white shadow-[0_10px_24px_rgba(167,116,77,.25)] transition hover:-translate-y-0.5 hover:bg-[#8F613F]"><Sparkles size={18} />Format JSON</button>
        <button onClick={copyOutput} disabled={!output} className="flex items-center gap-2 rounded-xl border border-[#DCC6B0] bg-[#FFFCF8] px-6 py-3 font-bold text-[#4A3B2F] transition hover:bg-[#F7EEE5] disabled:cursor-not-allowed disabled:opacity-45">{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Copied" : "Copy output"}</button>
      </div>
    </section>
  );
}
