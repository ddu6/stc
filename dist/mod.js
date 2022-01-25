import { parse } from 'stdn';
import { Compiler } from './compiler';
import { extractContext } from './extractor';
export * from './base';
export * from './urls';
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
        documentFragment: await compiler.compileSTDN(context.stdn),
        parts
    };
}
