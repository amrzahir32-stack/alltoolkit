"use client";

import { FormEvent, useMemo, useState } from "react";
import { Lightbulb, Mail, MessageSquareText, Send } from "lucide-react";

const email = "amrzahir32@gmail.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Tool idea for AllToolkit");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const body = [name.trim() ? `Name: ${name.trim()}` : "", "", message.trim()]
      .filter(Boolean)
      .join("\n");

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, subject, message]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailto;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="rounded-3xl border border-[#E4D3C1] bg-[#FFFDF9] p-6 shadow-[0_18px_55px_rgba(120,90,60,.10)] sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2E5D7] text-[#A7744D]">
          <Lightbulb className="h-7 w-7" />
        </div>
        <h2 className="mt-6 text-2xl font-black text-[#2D241C]">Help shape AllToolkit</h2>
        <p className="mt-3 leading-7 text-[#6B5B4D]">
          Found a bug, have a useful tool idea, or want to suggest an improvement? Send it directly to the creator.
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-[#E4D3C1] bg-white px-4 py-4 font-bold text-[#8E6240] transition hover:border-[#B98A61] hover:bg-[#FFF9F3]"
        >
          <Mail className="h-5 w-5" />
          <span className="break-all">{email}</span>
        </a>
        <p className="mt-4 text-sm leading-6 text-[#8B7A6C]">
          This form opens your email app. AllToolkit does not store the information you type here.
        </p>
      </aside>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[#E4D3C1] bg-[#FFFDF9] p-6 shadow-[0_18px_55px_rgba(120,90,60,.10)] sm:p-8"
      >
        <div className="flex items-center gap-3">
          <MessageSquareText className="h-6 w-6 text-[#A7744D]" />
          <h2 className="text-2xl font-black text-[#2D241C]">Send a message</h2>
        </div>

        <div className="mt-7 grid gap-5">
          <label className="grid gap-2 font-bold text-[#4D4035]">
            Your name <span className="text-sm font-normal text-[#8B7A6C]">(optional)</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="min-h-12 rounded-2xl border border-[#E4D3C1] bg-white px-4 font-normal outline-none transition focus:border-[#B98A61] focus:ring-4 focus:ring-[#D8B897]/20"
            />
          </label>

          <label className="grid gap-2 font-bold text-[#4D4035]">
            Subject
            <input
              required
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="min-h-12 rounded-2xl border border-[#E4D3C1] bg-white px-4 font-normal outline-none transition focus:border-[#B98A61] focus:ring-4 focus:ring-[#D8B897]/20"
            />
          </label>

          <label className="grid gap-2 font-bold text-[#4D4035]">
            Message
            <textarea
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Describe your idea, issue, or suggestion..."
              rows={7}
              className="resize-y rounded-2xl border border-[#E4D3C1] bg-white px-4 py-3 font-normal outline-none transition focus:border-[#B98A61] focus:ring-4 focus:ring-[#D8B897]/20"
            />
          </label>

          <button
            type="submit"
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C49A6C] to-[#A7744D] px-6 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Send className="h-5 w-5" />
            Open email app
          </button>
        </div>
      </form>
    </div>
  );
}
