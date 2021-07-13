import { STDN, STDNUnit } from 'stdn';
export declare function isRelURL(url: string): boolean;
export declare function relURLToAbsURL(url: string, dir: string): string;
export declare function fixURLInCSS(string: string, dir: string): string;
export declare function fixURLInUnit(unit: STDNUnit, dir: string): void;
export declare function fixURLInSTDN(stdn: STDN, dir: string): void;
export declare function urlsToAbsURLs(urls: string[], dir: string): Promise<string[]>;
export declare function urlsStrToAbsURLs(string: string, dir: string): Promise<string[]>;
