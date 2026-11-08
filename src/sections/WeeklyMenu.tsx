import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { weeklyMenu } from '../data/weeklyMenu';
import { menu, money, type MenuItem } from '../data/menu';
import { useMotionSettings } from '../components/MotionSettings';
export function WeeklyStory(){const ref=useRef<HTMLElement>(null);const {reduced}=useMotionSettings();useLayoutEffect(()=>{if(reduced)return;const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{
 const words=gsap.utils.toArray<HTMLElement>('.day-word');const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top top',end:'+=105%',pin:true,scrub:.55}});words.forEach((w,i)=>{if(i>0)gsap.set(w,{yPercent:110,opacity:0});tl.to(w,{yPercent:0,opacity:1,duration:.6},i);if(i<words.length-1)tl.to(w,{yPercent:-110,opacity:0,duration:.5},i+.75)});tl.to('.weekly-story-line',{scaleX:1,duration:5,ease:'none'},0);
 },ref.current!);return()=>ctx.revert()});return()=>mm.revert()},[reduced]);return <section className="weekly-story" ref={ref}><div className="scene-top"><span className="eyebrow">Egy jó szokás minden napra</span><span className="scene-counter">05 <span>/ 06</span></span></div><p className="eyebrow">Heti menü</p><div className="day-stage" aria-hidden="true">{weeklyMenu.map(d=><span className="day-word" key={d.day}>{d.day}<em>. egy jó ebéd.</em></span>)}</div><h2 className="sr-only">Heti menü hétfőtől péntekig</h2><p>Van, amire jó nap mint nap visszatérni.</p><a href="#heti-menu" className="text-link">Nézd meg a heti menüt <ArrowUpRight size={18}/></a><div className="weekly-story-track"><span className="weekly-story-line"/></div></section>}
export function WeeklyMenu({onAdd}:{onAdd:(item:MenuItem)=>void}){
 const [selected,setSelected]=useState(0);
 const tabs=useRef<HTMLDivElement>(null);
 const day=weeklyMenu[selected],price=menu.find(item=>item.id==='weekly')!.price;
 const item:MenuItem={id:`weekly-${selected}`,category:'Heti menü',name:`${day.day} menü`,description:`${day.soup} · ${day.main}`,courses:{soup:day.soup,main:day.main},price};
 return <section id="heti-menu" className="weekly-section section-pad">
  <div className="weekly-intro reveal"><p className="eyebrow">Hétfőtől péntekig</p><h2>Heti menü.<br/><em>Egy jó ebéd.</em></h2><p>Válaszd ki a napot.<br/>Minden nap egy menü, egy leves és egy főétel.</p><span className="demo-label">Demóheti menü · Nem aktuális ajánlat</span></div>
  <div className="weekly-board"><div className="weekday-tabs" role="tablist" aria-label="Heti menü napjai" ref={tabs}>{weeklyMenu.map((d,i)=><button key={d.day} id={`weekly-day-${i}`} role="tab" aria-label={d.day} aria-selected={selected===i} aria-controls="weekly-day-panel" tabIndex={selected===i?0:-1} className={selected===i?'active':''} onClick={()=>setSelected(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%5;else if(e.key==='ArrowLeft')next=(i+4)%5;else if(e.key==='Home')next=0;else if(e.key==='End')next=4;else return;e.preventDefault();setSelected(next);tabs.current?.querySelector<HTMLButtonElement>(`#weekly-day-${next}`)?.focus({preventScroll:true})}}><span className="day-short">{d.short}</span><span className="day-full">{d.day}</span>{selected===i&&<motion.span className="day-underline" layoutId="weekly-day-underline"/>}</button>)}</div>
   <AnimatePresence mode="wait" initial={false}><motion.div id="weekly-day-panel" role="tabpanel" aria-labelledby={`weekly-day-${selected}`} key={selected} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:.18}}><div className="day-title"><h3>{day.day} menü</h3><span>Leves + főétel</span></div><div className="course"><span>Leves</span><h4>{day.soup}</h4></div><div className="course"><span>Főétel</span><h4>{day.main}</h4></div><div className="weekly-price"><div><strong>{money(price)}</strong><small>Demóár / két fogás</small></div><button className="round-link" aria-label={`${day.day} menü kosárba`} onClick={()=>onAdd(item)}><ArrowUpRight size={24}/></button></div></motion.div></AnimatePresence>
  </div>
 </section>
}
