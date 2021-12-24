import {STDN,STDNUnit} from 'stdn'
import {unitToInlinePlainString,stringToId} from './base'
import {getLastGlobalOption,TagToGlobalOptions} from './countext'
export interface IndexInfo{
    index:number[]
    id:string
    orbit:string
    unit:STDNUnit
}
export type IdToIndexInfo={
    [key:string]:IndexInfo|undefined
}
export class Counter{
    private readonly currentHeadingIndex:number[]=[]
    private readonly orbitToCurrentIndex:{
        [key:string]:number[]|undefined
    }={}
    private readonly baseIdToCount:{
        [key:string]:number|undefined
    }={}
    readonly indexInfoArray:IndexInfo[]=[]
    readonly idToIndexInfo:IdToIndexInfo={}
    readonly unitToId=new Map<STDNUnit,string|undefined>()
    title=''
    constructor(readonly tagToGlobalOptions:TagToGlobalOptions){}
    private createIndex(orbit:string,level:number){
        if(orbit==='heading'){
            if(this.currentHeadingIndex.length<level){
                for(let i=this.currentHeadingIndex.length;i<level;i++){
                    this.currentHeadingIndex.push(0)
                }
            }else{
                for(let i=level;i<this.currentHeadingIndex.length;i++){
                    this.currentHeadingIndex[i]=0
                }
                for(const key of Object.keys(this.orbitToCurrentIndex)){
                    const val=this.orbitToCurrentIndex[key]
                    if(val===undefined||val.length<level){
                        continue
                    }
                    for(let i=level;i<val.length;i++){
                        val[i]=0
                    }
                }
            }
            this.currentHeadingIndex[level-1]++
            return this.currentHeadingIndex.slice(0,level)
        }
        let val=this.orbitToCurrentIndex[orbit]
        if(val===undefined){
            val=[]
            this.orbitToCurrentIndex[orbit]=val
        }
        if(val.length<level){
            for(let i=val.length;i<level;i++){
                val.push(0)
            }
        }
        if(this.currentHeadingIndex.length<level-1){
            for(let i=this.currentHeadingIndex.length;i<level-1;i++){
                this.currentHeadingIndex.push(0)
            }
        }
        const tmp=this.currentHeadingIndex.slice(0,level-1)
        tmp.push(++val[level-1])
        return tmp
    }
    private countUnit(unit:STDNUnit){
        if(this.title.length===0&&unit.tag==='title'){
            this.title=unitToInlinePlainString(unit)
        }
        if(unit.tag!=='global'&&unit.options.global!==true){
            const baseId=stringToId(typeof unit.options.id==='string'?unit.options.id:unitToInlinePlainString(unit))
            const count=this.baseIdToCount[baseId]=(this.baseIdToCount[baseId]??0)+1
            const id=count>1||baseId.length===0?`${baseId}~${count}`:baseId
            let orbit=unit.options.orbit
                ??getLastGlobalOption('orbit',unit.tag,this.tagToGlobalOptions)
            if(typeof orbit!=='string'||orbit.length===0){
                orbit=unit.tag==='h1'
                    ||unit.tag==='h2'
                    ||unit.tag==='h3'
                    ||unit.tag==='h4'
                    ||unit.tag==='h5'
                    ||unit.tag==='h6'
                    ?'heading':unit.tag
            }
            let level=unit.options.level
                ??getLastGlobalOption('level',unit.tag,this.tagToGlobalOptions)
                ??getLastGlobalOption('level',orbit,this.tagToGlobalOptions)
            if(typeof level!=='number'||level<=0||level%1!==0){
                switch(unit.tag){
                    case 'h2':level=2
                    break
                    case 'h3':level=3
                    break
                    case 'h4':level=4
                    break
                    case 'h5':level=5
                    break
                    case 'h6':level=6
                    break
                    default:level=1
                }
            }
            const index=this.createIndex(orbit,level)
            const indexInfo:IndexInfo={
                index,
                id,
                orbit,
                unit,
            }
            this.indexInfoArray.push(indexInfo)
            this.idToIndexInfo[id]=indexInfo
            this.unitToId.set(unit,id)
        }
        for(const key of Object.keys(unit.options)){
            const val=unit.options[key]
            if(Array.isArray(val)){
                this.countSTDN(val)
            }
        }
        this.countSTDN(unit.children)
    }
    countSTDN(stdn:STDN){
        for(const line of stdn){
            for(const unit of line){
                if(typeof unit!=='string'){
                    this.countUnit(unit)
                }
            }
        }
    }
}