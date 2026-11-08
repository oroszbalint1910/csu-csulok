import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
export function Dialog({title,onClose,children,drawer=false}:{title:string;onClose:()=>void;children:ReactNode;drawer?:boolean}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';ref.current?.focus();
  function key(e:KeyboardEvent){if(e.key==='Escape')onClose();if(e.key==='Tab'){
   const elements=Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input,select,[tabindex="0"]')??[]);const first=elements[0],last=elements.at(-1);
   if(e.shiftKey&&(document.activeElement===first||document.activeElement===ref.current)){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
  }}document.addEventListener('keydown',key);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',key);previous?.focus();};
 },[onClose]);
 return <motion.div className={`modal-backdrop ${drawer?'is-drawer':''}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
  <motion.div className={drawer?'drawer':'dialog'} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref} initial={drawer?{x:'100%'}:{y:30,scale:.97}} animate={drawer?{x:0}:{y:0,scale:1}} exit={drawer?{x:'100%'}:{y:30,scale:.97}} transition={{type:'tween',duration:.32,ease:[.22,1,.36,1]}} onClick={e=>e.stopPropagation()}>
  <div className="dialog-heading"><div><span className="eyebrow">CSÜ–CSÜLÖK</span><h2>{title}</h2></div><button className="icon-button" aria-label="Bezárás" onClick={onClose}><X/></button></div>{children}</motion.div>
 </motion.div>
}
