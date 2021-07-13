import { ExtractContextOptions } from "./countext";
export * from './urls';
export * from './compiler';
export * from './counter';
export * from './countext';
export declare function compile(string: string, dir?: string, options?: ExtractContextOptions): Promise<{
    documentFragment: DocumentFragment;
    context: import("./countext").Context;
} | undefined>;
export declare function multiCompile(parts: {
    string: string;
    dir: string;
}[], options?: ExtractContextOptions): Promise<{
    documentFragment: DocumentFragment;
    context: import("./countext").Context;
    partLengths: number[];
}>;
