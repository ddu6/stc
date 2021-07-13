export async function katex(unit){
    const ele=document.createElement('span')
    ele.textContent=unit.tag
    return ele
}