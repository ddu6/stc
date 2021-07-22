import { STDN, STDNUnit } from 'stdn';
import { Compiler } from './compiler';
import { IndexInfo, LabelToIndexInfo } from './counter';
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
export interface Context {
    css: string;
    dir: string;
    indexInfoArray: IndexInfo[];
    labelToIndexInfo: LabelToIndexInfo;
    tagToUnitCompiler: TagToUnitCompiler;
    tagToGlobalOptions: TagToGlobalOptions;
    title: string;
}
export declare function unitToPlainString(unit: STDNUnit): string;
export declare function stdnToPlainString(stdn: STDN): string;
export interface ExtractContextOptions {
    dftTagToUnitCompiler?: TagToUnitCompiler;
    dftTagToGlobalOptions?: TagToGlobalOptions;
}
export declare function extractContext(doc: STDN, dir: string, options?: ExtractContextOptions): Promise<Context>;
