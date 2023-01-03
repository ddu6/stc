var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parse } from 'stdn/dist/parse';
import { urlsToAbsURLs } from './urls';
import { Compiler } from './compiler';
import { extractContext } from './extractor';
export * from './base';
export * from './urls';
export * from './dom';
export * from './counter';
export * from './extractor';
export * from './compiler';
export function compile(sourceParts, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const parts = [];
        for (const { value, url } of sourceParts) {
            const result = parse(value);
            if (result !== undefined) {
                parts.push({
                    value: result,
                    url
                });
            }
        }
        const context = yield extractContext(parts, options);
        const compiler = new Compiler(context);
        return {
            compiler,
            documentFragment: yield compiler.compileSTDN(context.stdn)
        };
    });
}
export function compileURLs(urls, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const partPromises = [];
        for (const url of yield urlsToAbsURLs(urls, location.href)) {
            partPromises.push((() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield fetch(url);
                    if (!res.ok) {
                        return [];
                    }
                    return [{
                            value: yield res.text(),
                            url
                        }];
                }
                catch (err) {
                    console.log(err);
                    return [];
                }
            }))());
        }
        return yield compile((yield Promise.all(partPromises)).flat(), options);
    });
}
