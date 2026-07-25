"use client";

import { useMemo, useState } from "react";

function Input({ label, value, onChange, suffix }: { label: string; value: number; onChange: (value: number) => void; suffix?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#6B5B4D]">{label}</span>
      <div className="relative">
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full rounded-xl border border-[#DCC6B0] bg-[#FCF7F1] px-4 py-3 text-lg font-semibold text-[#2D241C] outline-none transition focus:border-[#A7744D] focus:ring-4 focus:ring-[#D9BEA5]/30" />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#9A826E]">{suffix}</span>}
      </div>
    </label>
  );
}

function Card({ title, children, result }: { title: string; children: React.ReactNode; result: string }) {
  return (
    <div className="rounded-3xl border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_16px_45px_rgba(91,62,38,.09)] sm:p-6">
      <h2 className="text-xl font-black text-[#2D241C]">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
      <div className="mt-6 rounded-2xl bg-[#F3E6D8] p-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B6B50]">Result</p><p className="mt-2 break-all text-4xl font-black text-[#A7744D]">{result}</p></div>
    </div>
  );
}

export default function PercentageCalculator() {
  const [percent, setPercent] = useState(20);
  const [number, setNumber] = useState(100);
  const [increaseNumber, setIncreaseNumber] = useState(100);
  const [increasePercent, setIncreasePercent] = useState(15);
  const [decreaseNumber, setDecreaseNumber] = useState(100);
  const [decreasePercent, setDecreasePercent] = useState(15);
  const [part, setPart] = useState(20);
  const [whole, setWhole] = useState(80);

  const percentOf = useMemo(() => ((percent / 100) * number).toFixed(2), [percent, number]);
  const increased = useMemo(() => (increaseNumber * (1 + increasePercent / 100)).toFixed(2), [increaseNumber, increasePercent]);
  const decreased = useMemo(() => (decreaseNumber * (1 - decreasePercent / 100)).toFixed(2), [decreaseNumber, decreasePercent]);
  const whatPercent = useMemo(() => whole === 0 ? "0.00%" : `${((part / whole) * 100).toFixed(2)}%`, [part, whole]);

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <Card title="What is X% of Y?" result={percentOf}><Input label="Percentage" value={percent} onChange={setPercent} suffix="%" /><Input label="Number" value={number} onChange={setNumber} /></Card>
      <Card title="Increase by percentage" result={increased}><Input label="Starting number" value={increaseNumber} onChange={setIncreaseNumber} /><Input label="Increase" value={increasePercent} onChange={setIncreasePercent} suffix="%" /></Card>
      <Card title="Decrease by percentage" result={decreased}><Input label="Starting number" value={decreaseNumber} onChange={setDecreaseNumber} /><Input label="Decrease" value={decreasePercent} onChange={setDecreasePercent} suffix="%" /></Card>
      <Card title="X is what percentage of Y?" result={whatPercent}><Input label="Part (X)" value={part} onChange={setPart} /><Input label="Whole (Y)" value={whole} onChange={setWhole} /></Card>
    </section>
  );
}
