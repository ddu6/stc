import { parse } from 'ston';
export function isRelURL(url) {
    return !url.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(url);
}
export async function urlsToAbsURLs(urls, dir, ancestors = []) {
    const out = [];
    for (const urlStr of urls) {
        const url = new URL(urlStr, dir);
        if (!url.pathname.endsWith('.urls') && !url.pathname.endsWith('.urls.txt')) {
            out.push(url.href);
            continue;
        }
        if (ancestors.includes(url.href)) {
            continue;
        }
        out.push((async () => {
            try {
                const res = await fetch(url.href);
                if (!res.ok) {
                    return [];
                }
                return await urlsStrToAbsURLs(await res.text(), url.href, ancestors.concat(url.href));
            }
            catch (err) {
                console.log(err);
                return [];
            }
        })());
    }
    return (await Promise.all(out)).flat();
}
export async function urlsStrToAbsURLs(string, dir, ancestors = []) {
    const array = parse(`[${string}]`);
    if (!Array.isArray(array)) {
        return [];
    }
    const urls = [];
    for (const item of array) {
        if (typeof item === 'string') {
            urls.push(item);
        }
    }
    return await urlsToAbsURLs(urls, dir, ancestors);
}
