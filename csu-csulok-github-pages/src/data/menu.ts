export const categories = ['Heti menü', 'Gyros', 'Hamburgerek', 'À la carte', 'Pizzák', 'Sütik', 'Italok'] as const;
export type Category = typeof categories[number];
export type MenuFilter = Category | 'Összes';
export type MenuItem = {id:string; category:Category; name:string; description:string; price:number; tag?:string; courses?:{soup:string;main:string}};
// Demonstration content only. Replace with the owner's verified menu before launch.
export const menu:MenuItem[] = [
 {id:'weekly',category:'Heti menü',name:'Heti ebédmenü',description:'Zöldségleves és rántott csirkemell petrezselymes burgonyával.',courses:{soup:'Zöldségleves',main:'Rántott csirkemell, petrezselymes burgonya'},price:2490,tag:'Leves + főétel'},
 {id:'gyros-plate',category:'Gyros',name:'Gyrostál',description:'Fűszeres csirkehús, ropogós burgonya, friss saláta, joghurtos öntet.',price:3290,tag:'Tálban az igazi'},
 {id:'gyros-pita',category:'Gyros',name:'Gyros pitában',description:'Puha pita, fűszeres csirkehús, zöldségek és joghurtos öntet.',price:2290},
 {id:'burger-classic',category:'Hamburgerek',name:'Klasszikus sajtburger',description:'Marhahúspogácsa, cheddar, paradicsom, saláta, szósz, szezámos buci.',price:3490,tag:'Rétegről rétegre'},
 {id:'burger-vega',category:'Hamburgerek',name:'Zöldséges burger',description:'Zöldségpogácsa, saláta, paradicsom és fűszeres szósz.',price:2990},
 {id:'chicken',category:'À la carte',name:'Grillezett csirkemell',description:'Grillezett csirkemell, pirított burgonya és szezonális zöldségek.',price:3990},
 {id:'vegetables',category:'À la carte',name:'Grillezett zöldségtál',description:'Szezonális zöldségek, párolt rizs és könnyű zöldfűszeres öntet.',price:2990},
 {id:'pizza-margherita',category:'Pizzák',name:'Margherita',description:'Paradicsomos alap, mozzarella, friss bazsalikom. 32 cm.',price:2890,tag:'Egyszerűen nagyszerű'},
 {id:'pizza-salame',category:'Pizzák',name:'Salame',description:'Paradicsomos alap, mozzarella és fűszeres szalámi. 32 cm.',price:3290},
 {id:'pizza-verdure',category:'Pizzák',name:'Verdure',description:'Paradicsomos alap, mozzarella, grillezett zöldségek. 32 cm.',price:3190},
 {id:'cake-chocolate',category:'Sütik',name:'Csokoládétorta',description:'Csokoládés piskóta, lágy csokoládékrém. Egy szelet.',price:1490,tag:'Egy édes lezárás'},
 {id:'cake-cheesecake',category:'Sütik',name:'Sajttorta',description:'Krémes sajttorta kekszalappal és gyümölcsöntettel. Egy szelet.',price:1590},
 {id:'cake-apple',category:'Sütik',name:'Almás pite',description:'Fahéjas alma, omlós tészta. Egy szelet.',price:1190},
 {id:'beer-lager',category:'Italok',name:'Világos sör',description:'Hűtve kínált világos sör. 0,5 l.',price:1090,tag:'Sör'},
 {id:'wine-white',category:'Italok',name:'Fehérbor',description:'Száraz fehérbor, pohárral. 1 dl.',price:690,tag:'Bor'},
 {id:'wine-rose',category:'Italok',name:'Rozébor',description:'Rozébor, pohárral. 1 dl.',price:690,tag:'Bor'},
 {id:'wine-red',category:'Italok',name:'Vörösbor',description:'Száraz vörösbor, pohárral. 1 dl.',price:790,tag:'Bor'},
 {id:'palinka-apricot',category:'Italok',name:'Barackpálinka',description:'Gyümölcspálinka barackból. 4 cl.',price:1490,tag:'Pálinka'},
 {id:'palinka-plum',category:'Italok',name:'Szilvapálinka',description:'Gyümölcspálinka szilvából. 4 cl.',price:1490,tag:'Pálinka'},
 {id:'lemonade',category:'Italok',name:'Citrusos limonádé',description:'Citrom, lime, menta és szódavíz. 0,5 l.',price:1290,tag:'Egy kis felfrissülés'},
 {id:'coffee',category:'Italok',name:'Espresso',description:'Egy csésze kávé az ebéd mellé. 30 ml.',price:690},
 {id:'water',category:'Italok',name:'Ásványvíz',description:'Szénsavas vagy szénsavmentes. 0,5 l.',price:590},
];
export const money=(n:number)=>new Intl.NumberFormat('hu-HU').format(n)+' Ft';
