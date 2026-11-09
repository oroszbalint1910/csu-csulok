import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import { MotionSettingsProvider } from './components/MotionSettings';
import App from './PhaseOneApp';
import CounterApp from './components/CounterApp';
import './styles.css';
import './hero-brand.css';
import './menu-catalogue.css';
import './phase-one.css';
function Root(){const isCounter=()=>location.hash==='#/pult'||location.pathname.replace(/\/+$/,'').endsWith('/pult');const [counter,setCounter]=useState(isCounter);useEffect(()=>{const update=()=>setCounter(isCounter());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);return counter?<CounterApp/>:<MotionSettingsProvider><App/></MotionSettingsProvider>}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Root/></React.StrictMode>);
