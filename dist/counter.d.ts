import type { STDN, STDNUnit } from 'stdn';
import { TagToGlobalOptions } from './extractor';
export interface IndexInfo {
    id: string;
    index: number[];
    orbit: string;
    unit: STDNUnit;
}
export declare type IdToIndexInfo = {
    [key: string]: IndexInfo | undefined;
};
export declare class Counter {
    readonly tagToGlobalOptions: TagToGlobalOptions;
    private readonly currentHeadingIndex;
    private readonly orbitToCurrentIndex;
    private readonly baseIdToCount;
    readonly idToIndexInfo: IdToIndexInfo;
    readonly indexInfoArray: IndexInfo[];
    readonly unitToId: Map<STDNUnit, string | undefined>;
    title: string;
    constructor(tagToGlobalOptions: TagToGlobalOptions);
    private createIndex;
    private countUnit;
    countSTDN(stdn: STDN): void;
}
