import { useId } from 'react';

const polar=(r:number,a:number)=>[300+r*Math.cos(a*Math.PI/180),300+r*Math.sin(a*Math.PI/180)];
function wedge(a:number,b:number,r=218){const p=polar(r,a),q=polar(r,b);return `M300 300 L${p[0]} ${p[1]} A${r} ${r} 0 0 1 ${q[0]} ${q[1]} Z`;}
export function PizzaArt({className=''}:{className?:string}){
 const uid=useId().replace(/:/g,'');
 return <svg className={`food-art pizza-art ${className}`} viewBox="0 0 600 600" role="img" aria-label="Saját készítésű, rétegzett pizzaillusztráció, külön kiemelhető szelettel">
 <defs>
  <radialGradient id={`${uid}crust`} cx="42%" cy="30%"><stop stopColor="#edc182"/><stop offset=".7" stopColor="#c98945"/><stop offset="1" stopColor="#895029"/></radialGradient>
  <radialGradient id={`${uid}cheese`}><stop stopColor="#f6d998"/><stop offset=".72" stopColor="#e9bf71"/><stop offset="1" stopColor="#c58940"/></radialGradient>
  <radialGradient id={`${uid}tomato`}><stop stopColor="#df6c43"/><stop offset=".8" stopColor="#b94129"/><stop offset="1" stopColor="#8f2b21"/></radialGradient>
  <filter id={`${uid}shadow`} x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000" floodOpacity=".38"/></filter>
  <pattern id={`${uid}speck`} width="31" height="29" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r="2" fill="#9b5626" opacity=".25"/><circle cx="23" cy="20" r="4" fill="#ba6d2c" opacity=".22"/><circle cx="16" cy="3" r="1" fill="#fef1c5" opacity=".5"/></pattern>
 </defs>
 <ellipse cx="300" cy="331" rx="239" ry="229" fill="#021c1b" opacity=".45"/>
 <circle cx="300" cy="300" r="250" fill="#0c3531" stroke="#c99769" strokeWidth=".8" strokeOpacity=".35"/>
 <circle cx="300" cy="300" r="239" fill="none" stroke="#c99769" strokeWidth=".6" strokeOpacity=".18"/>
 <g className="pizza-base" filter={`url(#${uid}shadow)`}>
 {Array.from({length:8},(_,i)=>{
  const a=-91+i*45,b=a+44.2;return <g key={i} className={i===1?'pizza-slice':'pizza-wedge'}>
   <defs><clipPath id={`${uid}w${i}`}><path d={wedge(a,b)}/></clipPath></defs>
   <g clipPath={`url(#${uid}w${i})`}>
    <circle cx="300" cy="300" r="218" fill={`url(#${uid}crust)`}/>
    <circle cx="300" cy="300" r="197" fill="#a74228"/>
    <circle cx="300" cy="300" r="190" fill={`url(#${uid}cheese)`}/>
    <circle cx="300" cy="300" r="218" fill={`url(#${uid}speck)`}/>
    {[{r:130,t:11},{r:77,t:28},{r:163,t:32}].map((v,j)=>{const [x,y]=polar(v.r,a+v.t);return <g key={j} transform={`translate(${x} ${y}) rotate(${i*35+j*21})`}>
     <circle r={j===1?21:26} fill={`url(#${uid}tomato)`} stroke="#ed9c69" strokeWidth="1"/>
     <path d="M-15 -5 Q-5 -17 9 -8 M-10 10 Q4 18 15 4" fill="none" stroke="#e79c65" strokeWidth="2" opacity=".7"/>
     <ellipse cx="-7" cy="-5" rx="3" ry="1.6" fill="#f3bf75"/><ellipse cx="7" cy="8" rx="3" ry="1.6" fill="#f3bf75"/>
    </g>})}
    {[{r:114,t:31},{r:163,t:13}].map((v,j)=>{const [x,y]=polar(v.r,a+v.t);return <g key={j} transform={`translate(${x} ${y}) rotate(${a+j*60})`}><path d="M0 19 C-29 0 -14 -28 0 -23 C20 -29 27 0 0 19Z" fill={j?'#3f6f35':'#588449'}/><path d="M0 17 L0 -19 M0 3 L-10 -7 M0 -3 L10 -13" stroke="#9cba6d" fill="none" strokeWidth="1"/></g>})}
    {Array.from({length:12},(_,j)=>{const [x,y]=polar(48+((j*37)%137),a+4+((j*13)%36));return <ellipse key={j} cx={x} cy={y} rx={3+(j%3)} ry="2" fill={j%2?'#a3642c':'#f9e7b0'} opacity=".65" transform={`rotate(${j*25} ${x} ${y})`}/>})}
    <path d={wedge(a,b,217)} fill="none" stroke="#f1c98d" strokeWidth="2" strokeOpacity=".35"/>
   </g>
  </g>;
 })}
 </g>
 <g className="cheese-strings" stroke="#eed39b" strokeWidth="1.8" fill="none" opacity="0"><path d="M360 248 Q390 231 414 218"/><path d="M380 270 Q410 256 442 245"/><path d="M333 277 Q360 264 391 247"/></g>
 </svg>;
}

