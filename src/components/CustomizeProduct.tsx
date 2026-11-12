import {useState} from 'react';
import type {Product} from '../domain/models';
import {groupsFor,resolveOptions,type ChoiceGroup} from '../domain/customization';
import {Dialog} from './Dialog';
const money=(n:number)=>new Intl.NumberFormat('hu-HU').format(n)+' Ft';
export function CustomizeProduct({product,groups:availableGroups,onClose,onAdd}:{product:Product;groups?:ChoiceGroup[];onClose:()=>void;onAdd:(options:string[])=>void}){
 const groups=groupsFor(product,availableGroups);const [selected,setSelected]=useState<string[]>(()=>groups.filter(g=>g.required&&g.choices.length>0).map(g=>g.choices[0].id));
 let error='';let total=product.price;try{total+=resolveOptions(product,selected,availableGroups).reduce((sum,c)=>sum+c.price,0)}catch(e){error=e instanceof Error?e.message:'Érvénytelen választás.'}
 return <Dialog title={product.name} onClose={onClose} drawer><div className="customize"><p className="notice">Demóválaszték és példaárak; a végleges kínálat még nem jóváhagyott.</p>{groups.map(g=><fieldset key={g.label}><legend>{g.label}{g.required?' *':' (opcionális)'}</legend>{!g.multiple&&!g.required&&<label><input type="radio" name={g.id} checked={!g.choices.some(c=>selected.includes(c.id))} onChange={()=>setSelected(xs=>xs.filter(x=>!g.choices.some(c=>c.id===x)))}/>Nem kérek</label>}{g.choices.map(c=><label key={c.id}><input type={g.multiple?'checkbox':'radio'} name={g.label} checked={selected.includes(c.id)} onChange={e=>setSelected(xs=>g.multiple?(e.target.checked?[...xs,c.id]:xs.filter(x=>x!==c.id)):[...xs.filter(x=>!g.choices.some(choice=>choice.id===x)),c.id])}/><span>{c.label}</span><strong>{c.price?`+ ${money(c.price)}`:'0 Ft'}</strong></label>)}</fieldset>)}<div className="customize-total"><span>Választott étel ára</span><strong>{money(total)}</strong></div><p role="status">{error}</p><button disabled={!!error} className="button primary customize-add" onClick={()=>onAdd(selected)}>Kosárba · {money(total)}</button></div></Dialog>
}
