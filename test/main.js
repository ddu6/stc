import {compile} from '../mod.js'
const example=`{id flt, style margin:1em 0, theorem [
    'Let n be an integer greater than 2, then there are no positive integers a,b,c satisfying'
    {style text-align:center, 'a^n+b^n=c^n.'}
]}
['The first successful proof of '{href #flt, a[theorem FLT]}' was released in 1994 by Andrew Wiles.']
{style height:100vh}`
;(async()=>{
    const result=await compile(example)
    if(result===undefined){
        return
    }
    const {documentFragment,context}=result
    const style=document.createElement('style')
    style.textContent+=context.css
    document.body.append(style)
    document.body.append(documentFragment)
    console.log(context)
})()