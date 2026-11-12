import type {ChoiceGroup} from './customization';
export type Money = number; // Integer HUF; server must re-price production orders.
export interface ProductImage {url:string;alt:string;source:'placeholder'|'supabase';width?:number;height?:number}
export interface Category {id:string;name:string;image?:ProductImage}
export interface Product {optionGroupIds?:string[];id:string;categoryId:string;name:string;description:string;price:Money;available:boolean;image?:ProductImage;dailyMenuId?:string;demo:boolean}
export interface DailyMenu {id:string;date:string;soup:string;main:string;price:Money;note?:string;image?:ProductImage}
export interface WeeklyMenu {id:string;weekStart:string;days:DailyMenu[]}
export interface DeliveryZone {id:string;name:string;fee:Money;active:boolean;minimumOrder?:Money}
export interface CartItem {productId:string;quantity:number;options?:string[]}
export interface CustomerDetails {fullName:string;phone:string;email:string;zoneId?:string;address?:string;note?:string}
export type OrderStatus='awaiting_acceptance'|'accepted'|'preparing'|'ready'|'out_for_delivery'|'completed'|'rejected';
export type Fulfillment='pickup'|'delivery';
export type PaymentMethod='cash_on_receipt'|'card_on_receipt';
export interface OrderHistoryEntry {status:OrderStatus;at:string;note?:string}
export interface OrderItem {productId:string;quantity:number;nameSnapshot:string;unitPriceSnapshot:Money;optionsSnapshot?:string[]}
export interface Order {id:string;idempotencyKey:string;createdAt:string;status:OrderStatus;items:OrderItem[];customer:CustomerDetails;fulfillment:Fulfillment;payment:PaymentMethod;subtotal:Money;deliveryFee:Money;total:Money;demo:true;history?:OrderHistoryEntry[];estimatedMinutes?:number;scheduledTime?:string}
export interface RestaurantSettings {name:string;timezone:'Europe/Budapest';menuStartHour:number;menuEndHour:number;address?:string;phone?:string;openingHours?:string;orderingMode:'demo';closingTime?:string;deliveryEnabled?:boolean}
export interface Catalog {optionGroups?:ChoiceGroup[];categories:Category[];products:Product[];weeklyMenu:WeeklyMenu;zones:DeliveryZone[];settings:RestaurantSettings}
export interface OrderRequest {scheduledTime?:string;items:CartItem[];customer:CustomerDetails;fulfillment:Fulfillment;payment:PaymentMethod;idempotencyKey:string}
