import {compile} from '../dist/mod.js'
import {Shell} from '@ddu6/stui'
const shell=new Shell('Test')
window.shell=shell
;(async()=>{
    const result=await compile(`{'a_1=1'}
    {display,'a_2=2'}
    ['Let '{'a_3=3'}.]
    {label eq1,equation[{'a_4=4'}]}
    {label eq2,mark{[[{label eq1,class plain,ref[]}{'\\''}]]},equation[{'a_5=5'}]}
    {class display,aligned[
        ['a_6&=6\\ \\text{see '{label eq2,ref[]}'}\\\\\\\\']
        'a_{1000}&=1000'
    ]}
    {label th1,mark A,desc DDU,theorem[STDN is easy to use.]}
    {proof[We leave it to the reader.]}
    {label to1,corollary[{label eq3,mark{'\\square'},class plain,equation[STDN is a good language.]}]}
    {css main.css,tag-to-unit-compiler uc.js,global[]}`,'',{dftCSS:'.katex{font-size:2em}'})
    if(result===undefined){
        return
    }
    const {documentFragment,context}=result
    shell.styleEle.textContent+=context.css
    shell.append(documentFragment)
    console.log(context)
})()