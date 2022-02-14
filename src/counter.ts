import type {STDN, STDNUnit} from 'stdn'
import {stringToId, unitToInlinePlainString} from './base'
import {extractLastGlobalOption, TagToGlobalOptions} from './extractor'
export interface IndexInfo {
    id: string
    index: number[]
    orbit: string
    unit: STDNUnit
}
export type IdToIndexInfo = {
    [key: string]: IndexInfo | undefined
}
export class Counter {
    private readonly currentHeadingIndex: number[] = []
    private readonly orbitToCurrentIndex: {
        [key: string]: number[] | undefined
    } = {}
    private readonly baseIdToCount: {
        [key: string]: number | undefined
    } = {}
    readonly idToIndexInfo: IdToIndexInfo = {}
    readonly indexInfoArray: IndexInfo[] = []
    readonly unitToId = new Map<STDNUnit, string | undefined>()
    title = ''
    constructor(readonly tagToGlobalOptions: TagToGlobalOptions) {}
    private createIndex(orbit: string, level: number) {
        if (orbit === 'heading') {
            if (this.currentHeadingIndex.length < level) {
                for (let i = this.currentHeadingIndex.length; i < level; i++) {
                    this.currentHeadingIndex.push(0)
                }
            } else {
                for (let i = level; i < this.currentHeadingIndex.length; i++) {
                    this.currentHeadingIndex[i] = 0
                }
                for (const key in this.orbitToCurrentIndex) {
                    const value = this.orbitToCurrentIndex[key]
                    if (value === undefined || value.length < level) {
                        continue
                    }
                    for (let i = level; i < value.length; i++) {
                        value[i] = 0
                    }
                }
            }
            this.currentHeadingIndex[level - 1]++
            return this.currentHeadingIndex.slice(0, level)
        }
        let value = this.orbitToCurrentIndex[orbit]
        if (value === undefined) {
            value = []
            this.orbitToCurrentIndex[orbit] = value
        }
        if (value.length < level) {
            for (let i = value.length; i < level; i++) {
                value.push(0)
            }
        }
        if (this.currentHeadingIndex.length < level - 1) {
            for (let i = this.currentHeadingIndex.length; i < level - 1; i++) {
                this.currentHeadingIndex.push(0)
            }
        }
        const tmp = this.currentHeadingIndex.slice(0, level - 1)
        tmp.push(++value[level - 1])
        return tmp
    }
    private countUnit(unit: STDNUnit) {
        if (
            unit.tag === 'global'
            || unit.options.global === true
            || (unit.options['no-count'] ?? extractLastGlobalOption('no-count', unit.tag, this.tagToGlobalOptions)) === true
            || this.unitToId.get(unit) !== undefined
        ) {
            return
        }
        if (this.title.length === 0 && unit.tag === 'title') {
            this.title = unitToInlinePlainString(unit)
        }
        const baseId = stringToId(typeof unit.options.id === 'string' ? unit.options.id : unitToInlinePlainString(unit))
        const count = this.baseIdToCount[baseId] = (this.baseIdToCount[baseId] ?? 0) + 1
        const id = count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId
        this.unitToId.set(unit, id)
        let orbit = unit.options.orbit ?? extractLastGlobalOption('orbit', unit.tag, this.tagToGlobalOptions)
        if (typeof orbit !== 'string' || orbit.length === 0) {
            orbit = unit.tag === 'h1'
                || unit.tag === 'h2'
                || unit.tag === 'h3'
                || unit.tag === 'h4'
                || unit.tag === 'h5'
                || unit.tag === 'h6'
                ? 'heading' : unit.tag
        }
        let level = unit.options.level
            ?? extractLastGlobalOption('level', unit.tag, this.tagToGlobalOptions)
            ?? extractLastGlobalOption('level', orbit, this.tagToGlobalOptions)
        if (typeof level !== 'number' || level <= 0 || level % 1 !== 0) {
            switch (unit.tag) {
                case 'h2': level = 2
                    break
                case 'h3': level = 3
                    break
                case 'h4': level = 4
                    break
                case 'h5': level = 5
                    break
                case 'h6': level = 6
                    break
                default: level = 1
            }
        }
        const index = this.createIndex(orbit, level)
        const indexInfo: IndexInfo = {
            index,
            id,
            orbit,
            unit
        }
        this.idToIndexInfo[id] = indexInfo
        this.indexInfoArray.push(indexInfo)
        if ((unit.options['no-count-inside'] ?? extractLastGlobalOption('no-count-inside', unit.tag, this.tagToGlobalOptions)) === true) {
            return
        }
        for (const key in unit.options) {
            const value = unit.options[key]
            if(typeof value==='object'){
                this.countUnit(value)
            }
        }
        this.countSTDN(unit.children)
    }
    countSTDN(stdn: STDN) {
        for (const line of stdn) {
            for (const unit of line) {
                if (typeof unit !== 'string') {
                    this.countUnit(unit)
                }
            }
        }
    }
}