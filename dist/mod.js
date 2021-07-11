import { parse } from "stdn";
import { Compiler } from "./compiler";
import { extractContext } from "./countext";
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
        documentFragment: await compiler.compileChildren(doc),
        context,
    };
}
