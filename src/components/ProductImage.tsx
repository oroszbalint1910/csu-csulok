import {publicAsset} from '../config';
import type {ProductImage as ImageModel} from '../domain/models';
export function ProductImage({image,alt,eager=false}:{image?:ImageModel;alt:string;eager?:boolean}){return <img className="food-photo" src={image?.url||publicAsset('food-placeholder.svg')} alt={image?.alt||`${alt} – illusztráció, fotó feltöltés alatt`} loading={eager?'eager':'lazy'} decoding="async" width={640} height={400} onError={e=>{const fallback=publicAsset('food-placeholder.svg');if(!e.currentTarget.src.endsWith('/food-placeholder.svg'))e.currentTarget.src=fallback}}/>}
