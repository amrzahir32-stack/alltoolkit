"use client";
import { useMemo, useState } from "react";
import { Copy, Download, RefreshCw } from "lucide-react";
import type { ExtraTool } from "@/data/extraTools";

const card="rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-5 shadow-[0_16px_45px_rgba(91,62,38,.08)] sm:p-7";
const input="w-full rounded-2xl border border-[#E7D8C7] bg-white px-4 py-3 text-[#2D241C] outline-none focus:border-[#A7744D] focus:ring-4 focus:ring-[#A7744D]/10";
const btn="rounded-2xl bg-[#A7744D] px-5 py-3 font-bold text-white transition hover:bg-[#8F603E] active:scale-[.98]";
const fmt=(n:number)=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(n):"—";

function textOp(slug:string,s:string){
 const lines=s.split(/\r?\n/); const words=s.trim().split(/\s+/).filter(Boolean);
 switch(slug){
  case"reverse-text":return [...s].reverse().join(""); case"reverse-words":return words.reverse().join(" ");
  case"remove-empty-lines":return lines.filter(x=>x.trim()).join("\n"); case"alphabetical-sort":return [...lines].sort((a,b)=>a.localeCompare(b)).join("\n");
  case"sentence-case":return s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,m=>m.toUpperCase());
  case"word-frequency":{const m=new Map<string,number>();words.forEach(w=>{w=w.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu,"");if(w)m.set(w,(m.get(w)||0)+1)});return [...m].sort((a,b)=>b[1]-a[1]).map(([w,c])=>`${w}: ${c}`).join("\n")}
  case"character-frequency":{const m=new Map<string,number>();[...s].filter(c=>!/^\s$/.test(c)).forEach(c=>m.set(c,(m.get(c)||0)+1));return [...m].sort((a,b)=>b[1]-a[1]).map(([c,n])=>`${c}: ${n}`).join("\n")}
  case"extract-emails":return [...new Set(s.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)||[])].join("\n");
  case"extract-urls":return [...new Set(s.match(/https?:\/\/[^\s<>"']+/gi)||[])].join("\n");
  case"remove-html-tags":return s.replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  case"rot13":return s.replace(/[a-zA-Z]/g,c=>String.fromCharCode((c<="Z"?65:97)+(c.charCodeAt(0)-(c<="Z"?65:97)+13)%26));
  case"text-to-binary":return [...s].map(c=>c.charCodeAt(0).toString(2).padStart(8,"0")).join(" ");
  case"binary-to-text":return s.trim().split(/\s+/).map(x=>String.fromCharCode(parseInt(x,2))).join("");
  case"text-to-ascii":return [...s].map(c=>c.charCodeAt(0)).join(" "); case"ascii-to-text":return s.trim().split(/[\s,]+/).map(x=>String.fromCharCode(Number(x))).join("");
  case"whitespace-normalizer":return s.replace(/[ \t]+/g," ").replace(/\n{3,}/g,"\n\n").trim();
  case"duplicate-word-remover":{const seen=new Set<string>();return words.filter(w=>{const k=w.toLowerCase();if(seen.has(k))return false;seen.add(k);return true}).join(" ")}
  case"word-shuffler":return [...words].sort(()=>Math.random()-.5).join(" ");
  case"remove-duplicate-lines":{const seen=new Set<string>();return lines.filter(line=>{const key=line.trim().toLowerCase();if(!key||seen.has(key))return false;seen.add(key);return true}).join("\n")}
  case"count-lines":{const nonEmpty=lines.filter(line=>line.trim());const unique=new Set(nonEmpty.map(line=>line.trim().toLowerCase()));return `Total lines: ${lines.length}\nNon-empty lines: ${nonEmpty.length}\nUnique non-empty lines: ${unique.size}`}
  case"extract-numbers":return (s.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g)||[]).join("\n");
  case"extract-hashtags":return [...new Set(s.match(/#[\p{L}\p{N}_]+/gu)||[])].join("\n");
  case"markdown-to-text":return s.replace(/```[\s\S]*?```/g,m=>m.replace(/```\w*\n?|```/g,"")).replace(/`([^`]+)`/g,"$1").replace(/!\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/^\s*>\s?/gm,"").replace(/[*_~]{1,3}/g,"").replace(/^\s*[-+*]\s+/gm,"• ").trim();
  case"json-string-escape":return JSON.stringify(s).slice(1,-1);
  case"initials-generator":return lines.map(line=>line.trim().split(/\s+/).filter(Boolean).map(part=>part[0]?.toUpperCase()||"").join("")).filter(Boolean).join("\n");
  case"meeting-agenda-maker":{const topics=lines.map(x=>x.trim()).filter(Boolean);return topics.map((topic,index)=>`${index+1}. ${topic} — 10 min`).join("\n")+`\n\nTotal planned time: ${topics.length*10} minutes`}
  default:return s;
 }
}

const conv:Record<string,{units:string[],factor:(v:number,from:string,to:string)=>number}>={
 "file-size-converter":{units:["B","KB","MB","GB","TB"],factor:(v,f,t)=>v*1024**(["B","KB","MB","GB","TB"].indexOf(f)-["B","KB","MB","GB","TB"].indexOf(t))},
 "length-converter":{units:["mm","cm","m","km","in","ft","yd","mi"],factor:(v,f,t)=>v*({mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344} as any)[f]/({mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344} as any)[t]},
 "weight-converter":{units:["mg","g","kg","oz","lb"],factor:(v,f,t)=>v*({mg:.000001,g:.001,kg:1,oz:.0283495,lb:.453592} as any)[f]/({mg:.000001,g:.001,kg:1,oz:.0283495,lb:.453592} as any)[t]},
 "speed-converter":{units:["m/s","km/h","mph","kn"],factor:(v,f,t)=>v*({"m/s":1,"km/h":.2777778,mph:.44704,kn:.514444} as any)[f]/({"m/s":1,"km/h":.2777778,mph:.44704,kn:.514444} as any)[t]},
 "area-converter":{units:["m²","km²","ha","acre","ft²"],factor:(v,f,t)=>v*({"m²":1,"km²":1e6,ha:1e4,acre:4046.8564224,"ft²":.092903} as any)[f]/({"m²":1,"km²":1e6,ha:1e4,acre:4046.8564224,"ft²":.092903} as any)[t]},
 "volume-converter":{units:["mL","L","m³","cup","gal"],factor:(v,f,t)=>v*({mL:.001,L:1,"m³":1000,cup:.236588,gal:3.78541} as any)[f]/({mL:.001,L:1,"m³":1000,cup:.236588,gal:3.78541} as any)[t]},
 "pressure-converter":{units:["Pa","kPa","bar","psi","atm"],factor:(v,f,t)=>v*({Pa:1,kPa:1000,bar:1e5,psi:6894.757,atm:101325} as any)[f]/({Pa:1,kPa:1000,bar:1e5,psi:6894.757,atm:101325} as any)[t]},
 "energy-converter":{units:["J","kJ","cal","kcal","kWh"],factor:(v,f,t)=>v*({J:1,kJ:1000,cal:4.184,kcal:4184,kWh:3.6e6} as any)[f]/({J:1,kJ:1000,cal:4.184,kcal:4184,kWh:3.6e6} as any)[t]},
 "angle-converter":{units:["degree","radian","gradian"],factor:(v,f,t)=>v*({degree:Math.PI/180,radian:1,gradian:Math.PI/200} as any)[f]/({degree:Math.PI/180,radian:1,gradian:Math.PI/200} as any)[t]},
 "data-rate-converter":{units:["bps","Kbps","Mbps","Gbps"],factor:(v,f,t)=>v*1000**(["bps","Kbps","Mbps","Gbps"].indexOf(f)-["bps","Kbps","Mbps","Gbps"].indexOf(t))},
 "time-unit-converter":{units:["second","minute","hour","day","week"],factor:(v,f,t)=>v*({second:1,minute:60,hour:3600,day:86400,week:604800} as any)[f]/({second:1,minute:60,hour:3600,day:86400,week:604800} as any)[t]},
 "cooking-converter":{units:["mL","tsp","tbsp","cup"],factor:(v,f,t)=>v*({mL:1,tsp:4.92892,tbsp:14.7868,cup:236.588} as any)[f]/({mL:1,tsp:4.92892,tbsp:14.7868,cup:236.588} as any)[t]},
 "pixels-rem-converter":{units:["px","rem"],factor:(v,f,t)=>f===t?v:f==="px"?v/16:v*16},
 "frequency-converter":{units:["Hz","kHz","MHz","GHz"],factor:(v,f,t)=>v*1000**(["Hz","kHz","MHz","GHz"].indexOf(f)-["Hz","kHz","MHz","GHz"].indexOf(t))},
};

function numberResult(slug:string,a:number,b:number,c:number,d:number){switch(slug){
 case"rectangle-area":return `Area: ${fmt(a*b)}\nPerimeter: ${fmt(2*(a+b))}`; case"circle-area":return `Area: ${fmt(Math.PI*a*a)}\nCircumference: ${fmt(2*Math.PI*a)}`;
 case"triangle-area":return `Area: ${fmt(a*b/2)}`; case"box-volume":return `Volume: ${fmt(a*b*c)}`; case"cylinder-volume":return `Volume: ${fmt(Math.PI*a*a*b)}\nSurface area: ${fmt(2*Math.PI*a*(a+b))}`;
 case"speed-calculator":return `Speed: ${fmt(a/b)}`; case"distance-calculator":return `Distance: ${fmt(a*b)}`; case"time-calculator":return `Time: ${fmt(a/b)}`;
 case"simple-interest":{const i=a*b*c/100;return `Interest: ${fmt(i)}\nFinal balance: ${fmt(a+i)}`}; case"profit-margin":{const p=b-a;return `Profit: ${fmt(p)}\nMargin: ${fmt(p/b*100)}%\nMarkup: ${fmt(p/a*100)}%`};
 case"markup-calculator":return `Selling price: ${fmt(a*(1+b/100))}`; case"break-even-calculator":return `Break-even units: ${fmt(Math.ceil(a/(b-c)))}`;
 case"savings-goal":return `Required per month: ${fmt((a-b)/c)}`; case"fuel-cost":return `Fuel needed: ${fmt(a/b)} L\nEstimated cost: ${fmt(a/b*c)}`;
 case"electricity-cost":return `Energy: ${fmt(a*b*c/1000)} kWh\nEstimated cost: ${fmt(a*b*c/1000*d)}`; case"aspect-ratio":return `Scaled height: ${fmt(b/a*c)} px`;
 case"dpi-calculator":return `DPI: ${fmt(a/b)}`; case"study-hours":return `Hours per subject per day: ${fmt(a/b/c)}`; case"exam-score-average":return `Average: ${fmt((a+b+c+d)/4)}`;
 case"semester-progress":return `Semester complete: ${fmt(Math.min(100,Math.max(0,(a/b)*100)))}%`; case"typing-speed":return `Gross WPM: ${fmt(a/b)}\nAccuracy: ${fmt(c/a*100)}%`;
 case"meeting-cost":return `Estimated meeting cost: ${fmt(a*b*c/60)}`;
 case"percentage-change-pro":return `Change: ${fmt(b-a)}\nPercentage change: ${fmt(a===0?NaN:(b-a)/Math.abs(a)*100)}%`;
 case"discount-savings":return `Savings: ${fmt(a*b/100)}\nFinal price: ${fmt(a*(1-b/100))}`;
 case"roi-calculator":return `Profit: ${fmt(b-a)}\nROI: ${fmt(a===0?NaN:(b-a)/a*100)}%`;
 case"commission-calculator":return `Commission: ${fmt(a*b/100)}\nRemaining revenue: ${fmt(a*(1-b/100))}`;
 case"hourly-rate-calculator":return `Estimated hourly rate: ${fmt(a/(Math.max(1,b)*Math.max(1,c)))}`;
 case"rent-affordability":return `Suggested monthly rent limit: ${fmt(a*b/100)}`;
 case"download-time-calculator":{const seconds=(a*8)/Math.max(.000001,b);return `Estimated time: ${fmt(seconds)} seconds\n${fmt(seconds/60)} minutes`};
 case"water-intake-calculator":return `Estimated daily water: ${fmt(a*0.033)} L`;
 case"calories-per-meal":return `Calories per meal: ${fmt((a-d*c)/Math.max(1,b))}\nSnack calories total: ${fmt(d*c)}`;
 case"screen-density-converter":return `Physical pixels: ${fmt(a*b)} px`;
 default:return"Enter values to calculate."}}


const numberLabels:Record<string,string[]>={
 "percentage-change-pro":["Starting value","New value","Unused","Unused"],
 "discount-savings":["Original price","Discount %","Unused","Unused"],
 "roi-calculator":["Investment cost","Final value","Unused","Unused"],
 "commission-calculator":["Revenue","Commission %","Unused","Unused"],
 "hourly-rate-calculator":["Annual salary","Workweeks / year","Hours / week","Unused"],
 "rent-affordability":["Monthly income","Rent ratio %","Unused","Unused"],
 "download-time-calculator":["File size (MB)","Speed (Mbps)","Unused","Unused"],
 "water-intake-calculator":["Body weight (kg)","Unused","Unused","Unused"],
 "calories-per-meal":["Daily calories","Meals","Snacks","Calories / snack"],
 "screen-density-converter":["CSS pixels","Device pixel ratio","Unused","Unused"],
};

export default function UniversalTool({tool}:{tool:ExtraTool}){
 const [text,setText]=useState(""); const [a,setA]=useState(10),[b,setB]=useState(2),[c,setC]=useState(1),[d,setD]=useState(1); const [from,setFrom]=useState(""),[to,setTo]=useState("");
 const converter=conv[tool.id]; const computed=useMemo(()=>tool.kind==="text"?textOp(tool.id,text):tool.kind==="number"?numberResult(tool.id,a,b,c,d):"",[tool.id,tool.kind,text,a,b,c,d]);
 const copy=async()=>navigator.clipboard.writeText(computed);
 if(tool.kind==="text")return <div className="grid gap-5 lg:grid-cols-2"><div className={card}><label className="mb-2 block font-bold text-[#2D241C]">Input</label><textarea value={text} onChange={e=>setText(e.target.value)} className={`${input} min-h-72 resize-y`} placeholder="Paste or type here…"/></div><div className={card}><div className="mb-2 flex items-center justify-between"><label className="font-bold text-[#2D241C]">Result</label><button onClick={copy} className="flex items-center gap-2 text-sm font-bold text-[#A7744D]"><Copy size={16}/>Copy</button></div><textarea readOnly value={computed} className={`${input} min-h-72 resize-y bg-[#FFF9F2]`}/></div></div>;
 if(tool.kind==="number"){const labels=numberLabels[tool.id]||["Value 1","Value 2","Value 3","Value 4"];return <div className={card}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[a,setA,labels[0]],[b,setB,labels[1]],[c,setC,labels[2]],[d,setD,labels[3]]].filter(([, ,label])=>label!=="Unused").map(([v,set,label],i)=><label key={i} className="font-bold text-[#2D241C]">{label as string}<input type="number" value={v as number} onChange={e=>(set as any)(Number(e.target.value))} className={`${input} mt-2`}/></label>)}</div><pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-[#F6EBDD] p-5 text-lg font-bold text-[#5D432F]">{computed}</pre></div>}
 if(tool.kind==="converter"){
  if(tool.id==="number-base-converter") return <BaseConverter/>; if(tool.id==="roman-numeral-converter")return <RomanConverter/>; if(tool.id==="temperature-converter-pro")return <TemperatureConverter/>;
  const units=converter?.units||[]; const f=from||units[0],t=to||units[1]; const result=converter?converter.factor(a,f,t):0;
  return <div className={card}><div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]"><div><input type="number" value={a} onChange={e=>setA(Number(e.target.value))} className={input}/><select value={f} onChange={e=>setFrom(e.target.value)} className={`${input} mt-3`}>{units.map(u=><option key={u}>{u}</option>)}</select></div><div className="self-center text-center text-2xl text-[#A7744D]">→</div><div><div className={`${input} bg-[#FFF9F2] font-bold`}>{fmt(result)}</div><select value={t} onChange={e=>setTo(e.target.value)} className={`${input} mt-3`}>{units.map(u=><option key={u}>{u}</option>)}</select></div></div></div>;
 }
 return <Generator slug={tool.id}/>;
}
function Generator({slug}:{slug:string}){const [input,setInput]=useState("Alice\nBob\nCharlie\nDiana"),[n,setN]=useState(6),[out,setOut]=useState(""); const run=()=>{let r="";const cryptoInt=(max:number)=>crypto.getRandomValues(new Uint32Array(1))[0]%max; switch(slug){case"random-number":r=String(Math.floor(Math.random()*Math.max(1,n))+1);break;case"random-password-pin":r=Array.from({length:n},()=>cryptoInt(10)).join("");break;case"coin-flipper":r=Array.from({length:n},()=>Math.random()<.5?"Heads":"Tails").join(", ");break;case"dice-roller":r=Array.from({length:n},()=>1+cryptoInt(6)).join(", ");break;case"team-generator":{const names=input.split(/\n/).filter(Boolean).sort(()=>Math.random()-.5);const teams=Math.max(2,n);r=Array.from({length:teams},(_,i)=>`Team ${i+1}: ${names.filter((_,j)=>j%teams===i).join(", ")}`).join("\n");break}case"username-generator":{const base=input.trim().split(/\s+/)[0]||"user";r=Array.from({length:n},()=>`${base.toLowerCase()}${cryptoInt(9999)}`).join("\n");break}case"strong-passphrase":{const w=["amber","river","quiet","falcon","maple","orbit","silver","canyon","velvet","sunrise","panda","harbor"];r=Array.from({length:n},()=>w[cryptoInt(w.length)]).join("-");break}case"random-color":{const h=cryptoInt(0xffffff).toString(16).padStart(6,"0");r=`#${h}`;break}case"gradient-generator":{const h1=cryptoInt(0xffffff).toString(16).padStart(6,"0"),h2=cryptoInt(0xffffff).toString(16).padStart(6,"0");r=`linear-gradient(135deg, #${h1}, #${h2})`;break}case"placeholder-image":r="Click Download to create your placeholder image.";break;case"study-topic-picker":r=(input.split(/\n/).filter(Boolean).sort(()=>Math.random()-.5)[0]||"Add topics first");break;case"decision-maker":r=Math.random()<.5?"Yes":"No";break;case"random-list-item":{const values=input.split(/\n/).map(x=>x.trim()).filter(Boolean);r=Array.from({length:Math.min(n,values.length)},()=>values.splice(cryptoInt(values.length),1)[0]).filter(Boolean).join("\n");break}case"random-date":{const start=new Date(2020,0,1).getTime(),end=new Date(2030,11,31).getTime();r=Array.from({length:n},()=>new Date(start+Math.random()*(end-start)).toISOString().slice(0,10)).join("\n");break}case"study-break-picker":r=(input.split(/\n/).map(x=>x.trim()).filter(Boolean).sort(()=>Math.random()-.5)[0]||"Stretch for two minutes");break}setOut(r)};const download=()=>{const canvas=document.createElement("canvas");canvas.width=800;canvas.height=450;const x=canvas.getContext("2d")!;x.fillStyle="#F3E6D8";x.fillRect(0,0,800,450);x.fillStyle="#A7744D";x.font="bold 42px Arial";x.textAlign="center";x.fillText("800 × 450",400,230);const a=document.createElement("a");a.href=canvas.toDataURL("image/png");a.download="alltoolkit-placeholder.png";a.click()};return <div className={card}><label className="font-bold text-[#2D241C]">List or keyword<textarea value={input} onChange={e=>setInput(e.target.value)} className={`${inputClass} mt-2 min-h-32`}/></label><label className="mt-4 block font-bold text-[#2D241C]">Amount / teams / length<input type="number" min="1" max="100" value={n} onChange={e=>setN(Number(e.target.value))} className={`${inputClass} mt-2`}/></label><div className="mt-5 flex flex-wrap gap-3"><button onClick={run} className={btn}><RefreshCw className="mr-2 inline" size={17}/>Generate</button>{slug==="placeholder-image"&&<button onClick={download} className={btn}><Download className="mr-2 inline" size={17}/>Download PNG</button>}</div><pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#F6EBDD] p-5 font-bold text-[#5D432F]">{out||"Your result will appear here."}</pre></div>}
const inputClass=input;
function BaseConverter(){const [v,setV]=useState("255"),[from,setFrom]=useState(10),[to,setTo]=useState(16);let r="Invalid value";try{r=parseInt(v,from).toString(to).toUpperCase()}catch{}return <div className={card}><input value={v} onChange={e=>setV(e.target.value)} className={input}/><div className="mt-4 grid grid-cols-2 gap-4"><select value={from} onChange={e=>setFrom(Number(e.target.value))} className={input}>{[2,8,10,16].map(x=><option key={x} value={x}>Base {x}</option>)}</select><select value={to} onChange={e=>setTo(Number(e.target.value))} className={input}>{[2,8,10,16].map(x=><option key={x} value={x}>Base {x}</option>)}</select></div><div className="mt-5 rounded-2xl bg-[#F6EBDD] p-5 text-xl font-bold text-[#5D432F]">{r}</div></div>}
function RomanConverter(){const [v,setV]=useState("2026");const toRoman=(num:number)=>{const map:any={M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};let s="";for(const k in map)while(num>=map[k]){s+=k;num-=map[k]}return s};const fromRoman=(s:string)=>{const m:any={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};return [...s.toUpperCase()].reduce((a,c,i,arr)=>a+(m[c]<(m[arr[i+1]]||0)?-m[c]:m[c]),0)};const r=/^\d+$/.test(v)?toRoman(Number(v)):String(fromRoman(v));return <div className={card}><input value={v} onChange={e=>setV(e.target.value)} className={input}/><div className="mt-5 rounded-2xl bg-[#F6EBDD] p-5 text-xl font-bold text-[#5D432F]">{r}</div></div>}
function TemperatureConverter(){const [v,setV]=useState(20),[f,setF]=useState("C"),[t,setT]=useState("F");const toC=f==="C"?v:f==="F"?(v-32)*5/9:v-273.15;const r=t==="C"?toC:t==="F"?toC*9/5+32:toC+273.15;return <div className={card}><div className="grid gap-4 sm:grid-cols-2"><div><input type="number" value={v} onChange={e=>setV(Number(e.target.value))} className={input}/><select value={f} onChange={e=>setF(e.target.value)} className={`${input} mt-3`}>{["C","F","K"].map(x=><option key={x}>{x}</option>)}</select></div><div><div className={`${input} bg-[#FFF9F2] font-bold`}>{fmt(r)}</div><select value={t} onChange={e=>setT(e.target.value)} className={`${input} mt-3`}>{["C","F","K"].map(x=><option key={x}>{x}</option>)}</select></div></div></div>}
