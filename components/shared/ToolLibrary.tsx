"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ToolGrid from "./ToolGrid";
import { categories, tools } from "@/data/tools";

export default function ToolLibrary(){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All");
  const filtered=useMemo(()=>tools.filter(t=>(category==="All"||t.category===category)&&(`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(query.toLowerCase()))),[query,category]);
  return <>
    <div className="mb-10 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-4 shadow-[0_16px_45px_rgba(91,62,38,.08)] sm:p-6">
      <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7744D]" size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${tools.length} tools…`} className="w-full rounded-2xl border border-[#E7D8C7] bg-white py-4 pl-12 pr-4 text-[#2D241C] outline-none focus:border-[#A7744D] focus:ring-4 focus:ring-[#A7744D]/10"/></div>
      <div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>setCategory("All")} className={`rounded-full px-4 py-2 text-sm font-bold ${category==="All"?"bg-[#A7744D] text-white":"bg-[#F3E6D8] text-[#8B6547]"}`}>All ({tools.length})</button>{categories.map(c=>{const count=tools.filter(t=>t.category===c.title).length;return <button key={c.slug} onClick={()=>setCategory(c.title)} className={`rounded-full px-4 py-2 text-sm font-bold ${category===c.title?"bg-[#A7744D] text-white":"bg-[#F3E6D8] text-[#8B6547]"}`}>{c.title} ({count})</button>})}</div>
    </div>
    <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-black text-[#2D241C]">{category} tools</h2><span className="text-sm font-bold text-[#6B5B4D]">{filtered.length} result{filtered.length!==1?"s":""}</span></div>
    {filtered.length?<ToolGrid items={filtered}/>:<div className="rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-12 text-center text-[#6B5B4D]">No tools match your search.</div>}
  </>;
}
