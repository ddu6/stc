import type { STDN, STDNUnit } from 'stdn';
export declare function isRelURL(url: string): boolean;
export declare function fixURLInUnit(unit: STDNUnit, dir: string): void;
export declare function fixURLInSTDN(stdn: STDN, dir: string): void;
export declare function urlsToAbsURLs(urls: string[], dir: string, ancestors?: string[]): Promise<string[]>;
export declare function urlsStrToAbsURLs(string: string, dir: string, ancestors?: string[]): Promise<string[]>;
