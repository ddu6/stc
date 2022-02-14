import type { STDN, STDNLine, STDNUnit } from 'stdn';
export declare function unitToPlainString(unit: STDNUnit): string;
export declare function lineToPlainString(line: STDNLine): string;
export declare function stdnToPlainString(stdn: STDN): string;
export declare function unitToInlinePlainString(unit: STDNUnit): string;
export declare function lineToInlinePlainString(line: STDNLine): string;
export declare function stdnToInlinePlainString(stdn: STDN): string;
export declare function stdnToInlinePlainStringLine(stdn: STDN): STDNLine;
export declare function stringToId(string: string): string;
