import type {Order} from './models';

/** Demo-only assignment rules. Production authorization belongs to the server. */
export interface DemoCourier {id:string;name:string;active:boolean}
export type DeliveryStatus='waiting'|'delivering'|'delivered'|'failed';
export interface DemoAssignment {orderId:string;courierId:string;status:DeliveryStatus}

export function assignCourier(order:Order,courier:DemoCourier,previous?:DemoAssignment):DemoAssignment {
 if(order.fulfillment!=='delivery'||order.status==='completed'||order.status==='rejected')throw Error('A rendelés nem osztható ki futárnak.');
 if(!courier.active)throw Error('Inaktív futár nem választható.');
 if(previous&&(previous.status==='delivered'||previous.status==='failed'))throw Error('A lezárt kiszállítás nem osztható át.');
 return {orderId:order.id,courierId:courier.id,status:previous?.status||'waiting'};
}

export function changeDeliveryStatus(assignment:DemoAssignment,courierId:string,next:DeliveryStatus):DemoAssignment {
 if(assignment.courierId!==courierId)throw Error('Ez a kiszállítás másik futárhoz tartozik.');
 const allowed:Record<DeliveryStatus,DeliveryStatus[]>={waiting:['delivering'],delivering:['delivered','failed'],delivered:[],failed:[]};
 if(!allowed[assignment.status].includes(next))throw Error('Érvénytelen kiszállítási állapotváltás.');
 return {...assignment,status:next};
}
