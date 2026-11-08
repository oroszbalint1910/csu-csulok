import { Minus, Plus, ShoppingBag, Trash2, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { money, type MenuItem } from '../data/menu';
import { Dialog } from './Dialog';
export type CartLine={item:MenuItem;quantity:number};
export function Cart({lines,update,onClose,onMenu}:{lines:CartLine[];update:(id:string,delta:number)=>void;onClose:()=>void;onMenu:()=>void}){
 return <Dialog title="A kosarad" onClose={onClose} drawer>
 <p className="demo-banner">Bemutató verzió – valódi rendelés jelenleg nem adható le.</p>
 {lines.length===0?<div className="empty-cart"><ShoppingBag size={48} strokeWidth={1}/><h3>Még várnak az ízek.</h3><p>Válassz valami finomat a demóétlapról.</p><button className="button primary" onClick={onMenu}>Felfedezem az étlapot <ArrowUpRight size={17}/></button></div>:<>
 <div className="cart-lines">{lines.map(({item,quantity})=><motion.div layout className="cart-line" key={item.id}><div className="cart-item-top"><div><span className="eyebrow">{item.category} · demó</span><h3>{item.name}</h3><span className="cart-unit">{money(item.price)} / tétel</span></div><button className="icon-button" onClick={()=>update(item.id,-quantity)} aria-label={`${item.name} eltávolítása`}><Trash2 size={17}/></button></div><div className="cart-item-bottom"><div className="quantity"><button aria-label={`${item.name} mennyiségének csökkentése`} onClick={()=>update(item.id,-1)}><Minus size={15}/></button><span aria-live="polite">{quantity}</span><button aria-label={`${item.name} mennyiségének növelése`} onClick={()=>update(item.id,1)} disabled={quantity>=99}><Plus size={15}/></button></div><span>{money(item.price*quantity)}</span></div></motion.div>)}</div>
 <div className="cart-total"><div><span>Részösszeg</span><strong>{money(lines.reduce((n,l)=>n+l.item.price*l.quantity,0))}</strong></div><p>Demóárak. A kosár a bemutató része, rendelést nem továbbít.</p><button className="button ghost" onClick={onMenu}>Még válogatok <ArrowUpRight size={17}/></button></div>
 </>}
 </Dialog>
}
