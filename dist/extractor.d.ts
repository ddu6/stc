import type { STDN, STDNUnit } from 'stdn';
import { Counter } from './counter';
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
export interface Context {
    css: string;
    dir: string;
    indexInfoArray: Counter['indexInfoArray'];
    idToIndexInfo: Counter['idToIndexInfo'];
    tagToGlobalOptions: TagToGlobalOptions;
    tagToUnitCompiler: TagToUnitCompiler;
    title: Counter['title'];
    unitToId: Counter['unitToId'];
}
export declare function extractGlobalOptionArray(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): (string | number | boolean | STDN)[];
export declare function extractLastGlobalOption(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string | number | boolean | STDN | undefined;
export declare function extractGlobalChildren(tag: string, tagToGlobalOptions: TagToGlobalOptions): import("stdn").STDNLine[];
export declare function extractGlobalStrings(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string[];
export declare function extractGlobalURLs(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions, dir: string): Promise<string[]>;
export interface ExtractContextOptions {
    builtInTagToUnitCompiler?: TagToUnitCompiler;
    style?: HTMLStyleElement;
    headSTDN?: STDN;
    footSTDN?: STDN;
}
export declare function extractContext(doc: STDN, dir: string, options?: ExtractContextOptions): Promise<Context>;
