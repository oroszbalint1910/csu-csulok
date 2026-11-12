/** Scroll once to the requested section, accounting for both sticky bars. */
export function scrollToSection(id:string){
 const target=document.getElementById(id);if(!target)return false;
 const header=document.querySelector<HTMLElement>('.phase-header');
 const categoryBar=id.startsWith('category-')?document.querySelector<HTMLElement>('.menu-jumps'):null;
 const top=Math.max(0,window.scrollY+target.getBoundingClientRect().top-(header?.getBoundingClientRect().height||0)-(categoryBar?.getBoundingClientRect().height||0)-12);
 window.scrollTo({top,behavior:'instant'});
 if(id.startsWith('category-')&&typeof target.animate==='function'&&!document.documentElement?.classList.contains('reduced-motion')&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
  target.animate([{opacity:.75},{opacity:1}],{duration:260,easing:'ease-out'});
 }
 return true;
}
