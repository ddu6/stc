import { STDN, STDNUnit } from "stdn";
import { TagToGlobalOptions } from "./countext";
export interface IndexInfo {
    index: number[];
    label: string;
    orbit: string;
    unit: STDNUnit;
}
export declare type LabelToIndexInfo = {
    [key: string]: IndexInfo | undefined;
};
export declare class Counter {
    readonly tagToGlobalOptions: TagToGlobalOptions;
    private readonly currentHeadingIndex;
    private readonly orbitToCurrentIndex;
    readonly indexInfoArray: IndexInfo[];
    readonly labelToIndexInfo: LabelToIndexInfo;
    constructor(tagToGlobalOptions: TagToGlobalOptions);
    private createIndex;
    countUnit(unit: STDNUnit): void;
    countSTDN(stdn: STDN): void;
}
