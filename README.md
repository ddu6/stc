# STC
```js
import {compile} from '@ddu6/stc'
const example=`{id flt, style margin:1em 0, theorem [
    'Let n be an integer greater than 2, then there are no positive integers a,b,c satisfying'
    {style text-align:center, 'a^n+b^n=c^n.'}
]}
['The first successful proof of '{href #flt, a[theorem FLT]}' was released in 1994 by Andrew Wiles.']
{style height:100vh}`
const result=await compile(example)
if(result!==undefined){
    document.body.append(result.documentFragment)
}
```