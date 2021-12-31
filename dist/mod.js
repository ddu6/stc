import { parse } from 'stdn';
import { fixURLInSTDN } from './urls';
import { Compiler } from './compiler';
import { extractContext } from './extractor';
export * from './base';
export * from './urls';
export * from './counter';
export * from './extractor';
export * from './compiler';
export async function compile(string, dir, options = {}) {
    const doc = parse(string);
    if (doc === undefined) {
        return undefined;
    }
    const context = await extractContext(doc, dir, options);
    const compiler = new Compiler(context);
    return {
        documentFragment: await compiler.compileSTDN(doc),
        compiler,
        doc,
    };
}
export async function multiCompile(parts, options = {}) {
    const doc = [];
    const partLengths = [];
    for (const { string, dir } of parts) {
        const stdn = parse(string);
        if (stdn === undefined) {
            partLengths.push(0);
            continue;
        }
        fixURLInSTDN(stdn, dir);
        doc.push(...stdn);
        partLengths.push(stdn.length);
    }
    const context = await extractContext(doc, 'a:b', options);
    const compiler = new Compiler(context);
    return {
        documentFragment: await compiler.compileSTDN(doc),
        partLengths,
        compiler,
        doc,
    };
}
