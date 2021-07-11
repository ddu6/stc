import { fixURLInCSS, urlsStrToAbsURLs } from '@ddu6/urls'
import {stringify} from 'ston'
import {STDN, STDNUnit,STDNUnitOptions} from 'stdn'
import { Compiler } from './compiler'
export interface IndexInfo{
    index:number[]
    label:string
    orbit:string
    unit:STDNUnit
}
export type LabelToIndexInfo={
    [key:string]:IndexInfo
}
export type OrbitToLevel={
    [key:string]:number
}
export type UnitCompiler=(unit:STDNUnit,compiler:Compiler)=>Promise<HTMLElement>
export type TagToUnitCompiler={
    [key:string]:UnitCompiler|undefined
}
export type TagToGlobalOptions={
    [key:string]:STDNUnitOptions|undefined
}
export interface Context{
    css:string
    dir:string
    indexInfoArray:IndexInfo[]
    labelToIndexInfo:LabelToIndexInfo
    tagToUnitCompiler:TagToUnitCompiler
    tagToGlobalOptions:TagToGlobalOptions
    title:string
}
export function unitToPlainString(unit:STDNUnit){
    return stdnToPlainString(unit.children)
}
export function stdnToPlainString(stdn:STDN){
    const array:string[]=[]
    for(let i=0;i<stdn.length;i++){
        const line=stdn[i]
        let string=''
        for(let i=0;i<line.length;i++){
            const inline=line[i]
            if(typeof inline==='string'){
                string+=inline
                continue
            }
            string+=unitToPlainString(inline)
        }
        array.push(string)
    }
    return array.join('\n')
}
export interface ExtractContextOptions{
    dftCSS?:string
    dftTagToUnitCompiler?:TagToUnitCompiler
    dftTagToGlobalOptions?:TagToGlobalOptions
}
export async function extractContext(
    doc:STDN,
    dir:string,
    options:ExtractContextOptions={}
){
    if(dir===''){
        dir=document.location.href
    }
    const context:Context={
        css:options.dftCSS??'',
        dir,
        indexInfoArray:[],
        labelToIndexInfo:{},
        tagToUnitCompiler:options.dftTagToUnitCompiler??{},
        tagToGlobalOptions:options.dftTagToGlobalOptions??{},
        title:'',
    }
    let cssURLsStr=''
    let tagToUnitCompilerURLsStr=''
    for(let i=0;i<doc.length;i++){
        const line=doc[i]
        if(line.length===0){
            continue
        }
        const unit=line[0]
        if(typeof unit==='string'){
            continue
        }
        if(unit.tag==='title'){
            context.title=unitToPlainString(unit)
            continue
        }
        if(unit.tag==='global'){
            let src=unit.options.css
            if(typeof src==='string'&&src!==''){
                cssURLsStr+=stringify(src)
            }
            src=unit.options['tag-to-unit-compiler']
            if(typeof src==='string'&&src!==''){
                tagToUnitCompilerURLsStr+=stringify(src)
            }
            continue
        }
        if(unit.options.global===true){
            let globalOptions=context.tagToGlobalOptions[unit.tag]
            if(globalOptions===undefined){
                globalOptions={}
                context.tagToGlobalOptions[unit.tag]=globalOptions
            }
            const keys=Object.keys(unit.options)
            for(const key of keys){
                if(key==='global'){
                    continue
                }
                globalOptions[key]=unit.options[key]
            }
        }
    }
    let urls=await urlsStrToAbsURLs(cssURLsStr,dir)
    for(let i=0;i<urls.length;i++){
        const url=urls[i]
        try{
            const res=await window.fetch(url)
            if(!res.ok){
                continue
            }
            context.css+=fixURLInCSS(await res.text(),url)+'\n'
        }catch(err){
            console.log(err)
        }
    }
    urls=await urlsStrToAbsURLs(tagToUnitCompilerURLsStr,dir)
    for(let i=0;i<urls.length;i++){
        const url=urls[i]
        try{
            const result=await(new Function(`return import(${JSON.stringify(url)})`)())
            Object.assign(context.tagToUnitCompiler,result)
        }catch(err){
            console.log(err)
        }
    }
    return context
}