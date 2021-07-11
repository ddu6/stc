import { parse } from "stdn";
import { Compiler } from "./compiler";
import { extractContext, ExtractContextOptions } from "./countext";
export * from './compiler'
export * from './countext'
export async function compile(string:string,dir='',options:ExtractContextOptions={}){
    const doc=parse(string)
    if(doc===undefined){
        return undefined
    }
    const context=await extractContext(doc,dir,options)
    const compiler=new Compiler(context)
    return {
        documentFragment:await compiler.compileChildren(doc),
        context,
    }
}