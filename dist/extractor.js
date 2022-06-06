import { isRelURL, urlsToAbsURLs } from './urls';
import { Counter } from './counter';
export function extractGlobalChildren(tag, tagToGlobalOptions) {
    const options = tagToGlobalOptions[tag];
    if (options === undefined) {
        return [];
    }
    return options.childrenArray.flat();
}
export function extractGlobalOptionArray(option, tag, tagToGlobalOptions) {
    const options = tagToGlobalOptions[tag];
    if (options === undefined) {
        return [];
    }
    return options.optionArrays[option] ?? [];
}
export function extractGlobalStrings(option, tag, tagToGlobalOptions) {
    const array = extractGlobalOptionArray(option, tag, tagToGlobalOptions);
    const strings = [];
    for (const value of array) {
        if (typeof value === 'string') {
            strings.push(value);
        }
    }
    return strings;
}
export async function extractGlobalURLs(option, tag, tagToGlobalOptions) {
    return await urlsToAbsURLs(extractGlobalStrings(option, tag, tagToGlobalOptions), location.href);
}
export function extractLastGlobalOption(option, tag, tagToGlobalOptions) {
    const array = extractGlobalOptionArray(option, tag, tagToGlobalOptions);
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}
export function extractUnitOrLineToPart(parts) {
    const out = new Map();
    function setUnit(unit, part) {
        out.set(unit, part);
        for (const key in unit.options) {
            const value = unit.options[key];
            if (typeof value === 'object') {
                setUnit(value, part);
            }
        }
        set(unit.children, part);
    }
    function set(stdn, part) {
        for (const line of stdn) {
            out.set(line, part);
            for (const unit of line) {
                if (typeof unit !== 'string') {
                    setUnit(unit, part);
                }
            }
        }
    }
    for (const part of parts) {
        set(part.value, part);
    }
    return out;
}
export function extractPartToOffset(parts) {
    const out = new Map();
    let offset = 0;
    for (const part of parts) {
        out.set(part, offset);
        offset += part.value.length;
    }
    return out;
}
export function extractUnitOrLineToPosition(stdn) {
    const out = new Map();
    function extractFromUnit(unit, position) {
        out.set(unit, position);
        for (const key in unit.options) {
            const value = unit.options[key];
            if (typeof value === 'object') {
                extractFromUnit(value, position.concat(key));
            }
        }
        extract(unit.children, position);
    }
    function extract(stdn, position) {
        for (let i = 0; i < stdn.length; i++) {
            const line = stdn[i];
            const linePosition = position.concat(i);
            out.set(line, linePosition);
            for (let j = 0; j < line.length; j++) {
                const unit = line[j];
                if (typeof unit !== 'string') {
                    extractFromUnit(unit, linePosition.concat(j));
                }
            }
        }
    }
    extract(stdn, []);
    return out;
}
export function extractUnitOrLineToHeading(stdn, headings) {
    const out = new Map();
    if (headings.length === 0) {
        return out;
    }
    let i = 0;
    let nextHeading = headings[0];
    let heading;
    function extractFromUnit(unit) {
        out.set(unit, heading);
        if (i < headings.length && unit === nextHeading.unit) {
            heading = nextHeading;
            nextHeading = headings[++i];
        }
        for (const key in unit.options) {
            const value = unit.options[key];
            if (typeof value === 'object') {
                extractFromUnit(value);
            }
        }
        extract(unit.children);
    }
    function extract(stdn) {
        for (const line of stdn) {
            out.set(line, heading);
            for (const unit of line) {
                if (typeof unit !== 'string') {
                    extractFromUnit(unit);
                }
            }
        }
    }
    extract(stdn);
    return out;
}
export function urlToAbsURL(url, unit, unitOrLineToPart) {
    if (!isRelURL(url)) {
        return url;
    }
    const part = unitOrLineToPart.get(unit);
    if (part === undefined) {
        return url;
    }
    try {
        return new URL(url, part.url).href;
    }
    catch (err) {
        console.log(err);
        return url;
    }
}
export async function extractContext(parts, { builtInTagToUnitCompiler, style, headSTDN, footSTDN, root } = {}) {
    const tagToGlobalOptions = {};
    const tagToUnitCompiler = {};
    if (builtInTagToUnitCompiler !== undefined) {
        Object.assign(tagToUnitCompiler, builtInTagToUnitCompiler);
    }
    const cssURLs = [];
    const tagToUnitCompilerURLs = [];
    const unitOrLineToPart = extractUnitOrLineToPart(parts);
    const stdn = parts.map(value => value.value).flat();
    const fullSTDN = (headSTDN ?? []).concat(stdn).concat(footSTDN ?? []);
    for (const line of fullSTDN) {
        if (line.length === 0) {
            continue;
        }
        const unit = line[0];
        if (typeof unit === 'string') {
            continue;
        }
        if (unit.tag === 'global') {
            const { registry, mod, css, ucs } = unit.options;
            let base = 'https://cdn.jsdelivr.net/gh/st-mod';
            if (typeof registry === 'string') {
                base = urlToAbsURL(registry, unit, unitOrLineToPart);
            }
            if (typeof mod === 'string') {
                cssURLs.push(`${base}/${mod}/main.css`);
                tagToUnitCompilerURLs.push(`${base}/${mod}/ucs.js`);
            }
            if (typeof css === 'string') {
                cssURLs.push(`${base}/${css}/main.css`);
            }
            if (typeof ucs === 'string') {
                tagToUnitCompilerURLs.push(`${base}/${ucs}/ucs.js`);
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
                    cssURLs.push(urlToAbsURL(src, unit, unitOrLineToPart));
                }
            }
            {
                const src = unit.options['ucs-src'];
                if (typeof src === 'string') {
                    tagToUnitCompilerURLs.push(urlToAbsURL(src, unit, unitOrLineToPart));
                }
            }
            continue;
        }
        if (unit.options.global === true) {
            let globalOptions = tagToGlobalOptions[unit.tag];
            if (globalOptions === undefined) {
                tagToGlobalOptions[unit.tag] = globalOptions = {
                    optionArrays: {},
                    childrenArray: []
                };
            }
            for (const key in unit.options) {
                if (key === 'global' || key === '__') {
                    continue;
                }
                let value = unit.options[key];
                if (value === undefined) {
                    continue;
                }
                if (typeof value === 'string'
                    && (key.endsWith('href') || key.endsWith('src'))
                    && isRelURL(value)) {
                    value = urlToAbsURL(value, unit, unitOrLineToPart);
                }
                const values = globalOptions.optionArrays[key];
                if (values === undefined) {
                    globalOptions.optionArrays[key] = [value];
                    continue;
                }
                values.push(value);
            }
            globalOptions.childrenArray.push(unit.children);
        }
    }
    const css = (await urlsToAbsURLs(cssURLs, location.href))
        .map(value => `@import ${JSON.stringify(value)};`).join('');
    if (style !== undefined) {
        style.textContent = css;
    }
    for (const url of await urlsToAbsURLs(tagToUnitCompilerURLs, location.href)) {
        try {
            Object.assign(tagToUnitCompiler, await (new Function(`return import(${JSON.stringify(url)})`)()));
        }
        catch (err) {
            console.log(err);
        }
    }
    const counter = new Counter(tagToGlobalOptions);
    counter.countSTDN(stdn);
    const { headings, idToIndexInfo, indexInfoArray, title, titleInfo, unitToId } = counter;
    const partToOffset = extractPartToOffset(parts);
    const unitOrLineToHeading = extractUnitOrLineToHeading(stdn, headings);
    const unitOrLineToPosition = extractUnitOrLineToPosition(stdn);
    return {
        css,
        fullSTDN,
        headings,
        indexInfoArray,
        idToIndexInfo,
        parts,
        partToOffset,
        stdn,
        tagToGlobalOptions,
        tagToUnitCompiler,
        title,
        titleInfo,
        unitToId,
        unitOrLineToHeading,
        unitOrLineToPart,
        unitOrLineToPosition,
        root,
        extractGlobalChildren: (tag) => {
            return extractGlobalChildren(tag, tagToGlobalOptions);
        },
        extractGlobalOptionArray: (option, tag) => {
            return extractGlobalOptionArray(option, tag, tagToGlobalOptions);
        },
        extractGlobalStrings: (option, tag) => {
            return extractGlobalStrings(option, tag, tagToGlobalOptions);
        },
        extractGlobalURLs: (option, tag) => {
            return extractGlobalURLs(option, tag, tagToGlobalOptions);
        },
        extractLastGlobalOption: (option, tag) => {
            return extractLastGlobalOption(option, tag, tagToGlobalOptions);
        },
        urlToAbsURL: (url, unit) => {
            return urlToAbsURL(url, unit, unitOrLineToPart);
        }
    };
}
