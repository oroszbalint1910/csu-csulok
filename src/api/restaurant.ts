import {demoCatalog} from '../data/catalog';
import {quote,requestErrors} from '../domain/ordering';
import type {Catalog,Order,OrderRequest} from '../domain/models';
export interface RestaurantApi {getCatalog(now:Date):Promise<Catalog>;createDemoOrder(request:OrderRequest,now:Date):Promise<Order>}
const accepted=new Map<string,{fingerprint:string;order:Order}>();
// No network, email, Supabase connection or durable customer-data storage.
// Replace this adapter with a Workers HTTP adapter; components keep the same interface.
export const restaurantApi:RestaurantApi={async getCatalog(now){return demoCatalog(now)},async createDemoOrder(request,now){
 const fingerprint=JSON.stringify(request);const previous=accepted.get(request.idempotencyKey);if(previous){if(previous.fingerprint!==fingerprint)throw Error('A beküldési azonosító más tartalomhoz tartozik.');return previous.order}
 const q=quote(request.items,demoCatalog(now),now,request.fulfillment,request.customer.zoneId);const errors=[...requestErrors(request),...q.errors];if(errors.length)throw Error(errors.join(' '));
 const order:Order={id:'DEMO-'+crypto.randomUUID().slice(0,8).toUpperCase(),idempotencyKey:request.idempotencyKey,createdAt:now.toISOString(),status:'awaiting_acceptance',items:q.lines.map(l=>({productId:l.product.id,quantity:l.quantity,nameSnapshot:l.product.name,unitPriceSnapshot:l.product.price})),customer:{...request.customer},fulfillment:request.fulfillment,payment:request.payment,subtotal:q.subtotal,deliveryFee:q.deliveryFee,total:q.total,demo:true};
 // Bounded, tab-memory-only idempotency cache. Production must persist this server-side.
 if(accepted.size>=20)accepted.delete(accepted.keys().next().value!);accepted.set(request.idempotencyKey,{fingerprint,order});return order;
}};
