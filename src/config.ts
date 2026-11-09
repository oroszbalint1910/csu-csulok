export const appConfig={base:import.meta.env.BASE_URL,apiBase:import.meta.env.VITE_API_BASE_URL||null,mode:'demo' as const};
export const publicAsset=(name:string)=>appConfig.base+name;
