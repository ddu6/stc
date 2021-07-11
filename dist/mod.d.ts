import { ExtractContextOptions } from "./countext";
export * from './compiler';
export * from './countext';
export declare function compile(string: string, dir?: string, options?: ExtractContextOptions): Promise<{
    documentFragment: DocumentFragment;
    context: import("./countext").Context;
} | undefined>;
