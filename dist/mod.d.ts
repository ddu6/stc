import { STDN } from "stdn";
import { Compiler } from "./compiler";
import { ExtractContextOptions } from "./countext";
export * from './base';
export * from './urls';
export * from './compiler';
export * from './counter';
export * from './countext';
export declare function compile(string: string, dir?: string, options?: ExtractContextOptions): Promise<{
    documentFragment: DocumentFragment;
    compiler: Compiler;
    doc: STDN;
} | undefined>;
export declare function multiCompile(parts: {
    string: string;
    dir: string;
}[], options?: ExtractContextOptions): Promise<{
    documentFragment: DocumentFragment;
    partLengths: number[];
    compiler: Compiler;
    doc: STDN;
}>;