export function BurgerArt(){const id=useId().replace(/:/g,'');return <svg className="food-art burger-art" viewBox="0 0 600 600" role="img" aria-label="Hamburger hat külön mozgatható alapanyagból">
 <defs>
  <linearGradient id={`${id}bun`} x2="0" y2="1"><stop stopColor="#e8b777"/><stop offset=".48" stopColor="#ce873f"/><stop offset="1" stopColor="#9e562b"/></linearGradient>
  <linearGradient id={`${id}cut`} x2="0" y2="1"><stop stopColor="#f4d595"/><stop offset="1" stopColor="#d4a05c"/></linearGradient>
  <linearGradient id={`${id}meat`} x2="0" y2="1"><stop stopColor="#825132"/><stop offset=".4" stopColor="#4c2d22"/><stop offset="1" stopColor="#30231d"/></linearGradient>
  <filter id={`${id}sh`} x="-30%" y="-50%" width="160%" height="200%"><feDropShadow dx="0" dy="9" stdDeviation="7" floodOpacity=".3"/></filter>
 </defs>
 <ellipse cx="300" cy="461" rx="205" ry="35" fill="#031c1b" opacity=".6"/>
 <g filter={`url(#${id}sh)`}>
 <g className="burger-layer bun-bottom"><path d="M130 381 Q300 347 470 381 L463 413 C450 463 151 465 137 415Z" fill={`url(#${id}bun)`}/><ellipse cx="300" cy="382" rx="170" ry="28" fill={`url(#${id}cut)`}/><path d="M153 417 Q300 453 449 416" stroke="#f2c482" strokeWidth="2" fill="none" opacity=".5"/></g>
 <g className="burger-layer patty"><path d="M125 337 C151 316 449 316 475 338 L476 369 Q467 388 439 387 Q416 400 393 390 Q365 405 338 394 Q300 408 270 394 Q240 405 209 392 Q179 401 158 384 Q127 385 123 367Z" fill={`url(#${id}meat)`}/><ellipse cx="300" cy="338" rx="175" ry="30" fill="#73492e"/>{Array.from({length:42},(_,i)=><ellipse key={i} cx={145+(i*47)%310} cy={329+(i*13)%41} rx={2+(i%4)} ry="2" fill={i%3?'#b0804c':'#34251b'} opacity=".7"/>)}</g>
 <g className="burger-layer cheese"><path d="M132 315 Q302 294 471 318 L423 346 L377 337 L342 375 L287 341 L232 350 L197 329 L144 337Z" fill="#e4aa3f"/><path d="M150 317 Q295 299 453 320 L415 336 L373 328 L342 359 L293 331 L230 340 L193 323Z" fill="#f3ce62"/></g>
 <g className="burger-layer tomato"><ellipse cx="234" cy="301" rx="106" ry="23" fill="#ab3827"/><ellipse cx="234" cy="291" rx="106" ry="22" fill="#da6543"/><ellipse cx="368" cy="300" rx="108" ry="24" fill="#a83827"/><ellipse cx="368" cy="288" rx="108" ry="23" fill="#df704b"/>{[190,220,255,327,355,393,418].map(x=><ellipse key={x} cx={x} cy="289" rx="8" ry="3" fill="#f6bb7b"/>)}</g>
 <g className="burger-layer lettuce"><path d="M120 270 Q107 255 131 250 Q139 225 166 238 Q185 214 209 234 Q237 213 261 231 Q291 211 316 231 Q345 213 372 230 Q400 218 424 236 Q454 223 466 245 Q495 245 482 265 Q495 281 468 283 L440 275 L413 292 L381 278 L351 291 L317 276 L285 289 L250 277 L216 289 L187 276 L151 286Z" fill="#658c43" stroke="#9cb46b" strokeWidth="2"/><path d="M135 259 Q300 240 470 260" stroke="#c0c886" strokeWidth="3" fill="none"/><path d="M176 252 L164 272 M225 248 L215 274 M280 249 L270 273 M337 249 L350 276 M391 252 L415 273" stroke="#93ac58" strokeWidth="2"/></g>
 <g className="burger-layer bun-top"><path d="M128 245 C130 97 468 94 473 245 Q301 285 128 245Z" fill={`url(#${id}bun)`}/><ellipse cx="300" cy="245" rx="173" ry="27" fill="#d99e55"/><path d="M156 201 C194 131 377 122 439 192" fill="none" stroke="#edc48a" strokeWidth="4" opacity=".4"/>{Array.from({length:34},(_,i)=>{const a=i*2.4,r=25+(i%7)*15;return <ellipse key={i} cx={300+Math.cos(a)*r*1.25} cy={196+Math.sin(a)*r*.48} rx="5" ry="1.7" fill="#f7dfac" transform={`rotate(${i*37} ${300+Math.cos(a)*r*1.25} ${196+Math.sin(a)*r*.48})`}/>})}</g>
 </g>
 </svg>}

