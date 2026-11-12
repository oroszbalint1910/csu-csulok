import {budapest} from './ordering';
import type {Catalog,OrderRequest} from './models';
export function scheduleErrors(request:OrderRequest,catalog:Catalog,now:Date){
 if(!request.scheduledTime)return [];
 const time=request.scheduledTime,closing=catalog.settings.closingTime||'22:00';
 if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))return ['Érvénytelen előrendelési időpont.'];
 const clock=budapest(now),current=clock.hour*60+clock.minute;
 const minutes=Number(time.slice(0,2))*60+Number(time.slice(3));
 if(minutes<=current)return ['Válassz a mai napra egy későbbi időpontot.'];
 if(time>closing)return [`Előrendelés legfeljebb ${closing}-ig kérhető.`];
 if(request.items.some(item=>catalog.products.find(p=>p.id===item.productId)?.dailyMenuId)&&minutes>=14*60)return ['A napi menü csak 14:00 előtti időpontra kérhető.'];
 return [];
}
