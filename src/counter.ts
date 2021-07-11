import { STDN, STDNUnit } from "stdn"
import { TagToGlobalOptions } from "./countext"
export interface IndexInfo{
    index:number[]
    label:string
    orbit:string
    unit:STDNUnit
}
export type LabelToIndexInfo={
    [key:string]:IndexInfo|undefined
}
export class Counter{
    private readonly currentHeadingIndex:number[]=[]
    private readonly orbitToCurrentIndex:{
        [key:string]:number[]|undefined
    }={}
    readonly indexInfoArray:IndexInfo[]=[]
    readonly labelToIndexInfo:LabelToIndexInfo={}
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
                const keys=Object.keys(this.orbitToCurrentIndex)
                for(const key of keys){
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
    countUnit(unit:STDNUnit){
        const {label}=unit.options
        if(
            typeof label!=='string'
            ||label===''
            ||this.labelToIndexInfo[label]!==undefined
        ){
            return
        }
        let {orbit,level}=unit.options
        if(typeof orbit!=='string'||orbit===''){
            orbit=unit.tag
        }
        if(typeof level!=='number'||level<=0||level%1!==0){
            level=(this.tagToGlobalOptions[unit.tag]??{}).level
            if(typeof level!=='number'||level<=0||level%1!==0){
                level=1
            }
        }
        const index=this.createIndex(orbit,level)
        const indexInfo:IndexInfo={
            index,
            label,
            orbit,
            unit,
        }
        this.indexInfoArray.push(indexInfo)
        this.labelToIndexInfo[label]=indexInfo
    }
    countChildren(children:STDN){
        for(let i=0;i<children.length;i++){
            const line=children[i]
            for(let i=0;i<line.length;i++){
                const unit=line[i]
                if(typeof unit==='string'){
                    continue
                }
                this.countUnit(unit)
                this.countChildren(unit.children)
                const keys=Object.keys(unit.options)
                for(const key of keys){
                    const val=unit.options[key]
                    if(!Array.isArray(val)){
                        continue
                    }
                    this.countChildren(val)
                }
            }
        }
    }
}