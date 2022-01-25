import { isRelURL, urlsToAbsURLs } from './urls';
import { Counter } from './counter';
export function extractGlobalOptionArray(option, tag, tagToGlobalOptions) {
    const options = tagToGlobalOptions[tag];
    if (options === undefined) {
        return [];
    }
    return options[option] ?? [];
}
export function extractLastGlobalOption(option, tag, tagToGlobalOptions) {
    const array = extractGlobalOptionArray(option, tag, tagToGlobalOptions);
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}
export function extractGlobalChildren(tag, tagToGlobalOptions) {
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
export function extractUnitOrLineToPart(parts) {
    const out = new Map();
    function set(stdn, part) {
        for (const line of stdn) {
            out.set(line, part);
            for (const unit of line) {
                if (typeof unit === 'string') {
                    continue;
                }
                out.set(unit, part);
                for (const key of Object.keys(unit.options)) {
                    const value = unit.options[key];
                    if (typeof value !== 'object') {
                        continue;
                    }
                    set(value, part);
                }
                set(unit.children, part);
            }
        }
    }
    for (const part of parts) {
        set(part.value, part);
    }
    return out;
}
export function extractUnitOrLineToPosition(stdn) {
    const out = new Map();
    function extract(stdn, position) {
        for (let i = 0; i < stdn.length; i++) {
            const line = stdn[i];
            const linePosition = position.concat(i);
            out.set(line, linePosition);
            for (let j = 0; j < line.length; j++) {
                const unit = line[j];
                if (typeof unit === 'string') {
                    continue;
                }
                const unitPosition = linePosition.concat(j);
                out.set(unit, unitPosition);
                for (const key of Object.keys(unit.options)) {
                    const value = unit.options[key];
                    if (typeof value !== 'object') {
                        continue;
                    }
                    extract(value, unitPosition.concat(key));
                }
                extract(unit.children, unitPosition);
            }
        }
    }
    extract(stdn, []);
    return out;
}
export async function extractContext(parts, options = {}) {
    const tagToGlobalOptions = {};
    const tagToUnitCompiler = {};
    if (options.builtInTagToUnitCompiler !== undefined) {
        Object.assign(tagToUnitCompiler, options.builtInTagToUnitCompiler);
    }
    const cssURLs = [];
    const tagToUnitCompilerURLs = [];
    const unitOrLineToPart = extractUnitOrLineToPart(parts);
    const stdn = parts.map(value => value.value).flat();
    const fullSTDN = (options.headSTDN ?? []).concat(stdn).concat(options.footSTDN ?? []);
    function urlToAbsURL(url, unit) {
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
    for (const line of fullSTDN) {
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
                    cssURLs.push(urlToAbsURL(src, unit));
                }
            }
            {
                const src = unit.options['ucs-src'];
                if (typeof src === 'string') {
                    tagToUnitCompilerURLs.push(urlToAbsURL(src, unit));
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
                let value = unit.options[key];
                if (value === undefined) {
                    continue;
                }
                if (typeof value === 'string'
                    && (key.endsWith('href') || key.endsWith('src'))
                    && isRelURL(value)) {
                    value = urlToAbsURL(value, unit);
                }
                const values = globalOptions[key];
                if (values === undefined) {
                    globalOptions[key] = [value];
                    continue;
                }
                values.push(value);
            }
        }
    }
    const css = (await urlsToAbsURLs(cssURLs, location.href))
        .map(value => `@import ${JSON.stringify(value)};`).join('');
    if (options.style !== undefined) {
        options.style.textContent = css;
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
    const unitOrLineToPosition = extractUnitOrLineToPosition(stdn);
    return {
        css,
        fullSTDN,
        indexInfoArray: counter.indexInfoArray,
        idToIndexInfo: counter.idToIndexInfo,
        stdn,
        tagToGlobalOptions,
        tagToUnitCompiler,
        title: counter.title,
        unitToId: counter.unitToId,
        unitOrLineToPart,
        unitOrLineToPosition,
        urlToAbsURL,
        root: options.root
    };
}
