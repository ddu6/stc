import {parse} from 'stdn'
import {urlsToAbsURLs} from './urls'
import {Compiler} from './compiler'
import {extractContext, STDNPart} from './extractor'
export * from './base'
export * from './urls'
export * from './counter'
export * from './extractor'
export * from './compiler'
export interface STDNSourcePart {
    value: string
    url: string
}
export async function compile(sourceParts: STDNSourcePart[], options: Parameters<typeof extractContext>[1] = {}) {
    const parts: STDNPart[] = []
    for (const {value, url} of sourceParts) {
        const result = parse(value)
        if (result !== undefined) {
            parts.push({
                value: result,
                url
            })
        }
    }
    const context = await extractContext(parts, options)
    const compiler = new Compiler(context)
    return {
        compiler,
        documentFragment: await compiler.compileSTDN(context.stdn)
    }
}
export async function compileURLs(urls: string[], options: Parameters<typeof compile>[1] = {}) {
    const partPromises: Promise<STDNSourcePart[]>[] = []
    for (const url of await urlsToAbsURLs(urls, location.href)) {
        partPromises.push((async () => {
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    return []
                }
                return [{
                    value: await res.text(),
                    url
                }]
            } catch (err) {
                console.log(err)
                return []
            }
        })())
    }
    return await compile((await Promise.all(partPromises)).flat(), options)
}