import type { STDN, STDNLine, STDNUnit } from 'stdn';
export declare type STDNPosition = (number | string)[];
export declare function parsePositionStr(string: string): (string | number)[];
export declare function stringifyPosition(position: STDNPosition): string;
export declare function positionToUnitOrLines(offset: number, position: STDNPosition, stdn: STDN): (STDNUnit | STDNLine)[];
