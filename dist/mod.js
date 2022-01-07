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
    const stdn = parse(string);
    if (stdn === undefined) {
        return undefined;
    }
    const context = await extractContext(stdn, dir, options);
    const compiler = new Compiler(context);
    return {
        compiler,
        stdn,
        documentFragment: await compiler.compileSTDN(stdn)
    };
}
export async function multiCompile(parts, options = {}) {
    const stdn = [];
    const partLengths = [];
    for (const { string, dir } of parts) {
        const result = parse(string);
        if (result === undefined) {
            partLengths.push(0);
            continue;
        }
        fixURLInSTDN(result, dir);
        stdn.push(...result);
        partLengths.push(result.length);
    }
    const context = await extractContext(stdn, 'a:b', options);
    const compiler = new Compiler(context);
    return {
        compiler,
        stdn,
        documentFragment: await compiler.compileSTDN(stdn),
        partLengths
    };
}
