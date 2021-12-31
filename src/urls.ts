import {parse} from 'ston'
import type {STDN, STDNUnit} from 'stdn'
export function isRelURL(url:string){
    return !url.startsWith('#')&&!/^[a-z][a-z0-9+.-]*:/i.test(url)
}
export function fixURLInUnit(unit:STDNUnit,dir:string){
    for(const key of Object.keys(unit.options)){
        const val=unit.options[key]
        if(Array.isArray(val)){
            fixURLInSTDN(val,dir)
        }else if(
            typeof val==='string'
            &&(key.endsWith('href')||key.endsWith('src'))
            &&isRelURL(val)
        ){
            unit.options[key]=new URL(val,dir).href
        }
    }
    fixURLInSTDN(unit.children,dir)
}
export function fixURLInSTDN(stdn:STDN,dir:string){
    for(const line of stdn){
        for(const unit of line){
            if(typeof unit!=='string'){
                fixURLInUnit(unit,dir)
            }
        }
    }
}
export async function urlsToAbsURLs(urls:string[],dir:string,ancestors:string[]=[]){
    const out:(Promise<string[]>|string)[]=[]
    for(const urlStr of urls){
        const url=new URL(urlStr,dir)
        if(!url.pathname.endsWith('.urls')&&!url.pathname.endsWith('.urls.txt')){
            out.push(url.href)
            continue
        }
        if(ancestors.includes(url.href)){
            continue
        }
        out.push((async ()=>{
            try{
                const res=await fetch(url.href)
                if(!res.ok){
                    return []
                }
                return await urlsStrToAbsURLs(await res.text(),url.href,ancestors.concat(url.href))
            }catch(err){
                console.log(err)
                return []
            }
        })())
    }
    return (await Promise.all(out)).flat()
}
export async function urlsStrToAbsURLs(string:string,dir:string,ancestors:string[]=[]){
    const array=parse('['+string+']')
    if(!Array.isArray(array)){
        return []
    }
    const urls:string[]=[]
    for(const item of array){
        if(typeof item==='string'){
            urls.push(item)
        }
    }
    return await urlsToAbsURLs(urls,dir,ancestors)
}