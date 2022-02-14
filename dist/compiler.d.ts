import * as ston from 'ston/dist/parse';
import * as stdn from 'stdn/dist/parse';
import * as position from 'stdn/dist/position';
import * as base from './base';
import * as urls from './urls';
import * as dom from './dom';
import * as counter from './counter';
import * as extractor from './extractor';
import { compile } from './mod';
export declare const supportedHTMLTags: string[];
export declare const supportedHTMLTagsWithInlineChildren: string[];
export declare const supportedSVGTags: string[];
export declare function createErrorElement(err: string): HTMLSpanElement;
export declare class Compiler {
    readonly context: extractor.Context;
    readonly ston: typeof ston;
    readonly stdn: typeof stdn;
    readonly position: typeof position;
    readonly base: typeof base;
    readonly urls: typeof urls;
    readonly dom: typeof dom;
    readonly counter: typeof counter;
    readonly extractor: typeof extractor;
    readonly compile: typeof compile;
    readonly supportedHTMLTags: string[];
    readonly supportedHTMLTagsWithInlineChildren: string[];
    readonly supportedSVGTags: string[];
    readonly createErrorElement: typeof createErrorElement;
    readonly elementToUnitOrLine: Map<HTMLElement | SVGElement, stdn.STDNUnit | stdn.STDNLine | undefined>;
    readonly unitOrLineToElements: Map<stdn.STDNUnit | stdn.STDNLine, (HTMLElement | SVGElement)[] | undefined>;
    readonly unitToCompiling: Map<stdn.STDNUnit, boolean | undefined>;
    constructor(context: extractor.Context);
    private registerElement;
    compileUnit(unit: stdn.STDNUnit): Promise<HTMLElement | SVGElement>;
    compileInline(inline: stdn.STDNUnit | string): Promise<HTMLElement | Text | SVGElement>;
    compileLine(line: stdn.STDNLine): Promise<DocumentFragment>;
    compileInlineSTDN(stdn: stdn.STDN): Promise<DocumentFragment>;
    compileSTDN(stdn: stdn.STDN): Promise<DocumentFragment>;
}
