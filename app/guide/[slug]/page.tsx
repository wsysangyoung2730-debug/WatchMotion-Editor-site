import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guides";
import { AppFigure } from "@/components/product-showcase";
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const guide=guides.find(g=>g.slug===slug);return {title:guide?.title??"Guide not found",description:guide?.description};}
export default async function GuideArticle({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const index=guides.findIndex(g=>g.slug===slug);if(index<0)notFound();const guide=guides[index];
 return <div className="container docs-layout"><nav className="docs-nav" aria-label="Guide chapters"><span className="eyebrow">The user guide</span><Link href="/guide">Overview & example</Link>{guides.map((g,i)=><Link key={g.slug} href={`/guide/${g.slug}`} aria-current={g.slug===slug?"page":undefined}>{i+1}. {g.title}</Link>)}</nav><article className="docs-article"><span className="eyebrow">Chapter {String(index+1).padStart(2,"0")} / {String(guides.length).padStart(2,"0")}</span><h1>{guide.title}</h1><p className="article-lead">{guide.description}</p>{guide.sections.map(s=><section className="docs-section" id={s.id} key={s.id}><h2>{s.title}</h2>{s.paragraphs?.map(p=><p key={p}>{p}</p>)}{s.steps&&<ol>{s.steps.map(step=><li key={step}>{step}</li>)}</ol>}{s.note&&<aside className="note">{s.note}</aside>}{s.image&&<AppFigure {...s.image}/>}</section>)}<nav className="article-pagination" aria-label="Previous and next chapters"><Link href={index>0?`/guide/${guides[index-1].slug}`:"/guide"}><span>← Previous</span>{index>0?guides[index-1].title:"Guide overview"}</Link>{index<guides.length-1?<Link href={`/guide/${guides[index+1].slug}`}><span>Next →</span>{guides[index+1].title}</Link>:<Link href="/support"><span>Need a hand? →</span>Visit Support</Link>}</nav></article></div>;
}
