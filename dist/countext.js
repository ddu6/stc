import { fixURLInCSS, urlsStrToAbsURLs } from '@ddu6/urls';
import { stringify } from 'ston';
import { Counter } from './counter';
export function unitToPlainString(unit) {
    return stdnToPlainString(unit.children);
}
export function stdnToPlainString(stdn) {
    const array = [];
    for (let i = 0; i < stdn.length; i++) {
        const line = stdn[i];
        let string = '';
        for (let i = 0; i < line.length; i++) {
            const inline = line[i];
            if (typeof inline === 'string') {
                string += inline;
                continue;
            }
            string += unitToPlainString(inline);
        }
        array.push(string);
    }
    return array.join('\n');
}
export async function extractContext(doc, dir, options = {}) {
    if (dir === '') {
        dir = document.location.href;
    }
    const context = {
        css: options.dftCSS ?? '',
        dir,
        indexInfoArray: [],
        labelToIndexInfo: {},
        tagToUnitCompiler: options.dftTagToUnitCompiler ?? {},
        tagToGlobalOptions: options.dftTagToGlobalOptions ?? {},
        title: '',
    };
    let cssURLsStr = '';
    let tagToUnitCompilerURLsStr = '';
    for (let i = 0; i < doc.length; i++) {
        const line = doc[i];
        if (line.length === 0) {
            continue;
        }
        const unit = line[0];
        if (typeof unit === 'string') {
            continue;
        }
        if (unit.tag === 'title') {
            context.title = unitToPlainString(unit);
            continue;
        }
        if (unit.tag === 'global') {
            let src = unit.options.css;
            if (typeof src === 'string' && src !== '') {
                cssURLsStr += stringify(src);
            }
            src = unit.options['tag-to-unit-compiler'];
            if (typeof src === 'string' && src !== '') {
                tagToUnitCompilerURLsStr += stringify(src);
            }
            continue;
        }
        if (unit.options.global === true) {
            let globalOptions = context.tagToGlobalOptions[unit.tag];
            if (globalOptions === undefined) {
                globalOptions = {};
                context.tagToGlobalOptions[unit.tag] = globalOptions;
            }
            const keys = Object.keys(unit.options);
            for (const key of keys) {
                if (key === 'global') {
                    continue;
                }
                globalOptions[key] = unit.options[key];
            }
        }
    }
    let urls = await urlsStrToAbsURLs(cssURLsStr, dir);
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
            const res = await window.fetch(url);
            if (!res.ok) {
                continue;
            }
            context.css += fixURLInCSS(await res.text(), url) + '\n';
        }
        catch (err) {
            console.log(err);
        }
    }
    urls = await urlsStrToAbsURLs(tagToUnitCompilerURLsStr, dir);
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
            const result = await (new Function(`return import(${JSON.stringify(url)})`)());
            context.tagToUnitCompiler = Object.assign({}, context.tagToUnitCompiler, result);
        }
        catch (err) {
            console.log(err);
        }
    }
    const counter = new Counter(context.tagToGlobalOptions);
    counter.countSTDN(doc);
    context.indexInfoArray = counter.indexInfoArray;
    context.labelToIndexInfo = counter.labelToIndexInfo;
    return context;
}
