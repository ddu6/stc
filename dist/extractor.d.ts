import type { STDN, STDNLine, STDNUnit } from 'stdn';
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
export declare type STDNPosition = (number | string)[];
export declare type UnitOrLineToPosition = Map<STDNUnit | STDNLine, STDNPosition | undefined>;
export interface STDNPart {
    value: STDN;
    url: string;
}
export declare type UnitOrLineToPart = Map<STDNUnit | STDNLine, STDNPart | undefined>;
export interface Context {
    readonly css: string;
    readonly fullSTDN: STDN;
    readonly indexInfoArray: Counter['indexInfoArray'];
    readonly idToIndexInfo: Counter['idToIndexInfo'];
    readonly stdn: STDN;
    readonly tagToGlobalOptions: TagToGlobalOptions;
    readonly tagToUnitCompiler: TagToUnitCompiler;
    readonly title: Counter['title'];
    readonly unitToId: Counter['unitToId'];
    readonly unitOrLineToPart: UnitOrLineToPart;
    readonly unitOrLineToPosition: UnitOrLineToPosition;
    readonly urlToAbsURL: (url: string, unit: STDNUnit) => string;
    readonly root: ShadowRoot | undefined;
}
export declare function extractGlobalOptionArray(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): (string | number | boolean | STDN)[];
export declare function extractLastGlobalOption(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string | number | boolean | STDN | undefined;
export declare function extractGlobalChildren(tag: string, tagToGlobalOptions: TagToGlobalOptions): STDNLine[];
export declare function extractGlobalStrings(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string[];
export declare function extractUnitOrLineToPosition(stdn: STDN): UnitOrLineToPosition;
export declare function extractUnitOrLineToPart(parts: STDNPart[]): UnitOrLineToPart;
export interface ExtractContextOptions {
    builtInTagToUnitCompiler?: TagToUnitCompiler;
    style?: HTMLStyleElement;
    headSTDN?: STDN;
    footSTDN?: STDN;
    root?: ShadowRoot;
}
export declare function extractContext(parts: STDNPart[], options?: ExtractContextOptions): Promise<Context>;
