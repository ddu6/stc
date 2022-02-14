import type { STDN, STDNLine, STDNPosition, STDNUnit } from 'stdn';
import { IndexInfo } from './counter';
import type { Compiler } from './compiler';
export declare type UnitCompiler = (unit: STDNUnit, compiler: Compiler) => Promise<HTMLElement | SVGElement>;
export declare type TagToUnitCompiler = {
    [key: string]: UnitCompiler | undefined;
};
export declare type STDNUnitGlobalOptions = {
    optionArrays: {
        [key: string]: (STDNUnit | string | number | boolean)[] | undefined;
    };
    childrenArray: STDN[];
};
export declare type TagToGlobalOptions = {
    [key: string]: STDNUnitGlobalOptions | undefined;
};
export declare function extractGlobalChildren(tag: string, tagToGlobalOptions: TagToGlobalOptions): STDNLine[];
export declare function extractGlobalOptionArray(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): (string | number | boolean | STDNUnit)[];
export declare function extractGlobalStrings(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string[];
export declare function extractGlobalURLs(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): Promise<string[]>;
export declare function extractLastGlobalOption(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string | number | boolean | STDNUnit | undefined;
export interface STDNPart {
    value: STDN;
    url: string;
}
export declare function extractUnitOrLineToPart(parts: STDNPart[]): Map<STDNUnit | STDNLine, STDNPart | undefined>;
export declare function extractPartToOffset(parts: STDNPart[]): Map<STDNPart, number | undefined>;
export declare function extractUnitOrLineToPosition(stdn: STDN): Map<STDNUnit | STDNLine, STDNPosition | undefined>;
export declare function extractUnitOrLineToHeading(stdn: STDN, headings: IndexInfo[]): Map<STDNUnit | STDNLine, IndexInfo | undefined>;
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
    headings: IndexInfo[];
    headingAndTitles: IndexInfo[];
    indexInfoArray: IndexInfo[];
    idToIndexInfo: import("./counter").IdToIndexInfo;
    parts: STDNPart[];
    partToOffset: Map<STDNPart, number | undefined>;
    stdn: STDNLine[];
    tagToGlobalOptions: TagToGlobalOptions;
    tagToUnitCompiler: TagToUnitCompiler;
    title: string;
    titleInfo: IndexInfo | undefined;
    unitToId: Map<STDNUnit, string | undefined>;
    unitOrLineToHeading: Map<STDNUnit | STDNLine, IndexInfo | undefined>;
    unitOrLineToPart: Map<STDNUnit | STDNLine, STDNPart | undefined>;
    unitOrLineToPosition: Map<STDNUnit | STDNLine, STDNPosition | undefined>;
    root: ShadowRoot | undefined;
    extractGlobalChildren: (tag: string) => STDNLine[];
    extractGlobalOptionArray: (option: string, tag: string) => (string | number | boolean | STDNUnit)[];
    extractGlobalStrings: (option: string, tag: string) => string[];
    extractGlobalURLs: (option: string, tag: string) => Promise<string[]>;
    extractLastGlobalOption: (option: string, tag: string) => string | number | boolean | STDNUnit | undefined;
    urlToAbsURL: (url: string, unit: STDNUnit) => string;
}>;
export declare type Context = Awaited<ReturnType<typeof extractContext>>;
