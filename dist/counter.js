"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const base_1 = require("./base");
const countext_1 = require("./countext");
class Counter {
    constructor(tagToGlobalOptions) {
        this.tagToGlobalOptions = tagToGlobalOptions;
        this.currentHeadingIndex = [];
        this.orbitToCurrentIndex = {};
        this.baseIdToCount = {};
        this.indexInfoArray = [];
        this.idToIndexInfo = {};
        this.unitToId = new Map();
        this.title = '';
    }
    createIndex(orbit, level) {
        if (orbit === 'heading') {
            if (this.currentHeadingIndex.length < level) {
                for (let i = this.currentHeadingIndex.length; i < level; i++) {
                    this.currentHeadingIndex.push(0);
                }
            }
            else {
                for (let i = level; i < this.currentHeadingIndex.length; i++) {
                    this.currentHeadingIndex[i] = 0;
                }
                for (const key of Object.keys(this.orbitToCurrentIndex)) {
                    const val = this.orbitToCurrentIndex[key];
                    if (val === undefined || val.length < level) {
                        continue;
                    }
                    for (let i = level; i < val.length; i++) {
                        val[i] = 0;
                    }
                }
            }
            this.currentHeadingIndex[level - 1]++;
            return this.currentHeadingIndex.slice(0, level);
        }
        let val = this.orbitToCurrentIndex[orbit];
        if (val === undefined) {
            val = [];
            this.orbitToCurrentIndex[orbit] = val;
        }
        if (val.length < level) {
            for (let i = val.length; i < level; i++) {
                val.push(0);
            }
        }
        if (this.currentHeadingIndex.length < level - 1) {
            for (let i = this.currentHeadingIndex.length; i < level - 1; i++) {
                this.currentHeadingIndex.push(0);
            }
        }
        const tmp = this.currentHeadingIndex.slice(0, level - 1);
        tmp.push(++val[level - 1]);
        return tmp;
    }
    countUnit(unit) {
        if (this.title.length === 0 && unit.tag === 'title') {
            this.title = (0, base_1.unitToPlainString)(unit);
        }
        if (unit.tag !== 'global' && unit.options.global !== true) {
            const baseId = (0, base_1.stringToId)(typeof unit.options.id === 'string' ? unit.options.id : (0, base_1.unitToInlinePlainString)(unit));
            const count = this.baseIdToCount[baseId] = (this.baseIdToCount[baseId] ?? 0) + 1;
            const id = count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId;
            let orbit = unit.options.orbit
                ?? (0, countext_1.getLastGlobalOption)('orbit', unit.tag, this.tagToGlobalOptions);
            if (typeof orbit !== 'string' || orbit.length === 0) {
                orbit = unit.tag === 'h1'
                    || unit.tag === 'h2'
                    || unit.tag === 'h3'
                    || unit.tag === 'h4'
                    || unit.tag === 'h5'
                    || unit.tag === 'h6'
                    ? 'heading' : unit.tag;
            }
            let level = unit.options.level
                ?? (0, countext_1.getLastGlobalOption)('level', unit.tag, this.tagToGlobalOptions)
                ?? (0, countext_1.getLastGlobalOption)('level', orbit, this.tagToGlobalOptions);
            if (typeof level !== 'number' || level <= 0 || level % 1 !== 0) {
                switch (unit.tag) {
                    case 'h2':
                        level = 2;
                        break;
                    case 'h3':
                        level = 3;
                        break;
                    case 'h4':
                        level = 4;
                        break;
                    case 'h5':
                        level = 5;
                        break;
                    case 'h6':
                        level = 6;
                        break;
                    default: level = 1;
                }
            }
            const index = this.createIndex(orbit, level);
            const indexInfo = {
                index,
                id,
                orbit,
                unit,
            };
            this.indexInfoArray.push(indexInfo);
            this.idToIndexInfo[id] = indexInfo;
            this.unitToId.set(unit, id);
        }
        for (const key of Object.keys(unit.options)) {
            const val = unit.options[key];
            if (Array.isArray(val)) {
                this.countSTDN(val);
            }
        }
        this.countSTDN(unit.children);
    }
    countSTDN(stdn) {
        for (const line of stdn) {
            for (const unit of line) {
                if (typeof unit !== 'string') {
                    this.countUnit(unit);
                }
            }
        }
    }
}
exports.Counter = Counter;
