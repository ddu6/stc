import type {STDN, STDNLine, STDNPosition, STDNUnit} from 'stdn'
import {isRelURL, urlsToAbsURLs} from './urls'
import {Counter} from './counter'
import type {Compiler} from './compiler'
export type UnitCompiler = (unit: STDNUnit, compiler: Compiler) => Promise<HTMLElement | SVGElement>
export type TagToUnitCompiler = {
    [key: string]: UnitCompiler | undefined
}
export type STDNUnitGlobalOptions = {
    optionArrays: {
        [key: string]: (STDNUnit | string | number | boolean)[] | undefined
    }
    childrenArray: STDN[]
}
export type TagToGlobalOptions = {
    [key: string]: STDNUnitGlobalOptions | undefined
}
export function extractGlobalChildren(tag: string, tagToGlobalOptions: TagToGlobalOptions) {
    const options = tagToGlobalOptions[tag]
    if (options === undefined) {
        return []
    }
    return options.childrenArray.flat()
}
export function extractGlobalOptionArray(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions) {
    const options = tagToGlobalOptions[tag]
    if (options === undefined) {
        return []
    }
    return options.optionArrays[option] ?? []
}
export function extractGlobalStrings(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions) {
    const array = extractGlobalOptionArray(option, tag, tagToGlobalOptions)
    const strings: string[] = []
    for (const value of array) {
        if (typeof value === 'string') {
            strings.push(value)
        }
    }
    return strings
}
export async function extractGlobalURLs(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions) {
    return await urlsToAbsURLs(extractGlobalStrings(option, tag, tagToGlobalOptions), location.href)
}
export function extractLastGlobalOption(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions) {
    const array = extractGlobalOptionArray(option, tag, tagToGlobalOptions)
    if (array.length === 0) {
        return undefined
    }
    return array[array.length - 1]
}
export interface STDNPart {
    value: STDN
    url: string
}
export function extractUnitOrLineToPart(parts: STDNPart[]) {
    const out = new Map<STDNUnit | STDNLine, STDNPart | undefined>()
    function setUnit(unit: STDNUnit, part: STDNPart) {
        out.set(unit, part)
        for (const key in unit.options) {
            const value = unit.options[key]
            if (typeof value === 'object') {
                setUnit(value, part)
            }
        }
        set(unit.children, part)
    }
    function set(stdn: STDN, part: STDNPart) {
        for (const line of stdn) {
            out.set(line, part)
            for (const unit of line) {
                if (typeof unit !== 'string') {
                    setUnit(unit, part)
                }
            }
        }
    }
    for (const part of parts) {
        set(part.value, part)
    }
    return out
}
export function extractPartToOffset(parts: STDNPart[]) {
    const out = new Map<STDNPart, number | undefined>()
    let offset = 0
    for (const part of parts) {
        out.set(part, offset)
        offset += part.value.length
    }
    return out
}
export function extractUnitOrLineToPosition(stdn: STDN) {
    const out = new Map<STDNUnit | STDNLine, STDNPosition | undefined>()
    function extractFromUnit(unit: STDNUnit, position: STDNPosition) {
        out.set(unit, position)
        for (const key in unit.options) {
            const value = unit.options[key]
            if (typeof value === 'object') {
                extractFromUnit(value, position.concat(key))
            }
        }
        extract(unit.children, position)
    }
    function extract(stdn: STDN, position: STDNPosition) {
        for (let i = 0; i < stdn.length; i++) {
            const line = stdn[i]
            const linePosition = position.concat(i)
            out.set(line, linePosition)
            for (let j = 0; j < line.length; j++) {
                const unit = line[j]
                if (typeof unit !== 'string') {
                    extractFromUnit(unit, linePosition.concat(j))
                }
            }
        }
    }
    extract(stdn, [])
    return out
}
export function urlToAbsURL(url: string, unit: STDNUnit, unitOrLineToPart: ReturnType<typeof extractUnitOrLineToPart>) {
    if (!isRelURL(url)) {
        return url
    }
    const part = unitOrLineToPart.get(unit)
    if (part === undefined) {
        return url
    }
    try {
        return new URL(url, part.url).href
    } catch (err) {
        console.log(err)
        return url
    }
}
export async function extractContext(parts: STDNPart[], {
    builtInTagToUnitCompiler,
    style,
    headSTDN,
    footSTDN,
    root
}: {
    builtInTagToUnitCompiler?: TagToUnitCompiler
    style?: HTMLStyleElement
    headSTDN?: STDN
    footSTDN?: STDN
    root?: ShadowRoot
} = {}) {
    const tagToGlobalOptions: TagToGlobalOptions = {}
    const tagToUnitCompiler: TagToUnitCompiler = {}
    if (builtInTagToUnitCompiler !== undefined) {
        Object.assign(tagToUnitCompiler, builtInTagToUnitCompiler)
    }
    const cssURLs: string[] = []
    const tagToUnitCompilerURLs: string[] = []
    const unitOrLineToPart = extractUnitOrLineToPart(parts)
    const stdn = parts.map(value => value.value).flat()
    const fullSTDN = (headSTDN ?? []).concat(stdn).concat(footSTDN ?? [])
    for (const line of fullSTDN) {
        if (line.length === 0) {
            continue
        }
        const unit = line[0]
        if (typeof unit === 'string') {
            continue
        }
        if (unit.tag === 'global') {
            const mod = unit.options['mod']
            if (typeof mod === 'string') {
                cssURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${mod}/main.css`)
                tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${mod}/ucs.js`)
            }
            const css = unit.options['css']
            if (typeof css === 'string') {
                cssURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${css}/main.css`)
            }
            const ucs = unit.options['ucs']
            if (typeof ucs === 'string') {
                tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${ucs}/ucs.js`)
            }
            {
                const gh = unit.options['mod-gh']
                if (typeof gh === 'string') {
                    cssURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/main.css`)
                    tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/ucs.js`)
                }
            }
            {
                const gh = unit.options['css-gh']
                if (typeof gh === 'string') {
                    cssURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/main.css`)
                }
            }
            {
                const gh = unit.options['ucs-gh']
                if (typeof gh === 'string') {
                    tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/ucs.js`)
                }
            }
            {
                const src = unit.options['css-src']
                if (typeof src === 'string') {
                    cssURLs.push(urlToAbsURL(src, unit, unitOrLineToPart))
                }
            }
            {
                const src = unit.options['ucs-src']
                if (typeof src === 'string') {
                    tagToUnitCompilerURLs.push(urlToAbsURL(src, unit, unitOrLineToPart))
                }
            }
            continue
        }
        if (unit.options.global === true) {
            let globalOptions = tagToGlobalOptions[unit.tag]
            if (globalOptions === undefined) {
                tagToGlobalOptions[unit.tag] = globalOptions = {
                    optionArrays: {},
                    childrenArray: []
                }
            }
            for (const key in unit.options) {
                if (key === 'global' || key === '__') {
                    continue
                }
                let value = unit.options[key]
                if (value === undefined) {
                    continue
                }
                if (
                    typeof value === 'string'
                    && (key.endsWith('href') || key.endsWith('src'))
                    && isRelURL(value)
                ) {
                    value = urlToAbsURL(value, unit, unitOrLineToPart)
                }
                const values = globalOptions.optionArrays[key]
                if (values === undefined) {
                    globalOptions.optionArrays[key] = [value]
                    continue
                }
                values.push(value)
            }
            globalOptions.childrenArray.push(unit.children)
        }
    }
    const css = (await urlsToAbsURLs(cssURLs, location.href))
        .map(value => `@import ${JSON.stringify(value)};`).join('')
    if (style !== undefined) {
        style.textContent = css
    }
    for (const url of await urlsToAbsURLs(tagToUnitCompilerURLs, location.href)) {
        try {
            Object.assign(tagToUnitCompiler, await (new Function(`return import(${JSON.stringify(url)})`)()))
        } catch (err) {
            console.log(err)
        }
    }
    const counter = new Counter(tagToGlobalOptions)
    counter.countSTDN(stdn)
    const unitOrLineToPosition = extractUnitOrLineToPosition(stdn)
    const partToOffset = extractPartToOffset(parts)
    return {
        css,
        fullSTDN,
        indexInfoArray: counter.indexInfoArray,
        idToIndexInfo: counter.idToIndexInfo,
        parts,
        partToOffset,
        stdn,
        tagToGlobalOptions,
        tagToUnitCompiler,
        title: counter.title,
        unitToId: counter.unitToId,
        unitOrLineToPart,
        unitOrLineToPosition,
        root,
        extractGlobalChildren: (tag: string) => {
            return extractGlobalChildren(tag, tagToGlobalOptions)
        },
        extractGlobalOptionArray: (option: string, tag: string) => {
            return extractGlobalOptionArray(option, tag, tagToGlobalOptions)
        },
        extractGlobalStrings: (option: string, tag: string) => {
            return extractGlobalStrings(option, tag, tagToGlobalOptions)
        },
        extractGlobalURLs: (option: string, tag: string) => {
            return extractGlobalURLs(option, tag, tagToGlobalOptions)
        },
        extractLastGlobalOption: (option: string, tag: string) => {
            return extractLastGlobalOption(option, tag, tagToGlobalOptions)
        },
        urlToAbsURL: (url: string, unit: STDNUnit) => {
            return urlToAbsURL(url, unit, unitOrLineToPart)
        }
    }
}
export type Context = Awaited<ReturnType<typeof extractContext>>