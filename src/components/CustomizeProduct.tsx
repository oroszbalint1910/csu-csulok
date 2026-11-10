import {useState} from 'react';
import type {Product} from '../domain/models';
import {groupsFor,resolveOptions} from '../domain/customization';
import {Dialog} from './Dialog';
const money=(n:number)=>new Intl.NumberFormat('hu-HU').format(n)+' Ft';
export function CustomizeProduct({product,onClose,onAdd}:{product:Product;onClose:()=>void;onAdd:(options:string[])=>void}){
 const groups=groupsFor(product);const [selected,setSelected]=useState<string[]>(()=>groups.filter(g=>!g.multiple).map(g=>g.choices[0].id));
 const total=product.price+resolveOptions(product,selected).reduce((sum,c)=>sum+c.price,0);
 return <Dialog title={product.name} onClose={onClose} drawer><div className="customize"><p className="notice">Demóválaszték és példaárak; a végleges kínálat még nem jóváhagyott.</p>{groups.map(g=><fieldset key={g.label}><legend>{g.label}</legend>{g.choices.map(c=><label key={c.id}><input type={g.multiple?'checkbox':'radio'} name={g.label} checked={selected.includes(c.id)} onChange={e=>setSelected(xs=>g.multiple?(e.target.checked?[...xs,c.id]:xs.filter(x=>x!==c.id)):[...xs.filter(x=>!g.choices.some(choice=>choice.id===x)),c.id])}/><span>{c.label}</span><strong>{c.price?`+ ${money(c.price)}`:'0 Ft'}</strong></label>)}</fieldset>)}<div className="customize-total"><span>Választott étel ára</span><strong>{money(total)}</strong></div><button className="button primary customize-add" onClick={()=>onAdd(selected)}>Kosárba · {money(total)}</button></div></Dialog>
}
