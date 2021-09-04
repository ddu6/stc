import { fixURLInSTDN } from './urls';
import { parse } from "stdn";
import { Compiler } from "./compiler";
import { extractContext } from "./countext";
export * from './urls';
export * from './compiler';
export * from './counter';
export * from './countext';
export async function compile(string, dir = '', options = {}) {
    const doc = parse(string);
    if (doc === undefined) {
        return undefined;
    }
    const context = await extractContext(doc, dir, options);
    const compiler = new Compiler(context);
    return {
        documentFragment: await compiler.compileSTDN(doc),
        context,
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
    const context = await extractContext(doc, '', options);
    const compiler = new Compiler(context);
    return {
        documentFragment: await compiler.compileSTDN(doc),
        context,
        partLengths
    };
}
