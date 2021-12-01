"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlsStrToAbsURLs = exports.urlsToAbsURLs = exports.fixURLInSTDN = exports.fixURLInUnit = exports.relURLToAbsURL = exports.isRelURL = void 0;
const ston_1 = require("ston");
function isRelURL(url) {
    return !url.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(url);
}
exports.isRelURL = isRelURL;
function relURLToAbsURL(url, dir) {
    try {
        return new URL(url, dir).href;
    }
    catch (err) {
        console.log(err);
        return url;
    }
}
exports.relURLToAbsURL = relURLToAbsURL;
function fixURLInUnit(unit, dir) {
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
exports.fixURLInUnit = fixURLInUnit;
function fixURLInSTDN(stdn, dir) {
    for (const line of stdn) {
        for (const unit of line) {
            if (typeof unit !== 'string') {
                fixURLInUnit(unit, dir);
            }
        }
    }
}
exports.fixURLInSTDN = fixURLInSTDN;
async function urlsToAbsURLs(urls, dir) {
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
exports.urlsToAbsURLs = urlsToAbsURLs;
async function urlsStrToAbsURLs(string, dir) {
    const array = (0, ston_1.parse)('[' + string + ']');
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
exports.urlsStrToAbsURLs = urlsStrToAbsURLs;
