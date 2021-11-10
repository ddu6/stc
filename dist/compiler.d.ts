import { STDN, STDNInline, STDNLine, STDNUnit } from 'stdn';
import { Context } from './countext';
export declare class Compiler {
    readonly context: Context;
    private readonly tagToRealTag;
    readonly unitToCompiling: Map<STDNUnit, boolean | undefined>;
    constructor(context: Context);
    getRealTag(tag: string): string;
    compileUnit(unit: STDNUnit): Promise<HTMLElement | SVGElement>;
    compileInline(inline: STDNInline): Promise<HTMLElement | Text | SVGElement>;
    compileLine(line: STDNLine): Promise<DocumentFragment>;
    compileInlineSTDN(stdn: STDN): Promise<DocumentFragment>;
    compileSTDN(stdn: STDN): Promise<DocumentFragment>;
    static createErrorElement(err: string): HTMLSpanElement;
    static supportedHTMLTags: string[];
    static supportedHTMLTagsWithInlineChildren: string[];
    static supportedSVGTags: string[];
    static supportedHTMLAttributes: string[];
}
