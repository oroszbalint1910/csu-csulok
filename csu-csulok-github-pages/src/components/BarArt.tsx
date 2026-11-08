import { useId } from 'react';

export function BarArt(){
 const id=useId().replace(/:/g,'');
 return <svg className="food-art bar-art" viewBox="0 0 600 600" fill="none" role="img" aria-label="Sör, vörösbor és pálinka saját, rétegzett illusztrációja">
  <defs>
   <linearGradient id={`${id}glass`}><stop stopColor="#e2e7d9" stopOpacity=".24"/><stop offset=".45" stopColor="#e2e7d9" stopOpacity=".02"/><stop offset="1" stopColor="#e2e7d9" stopOpacity=".2"/></linearGradient>
   <linearGradient id={`${id}beer`} x2="0" y2="1"><stop stopColor="#e7bb68" stopOpacity=".9"/><stop offset="1" stopColor="#af722d" stopOpacity=".8"/></linearGradient>
   <linearGradient id={`${id}wine`} x2="1" y2="1"><stop stopColor="#a55d55"/><stop offset="1" stopColor="#542630"/></linearGradient>
   <clipPath id={`${id}beerclip`}><path d="M91 211 L105 432 Q151 450 197 432 L211 211Z"/></clipPath>
   <clipPath id={`${id}wineclip`}><path d="M278 190 C255 280 264 330 322 345 C380 330 389 280 366 190Z"/></clipPath>
   <clipPath id={`${id}spiritclip`}><path d="M440 299 Q420 358 467 376 Q514 358 494 299Z"/></clipPath>
  </defs>
  <ellipse cx="300" cy="486" rx="232" ry="20" fill="#031c1b" opacity=".55"/>
  <g className="bar-beer">
   <path d="M89 207 L103 433 Q151 454 199 433 L213 207Z" fill={`url(#${id}glass)`} stroke="#d8d7bc" strokeOpacity=".65" strokeWidth="1.7"/>
   <g clipPath={`url(#${id}beerclip)`}><g className="drink-fill"><path d="M85 244 Q151 257 218 244 L199 445 H103Z" fill={`url(#${id}beer)`}/>{Array.from({length:16},(_,i)=><circle key={i} className="bubble" cx={116+i*23%72} cy={271+i*29%141} r={1.7+i%3} fill="none" stroke="#f6e0a0" strokeWidth="1" opacity=".65"/>)}</g><g className="drink-garnish"><ellipse cx="151" cy="239" rx="67" ry="17" fill="#ece0c0"/>{[108,128,150,172,192].map((x,i)=><ellipse key={x} cx={x} cy={234+i%2*3} rx="16" ry="10" fill={i%2?'#eee4cc':'#ded2b2'}/>)}</g></g>
   <ellipse cx="151" cy="208" rx="62" ry="12" fill="none" stroke="#e6e0c7" strokeWidth="1.4" strokeOpacity=".7"/>
   <path d="M104 267 L115 414" stroke="#f5ebdd" strokeWidth="2.4" strokeOpacity=".25" strokeLinecap="round"/>
  </g>
  <g className="bar-wine">
   <path d="M276 187 C250 280 260 332 322 348 C384 332 394 280 368 187Z" fill={`url(#${id}glass)`} stroke="#d8d7bc" strokeOpacity=".7" strokeWidth="1.5"/>
   <g clipPath={`url(#${id}wineclip)`}><g className="drink-fill"><path d="M254 270 Q322 291 390 270 V357 H254Z" fill={`url(#${id}wine)`}/><ellipse cx="322" cy="273" rx="63" ry="12" fill="#ad6d65" opacity=".55"/></g></g>
   <ellipse cx="322" cy="188" rx="46" ry="10" fill="none" stroke="#e6e0c7" strokeOpacity=".75"/>
   <path d="M322 349 V460 M293 464 Q322 453 351 464 Q322 473 293 464Z" stroke="#d8d7bc" strokeOpacity=".75" strokeWidth="2"/>
   <path d="M283 208 Q269 269 284 298" stroke="#f5ebdd" strokeOpacity=".26" strokeWidth="3" strokeLinecap="round"/>
  </g>
  <g className="bar-spirit">
   <path d="M438 297 Q416 360 467 379 Q518 360 496 297Z" fill={`url(#${id}glass)`} stroke="#d8d7bc" strokeOpacity=".7" strokeWidth="1.5"/>
   <g clipPath={`url(#${id}spiritclip)`}><g className="drink-fill"><path d="M429 342 Q467 354 506 342 V384 H429Z" fill="#c9b77c" fillOpacity=".38"/><ellipse cx="467" cy="343" rx="32" ry="7" fill="#e0d3a8" fillOpacity=".3"/></g></g>
   <ellipse cx="467" cy="298" rx="29" ry="7" fill="none" stroke="#e6e0c7" strokeOpacity=".75"/>
   <path d="M467 380 V455 M444 460 Q467 451 490 460 Q467 467 444 460Z" stroke="#d8d7bc" strokeOpacity=".75" strokeWidth="1.7"/>
   <path d="M445 311 Q436 335 448 353" stroke="#f5ebdd" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round"/>
  </g>
  <g fontFamily="Manrope, sans-serif" fontSize="9" letterSpacing="3" fill="#c99769"><text x="151" y="520" textAnchor="middle">SÖR</text><text x="322" y="520" textAnchor="middle">BOR</text><text x="467" y="520" textAnchor="middle">PÁLINKA</text></g>
 </svg>;
}
