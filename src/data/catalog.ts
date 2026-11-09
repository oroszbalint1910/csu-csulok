import {menu as legacy} from './menu';
import {weeklyMenu as meals} from './weeklyMenu';
import {weekDates} from '../domain/ordering';
import type {Catalog,Product} from '../domain/models';
const names=[['daily','Napi menü'],['pizza','Pizzák'],['burger','Hamburgerek'],['gyros','Gyrosok'],['carte','À la carte'],['drinks','Alkoholmentes italok'],['dessert','Desszertek']];
const mapping:Record<string,string>={'Pizzák':'pizza','Hamburgerek':'burger','Gyros':'gyros','À la carte':'carte','Italok':'drinks','Sütik':'dessert'};
const excluded=new Set(['weekly','beer-lager','wine-white','wine-rose','wine-red','palinka-apricot','palinka-plum']);
export function demoCatalog(now:Date):Catalog{const dates=weekDates(now);const days=meals.map((m,i)=>({id:'daily-'+dates[i],date:dates[i],soup:m.soup,main:m.main,price:2490,note:'Demóajánlat, nem jóváhagyott étlap.'}));const products:Product[]=legacy.filter(p=>!excluded.has(p.id)).map(p=>({id:p.id,categoryId:mapping[p.category],name:p.name,description:p.description,price:p.price,available:true,demo:true}));products.unshift(...days.map((d,i)=>({id:d.id,categoryId:'daily',dailyMenuId:d.id,name:meals[i].day+' menü',description:`${d.soup} · ${d.main}`,price:d.price,available:true,demo:true})));
return {categories:names.map(([id,name])=>({id,name})),products,weeklyMenu:{id:'week-'+dates[0],weekStart:dates[0],days},zones:Array.from({length:10},(_,i)=>({id:'zone-'+(i+1),name:`Demótelepülés ${i+1}`,fee:500+i*100,active:i!==9,minimumOrder:i>4?4000:undefined})),settings:{name:'CSÜ-CSÜLÖK',timezone:'Europe/Budapest',menuStartHour:8,menuEndHour:14,orderingMode:'demo'}}}
