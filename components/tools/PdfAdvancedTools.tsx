"use client";

import { useState } from "react";

const panel = "rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 shadow-[0_16px_45px_rgba(91,62,38,.08)] sm:p-8";
const input = "w-full rounded-2xl border border-[#E7D8C7] bg-white px-4 py-3 text-[#2D241C] outline-none transition focus:border-[#A7744D] focus:ring-4 focus:ring-[#A7744D]/10";
const button = "rounded-2xl bg-[#A7744D] px-5 py-3 font-bold text-white transition hover:bg-[#8F603D] disabled:cursor-not-allowed disabled:opacity-50";
const label = "mb-2 block text-sm font-bold text-[#4A3A2E]";

function download(bytes: Uint8Array, name: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Picker({ onFile }: { onFile: (file: File | null) => void }) {
  return <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#D9C4AE] bg-[#FFF9F2] px-6 text-center transition hover:border-[#A7744D] hover:bg-[#F8EDE1]"><span className="text-lg font-black text-[#2D241C]">Choose or drop a PDF</span><span className="mt-2 text-sm text-[#6B5B4D]">Processing stays in your browser.</span><input className="hidden" type="file" accept="application/pdf" onChange={e => onFile(e.target.files?.[0] || null)} /></label>;
}

function Status({ file, error }: { file: File | null; error: string }) {
  return <>{file && <p className="mt-4 font-bold text-[#4A3A2E]">{file.name}</p>}{error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}</>;
}

function parsePages(text: string, pageCount: number): number[] {
  const result: number[] = [];
  for (const token of text.split(",")) {
    const part = token.trim();
    if (!part) continue;
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      if (!Number.isInteger(start) || !Number.isInteger(end)) throw new Error(`Invalid page range: ${part}`);
      const step = start <= end ? 1 : -1;
      for (let n = start; step > 0 ? n <= end : n >= end; n += step) {
        if (n < 1 || n > pageCount) throw new Error(`Page ${n} is outside this PDF.`);
        result.push(n - 1);
      }
    } else {
      const n = Number(part);
      if (!Number.isInteger(n) || n < 1 || n > pageCount) throw new Error(`Invalid page: ${part}`);
      result.push(n - 1);
    }
  }
  if (!result.length) throw new Error("Enter at least one valid page number.");
  return result;
}

export function PdfDeletePagesTool() {
  const [file, setFile] = useState<File | null>(null); const [pages, setPages] = useState("2"); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function run() { if (!file) return; setBusy(true); setError(""); try { const { PDFDocument } = await import("pdf-lib"); const pdf = await PDFDocument.load(await file.arrayBuffer()); const remove = [...new Set(parsePages(pages, pdf.getPageCount()))].sort((a,b)=>b-a); if (remove.length >= pdf.getPageCount()) throw new Error("You must keep at least one page."); remove.forEach(i => pdf.removePage(i)); download(await pdf.save(), "pages-deleted.pdf"); } catch (e) { setError(e instanceof Error ? e.message : "Could not edit this PDF."); } finally { setBusy(false); } }
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><label className={`${label} mt-5`}>Pages to delete</label><input className={input} value={pages} onChange={e=>setPages(e.target.value)} placeholder="2, 4-6"/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Deleting…":"Delete pages"}</button></div>;
}

export function PdfOrganizeTool() {
  const [file, setFile] = useState<File | null>(null); const [order, setOrder] = useState("1,2,3"); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function run() { if (!file) return; setBusy(true); setError(""); try { const { PDFDocument } = await import("pdf-lib"); const src = await PDFDocument.load(await file.arrayBuffer()); const indices = parsePages(order, src.getPageCount()); const out = await PDFDocument.create(); const copied = await out.copyPages(src, indices); copied.forEach(p=>out.addPage(p)); download(await out.save(), "organized.pdf"); } catch (e) { setError(e instanceof Error ? e.message : "Could not organize this PDF."); } finally { setBusy(false); } }
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><label className={`${label} mt-5`}>New page order</label><input className={input} value={order} onChange={e=>setOrder(e.target.value)} placeholder="3,1,2 or 5-1"/><p className="mt-2 text-sm text-[#6B5B4D]">You may repeat a page to duplicate it, such as 1,2,2,3.</p><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Organizing…":"Organize PDF"}</button></div>;
}

