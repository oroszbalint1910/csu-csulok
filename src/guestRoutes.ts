export function guestPage(hash:string){return /^#\/etlap(?:\/|$)/.test(hash)?'menu':/^#\/rendeles(?:\/|$)/.test(hash)?'ordering':'home'}
export function guestSection(hash:string){if(/^#\/(?:etlap|rendeles)\/[^/]+$/.test(hash))return 'category-'+hash.split('/')[2];return hash==='#heti-menu'?'heti-menu':hash==='#kapcsolat'?'kapcsolat':null}
