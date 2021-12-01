import { parse } from 'ston';
export function isRelURL(url) {
    return !url.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(url);
}
export function relURLToAbsURL(url, dir) {
    try {
        return new URL(url, dir).href;
    }
    catch (err) {
        console.log(err);
        return url;
    }
}
export function fixURLInUnit(unit, dir) {
    for (const key of Object.keys(unit.options)) {
        const val = unit.options[key];
        if (Array.isArray(val)) {
            fixURLInSTDN(val, dir);
        }
        else if (typeof val === 'string'
            && (key.endsWith('src')
                || key.endsWith('href'))
            && isRelURL(val)) {
            unit.options[key] = relURLToAbsURL(val, dir);
        }
    }
    fixURLInSTDN(unit.children, dir);
}
export function fixURLInSTDN(stdn, dir) {
    for (const line of stdn) {
        for (const unit of line) {
            if (typeof unit !== 'string') {
                fixURLInUnit(unit, dir);
            }
        }
    }
}
export async function urlsToAbsURLs(urls, dir) {
    const out = [];
    for (const urlStr of urls) {
        try {
            const url = new URL(urlStr, dir);
            if (!url.pathname.endsWith('.urls') && !url.pathname.endsWith('.urls.txt')) {
                out.push(url.href);
                continue;
            }
            const res = await fetch(url.href);
            if (!res.ok) {
                continue;
            }
            out.push(...(await urlsStrToAbsURLs(await res.text(), url.href)));
        }
        catch (err) {
            console.log(err);
        }
    }
    return out;
}
export async function urlsStrToAbsURLs(string, dir) {
    const array = parse('[' + string + ']');
    if (!Array.isArray(array)) {
        return [];
    }
    const urls = [];
    for (const item of array) {
        if (typeof item === 'string') {
            urls.push(item);
        }
    }
    return await urlsToAbsURLs(urls, dir);
}
