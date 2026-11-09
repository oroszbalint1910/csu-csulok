import {useEffect,useId,useRef,useState,type ReactNode} from 'react';
import {budapest,initialMenuDate,menuStatus} from '../domain/ordering';
import type {DailyMenu} from '../domain/models';
const label=(day:DailyMenu)=>new Intl.DateTimeFormat('hu-HU',{weekday:'long',timeZone:'Europe/Budapest'}).format(new Date(day.date+'T12:00:00Z'));
const short=['H','K','Sze','Cs','P'];
export function WeeklyMenuPager({days,now,renderDay}:{days:DailyMenu[];now:Date;renderDay:(day:DailyMenu)=>ReactNode}){
 const [selected,setSelected]=useState(()=>initialMenuDate(days,now));const id=useId(),tabs=useRef<HTMLDivElement>(null);
 const date=budapest(now).date,week=days[0]?.date;
 useEffect(()=>{setSelected(initialMenuDate(days,now))},[date,week]);
 const index=Math.max(0,days.findIndex(d=>d.date===selected)),day=days[index];
 useEffect(()=>{const list=tabs.current,button=list?.querySelector<HTMLElement>('[aria-selected="true"]');if(!list||!button)return;const b=button.getBoundingClientRect(),r=list.getBoundingClientRect();if(b.left<r.left)list.scrollLeft+=b.left-r.left;else if(b.right>r.right)list.scrollLeft+=b.right-r.right},[selected]);
 if(!day)return <p>A heti menü feltöltés alatt.</p>;
 return <div className="menu-pager"><div className="pager-days" ref={tabs} role="tablist" aria-label="Heti menü napjai">{days.map((d,i)=><button key={d.id} id={`${id}-tab-${i}`} role="tab" aria-selected={index===i} aria-controls={`${id}-panel`} aria-label={`${label(d)}, ${d.date}`} tabIndex={index===i?0:-1} className={`${index===i?'selected':''} ${menuStatus(d,now)}`} onClick={()=>setSelected(d.date)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%days.length;else if(e.key==='ArrowLeft')next=(i+days.length-1)%days.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=days.length-1;else return;e.preventDefault();setSelected(days[next].date);tabs.current?.querySelector<HTMLButtonElement>(`[data-day="${next}"]`)?.focus({preventScroll:true})}} data-day={i}><span className="pager-day-long">{label(d)}</span><span className="pager-day-short" aria-hidden="true">{short[i]||i+1}</span><span className="pager-dot" aria-hidden="true"/></button>)}</div>
 <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`}>{renderDay(day)}{day.date===date&&menuStatus(day,now)==='closed'&&<div className="menu-closed-notice" role="status"><p>A mai menü rendelése lezárult.</p>{days[index+1]?<><span>Szeretnéd megnézni a következő napi menüt?</span><button className="button ghost" onClick={()=>setSelected(days[index+1].date)}>Következő napi menü →</button></>:<span>A következő heti menü hamarosan elérhető.</span>}</div>}</div>
 <div className="pager-controls"><button className="button ghost" aria-label="Előző napi menü" disabled={index===0} onClick={()=>setSelected(days[index-1].date)}>← Előző</button><span aria-live="polite">{index+1} / {days.length}</span><button className="button ghost" aria-label="Következő napi menü" disabled={index===days.length-1} onClick={()=>setSelected(days[index+1].date)}>Következő →</button></div></div>;
}
