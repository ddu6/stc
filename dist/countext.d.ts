import { STDN, STDNUnit } from 'stdn';
import { Compiler } from './compiler';
import { IndexInfo, IdToIndexInfo } from './counter';
export declare type UnitCompiler = (unit: STDNUnit, compiler: Compiler) => Promise<HTMLElement>;
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
export declare type TagToVariables = {
    [key: string]: unknown;
};
export interface Context {
    css: string;
    dir: string;
    indexInfoArray: IndexInfo[];
    idToIndexInfo: IdToIndexInfo;
    tagToUnitCompiler: TagToUnitCompiler;
    tagToGlobalOptions: TagToGlobalOptions;
    tagToVariables: TagToVariables;
    title: string;
}
export declare function unitToPlainString(unit: STDNUnit): string;
export declare function stdnToPlainString(stdn: STDN): string;
export declare function getGlobalOptionArray(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): (string | number | boolean | STDN)[];
export declare function getLastGlobalOption(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string | number | boolean | STDN | undefined;
export declare function getGlobalChildren(tag: string, tagToGlobalOptions: TagToGlobalOptions): import("stdn").STDNLine[];
export declare function getGlobalStrings(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions): string[];
export declare function getGlobalURLs(option: string, tag: string, tagToGlobalOptions: TagToGlobalOptions, dir: string): Promise<string[]>;
export interface ExtractContextOptions {
    dftTagToUnitCompiler?: TagToUnitCompiler;
    dftTagToGlobalOptions?: TagToGlobalOptions;
}
export declare function extractContext(doc: STDN, dir: string, options?: ExtractContextOptions): Promise<Context>;