export function PlateArt({kind}:{kind:'gyros'|'carte'}){const id=useId().replace(/:/g,'');return <svg className="food-art plate-art" viewBox="0 0 600 600" role="img" aria-label={kind==='gyros'?'Rétegekből összeálló stilizált gyrostál':'Stilizált főétel, körettel és díszítéssel'}>
 <defs><radialGradient id={`${id}plate`}><stop stopColor="#ded6bd"/><stop offset=".65" stopColor="#eee6d4"/><stop offset=".7" stopColor="#bdb8a6"/><stop offset=".78" stopColor="#e5decc"/><stop offset="1" stopColor="#bcb7a3"/></radialGradient><linearGradient id={`${id}food`} x2="1" y2="1"><stop stopColor="#ce9a57"/><stop offset=".5" stopColor="#a76e38"/><stop offset="1" stopColor="#67432a"/></linearGradient><filter id={`${id}s`}><feDropShadow dx="3" dy="7" stdDeviation="5" floodOpacity=".25"/></filter></defs>
 <ellipse cx="300" cy="335" rx="224" ry="205" fill="#031b19" opacity=".5"/><circle cx="300" cy="300" r="220" fill={`url(#${id}plate)`}/><circle cx="300" cy="300" r="203" fill="none" stroke="#81795e" strokeOpacity=".35"/><circle cx="300" cy="300" r="165" fill="none" stroke="#f8f1dd" strokeWidth="2"/>
 <g filter={`url(#${id}s)`}>
 <g className="ingredient side">{Array.from({length:24},(_,i)=><rect key={i} x={175+(i*23)%128} y={220+(i*31)%155} width="13" height={67+i%19} rx="4" fill={i%3?'#dca856':'#f3c778'} stroke="#bd823b" strokeWidth="1" transform={`rotate(${-45+(i*17)%90} ${205+(i*23)%90} ${260+(i*31)%100})`}/>)}</g>
 <g className="ingredient main-food">{kind==='gyros'?Array.from({length:27},(_,i)=><path key={i} d={`M${280+(i*19)%110} ${207+(i*29)%140} q30 -17 57 3 l-9 15 q-32 -10 -54 5Z`} fill={`url(#${id}food)`} stroke="#794a2e" strokeWidth="1" transform={`rotate(${i*27} ${335} ${300})`}/>):<g transform="rotate(-22 335 280)"><path d="M278 190 C360 165 418 220 406 313 Q386 369 310 348 Q264 327 268 264Z" fill={`url(#${id}food)`}/>{[210,232,254,276,298,320].map(y=><path key={y} d={`M281 ${y} L398 ${y+15}`} stroke="#5f3d28" strokeWidth="5" opacity=".65"/>)}</g>}</g>
 <g className="ingredient vegetables">{Array.from({length:13},(_,i)=><g key={i} transform={`translate(${200+(i*29)%198} ${365+(i*17)%50}) rotate(${i*37})`}><path d="M0 17 C-30 0 -19 -29 0 -21 C23 -27 30 0 0 17" fill={i%2?'#5e803e':'#8da258'} stroke="#adbd77" strokeWidth="1"/>{i%3===0&&<circle r="13" fill="#ce6246" stroke="#eaa17a" strokeWidth="3"/>}</g>)}</g>
 <g className="ingredient garnish"><path d="M303 246 Q320 263 344 240 T387 254 M294 267 Q325 286 344 263 T393 278" stroke="#f0e1bb" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M340 219 Q317 182 341 174 Q367 194 340 219 M340 218 Q364 180 382 193 Q384 222 340 218" fill="#557747"/>{Array.from({length:14},(_,i)=><circle key={i} cx={220+(i*37)%190} cy={180+(i*43)%240} r="1.7" fill="#547344"/>)}</g>
 </g></svg>}

