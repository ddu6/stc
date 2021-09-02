import { STDN, STDNUnit } from "stdn";
import { TagToGlobalOptions } from "./countext";
export interface IndexInfo {
    index: number[];
    id: string;
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
    readonly indexInfoArray: IndexInfo[];
    readonly idToIndexInfo: IdToIndexInfo;
    constructor(tagToGlobalOptions: TagToGlobalOptions);
    private createIndex;
    private countUnit;
    countSTDN(stdn: STDN): void;
}
