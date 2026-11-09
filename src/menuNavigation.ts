/** Scroll once to the requested section, accounting for both sticky bars. */
export function scrollToSection(id:string){
 const target=document.getElementById(id);if(!target)return false;
 const header=document.querySelector<HTMLElement>('.phase-header');
 const categoryBar=id.startsWith('category-')?document.querySelector<HTMLElement>('.menu-jumps'):null;
 const top=Math.max(0,window.scrollY+target.getBoundingClientRect().top-(header?.getBoundingClientRect().height||0)-(categoryBar?.getBoundingClientRect().height||0)-12);
 window.scrollTo({top,behavior:'instant'});return true;
}
