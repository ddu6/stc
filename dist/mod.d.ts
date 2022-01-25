import { Compiler } from './compiler';
import { extractContext } from './extractor';
export * from './base';
export * from './urls';
export * from './counter';
export * from './extractor';
export * from './compiler';
export declare function compile(sourceParts: {
    value: string;
    url: string;
}[], options?: Parameters<typeof extractContext>[1]): Promise<{
    compiler: Compiler;
    documentFragment: DocumentFragment;
}>;
