import { parse } from 'ston';
export function isRelURL(url) {
    return (!url.startsWith('data:')
        && !url.startsWith('#')
        && !url.startsWith('https://')
        && !url.startsWith('http://'));
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
export function fixURLInCSS(string, dir) {
    return string.replace(/url\(\s*['"]?(.*?)(['"]?)\s*\)/g, (match, url, mark) => {
        if (typeof url !== 'string') {
            return match;
        }
        if (mark === '"' || mark === "'") {
            url = url.replace(/\\(.)/g, '$1');
        }
        if (!isRelURL(url)) {
            return match;
        }
        return `url(${JSON.stringify(relURLToAbsURL(url, dir))})`;
    });
}
export function fixURLInUnit(unit, dir) {
    const keys = Object.keys(unit.options);
    for (const key of keys) {
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
    for (let i = 0; i < stdn.length; i++) {
        const line = stdn[i];
        for (let i = 0; i < line.length; i++) {
            const unit = line[i];
            if (typeof unit === 'string') {
                continue;
            }
            fixURLInUnit(unit, dir);
        }
    }
}
export async function urlsToAbsURLs(urls, dir) {
    const out = [];
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
            const absURL = new URL(url, dir);
            const absURLStr = absURL.href;
            const pathname = absURL.pathname;
            if (!pathname.endsWith('.urls') && !pathname.endsWith('.urls.txt')) {
                out.push(absURLStr);
                continue;
            }
            const res = await window.fetch(absURLStr);
            if (!res.ok) {
                continue;
            }
            out.push(...(await urlsStrToAbsURLs(await res.text(), absURLStr)));
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
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (typeof item === 'string') {
            urls.push(item);
        }
    }
    return await urlsToAbsURLs(urls, dir);
}
