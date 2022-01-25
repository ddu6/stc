import { Compiler } from './compiler';
import { ExtractContextOptions, STDNPart } from './extractor';
export * from './base';
export * from './urls';
export * from './counter';
export * from './extractor';
export * from './compiler';
export interface STDNSourcePart {
    value: string;
    url: string;
}
export declare function compile(sourceParts: STDNSourcePart[], options?: ExtractContextOptions): Promise<{
    compiler: Compiler;
    documentFragment: DocumentFragment;
    parts: STDNPart[];
}>;
