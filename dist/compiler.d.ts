import * as ston from 'ston';
import * as stdn from 'stdn';
import * as base from './base';
import * as urls from './urls';
import * as counter from './counter';
import * as extractor from './extractor';
export declare class Compiler {
    readonly context: extractor.Context;
    readonly supportedHTMLTags: string[];
    readonly supportedHTMLTagsWithInlineChildren: string[];
    readonly supportedSVGTags: string[];
    readonly supportedHTMLAttributes: string[];
    readonly ston: typeof ston;
    readonly stdn: typeof stdn;
    readonly base: typeof base;
    readonly urls: typeof urls;
    readonly counter: typeof counter;
    readonly extractor: typeof extractor;
    readonly unitToCompiling: Map<stdn.STDNUnit, boolean | undefined>;
    constructor(context: extractor.Context);
    createErrorElement(err: string): HTMLSpanElement;
    compileUnit(unit: stdn.STDNUnit): Promise<HTMLElement | SVGElement>;
    compileInline(inline: stdn.STDNInline): Promise<HTMLElement | Text | SVGElement>;
    compileLine(line: stdn.STDNLine): Promise<DocumentFragment>;
    compileInlineSTDN(stdn: stdn.STDN): Promise<DocumentFragment>;
    compileSTDN(stdn: stdn.STDN): Promise<DocumentFragment>;
}
