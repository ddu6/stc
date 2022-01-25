import { Compiler } from './compiler';
import { extractContext } from './extractor';
export * from './base';
export * from './urls';
export * from './counter';
export * from './extractor';
export * from './compiler';
export interface STDNSourcePart {
    value: string;
    url: string;
}
export declare function compile(sourceParts: STDNSourcePart[], options?: Parameters<typeof extractContext>[1]): Promise<{
    compiler: Compiler;
    documentFragment: DocumentFragment;
}>;
export declare function compileURLs(urls: string[], options?: Parameters<typeof compile>[1]): Promise<{
    compiler: Compiler;
    documentFragment: DocumentFragment;
}>;
