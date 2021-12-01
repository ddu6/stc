"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractContext = exports.getGlobalURLs = exports.getGlobalStrings = exports.getGlobalChildren = exports.getLastGlobalOption = exports.getGlobalOptionArray = void 0;
const urls_1 = require("./urls");
const counter_1 = require("./counter");
function getGlobalOptionArray(option, tag, tagToGlobalOptions) {
    const options = tagToGlobalOptions[tag];
    if (options === undefined) {
        return [];
    }
    return options[option] ?? [];
}
exports.getGlobalOptionArray = getGlobalOptionArray;
function getLastGlobalOption(option, tag, tagToGlobalOptions) {
    const array = getGlobalOptionArray(option, tag, tagToGlobalOptions);
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}
exports.getLastGlobalOption = getLastGlobalOption;
function getGlobalChildren(tag, tagToGlobalOptions) {
    const options = tagToGlobalOptions[tag];
    if (options === undefined) {
        return [];
    }
    const array = options.__;
    if (array === undefined) {
        return [];
    }
    return array.flat();
}
exports.getGlobalChildren = getGlobalChildren;
function getGlobalStrings(option, tag, tagToGlobalOptions) {
    const array = getGlobalOptionArray(option, tag, tagToGlobalOptions);
    const strings = [];
    for (const val of array) {
        if (typeof val === 'string') {
            strings.push(val);
        }
    }
    return strings;
}
exports.getGlobalStrings = getGlobalStrings;
async function getGlobalURLs(option, tag, tagToGlobalOptions, dir) {
    return await (0, urls_1.urlsToAbsURLs)(getGlobalStrings(option, tag, tagToGlobalOptions), dir);
}
exports.getGlobalURLs = getGlobalURLs;
async function extractContext(doc, dir, options = {}) {
    if (dir.length === 0) {
        dir = location.href;
    }
    const tagToGlobalOptions = {};
    const tagToUnitCompiler = {};
    if (options.builtInTagToUnitCompiler !== undefined) {
        Object.assign(tagToUnitCompiler, options.builtInTagToUnitCompiler);
    }
    const cssURLs = [];
    const tagToUnitCompilerURLs = [];
    for (const line of doc) {
        if (line.length === 0) {
            continue;
        }
        const unit = line[0];
        if (typeof unit === 'string') {
            continue;
        }
        if (unit.tag === 'global') {
            const mod = unit.options['mod'];
            if (typeof mod === 'string') {
                cssURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${mod}/main.css`);
                tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${mod}/ucs.js`);
            }
            const css = unit.options['css'];
            if (typeof css === 'string') {
                cssURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${css}/main.css`);
            }
            const ucs = unit.options['ucs'];
            if (typeof ucs === 'string') {
                tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/st-mod/${ucs}/ucs.js`);
            }
            {
                const gh = unit.options['mod-gh'];
                if (typeof gh === 'string') {
                    cssURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/main.css`);
                    tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/ucs.js`);
                }
            }
            {
                const gh = unit.options['css-gh'];
                if (typeof gh === 'string') {
                    cssURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/main.css`);
                }
            }
            {
                const gh = unit.options['ucs-gh'];
                if (typeof gh === 'string') {
                    tagToUnitCompilerURLs.push(`https://cdn.jsdelivr.net/gh/${gh}/ucs.js`);
                }
            }
            {
                const src = unit.options['css-src'];
                if (typeof src === 'string') {
                    cssURLs.push(src);
                }
            }
            {
                const src = unit.options['ucs-src'];
                if (typeof src === 'string') {
                    tagToUnitCompilerURLs.push(src);
                }
            }
            continue;
        }
        if (unit.options.global === true) {
            let globalOptions = tagToGlobalOptions[unit.tag];
            if (globalOptions === undefined) {
                tagToGlobalOptions[unit.tag] = globalOptions = {};
            }
            if (globalOptions.__ === undefined) {
                globalOptions.__ = [unit.children];
            }
            else {
                globalOptions.__.push(unit.children);
            }
            for (const key of Object.keys(unit.options)) {
                if (key === 'global' || key === '__') {
                    continue;
                }
                const val = unit.options[key];
                if (val === undefined) {
                    continue;
                }
                const vals = globalOptions[key];
                if (vals === undefined) {
                    globalOptions[key] = [val];
                }
                else {
                    vals.push(val);
                }
            }
        }
    }
    const css = (await (0, urls_1.urlsToAbsURLs)(cssURLs, dir))
        .map(val => `@import ${JSON.stringify(val)};`).join('');
    for (const url of await (0, urls_1.urlsToAbsURLs)(tagToUnitCompilerURLs, dir)) {
        try {
            Object.assign(tagToUnitCompiler, await (new Function(`return import(${JSON.stringify(url)})`)()));
        }
        catch (err) {
            console.log(err);
        }
    }
    const counter = new counter_1.Counter(tagToGlobalOptions);
    counter.countSTDN(doc);
    return {
        css,
        dir,
        indexInfoArray: counter.indexInfoArray,
        idToIndexInfo: counter.idToIndexInfo,
        tagToGlobalOptions,
        tagToUnitCompiler,
        title: counter.title,
        unitToId: counter.unitToId,
    };
}
exports.extractContext = extractContext;
