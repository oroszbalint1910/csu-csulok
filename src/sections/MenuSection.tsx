import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CakeSlice, Plus, Wine } from 'lucide-react';
import { categories, menu, money, type MenuFilter, type MenuItem } from '../data/menu';

const filters:MenuFilter[]=['Összes',...categories];
export function MenuSection({category,setCategory,onAdd}:{category:MenuFilter;setCategory:(c:MenuFilter)=>void;onAdd:(item:MenuItem)=>void}){
 const tabs=useRef<HTMLDivElement>(null);
 useEffect(()=>{const list=tabs.current,active=list?.querySelector<HTMLElement>('[aria-selected="true"]');if(!list||!active)return;const r=active.getBoundingClientRect(),parent=list.getBoundingClientRect();if(r.left<parent.left)list.scrollLeft+=r.left-parent.left;else if(r.right>parent.right)list.scrollLeft+=r.right-parent.right},[category]);
 const groups=category==='Összes'?categories:categories.filter(c=>c===category);
 const shown=menu.filter(item=>category==='Összes'||item.category===category).length;
 return <section id="etlap" className="menu-section section-pad">
  <div className="section-heading reveal"><div><p className="eyebrow">A teljes kínálat, egy helyen</p><h2>Minden jó <em>együtt.</em></h2></div><p>A kedvencektől<br/>az utolsó édes falatig.</p></div>
  <div className="category-tabs" ref={tabs} role="tablist" aria-label="Étlapkategóriák">{filters.map((c,i)=><button role="tab" id={`tab-${i}`} aria-controls="menu-panel" aria-selected={c===category} tabIndex={c===category?0:-1} key={c} className={category===c?'active':''} onClick={()=>setCategory(c)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%filters.length;else if(e.key==='ArrowLeft')next=(i+filters.length-1)%filters.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=filters.length-1;else return;e.preventDefault();setCategory(filters[next]);tabs.current?.querySelector<HTMLButtonElement>(`#tab-${next}`)?.focus({preventScroll:true})}}>{category===c&&<motion.span className="tab-highlight" layoutId="category-highlight" transition={{type:'spring',bounce:.15,duration:.35}}/>}<span>{c}</span><small>{c==='Összes'?menu.length:String(i).padStart(2,'0')}</small></button>)}</div>
  <div className="catalogue-meta"><div className="menu-note"><span className="status-dot"/> DEMÓÉTLAP <span>Minden étel, ital és ár bemutatóadat.</span></div><span className="catalogue-count" aria-live="polite">{shown} termék{category==='Összes'?' · a teljes kínálat':''}</span></div>
  <AnimatePresence mode="wait" initial={false}><motion.div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${filters.indexOf(category)}`} key={category} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.18}} className={`menu-catalogue ${category==='Összes'?'show-all':'is-filtered'}`}>
   {groups.map(c=><section className={`menu-group ${c==='Italok'?'menu-group-drinks':''}`} aria-label={`${c} termékek`} key={c}>
    <div className="menu-group-title"><div><span className="eyebrow">{String(categories.indexOf(c)+1).padStart(2,'0')}</span><h3>{c}</h3>{c==='Sütik'&&<CakeSlice size={24} strokeWidth={1}/>} {c==='Italok'&&<Wine size={24} strokeWidth={1}/>}</div><span>{menu.filter(item=>item.category===c).length} tétel</span></div>
    <div className="menu-group-items">{menu.filter(item=>item.category===c).map(item=><article className="menu-row" key={item.id}><div className="menu-info">{item.tag&&<span className="menu-tag">{item.tag}</span>}<h4>{item.name}</h4>{item.courses?<div className="menu-courses"><p><strong>Leves</strong>{item.courses.soup}</p><p><strong>Főétel</strong>{item.courses.main}</p></div>:<p>{item.description}</p>}</div><div className="menu-price"><span>{money(item.price)}</span><small>demóár</small></div><motion.button whileHover={{rotate:90}} whileTap={{scale:.9}} className="add-button" aria-label={`${item.name} kosárba`} onClick={()=>onAdd(item)}><Plus size={20}/></motion.button></article>)}</div>
   </section>)}
  </motion.div></AnimatePresence>
  <div className="menu-foot"><p>A végleges választékot, márkákat, árakat és allergéninformációkat az étterem biztosítja.</p><a href="#heti-menu" className="text-link">Heti menü <ArrowUpRight size={17}/></a></div>
 </section>
}
