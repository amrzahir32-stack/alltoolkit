"use client";
import { useState } from "react";
import { ArrowLeftRight, Check, Copy } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState(""); const [output, setOutput] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); setError(""); } catch { setError("This text could not be encoded."); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input.trim())))); setError(""); } catch { setOutput(""); setError("Enter valid Base64 text."); } };
  const copy = async () => { if (!output) return; await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return <section className="rounded-[2rem] border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_24px_70px_rgba(91,62,38,.12)] sm:p-8">
    <div className="grid gap-6 lg:grid-cols-2"><label><span className="mb-3 block font-black text-[#2D241C]">Input</span><textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Type text or paste Base64..." className="h-72 w-full resize-none rounded-2xl border border-[#DCC6B0] bg-[#FCF7F1] p-5 outline-none focus:border-[#A7744D] focus:ring-4 focus:ring-[#D9BEA5]/30" /></label><label><span className="mb-3 block font-black text-[#2D241C]">Output</span><textarea readOnly value={output} placeholder="Your result will appear here..." className="h-72 w-full resize-none rounded-2xl border border-[#DCC6B0] bg-[#F8F1E9] p-5 outline-none" /></label></div>
    {error && <p className="mt-4 rounded-xl bg-[#FFF0ED] p-4 font-semibold text-[#A95043]">{error}</p>}
    <div className="mt-6 flex flex-wrap gap-3"><button onClick={encode} className="rounded-xl bg-[#A7744D] px-6 py-3 font-bold text-white hover:bg-[#8F613F]">Encode</button><button onClick={decode} className="flex items-center gap-2 rounded-xl border border-[#DCC6B0] bg-white px-6 py-3 font-bold text-[#4A3B2F] hover:bg-[#F7EEE5]"><ArrowLeftRight size={18}/> Decode</button><button onClick={copy} disabled={!output} className="flex items-center gap-2 rounded-xl border border-[#DCC6B0] bg-white px-6 py-3 font-bold text-[#4A3B2F] disabled:opacity-40">{copied?<Check size={18}/>:<Copy size={18}/>} {copied?"Copied":"Copy result"}</button></div>
  </section>;
}
