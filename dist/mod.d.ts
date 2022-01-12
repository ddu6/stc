import { STDN } from 'stdn';
import { Compiler } from './compiler';
import { ExtractContextOptions } from './extractor';
export * from './base';
export * from './urls';
export * from './counter';
export * from './extractor';
export * from './compiler';
export declare function compile(string: string, dir: string, options?: ExtractContextOptions): Promise<{
    compiler: Compiler;
    documentFragment: DocumentFragment;
    stdn: STDN;
} | undefined>;
export interface STDNPart {
    string: string;
    dir: string;
}
export declare function multiCompile(parts: STDNPart[], options?: ExtractContextOptions): Promise<{
    compiler: Compiler;
    documentFragment: DocumentFragment;
    partLengths: number[];
    stdn: STDN;
}>;
