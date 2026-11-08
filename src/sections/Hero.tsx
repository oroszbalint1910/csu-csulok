import { logoUrl } from '../assets';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useMotionSettings } from '../components/MotionSettings';
export function Hero({onOrder}:{onOrder:()=>void}){
 const ref=useRef<HTMLElement>(null);
 const {reduced}=useMotionSettings();
 useLayoutEffect(()=>{if(reduced)return;const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const ctx=gsap.context(()=>{
   gsap.timeline({defaults:{ease:'power3.out'}}).from('.hero-eyebrow',{opacity:0,y:12,duration:.45},.05).from('.hero-title .word',{yPercent:115,rotation:2,duration:.7,stagger:.08},.1).from('.hero-description',{y:16,opacity:0,duration:.55},.4).from('.hero-actions > *',{y:16,opacity:0,stagger:.08,duration:.5},.5).from('.brand-stage',{scale:.9,y:20,opacity:0,duration:.9},.1).from('.hero-note',{opacity:0,duration:.5},.7);
   gsap.to('.brand-stage',{y:45,scale:.96,ease:'none',scrollTrigger:{trigger:ref.current,start:'top top',end:'bottom top',scrub:.25}});
   gsap.to('.hero-title',{y:35,opacity:.15,ease:'none',scrollTrigger:{trigger:ref.current,start:'20% top',end:'bottom top',scrub:.25}});
  },ref.current!);return()=>ctx.revert();
 });return()=>mm.revert();},[reduced]);
 return <section id="fooldal" className="hero" ref={ref}>
  <div className="hero-grain"/><div className="hero-watermark" aria-hidden="true">jó együtt.</div>
  <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="small-star">✳</span> Menü <span>•</span> Étterem <span>•</span> Bár</p>
   <h1 className="hero-title"><span className="word-mask"><span className="word">Ízek, amelyek</span></span><span className="word-mask"><em className="word">összehoznak.</em></span></h1>
   <p className="hero-description">Jó ételek. Ráérős beszélgetések.<br/>És az érzés, hogy jó helyen vagy.</p>
   <div className="hero-actions"><a className="button primary" href="#etlap">Étlap megtekintése <ArrowUpRight size={18}/></a><button className="button ghost" onClick={onOrder}>Rendelés <ArrowUpRight size={18}/></button></div>
   <p className="hero-note"><span/> Egy asztal. Sok jó pillanat.</p>
  </div>
  <div className="hero-visual hero-brand-visual">
   <div className="brand-stage">
   <svg className="brand-setting" viewBox="0 0 600 600" fill="none" aria-hidden="true">
    <circle cx="300" cy="300" r="252"/><circle cx="300" cy="300" r="237" strokeDasharray="1 12"/><circle cx="300" cy="300" r="218"/>
    <path className="setting-arc" d="M121 121 A253 253 0 0 1 479 121 M479 479 A253 253 0 0 1 121 479"/>
    <path d="M63 238 V356 M73 238 V356 M83 238 V268 Q83 281 73 281 Q63 281 63 268 M73 281 V365 M526 238 Q504 281 519 304 H529 V365 M529 238 V304"/>
    <path d="M300 31 V43 M300 557 V569 M31 300 H43 M557 300 H569"/>
    <path className="setting-star" d="M466 97 L466 119 M455 108 H477 M458 100 L474 116 M458 116 L474 100"/>
    <ellipse className="setting-shadow" cx="300" cy="520" rx="146" ry="15"/>
   </svg>
   <div className="hero-medallion" role="img" aria-label="A CSÜ-CSÜLÖK eredeti logója, lassan forgó rézarany emblémán">
    <div className="logo-spin"><div className="logo-face logo-front"><img src={logoUrl} alt="" width="768" height="768"/></div><div className="logo-face logo-back" aria-hidden="true"><img src={logoUrl} alt="" width="768" height="768"/></div></div>
   </div>
   <span className="brand-visual-caption">AZ ASZTAL KÖRÜL <span>minden összeér.</span></span>
   </div>
  </div>
  <div className="hero-bottom"><a className="scroll-cue" href="#iztortenet"><span className="scroll-circle"><ArrowDown size={18}/></span><span>Az élmény egy görgetéssel kezdődik</span></a><span className="hero-edition">CSÜ–CSÜLÖK <span>AZ ASZTAL KÖRÜL.</span></span></div>
 </section>
}
