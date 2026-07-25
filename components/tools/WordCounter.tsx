"use client";

import { useMemo, useState } from "react";
import { BookOpen, Clock, FileText, Type } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length ?? (trimmed ? 1 : 0);
    const readingTime = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));
    const paragraphs = trimmed ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
    return { words, characters, charactersNoSpaces, sentences, readingTime, paragraphs };
  }, [text]);

  const cards = [
    { title: "Words", value: stats.words, icon: FileText },
    { title: "Characters", value: stats.characters, icon: Type },
    { title: "Sentences", value: stats.sentences, icon: BookOpen },
    { title: "Reading time", value: `${stats.readingTime} min`, icon: Clock },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_24px_70px_rgba(91,62,38,.12)] sm:p-8">
        <div className="mb-3 flex items-center justify-between"><label className="font-black text-[#2D241C]">Your text</label><button onClick={() => setText("")} className="text-sm font-bold text-[#A7744D] transition hover:text-[#805436]">Clear</button></div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing or paste your text here..." className="h-72 w-full resize-none rounded-2xl border border-[#DCC6B0] bg-[#FCF7F1] p-5 text-lg leading-8 text-[#2D241C] outline-none transition placeholder:text-[#B09A87] focus:border-[#A7744D] focus:ring-4 focus:ring-[#D9BEA5]/30" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-3xl border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_14px_40px_rgba(91,62,38,.08)]">
              <div className="flex items-center gap-3"><div className="rounded-xl bg-[#F3E6D8] p-3 text-[#A7744D]"><Icon size={21} /></div><span className="font-bold text-[#6B5B4D]">{card.title}</span></div>
              <p className="mt-5 text-4xl font-black text-[#2D241C]">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 rounded-3xl border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 sm:grid-cols-2 sm:p-6">
        <div className="rounded-2xl bg-[#F8F1E9] p-5"><p className="text-sm font-semibold text-[#7A6858]">Characters without spaces</p><p className="mt-2 text-2xl font-black text-[#2D241C]">{stats.charactersNoSpaces}</p></div>
        <div className="rounded-2xl bg-[#F8F1E9] p-5"><p className="text-sm font-semibold text-[#7A6858]">Paragraphs</p><p className="mt-2 text-2xl font-black text-[#2D241C]">{stats.paragraphs}</p></div>
      </div>
    </section>
  );
}
