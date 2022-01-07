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
    stdn: STDN;
    documentFragment: DocumentFragment;
} | undefined>;
export declare function multiCompile(parts: {
    string: string;
    dir: string;
}[], options?: ExtractContextOptions): Promise<{
    compiler: Compiler;
    stdn: STDN;
    documentFragment: DocumentFragment;
    partLengths: number[];
}>;