export function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null); const [text, setText] = useState("CONFIDENTIAL"); const [size, setSize] = useState(42); const [opacity, setOpacity] = useState(.25); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function run() { if (!file || !text.trim()) return; setBusy(true); setError(""); try { const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib"); const pdf = await PDFDocument.load(await file.arrayBuffer()); const font = await pdf.embedFont(StandardFonts.HelveticaBold); pdf.getPages().forEach(page => { const { width, height } = page.getSize(); const textWidth = font.widthOfTextAtSize(text, size); page.drawText(text, { x:(width-textWidth)/2, y:height/2, size, font, color:rgb(.45,.28,.16), opacity, rotate:degrees(35) }); }); download(await pdf.save(), "watermarked.pdf"); } catch (e) { setError(e instanceof Error ? e.message : "Could not watermark this PDF."); } finally { setBusy(false); } }
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><div className="mt-5 grid gap-4 sm:grid-cols-3"><div><label className={label}>Watermark text</label><input className={input} value={text} onChange={e=>setText(e.target.value)}/></div><div><label className={label}>Font size</label><input className={input} type="number" min="10" max="150" value={size} onChange={e=>setSize(Number(e.target.value))}/></div><div><label className={label}>Opacity: {Math.round(opacity*100)}%</label><input className="mt-4 w-full accent-[#A7744D]" type="range" min="0.05" max="0.8" step="0.05" value={opacity} onChange={e=>setOpacity(Number(e.target.value))}/></div></div><button className={`${button} mt-5`} disabled={!file||!text.trim()||busy} onClick={run}>{busy?"Adding…":"Add watermark"}</button></div>;
}

export function PdfPageNumbersTool() {
  const [file, setFile] = useState<File | null>(null); const [start, setStart] = useState(1); const [position, setPosition] = useState("bottom-center"); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function run() { if (!file) return; setBusy(true); setError(""); try { const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib"); const pdf = await PDFDocument.load(await file.arrayBuffer()); const font = await pdf.embedFont(StandardFonts.Helvetica); pdf.getPages().forEach((page,i)=>{ const text=String(start+i); const {width,height}=page.getSize(); const tw=font.widthOfTextAtSize(text,11); const x=position.endsWith("left")?28:position.endsWith("right")?width-tw-28:(width-tw)/2; const y=position.startsWith("top")?height-30:22; page.drawText(text,{x,y,size:11,font,color:rgb(.25,.2,.16)}); }); download(await pdf.save(), "numbered.pdf"); } catch(e){setError(e instanceof Error?e.message:"Could not number this PDF.");} finally{setBusy(false);} }
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className={label}>Starting number</label><input className={input} type="number" value={start} onChange={e=>setStart(Number(e.target.value))}/></div><div><label className={label}>Position</label><select className={input} value={position} onChange={e=>setPosition(e.target.value)}><option value="bottom-left">Bottom left</option><option value="bottom-center">Bottom center</option><option value="bottom-right">Bottom right</option><option value="top-left">Top left</option><option value="top-center">Top center</option><option value="top-right">Top right</option></select></div></div><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Numbering…":"Add page numbers"}</button></div>;
}

export function PdfCropTool() {
  const [file,setFile]=useState<File|null>(null); const [top,setTop]=useState(20); const [right,setRight]=useState(20); const [bottom,setBottom]=useState(20); const [left,setLeft]=useState(20); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");try{const {PDFDocument}=await import("pdf-lib");const pdf=await PDFDocument.load(await file.arrayBuffer());pdf.getPages().forEach(page=>{const {width,height}=page.getSize();if(left+right>=width||top+bottom>=height)throw new Error("Crop margins are larger than the page.");page.setCropBox(left,bottom,width-left-right,height-top-bottom);});download(await pdf.save(),"cropped.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not crop this PDF.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><p className="mt-5 text-sm text-[#6B5B4D]">Margins use PDF points. 72 points equals approximately one inch.</p><div className="mt-4 grid gap-4 sm:grid-cols-4">{[["Top",top,setTop],["Right",right,setRight],["Bottom",bottom,setBottom],["Left",left,setLeft]].map(([name,value,setter])=><div key={String(name)}><label className={label}>{String(name)}</label><input className={input} type="number" min="0" value={value as number} onChange={e=>(setter as (n:number)=>void)(Number(e.target.value))}/></div>)}</div><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Cropping…":"Crop PDF"}</button></div>;
}

export function PdfDuplicatePagesTool() {
  const [file,setFile]=useState<File|null>(null); const [pages,setPages]=useState("1"); const [copies,setCopies]=useState(1); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");try{const {PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer());const selected=parsePages(pages,src.getPageCount());const out=await PDFDocument.create();for(let i=0;i<src.getPageCount();i++){const [original]=await out.copyPages(src,[i]);out.addPage(original);if(selected.includes(i)){for(let c=0;c<copies;c++){const [copy]=await out.copyPages(src,[i]);out.addPage(copy);}}}download(await out.save(),"duplicated-pages.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not duplicate pages.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className={label}>Pages to duplicate</label><input className={input} value={pages} onChange={e=>setPages(e.target.value)} placeholder="1,3-4"/></div><div><label className={label}>Extra copies per page</label><input className={input} type="number" min="1" max="20" value={copies} onChange={e=>setCopies(Math.max(1,Number(e.target.value)))}/></div></div><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Duplicating…":"Duplicate pages"}</button></div>;
}

export function PdfAddBlankPagesTool() {
  const [file,setFile]=useState<File|null>(null); const [count,setCount]=useState(1); const [where,setWhere]=useState("end"); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");try{const {PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer());const out=await PDFDocument.create();const size=src.getPage(0).getSize();if(where==="start")for(let i=0;i<count;i++)out.addPage([size.width,size.height]);(await out.copyPages(src,src.getPageIndices())).forEach(p=>out.addPage(p));if(where==="end")for(let i=0;i<count;i++)out.addPage([size.width,size.height]);download(await out.save(),"with-blank-pages.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not add blank pages.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className={label}>Number of blank pages</label><input className={input} type="number" min="1" max="100" value={count} onChange={e=>setCount(Math.max(1,Number(e.target.value)))}/></div><div><label className={label}>Add pages</label><select className={input} value={where} onChange={e=>setWhere(e.target.value)}><option value="end">At the end</option><option value="start">At the beginning</option></select></div></div><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Adding…":"Add blank pages"}</button></div>;
}

export function PdfMetadataTool() {
  const [file,setFile]=useState<File|null>(null); const [title,setTitle]=useState(""); const [author,setAuthor]=useState(""); const [subject,setSubject]=useState(""); const [keywords,setKeywords]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");try{const {PDFDocument}=await import("pdf-lib");const pdf=await PDFDocument.load(await file.arrayBuffer());pdf.setTitle(title);pdf.setAuthor(author);pdf.setSubject(subject);pdf.setKeywords(keywords.split(",").map(x=>x.trim()).filter(Boolean));pdf.setProducer("AllToolkit");pdf.setModificationDate(new Date());download(await pdf.save(),"metadata-updated.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not update metadata.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className={label}>Title</label><input className={input} value={title} onChange={e=>setTitle(e.target.value)}/></div><div><label className={label}>Author</label><input className={input} value={author} onChange={e=>setAuthor(e.target.value)}/></div><div><label className={label}>Subject</label><input className={input} value={subject} onChange={e=>setSubject(e.target.value)}/></div><div><label className={label}>Keywords, separated by commas</label><input className={input} value={keywords} onChange={e=>setKeywords(e.target.value)}/></div></div><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Saving…":"Update metadata"}</button></div>;
}

export function PdfOptimizeTool() {
  const [file,setFile]=useState<File|null>(null); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [result,setResult]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");setResult("");try{const {PDFDocument}=await import("pdf-lib");const original=await file.arrayBuffer();const pdf=await PDFDocument.load(original,{updateMetadata:false});const bytes=await pdf.save({useObjectStreams:true,addDefaultPage:false,objectsPerTick:50});download(bytes,"optimized.pdf");const change=((1-bytes.length/original.byteLength)*100);setResult(change>0?`File reduced by ${change.toFixed(1)}%.`:`The rewritten file is ${Math.abs(change).toFixed(1)}% larger. Image-heavy PDFs may need stronger server-side compression.`);}catch(e){setError(e instanceof Error?e.message:"Could not optimize this PDF.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><p className="mt-5 text-sm leading-6 text-[#6B5B4D]">This safely rewrites the PDF using compressed object streams. It can reduce structural overhead, but it does not lower image resolution.</p>{result&&<p className="mt-4 rounded-2xl bg-[#F7F0E9] px-4 py-3 font-semibold text-[#4A3A2E]">{result}</p>}<button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Optimizing…":"Optimize PDF"}</button></div>;
}

export function PdfReverseTool(){
  const [file,setFile]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");try{const{PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer());const out=await PDFDocument.create();const pages=await out.copyPages(src,[...src.getPageIndices()].reverse());pages.forEach(p=>out.addPage(p));download(await out.save(),"reversed.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not reverse this PDF.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Reversing…":"Reverse page order"}</button></div>;
}

function PdfParityTool({odd}:{odd:boolean}){
  const[file,setFile]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
  async function run(){if(!file)return;setBusy(true);setError("");try{const{PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer());const indices=src.getPageIndices().filter(i=>((i+1)%2===1)===odd);if(!indices.length)throw new Error("This PDF has no matching pages.");const out=await PDFDocument.create();(await out.copyPages(src,indices)).forEach(p=>out.addPage(p));download(await out.save(),odd?"odd-pages.pdf":"even-pages.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not extract pages.");}finally{setBusy(false)}}
  return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Extracting…":`Extract ${odd?"odd":"even"} pages`}</button></div>;
}
export function PdfOddPagesTool(){return <PdfParityTool odd/>}
export function PdfEvenPagesTool(){return <PdfParityTool odd={false}/>}

export function PdfInterleaveTool(){
  const[a,setA]=useState<File|null>(null);const[b,setB]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
  async function run(){if(!a||!b)return;setBusy(true);setError("");try{const{PDFDocument}=await import("pdf-lib");const pa=await PDFDocument.load(await a.arrayBuffer()),pb=await PDFDocument.load(await b.arrayBuffer()),out=await PDFDocument.create();const max=Math.max(pa.getPageCount(),pb.getPageCount());for(let i=0;i<max;i++){if(i<pa.getPageCount()){const[p]=await out.copyPages(pa,[i]);out.addPage(p)}if(i<pb.getPageCount()){const[p]=await out.copyPages(pb,[i]);out.addPage(p)}}download(await out.save(),"interleaved.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not interleave these PDFs.");}finally{setBusy(false)}}
  return <div className={panel}><div className="grid gap-4 sm:grid-cols-2"><div><p className={label}>First PDF</p><Picker onFile={setA}/></div><div><p className={label}>Second PDF</p><Picker onFile={setB}/></div></div><Status file={null} error={error}/><button className={`${button} mt-5`} disabled={!a||!b||busy} onClick={run}>{busy?"Combining…":"Interleave PDFs"}</button></div>;
}

export function PdfBookletTool(){
 const[file,setFile]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function run(){if(!file)return;setBusy(true);setError("");try{const{PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer());const n=src.getPageCount(),padded=Math.ceil(n/4)*4;const order:number[]=[];let left=0,right=padded-1;while(left<right){order.push(right,left,left+1,right-1);left+=2;right-=2}const out=await PDFDocument.create();const size=src.getPage(0).getSize();for(const idx of order){if(idx<n){const[p]=await out.copyPages(src,[idx]);out.addPage(p)}else out.addPage([size.width,size.height])}download(await out.save(),"booklet-order.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not create booklet order.");}finally{setBusy(false)}}
 return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><p className="mt-4 text-sm leading-6 text-[#6B5B4D]">Reorders pages for booklet printing and adds blank pages when needed. Print two-sided and flip on the short edge.</p><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Preparing…":"Create booklet order"}</button></div>;
}

export function PdfTwoUpTool(){
 const[file,setFile]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function run(){if(!file)return;setBusy(true);setError("");try{const{PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer()),out=await PDFDocument.create();for(let i=0;i<src.getPageCount();i+=2){const first=src.getPage(i),sz=first.getSize(),page=out.addPage([sz.width*2,sz.height]);const[e1]=await out.embedPages([first]);page.drawPage(e1,{x:0,y:0,width:sz.width,height:sz.height});if(i+1<src.getPageCount()){const[e2]=await out.embedPages([src.getPage(i+1)]);page.drawPage(e2,{x:sz.width,y:0,width:sz.width,height:sz.height})}}download(await out.save(),"two-pages-per-sheet.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not create a 2-up PDF.");}finally{setBusy(false)}}
 return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><p className="mt-4 text-sm text-[#6B5B4D]">Places two consecutive pages side by side on each new sheet.</p><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Creating…":"Create 2 pages per sheet"}</button></div>;
}

export function PdfResizePagesTool(){
 const[file,setFile]=useState<File|null>(null);const[scale,setScale]=useState(100);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function run(){if(!file)return;setBusy(true);setError("");try{if(scale<10||scale>300)throw new Error("Scale must be between 10% and 300%.");const{PDFDocument}=await import("pdf-lib");const src=await PDFDocument.load(await file.arrayBuffer()),out=await PDFDocument.create(),ratio=scale/100;for(const p of src.getPages()){const{width,height}=p.getSize();const page=out.addPage([width*ratio,height*ratio]);const[e]=await out.embedPages([p]);page.drawPage(e,{x:0,y:0,width:width*ratio,height:height*ratio})}download(await out.save(),"resized-pages.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not resize pages.");}finally{setBusy(false)}}
 return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><label className={`${label} mt-5`}>Page scale (%)</label><input className={input} type="number" min="10" max="300" value={scale} onChange={e=>setScale(Number(e.target.value))}/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Resizing…":"Resize PDF pages"}</button></div>;
}

export function PdfHeaderFooterTool(){
 const[file,setFile]=useState<File|null>(null);const[header,setHeader]=useState("");const[footer,setFooter]=useState("AllToolkit");const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function run(){if(!file)return;setBusy(true);setError("");try{const{PDFDocument,StandardFonts,rgb}=await import("pdf-lib");const pdf=await PDFDocument.load(await file.arrayBuffer()),font=await pdf.embedFont(StandardFonts.Helvetica);pdf.getPages().forEach((p,i)=>{const{width,height}=p.getSize();if(header){const t=header.replaceAll("{page}",String(i+1));p.drawText(t,{x:28,y:height-24,size:9,font,color:rgb(.25,.2,.16)})}if(footer){const t=footer.replaceAll("{page}",String(i+1));p.drawText(t,{x:28,y:16,size:9,font,color:rgb(.25,.2,.16)});const tw=font.widthOfTextAtSize(t,9);if(tw>width-56)throw new Error("Header or footer text is too long for this page.")}});download(await pdf.save(),"header-footer.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not add header and footer.");}finally{setBusy(false)}}
 return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className={label}>Header text</label><input className={input} value={header} onChange={e=>setHeader(e.target.value)} placeholder="Document title"/></div><div><label className={label}>Footer text</label><input className={input} value={footer} onChange={e=>setFooter(e.target.value)} placeholder="Page {page}"/></div></div><p className="mt-2 text-sm text-[#6B5B4D]">Use <code>{"{page}"}</code> to insert the current page number.</p><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Adding…":"Add header and footer"}</button></div>;
}

export function PdfRemoveMetadataTool(){
 const[file,setFile]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function run(){if(!file)return;setBusy(true);setError("");try{const{PDFDocument}=await import("pdf-lib");const pdf=await PDFDocument.load(await file.arrayBuffer());pdf.setTitle("");pdf.setAuthor("");pdf.setSubject("");pdf.setKeywords([]);pdf.setCreator("");pdf.setProducer("");download(await pdf.save({updateFieldAppearances:false}),"metadata-removed.pdf");}catch(e){setError(e instanceof Error?e.message:"Could not remove metadata.");}finally{setBusy(false)}}
 return <div className={panel}><Picker onFile={setFile}/><Status file={file} error={error}/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Cleaning…":"Remove PDF metadata"}</button></div>;
}

export function PdfInfoTool(){
 const[file,setFile]=useState<File|null>(null);const[info,setInfo]=useState<string>("");const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function run(){if(!file)return;setBusy(true);setError("");setInfo("");try{const{PDFDocument}=await import("pdf-lib");const pdf=await PDFDocument.load(await file.arrayBuffer(),{updateMetadata:false});const sizes=[...new Set(pdf.getPages().map(p=>{const s=p.getSize();return `${Math.round(s.width)} × ${Math.round(s.height)} pt`}))];setInfo([`File: ${file.name}`,`Size: ${(file.size/1024/1024).toFixed(2)} MB`,`Pages: ${pdf.getPageCount()}`,`Title: ${pdf.getTitle()||"—"}`,`Author: ${pdf.getAuthor()||"—"}`,`Subject: ${pdf.getSubject()||"—"}`,`Creator: ${pdf.getCreator()||"—"}`,`Producer: ${pdf.getProducer()||"—"}`,`Page sizes: ${sizes.join(", ")}`].join("\n"));}catch(e){setError(e instanceof Error?e.message:"Could not inspect this PDF.");}finally{setBusy(false)}}
 return <div className={panel}><Picker onFile={f=>{setFile(f);setInfo("")}}/><Status file={file} error={error}/><button className={`${button} mt-5`} disabled={!file||busy} onClick={run}>{busy?"Reading…":"Show PDF information"}</button>{info&&<pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#F7F0E9] p-5 text-sm leading-7 text-[#4A3A2E]">{info}</pre>}</div>;
}
