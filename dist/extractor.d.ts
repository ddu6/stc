import type { STDN, STDNLine, STDNUnit } from 'stdn';
import type { Compiler } from './compiler';
export declare type UnitCompiler = (unit: STDNUnit, compiler: Compiler) => Promise<HTMLElement | SVGElement>;
export declare type TagToUnitCompiler = {
    [key: string]: UnitCompiler | undefined;
};
export declare type STDNUnitGlobalOptions = {
    __?: STDN[];
    [key: string]: (STDN | string | number | boolean)[] | undefined;
};
export declare type TagToGlobalOptions = {
    [key: string]: STDNUnitGlobalOptions | undefined;
};
export declare function extractGlobalChildren(tag: string, tagToGlobalOptions: TagToGlobalOptions): STDNLine[];
export declare function extractGlobalOptionArray(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): (string | number | boolean | STDN)[];
export declare function extractGlobalStrings(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string[];
export declare function extractGlobalURLs(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): Promise<string[]>;
export declare function extractLastGlobalOption(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string | number | boolean | STDN | undefined;
export interface STDNPart {
    value: STDN;
    url: string;
}
export declare function extractUnitOrLineToPart(parts: STDNPart[]): Map<STDNUnit | STDNLine, STDNPart | undefined>;
export declare function extractPartToOffset(parts: STDNPart[]): Map<STDNPart, number | undefined>;
export declare type STDNPosition = (number | string)[];
export declare function extractUnitOrLineToPosition(stdn: STDN): Map<STDNUnit | STDNLine, STDNPosition | undefined>;
export declare function urlToAbsURL(url: string, unit: STDNUnit, unitOrLineToPart: ReturnType<typeof extractUnitOrLineToPart>): string;
export declare function extractContext(parts: STDNPart[], { builtInTagToUnitCompiler, style, headSTDN, footSTDN, root }?: {
    builtInTagToUnitCompiler?: TagToUnitCompiler;
    style?: HTMLStyleElement;
    headSTDN?: STDN;
    footSTDN?: STDN;
    root?: ShadowRoot;
}): Promise<{
    css: string;
    fullSTDN: STDNLine[];
    indexInfoArray: import("./counter").IndexInfo[];
    idToIndexInfo: import("./counter").IdToIndexInfo;
    parts: STDNPart[];
    partToOffset: Map<STDNPart, number | undefined>;
    stdn: STDNLine[];
    tagToGlobalOptions: TagToGlobalOptions;
    tagToUnitCompiler: TagToUnitCompiler;
    title: string;
    unitToId: Map<STDNUnit, string | undefined>;
    unitOrLineToPart: Map<STDNUnit | STDNLine, STDNPart | undefined>;
    unitOrLineToPosition: Map<STDNUnit | STDNLine, STDNPosition | undefined>;
    root: ShadowRoot | undefined;
    extractGlobalChildren: (tag: string) => STDNLine[];
    extractGlobalOptionArray: (option: string, tag: string) => (string | number | boolean | STDN)[];
    extractGlobalStrings: (option: string, tag: string) => string[];
    extractGlobalURLs: (option: string, tag: string) => Promise<string[]>;
    extractLastGlobalOption: (option: string, tag: string) => string | number | boolean | STDN | undefined;
    urlToAbsURL: (url: string, unit: STDNUnit) => string;
}>;
export declare type Context = Awaited<ReturnType<typeof extractContext>>;
