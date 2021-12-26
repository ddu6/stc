import type {STDN,STDNLine,STDNUnit} from 'stdn'
export function stdnToPlainString(stdn:STDN){
    const array:string[]=[]
    for(const line of stdn){
        array.push(lineToPlainString(line))
    }
    return array.join('\n')
}
export function lineToPlainString(line:STDNLine){
    let string=''
    for(const inline of line){
        if(typeof inline==='string'){
            string+=inline
            continue
        }
        string+=unitToPlainString(inline)
    }
    return string
}
export function unitToPlainString(unit:STDNUnit){
    return stdnToPlainString(unit.children)
}
export function stdnToInlinePlainString(stdn:STDN){
    for(const line of stdn){
        const string=lineToInlinePlainString(line)
        if(string.length>0){
            return string
        }
    }
    return ''
}
export function lineToInlinePlainString(line:STDNLine){
    let string=''
    for(const inline of line){
        if(typeof inline==='string'){
            string+=inline
            continue
        }
        string+=unitToInlinePlainString(inline)
    }
    return string
}
export function unitToInlinePlainString(unit:STDNUnit){
    return stdnToInlinePlainString(unit.children)
}
export function stringToId(string:string){
    return Array.from(string.slice(0,100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase()
}