export function DrinkArt(){const id=useId().replace(/:/g,'');return <svg className="food-art drink-art" viewBox="0 0 600 600" role="img" aria-label="Stilizált citrusos ital, emelkedő folyadékszinttel"><defs><linearGradient id={`${id}glass`}><stop stopColor="#f3ead8" stopOpacity=".16"/><stop offset=".5" stopColor="#b9cbc3" stopOpacity=".02"/><stop offset="1" stopColor="#f3ead8" stopOpacity=".25"/></linearGradient><linearGradient id={`${id}liquid`} x2="0" y2="1"><stop stopColor="#d2b66e" stopOpacity=".75"/><stop offset="1" stopColor="#9f8a43" stopOpacity=".35"/></linearGradient><clipPath id={`${id}clip`}><path d="M203 170 L227 443 Q300 473 373 443 L397 170Z"/></clipPath></defs><ellipse cx="300" cy="489" rx="133" ry="18" fill="#031c1b" opacity=".5"/>
 <path d="M201 168 L225 444 Q300 478 375 444 L399 168Z" fill={`url(#${id}glass)`} stroke="#c5d2c4" strokeOpacity=".65" strokeWidth="2"/>
 <g clipPath={`url(#${id}clip)`}><g className="drink-fill"><path d="M190 231 Q300 256 410 231 L390 461 L210 461Z" fill={`url(#${id}liquid)`}/><ellipse cx="300" cy="233" rx="107" ry="18" fill="#d4bf81" opacity=".45"/>{Array.from({length:19},(_,i)=><circle key={i} className="bubble" cx={240+(i*37)%119} cy={272+(i*31)%158} r={2+i%4} stroke="#e4d8ae" fill="none" opacity=".6"/>)}</g>{[0,1,2].map(i=><rect key={i} x={235+i*39} y={229+i*47} width="63" height="58" rx="10" fill="#d4e4dc" fillOpacity=".18" stroke="#e2e9da" strokeOpacity=".45" transform={`rotate(${i*25-18} ${266+i*39} ${258+i*47})`}/>)}</g>
 <ellipse cx="300" cy="168" rx="99" ry="18" fill="none" stroke="#e3e5d4" strokeWidth="2" strokeOpacity=".7"/><path d="M363 304 L390 112" stroke="#c99769" strokeWidth="6"/>
 <g className="drink-garnish" transform="translate(212 171) rotate(-22)"><circle r="61" fill="#a1a651"/><circle r="54" fill="#e4d891"/><circle r="49" fill="#ccc76e"/>{Array.from({length:8},(_,i)=><path key={i} d="M0 0 L47 0" stroke="#f1e6b0" strokeWidth="3" transform={`rotate(${i*45})`}/>)}<circle r="6" fill="#f1e6b0"/></g><path d="M367 156 Q361 113 388 113 Q407 135 367 156 M368 155 Q401 127 414 149 Q402 170 368 155" fill="#69894d"/></svg>}
