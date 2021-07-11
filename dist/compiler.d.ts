import { STDN, STDNInline, STDNLine, STDNUnit } from 'stdn';
import { Context } from './countext';
export declare class Compiler {
    readonly context: Context;
    readonly unitToCompiling: Map<STDNUnit, boolean | undefined>;
    constructor(context: Context);
    compileUnit(unit: STDNUnit): Promise<HTMLElement>;
    compileInline(inline: STDNInline): Promise<HTMLElement | Text>;
    compileLine(line: STDNLine): Promise<DocumentFragment>;
    compileInlineSTDN(stdn: STDN): Promise<DocumentFragment>;
    compileSTDN(stdn: STDN): Promise<DocumentFragment>;
    static createErrorElement(err: string): HTMLSpanElement;
    static supportedHTMLTags: string[];
    static supportedHTMLTagsWithInlineChildren: string[];
    static supportedHTMLAttributes: string[];
}
