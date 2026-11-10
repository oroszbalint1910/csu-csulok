import {budapest} from './ordering';
import type {Order,OrderStatus} from './models';
export function searchOrders(orders:Order[],search:string,date:string,status:OrderStatus|'all'){
 const query=search.trim().toLocaleLowerCase('hu-HU');const digits=query.replace(/\D/g,'');
 return orders.filter(order=>{const text=[order.id,order.customer.fullName,order.customer.phone].some(v=>v.toLocaleLowerCase('hu-HU').includes(query));const phone=digits.length>0&&order.customer.phone.replace(/\D/g,'').includes(digits);return (!query||text||phone)&&(!date||budapest(new Date(order.createdAt)).date===date)&&(status==='all'||order.status===status)});
}
