import { getLastGlobalOption } from "./countext";
export class Counter {
    constructor(tagToGlobalOptions) {
        this.tagToGlobalOptions = tagToGlobalOptions;
        this.currentHeadingIndex = [];
        this.realOrbitToCurrentIndex = {};
        this.orbitToRealOrbit = {};
        this.indexInfoArray = [];
        this.idToIndexInfo = {};
    }
    createIndex(realOrbit, level) {
        if (realOrbit === 'heading') {
            if (this.currentHeadingIndex.length < level) {
                for (let i = this.currentHeadingIndex.length; i < level; i++) {
                    this.currentHeadingIndex.push(0);
                }
            }
            else {
                for (let i = level; i < this.currentHeadingIndex.length; i++) {
                    this.currentHeadingIndex[i] = 0;
                }
                for (const key of Object.keys(this.realOrbitToCurrentIndex)) {
                    const val = this.realOrbitToCurrentIndex[key];
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
        let val = this.realOrbitToCurrentIndex[realOrbit];
        if (val === undefined) {
            val = [];
            this.realOrbitToCurrentIndex[realOrbit] = val;
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
    getRealOrbit(orbit) {
        let realOrbit = this.orbitToRealOrbit[orbit];
        if (realOrbit !== undefined) {
            return realOrbit;
        }
        this.orbitToRealOrbit[orbit] = orbit;
        const val = getLastGlobalOption('merge-into', orbit, this.tagToGlobalOptions);
        if (typeof val !== 'string' || val.length === 0 || val === orbit) {
            return orbit;
        }
        return this.orbitToRealOrbit[orbit] = this.getRealOrbit(val);
    }
    countUnit(unit) {
        const { id } = unit.options;
        if (typeof id === 'string'
            && id.length > 0
            && this.idToIndexInfo[id] === undefined) {
            let orbit = unit.options.orbit
                ?? getLastGlobalOption('orbit', unit.tag, this.tagToGlobalOptions);
            if (typeof orbit !== 'string' || orbit.length === 0) {
                orbit = unit.tag;
            }
            const realOrbit = this.getRealOrbit(orbit);
            let level = unit.options.level
                ?? getLastGlobalOption('level', unit.tag, this.tagToGlobalOptions)
                ?? getLastGlobalOption('level', realOrbit, this.tagToGlobalOptions);
            if (typeof level !== 'number' || level <= 0 || level % 1 !== 0) {
                level = 1;
            }
            const index = this.createIndex(realOrbit, level);
            const indexInfo = {
                index,
                id,
                orbit,
                realOrbit,
                unit,
            };
            this.indexInfoArray.push(indexInfo);
            this.idToIndexInfo[id] = indexInfo;
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
