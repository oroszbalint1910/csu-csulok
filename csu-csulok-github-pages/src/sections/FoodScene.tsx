import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { BurgerArt, PizzaArt, PlateArt } from '../components/FoodArt';
import { BarArt } from '../components/BarArt';
import type { Category } from '../data/menu';
import { useMotionSettings } from '../components/MotionSettings';
gsap.registerPlugin(ScrollTrigger);
type Kind='pizza'|'burger'|'gyros'|'carte'|'drinks';
const stories:Record<Kind,{title:Category; index:string; eyebrow:string; line:string; text:string; note:string}>= {
 pizza:{title:'Pizzák',index:'01',eyebrow:'Egy szelet jóleső pillanat',line:'Még egy szelet.',text:'Ropogós szél. Olvadó sajt. Egy asztal, amely köré jó leülni.',note:'Görgess, és emeld ki a szeletet.'},
 burger:{title:'Hamburgerek',index:'02',eyebrow:'Minden rétegnek megvan a helye',line:'Így áll össze.',text:'A puha bucitól az utolsó falatig. Egyetlen, gondosan összeálló kompozíció.',note:'Görgess, és rakd össze az ízeket.'},
 gyros:{title:'Gyros',index:'03',eyebrow:'Színek. Textúrák. Harmónia.',line:'Egy tál öröm.',text:'Fűszeres falatok, friss zöldségek és egy kis roppanás. A kedvenc találkozásod.',note:'Görgess, és töltsd meg a tányért.'},
 carte:{title:'À la carte',index:'04',eyebrow:'Adj időt az élménynek',line:'Szépen tálalva.',text:'Amikor az ebéd több egy megállónál. Válassz a saját ritmusod szerint.',note:'Görgess, és figyeld a tálalást.'},
 drinks:{title:'Italok',index:'06',eyebrow:'Sör · Bor · Pálinka',line:'Egy korty szünet.',text:'Sör, bor, pálinka — és alkoholmentes frissítők. Válassz valamit a beszélgetés mellé.',note:'Görgess, és töltsd meg a poharakat.'},
};
export function FoodScene({kind,onMenu}:{kind:Kind;onMenu:(category:Category)=>void}){
 const ref=useRef<HTMLElement>(null), s=stories[kind];
 const {reduced}=useMotionSettings();
 useLayoutEffect(()=>{
  if(reduced)return;
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const ctx=gsap.context(()=>{
    const mobile=window.innerWidth<768;
    const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top top',end:()=>`+=${window.innerHeight*(window.innerWidth<768?.725:1.075)}`,pin:true,scrub:.55,anticipatePin:1,invalidateOnRefresh:true}});
    tl.from('.scene-heading',{y:45,opacity:.2,duration:.35},0)
      .from('.scene-rule',{scaleX:0,transformOrigin:'left',duration:.4},0)
      .from('.scene-art',{scale:.88,rotation:-7,opacity:.4,duration:.5},0)
      .to('.scene-track span',{scaleX:1,transformOrigin:'left',duration:2.6,ease:'none'},0);
    if(kind==='pizza'){
     tl.to('.pizza-slice',{x:mobile?48:72,y:mobile?-55:-79,rotation:9,svgOrigin:'300 300',duration:1.25,ease:'power1.inOut'},.45)
       .to('.pizza-base',{rotation:-5,svgOrigin:'300 300',duration:1.25},.45)
       .to('.cheese-strings',{opacity:.65,duration:.15},.55).to('.cheese-strings',{opacity:0,duration:.3},1.3);
    }else if(kind==='burger'){
     const layers=[['.bun-bottom',90,0],['.patty',55,-13],['.cheese',-5,10],['.tomato',-65,-9],['.lettuce',-125,9],['.bun-top',-190,-6]] as const;
     layers.forEach(([selector,y,rotation],i)=>tl.from(selector,{y,rotation,svgOrigin:'300 300',opacity:.65,duration:1.05,ease:'power2.inOut'},.28+i*.12));
     tl.to('.burger-art',{y:-12,scale:1.03,duration:.5},1.95);
    }else if(kind==='gyros'||kind==='carte'){
     tl.from('.side',{x:-190,y:40,rotation:-25,opacity:0,duration:.7},.3)
       .from('.main-food',{y:-130,x:50,opacity:0,rotation:15,duration:.75},.7)
       .from('.vegetables',{x:120,y:70,opacity:0,duration:.6},1.1)
       .from('.garnish',{scale:.6,opacity:0,svgOrigin:'300 300',duration:.5},1.5)
       .to('.plate-art',{rotation:8,y:-8,duration:.55},1.95);
    }else{
     tl.from('.drink-fill',{y:240,duration:1.6,ease:'none'},.3)
       .from('.drink-garnish',{opacity:0,y:-70,duration:.7},1.3)
       .from('.bubble',{y:30,opacity:0,stagger:.025,duration:.6},1.5);
    }
    tl.from('.scene-cta',{y:18,opacity:0,duration:.45},1.8).to('.scene-art',{y:-18,duration:.35},2.25);
   },ref.current!);
   return ()=>ctx.revert();
  });
  return ()=>mm.revert();
 },[kind,reduced]);
 return <section className={`food-scene scene-${kind}`} ref={ref} aria-label={`${s.title} – animált bemutató`}>
  <div className="scene-top"><span className="eyebrow">Az ízek története</span><span className="scene-counter">{s.index} <span>/ 06</span></span></div>
  <div className="scene-layout">
   <div className="scene-copy"><p className="eyebrow scene-rule">{s.eyebrow}</p><h2 className="scene-heading">{s.title}<em>{s.line}</em></h2><p className="scene-description">{s.text}</p><button className="text-link scene-cta" onClick={()=>onMenu(s.title)}>Étlap megtekintése <ArrowUpRight size={20}/></button></div>
   <div className="scene-art"><div className="art-orbit"/><span className="art-mark top">CSÜ–CSÜLÖK / ÍZKOMPOZÍCIÓ</span>{kind==='pizza'?<PizzaArt/>:kind==='burger'?<BurgerArt/>:kind==='drinks'?<BarArt/>:<PlateArt kind={kind}/>}<span className="art-mark bottom">SAJÁT ILLUSZTRÁCIÓ • BEMUTATÓ</span></div>
  </div>
  <div className="scene-bottom"><span><MoveDown size={15}/>{s.note}</span><a href="#etlap">Ugrás az étlapra <ArrowUpRight size={14}/></a></div><div className="scene-track"><span/></div>
 </section>
}
