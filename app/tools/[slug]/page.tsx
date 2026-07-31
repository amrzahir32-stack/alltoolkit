import { notFound } from "next/navigation";
import { ArrowLeftRight, Calculator, CodeXml, Dices, GraduationCap, Palette, Shield, Text } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import UniversalTool from "@/components/tools/UniversalTool";
import { extraTools } from "@/data/extraTools";

export function generateStaticParams(){ return extraTools.map(t=>({slug:t.id})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const tool=extraTools.find(t=>t.id===slug); if(!tool)return {};
 return {title:tool.title,description:tool.description,alternates:{canonical:`/tools/${tool.id}`},openGraph:{title:`${tool.title} | AllToolkit`,description:tool.description,type:"website"}};
}
const icons={text:Text,calculator:Calculator,arrowleftright:ArrowLeftRight,dices:Dices,codexml:CodeXml,graduationcap:GraduationCap,shield:Shield,palette:Palette};
export default async function ExtraToolPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const tool=extraTools.find(t=>t.id===slug); if(!tool)notFound(); const Icon=icons[tool.icon];
 return <ToolLayout title={tool.title} description={`${tool.description} Runs privately in your browser with no upload or account required.`} icon={Icon}><UniversalTool tool={tool}/><section className="mt-8 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 text-[#6B5B4D]"><h2 className="text-xl font-black text-[#2D241C]">How to use this tool</h2><p className="mt-3 leading-7">Enter or paste your information, adjust the available options, and the result updates instantly. Your data stays on your device.</p></section></ToolLayout>;
}
