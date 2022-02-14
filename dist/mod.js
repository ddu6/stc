import { parse } from 'stdn/dist/parse';
import { urlsToAbsURLs } from './urls';
import { Compiler } from './compiler';
import { extractContext } from './extractor';
export * from './base';
export * from './urls';
export * from './position';
export * from './counter';
export * from './extractor';
export * from './compiler';
export async function compile(sourceParts, options = {}) {
    const parts = [];
    for (const { value, url } of sourceParts) {
        const result = parse(value);
        if (result !== undefined) {
            parts.push({
                value: result,
                url
            });
        }
    }
    const context = await extractContext(parts, options);
    const compiler = new Compiler(context);
    return {
        compiler,
        documentFragment: await compiler.compileSTDN(context.stdn)
    };
}
export async function compileURLs(urls, options = {}) {
    const partPromises = [];
    for (const url of await urlsToAbsURLs(urls, location.href)) {
        partPromises.push((async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    return [];
                }
                return [{
                        value: await res.text(),
                        url
                    }];
            }
            catch (err) {
                console.log(err);
                return [];
            }
        })());
    }
    return await compile((await Promise.all(partPromises)).flat(), options);
}
