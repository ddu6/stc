var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parse } from 'ston/dist/parse';
export function isRelURL(url) {
    return !url.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(url);
}
export function urlsToAbsURLs(urls, dir, ancestors = []) {
    return __awaiter(this, void 0, void 0, function* () {
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
            out.push((() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield fetch(url.href);
                    if (!res.ok) {
                        return [];
                    }
                    return yield urlsStrToAbsURLs(yield res.text(), url.href, ancestors.concat(url.href));
                }
                catch (err) {
                    console.log(err);
                    return [];
                }
            }))());
        }
        return (yield Promise.all(out)).flat();
    });
}
export function urlsStrToAbsURLs(string, dir, ancestors = []) {
    return __awaiter(this, void 0, void 0, function* () {
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
        return yield urlsToAbsURLs(urls, dir, ancestors);
    });
}
