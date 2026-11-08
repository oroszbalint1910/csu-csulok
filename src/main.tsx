import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionSettingsProvider } from './components/MotionSettings';
import App from './App';
import './styles.css';
import './hero-brand.css';
import './menu-catalogue.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MotionSettingsProvider><App/></MotionSettingsProvider></React.StrictMode>);
