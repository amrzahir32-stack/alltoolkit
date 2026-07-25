"use client";

import { useEffect, useRef, useState } from "react";

const panel = "rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 shadow-[0_16px_45px_rgba(91,62,38,.08)] sm:p-8";
const input = "w-full rounded-2xl border border-[#E7D8C7] bg-white px-4 py-3 text-[#2D241C] outline-none transition focus:border-[#A7744D] focus:ring-4 focus:ring-[#A7744D]/10";
const button = "rounded-2xl bg-[#A7744D] px-5 py-3 font-bold text-white transition hover:bg-[#8F603D] disabled:cursor-not-allowed disabled:opacity-50";
const secondary = "rounded-2xl border border-[#D9C4AE] bg-[#FFF9F2] px-5 py-3 font-bold text-[#8F603D] transition hover:bg-[#F3E6D8]";
const label = "mb-2 block text-sm font-bold text-[#4A3A2E]";

function download(bytes: Uint8Array | Blob, name: string, type = "application/octet-stream") {
  const blob = bytes instanceof Blob ? bytes : new Blob([bytes as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}
function FilePicker({ accept, multiple, onChange }: { accept: string; multiple?: boolean; onChange: (files: File[]) => void }) {
  return <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#D9C4AE] bg-[#FFF9F2] px-6 text-center transition hover:border-[#A7744D] hover:bg-[#F8EDE1]"><span className="text-lg font-black text-[#2D241C]">Choose or drop files</span><span className="mt-2 text-sm text-[#6B5B4D]">Your files stay in your browser.</span><input className="hidden" type="file" accept={accept} multiple={multiple} onChange={e=>onChange(Array.from(e.target.files||[]))}/></label>;
}

export function PdfMergeTool(){const [files,setFiles]=useState<File[]>([]);const [busy,setBusy]=useState(false);async function run(){if(files.length<2)return;setBusy(true);try{const {PDFDocument}=await import("pdf-lib");const out=await PDFDocument.create();for(const f of files){const src=await PDFDocument.load(await f.arrayBuffer());const pages=await out.copyPages(src,src.getPageIndices());pages.forEach((p: any)=>out.addPage(p));}download(await out.save(),"merged.pdf","application/pdf");}finally{setBusy(false)}}return <div className={panel}><FilePicker accept="application/pdf" multiple onChange={setFiles}/><div className="mt-5 space-y-2">{files.map((f,i)=><div key={i} className="rounded-xl bg-[#F7F0E9] px-4 py-3 text-sm font-semibold text-[#4A3A2E]">{i+1}. {f.name}</div>)}</div><button className={`${button} mt-5`} disabled={files.length<2||busy} onClick={run}>{busy?"Merging…":"Merge PDFs"}</button></div>}

export function PdfSplitTool(){const [file,setFile]=useState<File|null>(null);const [range,setRange]=useState("1");const [busy,setBusy]=useState(false);async function run(){if(!file)return;setBusy(true);try{const {PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer());const indices=new Set<number>();range.split(",").forEach(part=>{const [a,b]=part.trim().split("-").map(Number);if(Number.isFinite(a)){for(let n=a;n<=(b||a);n++)if(n>=1&&n<=src.getPageCount())indices.add(n-1)}});const out=await PDFDocument.create();(await out.copyPages(src,[...indices])).forEach((p: any)=>out.addPage(p));download(await out.save(),"extracted-pages.pdf","application/pdf");}finally{setBusy(false)}}return <div className={panel}><FilePicker accept="application/pdf" onChange={f=>setFile(f[0]||null)}/>{file&&<p className="mt-4 font-bold text-[#4A3A2E]">{file.name}</p>}<label className={`${label} mt-5`}>Pages (example: 1-3, 5, 8)</label><input className={input} value={range} onChange={e=>setRange(e.target.value)}/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Working…":"Extract pages"}</button></div>}

export function PdfRotateTool(){const [file,setFile]=useState<File|null>(null);const [angle,setAngle]=useState(90);async function run(){if(!file)return;const {PDFDocument,degrees}=await import("pdf-lib");const pdf=await PDFDocument.load(await file.arrayBuffer());pdf.getPages().forEach((p: any)=>p.setRotation(degrees((p.getRotation().angle+angle)%360)));download(await pdf.save(),"rotated.pdf","application/pdf")}return <div className={panel}><FilePicker accept="application/pdf" onChange={f=>setFile(f[0]||null)}/><label className={`${label} mt-5`}>Rotate every page</label><select className={input} value={angle} onChange={e=>setAngle(Number(e.target.value))}><option value={90}>90° clockwise</option><option value={180}>180°</option><option value={270}>270° clockwise</option></select><button className={`${button} mt-5`} disabled={!file} onClick={run}>Rotate PDF</button></div>}

async function imageFileToPngBytes(file: File): Promise<ArrayBuffer> {
  const source = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext("2d");
  if (!context) {
    source.close();
    throw new Error("Your browser could not prepare this image.");
  }
  context.drawImage(source, 0, 0);
  source.close();
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(result => result ? resolve(result) : reject(new Error("This image could not be converted.")), "image/png");
  });
  return blob.arrayBuffer();
}

export function ImagesToPdfTool(){
  const [files,setFiles]=useState<File[]>([]);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");

  async function run(){
    if(!files.length)return;
    setBusy(true);
    setError("");
    try{
      const {PDFDocument}=await import("pdf-lib");
      const pdf=await PDFDocument.create();
      for(const file of files){
        const original=await file.arrayBuffer();
        const signature=new Uint8Array(original.slice(0,8));
        const isPng=signature.length>=8&&signature[0]===0x89&&signature[1]===0x50&&signature[2]===0x4e&&signature[3]===0x47;
        const isJpeg=signature.length>=2&&signature[0]===0xff&&signature[1]===0xd8;
        let img;
        if(isPng){
          img=await pdf.embedPng(original);
        }else if(isJpeg){
          try{
            img=await pdf.embedJpg(original);
          }catch{
            img=await pdf.embedPng(await imageFileToPngBytes(file));
          }
        }else{
          img=await pdf.embedPng(await imageFileToPngBytes(file));
        }
        const maxWidth=595.28;
        const maxHeight=841.89;
        const scale=Math.min(maxWidth/img.width,maxHeight/img.height,1);
        const width=img.width*scale;
        const height=img.height*scale;
        const page=pdf.addPage([maxWidth,maxHeight]);
        page.drawImage(img,{x:(maxWidth-width)/2,y:(maxHeight-height)/2,width,height});
      }
      download(await pdf.save(),"images.pdf","application/pdf");
    }catch(cause){
      setError(cause instanceof Error?cause.message:"One of the selected images could not be processed.");
    }finally{
      setBusy(false);
    }
  }

  return <div className={panel}><FilePicker accept="image/*" multiple onChange={selected=>{setFiles(selected);setError("")}}/><p className="mt-4 text-[#6B5B4D]">{files.length} image(s) selected</p>{error&&<p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}<button className={`${button} mt-5`} disabled={!files.length||busy} onClick={run}>{busy?"Creating PDF…":"Create PDF"}</button></div>
}

export function GpaCalculatorTool(){const [rows,setRows]=useState([{name:"Course 1",grade:14,credits:3},{name:"Course 2",grade:16,credits:3}]);const scale=20;const avg=rows.reduce((s,r)=>s+r.grade*r.credits,0)/Math.max(1,rows.reduce((s,r)=>s+r.credits,0));return <div className={panel}><div className="space-y-3">{rows.map((r,i)=><div key={i} className="grid gap-3 sm:grid-cols-[1fr_120px_120px_44px]"><input className={input} value={r.name} onChange={e=>setRows(rows.map((x,j)=>j===i?{...x,name:e.target.value}:x))}/><input className={input} type="number" min="0" max={scale} value={r.grade} onChange={e=>setRows(rows.map((x,j)=>j===i?{...x,grade:Number(e.target.value)}:x))}/><input className={input} type="number" min="0" value={r.credits} onChange={e=>setRows(rows.map((x,j)=>j===i?{...x,credits:Number(e.target.value)}:x))}/><button className={secondary} onClick={()=>setRows(rows.filter((_,j)=>j!==i))}>×</button></div>)}</div><div className="mt-5 flex flex-wrap gap-3"><button className={secondary} onClick={()=>setRows([...rows,{name:`Course ${rows.length+1}`,grade:10,credits:3}])}>Add course</button></div><div className="mt-6 rounded-3xl bg-[#F7F0E9] p-7 text-center"><div className="text-sm font-bold text-[#6B5B4D]">Weighted average</div><div className="mt-2 text-5xl font-black text-[#A7744D]">{avg.toFixed(2)} / 20</div><div className="mt-2 text-sm text-[#6B5B4D]">Approx. 4.0 GPA: {(avg/5).toFixed(2)}</div></div></div>}

export function FinalGradeTool(){const [current,setCurrent]=useState(12);const [weight,setWeight]=useState(40);const [target,setTarget]=useState(14);const needed=(target-current*(1-weight/100))/(weight/100);return <div className={panel}><div className="grid gap-4 sm:grid-cols-3"><Num title="Current grade" v={current} set={setCurrent}/><Num title="Final exam weight %" v={weight} set={setWeight}/><Num title="Target grade" v={target} set={setTarget}/></div><div className="mt-6 rounded-3xl bg-[#F7F0E9] p-7 text-center"><div className="text-sm font-bold text-[#6B5B4D]">Grade needed on the final</div><div className="mt-2 text-5xl font-black text-[#A7744D]">{Number.isFinite(needed)?needed.toFixed(2):"—"}</div><p className="mt-3 text-sm text-[#6B5B4D]">{needed>20?"The target is not reachable on a 20-point scale.":needed<0?"You have already secured the target.":"Based on the values above."}</p></div></div>}

export function GradeCalculatorTool(){const [earned,setEarned]=useState(42);const [total,setTotal]=useState(50);const percent=total?earned/total*100:0;return <div className={panel}><div className="grid gap-4 sm:grid-cols-2"><Num title="Points earned" v={earned} set={setEarned}/><Num title="Total points" v={total} set={setTotal}/></div><div className="mt-6 rounded-3xl bg-[#F7F0E9] p-7 text-center"><div className="text-5xl font-black text-[#A7744D]">{percent.toFixed(2)}%</div><div className="mt-2 font-bold text-[#4A3A2E]">Equivalent: {(percent/5).toFixed(2)} / 20</div></div></div>}

function Num({title,v,set}:{title:string;v:number;set:(n:number)=>void}){return <div><label className={label}>{title}</label><input className={input} type="number" value={v} onChange={e=>set(Number(e.target.value))}/></div>}

export function PomodoroTool(){const [work,setWork]=useState(25);const [left,setLeft]=useState(1500);const [running,setRunning]=useState(false);useEffect(()=>setLeft(work*60),[work]);useEffect(()=>{if(!running)return;const id=setInterval(()=>setLeft(x=>{if(x<=1){setRunning(false);return 0}return x-1}),1000);return()=>clearInterval(id)},[running]);const m=Math.floor(left/60),s=left%60;return <div className={`${panel} text-center`}><div className="mx-auto max-w-xs"><label className={label}>Focus minutes</label><input className={input} type="number" min="1" max="120" value={work} onChange={e=>setWork(Number(e.target.value))}/></div><div className="my-10 text-7xl font-black tabular-nums text-[#A7744D]">{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</div><div className="flex justify-center gap-3"><button className={button} onClick={()=>setRunning(!running)}>{running?"Pause":"Start"}</button><button className={secondary} onClick={()=>{setRunning(false);setLeft(work*60)}}>Reset</button></div></div>}

export function FlashcardTool(){const [cards,setCards]=useState<{q:string;a:string}[]>([]);const [q,setQ]=useState("");const [a,setA]=useState("");const [index,setIndex]=useState(0);const [flip,setFlip]=useState(false);useEffect(()=>{const x=localStorage.getItem("alltoolkit-flashcards");if(x)try{setCards(JSON.parse(x))}catch{}},[]);useEffect(()=>{localStorage.setItem("alltoolkit-flashcards",JSON.stringify(cards))},[cards]);return <div className={panel}><div className="grid gap-4 sm:grid-cols-2"><div><label className={label}>Question</label><textarea className={`${input} min-h-28`} value={q} onChange={e=>setQ(e.target.value)}/></div><div><label className={label}>Answer</label><textarea className={`${input} min-h-28`} value={a} onChange={e=>setA(e.target.value)}/></div></div><button className={`${button} mt-4`} disabled={!q||!a} onClick={()=>{setCards([...cards,{q,a}]);setQ("");setA("")}}>Add flashcard</button>{cards.length>0&&<div className="mt-7"><button onClick={()=>setFlip(!flip)} className="flex min-h-64 w-full items-center justify-center rounded-3xl bg-[#F7F0E9] p-8 text-center text-2xl font-black text-[#2D241C]">{flip?cards[index].a:cards[index].q}</button><div className="mt-4 flex flex-wrap justify-center gap-3"><button className={secondary} onClick={()=>{setIndex((index-1+cards.length)%cards.length);setFlip(false)}}>Previous</button><button className={secondary} onClick={()=>setFlip(!flip)}>Flip</button><button className={secondary} onClick={()=>{setIndex((index+1)%cards.length);setFlip(false)}}>Next</button><button className={secondary} onClick={()=>{setCards(cards.filter((_,i)=>i!==index));setIndex(0)}}>Delete</button></div></div>}</div>}

export function CitationGeneratorTool(){const [type,setType]=useState("APA");const [author,setAuthor]=useState("");const [title,setTitle]=useState("");const [site,setSite]=useState("");const [year,setYear]=useState(new Date().getFullYear().toString());const [url,setUrl]=useState("");const result=type==="APA"?`${author || "Author"}. (${year}). ${title || "Title"}. ${site || "Website"}. ${url}`:type==="MLA"?`${author || "Author"}. “${title || "Title"}.” ${site || "Website"}, ${year}, ${url}.`:`${author || "Author"}. ${year}. “${title || "Title"}.” ${site || "Website"}. ${url}.`;return <div className={panel}><div className="grid gap-4 sm:grid-cols-2"><div><label className={label}>Style</label><select className={input} value={type} onChange={e=>setType(e.target.value)}><option>APA</option><option>MLA</option><option>Chicago</option></select></div><div><label className={label}>Author</label><input className={input} value={author} onChange={e=>setAuthor(e.target.value)}/></div><div><label className={label}>Page or article title</label><input className={input} value={title} onChange={e=>setTitle(e.target.value)}/></div><div><label className={label}>Website / publisher</label><input className={input} value={site} onChange={e=>setSite(e.target.value)}/></div><div><label className={label}>Year</label><input className={input} value={year} onChange={e=>setYear(e.target.value)}/></div><div><label className={label}>URL</label><input className={input} value={url} onChange={e=>setUrl(e.target.value)}/></div></div><div className="mt-6 rounded-2xl bg-[#F7F0E9] p-5 leading-7 text-[#2D241C]">{result}</div><button className={`${secondary} mt-4`} onClick={()=>navigator.clipboard.writeText(result)}>Copy citation</button><p className="mt-4 text-sm text-[#6B5B4D]">Always verify citation requirements with your school or instructor.</p></div>}

export function ImageResizeTool(){const [file,setFile]=useState<File|null>(null);const [w,setW]=useState(1200);const [h,setH]=useState(800);const canvas=useRef<HTMLCanvasElement>(null);async function run(){if(!file||!canvas.current)return;const img=new Image();img.onload=()=>{const c=canvas.current!;c.width=w;c.height=h;c.getContext("2d")!.drawImage(img,0,0,w,h);c.toBlob(b=>b&&download(b,"resized.png","image/png"),"image/png")};img.src=URL.createObjectURL(file)}return <div className={panel}><FilePicker accept="image/*" onChange={f=>setFile(f[0]||null)}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><Num title="Width (px)" v={w} set={setW}/><Num title="Height (px)" v={h} set={setH}/></div><button className={`${button} mt-5`} disabled={!file} onClick={run}>Resize & download</button><canvas ref={canvas} className="hidden"/></div>}

export function ImageConverterTool(){const [file,setFile]=useState<File|null>(null);const [format,setFormat]=useState("image/webp");const [quality,setQuality]=useState(.85);async function run(){if(!file)return;const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=img.width;c.height=img.height;c.getContext("2d")!.drawImage(img,0,0);c.toBlob(b=>b&&download(b,`converted.${format.split("/")[1].replace("jpeg","jpg")}`,format),format,quality)};img.src=URL.createObjectURL(file)}return <div className={panel}><FilePicker accept="image/*" onChange={f=>setFile(f[0]||null)}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className={label}>Output format</label><select className={input} value={format} onChange={e=>setFormat(e.target.value)}><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></div><div><label className={label}>Quality: {Math.round(quality*100)}%</label><input className="w-full accent-[#A7744D]" type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e=>setQuality(Number(e.target.value))}/></div></div><button className={`${button} mt-5`} disabled={!file} onClick={run}>Convert & download</button></div>}
