import {useEffect,useState} from 'react';
import {ArrowLeft, MapPin, Phone, Navigation, PackageCheck, Clock3} from 'lucide-react';
import {demoStore} from '../api/restaurant';
import type {DeliveryStatus} from '../domain/delivery';
import './counter.css';

const statusLabels:Record<DeliveryStatus,string>={waiting:'Átvételre vár',delivering:'Kiszállítás alatt',delivered:'Kézbesítve',failed:'Sikertelen'};
const money=(value:number)=>new Intl.NumberFormat('hu-HU').format(value)+' Ft';

export function Courier(){
 const [state,setState]=useState(demoStore.read),[courier,setCourier]=useState(()=>demoStore.read().couriers.find(c=>c.active)?.id||''),[error,setError]=useState('');
 useEffect(()=>{const refresh=()=>setState(demoStore.read());window.addEventListener('storage',refresh);window.addEventListener('csu-demo-change',refresh);return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('csu-demo-change',refresh)}},[]);
 const orders=state.assignments.filter(a=>a.courierId===courier).flatMap(a=>{const order=state.orders.find(o=>o.id===a.orderId);return order?[{assignment:a,order}]:[]});
 const active=orders.filter(({assignment,order})=>['waiting','delivering'].includes(assignment.status)&&!['completed','rejected'].includes(order.status));
 const history=orders.filter(x=>!active.includes(x));
 function change(id:string,status:DeliveryStatus){try{demoStore.delivery(id,courier,status);setError('')}catch(e){setError(e instanceof Error?e.message:'Hiba történt.')}}
 function card({assignment:a,order:o}:typeof orders[number]){
  const zone=demoStore.catalog(new Date()).zones.find(z=>z.id===o.customer.zoneId)?.name;
  const address=[zone,o.customer.address].filter(Boolean).join(', ');
  const ready=o.status==='ready'||o.status==='out_for_delivery';
  return <article className={`delivery-card delivery-${a.status}`} key={o.id}>
   <div className="delivery-card-top"><div><span className="delivery-overline">RENDELÉS · {o.id}</span><h3>{o.customer.fullName}</h3></div><span className={`delivery-status status-${a.status}`}>{statusLabels[a.status]}</span></div>
   <div className="delivery-address"><MapPin size={20} aria-hidden="true"/><div><span>CÍM</span><strong>{address||'Nincs megadva'}</strong></div></div>
   <p className="delivery-phone"><Phone size={15} aria-hidden="true"/> {o.customer.phone||'Nincs telefonszám'}</p>
   <div className="delivery-info"><div><span>FIZETENDŐ</span><strong>{money(o.total)}</strong></div><div><span>FIZETÉS</span><strong>{o.payment==='cash_on_receipt'?'Készpénz':'Bankkártya'}</strong></div></div>
   {o.customer.note&&<p className="delivery-note"><strong>Megjegyzés</strong><br/>{o.customer.note}</p>}
   {a.status==='waiting'&&!ready&&<p className="delivery-wait"><Clock3 size={16}/> A konyha még készíti a rendelést.</p>}
   {['waiting','delivering'].includes(a.status)&&<><div className="delivery-contact"><a className="delivery-contact-button" href={`tel:${o.customer.phone.replace(/\s/g,'')}`}><Phone size={18}/> Hívás</a>{address?<a className="delivery-contact-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer"><Navigation size={18}/> Navigáció</a>:<span className="delivery-contact-button disabled">Nincs cím</span>}</div><div className="delivery-action">{a.status==='waiting'?<button className="counter-button primary" disabled={!ready} onClick={()=>change(o.id,'delivering')}>Kiszállítás megkezdése →</button>:<><button className="counter-button primary" onClick={()=>change(o.id,'delivered')}><PackageCheck size={19}/> Kézbesítve</button><button className="counter-button danger" onClick={()=>change(o.id,'failed')}>Sikertelen kézbesítés</button></>}</div></>}
  </article>
 }
 return <div className="counter-page courier-page"><header className="staff-header"><a href="#/belepes"><ArrowLeft size={18}/> Szerepkörök</a><span>CSÜ–CSÜLÖK <small>FUTÁR</small></span><span className="staff-demo-badge">DEMÓ</span></header><main className="courier-main"><div className="courier-heading"><p className="counter-kicker">A TE KISZÁLLÍTÁSAID</p><h1>Indulhatunk?</h1><p>Minden cím és fontos részlet egy helyen.</p></div><div className="courier-picker"><label htmlFor="courier-select">Kiválasztott futár</label><select id="courier-select" value={courier} onChange={e=>{setCourier(e.target.value);setError('')}}><option value="" disabled>Válassz futárt</option>{state.couriers.map(c=><option key={c.id} value={c.id}>{c.name}{!c.active?' (inaktív)':''}</option>)}</select></div><p className="courier-demo-note">Demó · Az adatok csak ebben a böngészőben érhetők el. A szerepkörválasztás nem bejelentkezés.</p>{error&&<p className="counter-error delivery-alert" role="alert">{error}</p>}<div className="courier-summary"><div><strong>{active.length}</strong><span>Aktív cím</span></div><div><strong>{orders.filter(x=>x.assignment.status==='delivered').length}</strong><span>Kézbesítve</span></div></div><section><div className="courier-section-title"><div><p className="counter-kicker">ÚTON A VENDÉGEKHEZ</p><h2>Aktív kiszállítások</h2></div><span>{active.length}</span></div>{active.length?<div className="delivery-list">{active.map(card)}</div>:<div className="courier-empty"><PackageCheck size={26}/><strong>Nincs aktív kiszállításod</strong><p>Az ide kiosztott rendelések itt jelennek meg.</p></div>}</section>{history.length>0&&<section className="delivery-history"><div className="courier-section-title"><div><p className="counter-kicker">KORÁBBI CÍMEK</p><h2>Lezárt kiszállítások</h2></div><span>{history.length}</span></div><div className="delivery-list">{history.map(card)}</div></section>}</main></div>
}
