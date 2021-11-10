import { STDN, STDNUnit } from 'stdn';
import { TagToGlobalOptions } from './countext';
export interface IndexInfo {
    index: number[];
    id: string;
    orbit: string;
    realOrbit: string;
    unit: STDNUnit;
}
export declare type IdToIndexInfo = {
    [key: string]: IndexInfo | undefined;
};
export declare class Counter {
    readonly tagToGlobalOptions: TagToGlobalOptions;
    private readonly currentHeadingIndex;
    private readonly realOrbitToCurrentIndex;
    private readonly baseIdToCount;
    readonly orbitToRealOrbit: {
        [key: string]: string | undefined;
    };
    readonly indexInfoArray: IndexInfo[];
    readonly idToIndexInfo: IdToIndexInfo;
    readonly unitToId: Map<STDNUnit, string | undefined>;
    title: string;
    constructor(tagToGlobalOptions: TagToGlobalOptions);
    private createIndex;
    private getRealOrbit;
    private countUnit;
    countSTDN(stdn: STDN): void;
}
