import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
const MotionSettings=createContext({reduced:false,system:false,toggle:()=>{}});
export const useMotionSettings=()=>useContext(MotionSettings);
export function MotionSettingsProvider({children}:{children:ReactNode}){
 const [system,setSystem]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [override,setOverride]=useState<boolean|null>(null);
 const reduced=system||override===true;
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{setSystem(mq.matches);setOverride(null)};mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change)},[]);
 useEffect(()=>{document.documentElement.classList.toggle('reduced-motion',reduced);return()=>document.documentElement.classList.remove('reduced-motion')},[reduced]);
 return <MotionSettings.Provider value={{reduced,system,toggle:()=>setOverride(!reduced)}}><MotionConfig reducedMotion={reduced?'always':'never'}>{children}</MotionConfig></MotionSettings.Provider>;
}
