import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import { MotionSettingsProvider } from './components/MotionSettings';
import App from './PhaseOneApp';
import CounterApp from './components/CounterApp';
import {Login,Courier,Admin} from './components/DemoStaff';
import './styles.css';
import './hero-brand.css';
import './menu-catalogue.css';
import './phase-one.css';
function Root(){const route=()=>{const hash=location.hash.slice(2);if(['pult','futar','admin','belepes'].includes(hash))return hash;return location.pathname.replace(/\/+$/,'').split('/').at(-1)||''};const [page,setPage]=useState(route);useEffect(()=>{const update=()=>setPage(route());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);return page==='pult'?<CounterApp/>:page==='futar'?<Courier/>:page==='admin'?<Admin/>:page==='belepes'?<Login/>:<MotionSettingsProvider><App/></MotionSettingsProvider>}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Root/></React.StrictMode>);
