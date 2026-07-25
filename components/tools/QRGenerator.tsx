"use client";

import { useState } from "react";
import { Download, QrCode, Sparkles } from "lucide-react";
// @ts-expect-error qrcode package does not ship complete TypeScript declarations: qrcode has no types in this project
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  async function generateQR() {
    if (!text.trim()) return;
    const url = await QRCode.toDataURL(text, {
      width: 720,
      margin: 2,
      color: { dark: "#2D241C", light: "#FFFDF9" },
    });
    setImage(url);
  }

  function downloadQR() {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "alltoolkit-qr.png";
    link.click();
  }

  return (
    <section className="grid gap-6 rounded-[2rem] border border-[#E4D3C1] bg-[#FFFDF9]/90 p-5 shadow-[0_24px_70px_rgba(91,62,38,.12)] sm:p-8 lg:grid-cols-[1.15fr_.85fr]">
      <div>
        <label className="mb-3 block font-black text-[#2D241C]">Text or URL</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          className="h-44 w-full resize-none rounded-2xl border border-[#DCC6B0] bg-[#FCF7F1] p-5 text-[#2D241C] outline-none transition placeholder:text-[#B09A87] focus:border-[#A7744D] focus:ring-4 focus:ring-[#D9BEA5]/30"
        />

        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={generateQR} className="flex items-center gap-2 rounded-xl bg-[#A7744D] px-6 py-3 font-bold text-white shadow-[0_10px_24px_rgba(167,116,77,.25)] transition hover:-translate-y-0.5 hover:bg-[#8F613F]">
            <Sparkles size={18} /> Generate QR code
          </button>
          <button onClick={downloadQR} disabled={!image} className="flex items-center gap-2 rounded-xl border border-[#DCC6B0] bg-[#FFFCF8] px-6 py-3 font-bold text-[#4A3B2F] transition hover:bg-[#F7EEE5] disabled:cursor-not-allowed disabled:opacity-45">
            <Download size={18} /> Download
          </button>
        </div>

        <p className="mt-6 text-sm leading-6 text-[#7A6858]">Your QR code is generated locally and is never uploaded.</p>
      </div>

      <div className="flex min-h-[330px] items-center justify-center rounded-3xl border border-dashed border-[#D5B99D] bg-[#F8F1E9] p-6">
        {image ? (
          <img src={image} alt="Generated QR Code" className="h-64 w-64 rounded-2xl border border-[#E4D3C1] bg-white p-3 shadow-[0_14px_35px_rgba(91,62,38,.12)]" />
        ) : (
          <div className="text-center text-[#9A826E]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFE0D1] text-[#A7744D]"><QrCode size={32} /></div>
            <p className="mt-4 font-bold">Your QR code will appear here</p>
          </div>
        )}
      </div>
    </section>
  );
}
