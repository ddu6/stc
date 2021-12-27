import type {STDN,STDNUnit} from 'stdn'
import {urlsToAbsURLs} from './urls'
import {Counter} from './counter'
import type {Compiler} from './compiler'
export type UnitCompiler=(unit:STDNUnit,compiler:Compiler)=>Promise<HTMLElement|SVGElement>
export type TagToUnitCompiler={
    [key:string]:UnitCompiler|undefined
}
export type STDNUnitGlobalOptions={
    __?:STDN[]
    [key: string]:(STDN|string|number|boolean)[]|undefined
}
export type TagToGlobalOptions={
    [key:string]:STDNUnitGlobalOptions|undefined
}
export interface Context{
    css:string
    dir:string
    indexInfoArray:Counter['indexInfoArray']
    idToIndexInfo:Counter['idToIndexInfo']
    tagToGlobalOptions:TagToGlobalOptions
    tagToUnitCompiler:TagToUnitCompiler
    title:Counter['title']
    unitToId:Counter['unitToId']
    root:Window|ShadowRoot
}
export function extractGlobalOptionArray(option:string,tag:string,tagToGlobalOptions:TagToGlobalOptions){
    const options=tagToGlobalOptions[tag]
    if(options===undefined){
        return []
    }
    return options[option]??[]
}
export function extractLastGlobalOption(option:string,tag:string,tagToGlobalOptions:TagToGlobalOptions){
    const array=extractGlobalOptionArray(option,tag,tagToGlobalOptions)
    if(array.length===0){
        return undefined
    }
    return array[array.length-1]
}
export function extractGlobalChildren(tag:string,tagToGlobalOptions:TagToGlobalOptions){
    const options=tagToGlobalOptions[tag]
    if(options===undefined){
        return []
    }
    const array=options.__
    if(array===undefined){
        return []
    }
    return array.flat()
}
export function extractGlobalStrings(option:string,tag:string,tagToGlobalOptions:TagToGlobalOptions){
    const array=extractGlobalOptionArray(option,tag,tagToGlobalOptions)
    const strings:string[]=[]
    for(const val of array){
        if(typeof val==='string'){
            strings.push(val)
        }
    }
    return strings
}
export async function extractGlobalURLs(option:string,tag:string,tagToGlobalOptions:TagToGlobalOptions,dir:string){
    return await urlsToAbsURLs(extractGlobalStrings(option,tag,tagToGlobalOptions),dir)
}
export interface ExtractContextOptions{
    builtInTagToUnitCompiler?:TagToUnitCompiler
    style?:HTMLStyleElement
    headSTDN?:STDN
    footSTDN?:STDN
    root?:Window|ShadowRoot
}
export async function extractContext(
    doc:STDN,
    dir:string,
    options:ExtractContextOptions={}
):Promise<Context>{
    if(dir.length===0){
        dir=location.href
    }
    const tagToGlobalOptions:Context['tagToGlobalOptions']={}
    const tagToUnitCompiler:Context['tagToUnitCompiler']={}
    if(options.builtInTagToUnitCompiler!==undefined){
        Object.assign(tagToUnitCompiler,options.builtInTagToUnitCompiler)
    }
    const cssURLs:string[]=[]
    const tagToUnitCompilerURLs:string[]=[]
    const fullDoc=(options.headSTDN??[]).concat(doc).concat(options.footSTDN??[])
    for(const line of fullDoc){
        if(line.length===0){
            continue
        }
        const unit=line[0]
        if(typeof unit==='string'){
            continue
        }
        if(unit.tag==='global'){
            const mod=unit.options['mod']
            if(typeof mod==='string'){
                cssURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${mod}/main.css`)
                tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${mod}/ucs.js`)
            }
            const css=unit.options['css']
            if(typeof css==='string'){
                cssURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${css}/main.css`)
            }
            const ucs=unit.options['ucs']
            if(typeof ucs==='string'){
                tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${ucs}/ucs.js`)
            }
            {
                const gh=unit.options['mod-gh']
                if(typeof gh==='string'){
                    cssURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/main.css`)
                    tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/ucs.js`)
                }
            }
            {
                const gh=unit.options['css-gh']
                if(typeof gh==='string'){
                    cssURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/main.css`)
                }
            }
            {
                const gh=unit.options['ucs-gh']
                if(typeof gh==='string'){
                    tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/ucs.js`)
                }
            }
            {
                const src=unit.options['css-src']
                if(typeof src==='string'){
                    cssURLs.push(src)
                }
            }
            {
                const src=unit.options['ucs-src']
                if(typeof src==='string'){
                    tagToUnitCompilerURLs.push(src)
                }
            }
            continue
        }
        if(unit.options.global===true){
            let globalOptions=tagToGlobalOptions[unit.tag]
            if(globalOptions===undefined){
                tagToGlobalOptions[unit.tag]=globalOptions={}
            }
            if(globalOptions.__===undefined){
                globalOptions.__=[unit.children]
            }else{
                globalOptions.__.push(unit.children)
            }
            for(const key of Object.keys(unit.options)){
                if(key==='global'||key==='__'){
                    continue
                }
                const val=unit.options[key]
                if(val===undefined){
                    continue
                }
                const vals=globalOptions[key]
                if(vals===undefined){
                    globalOptions[key]=[val]
                }else{
                    vals.push(val)
                }
            }
        }
    }
    const css=(await urlsToAbsURLs(cssURLs,dir))
    .map(val=>`@import ${JSON.stringify(val)};`).join('')
    if(options.style!==undefined){
        options.style.textContent=css
    }
    for(const url of await urlsToAbsURLs(tagToUnitCompilerURLs,dir)){
        try{
            Object.assign(tagToUnitCompiler,await (new Function(`return import(${JSON.stringify(url)})`)()))
        }catch(err){
            console.log(err)
        }
    }
    const counter=new Counter(tagToGlobalOptions)
    counter.countSTDN(doc)
    return {
        css,
        dir,
        indexInfoArray:counter.indexInfoArray,
        idToIndexInfo:counter.idToIndexInfo,
        tagToGlobalOptions,
        tagToUnitCompiler,
        title:counter.title,
        unitToId:counter.unitToId,
        root:options.root??window
    }
}