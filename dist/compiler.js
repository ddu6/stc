var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ston from 'ston/dist/parse';
import * as stdn from 'stdn/dist/parse';
import * as position from 'stdn/dist/position';
import * as base from './base';
import * as urls from './urls';
import * as dom from './dom';
import * as counter from './counter';
import * as extractor from './extractor';
import { compile } from './mod';
export const supportedHTMLTags = [
    'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'main', 'nav', 'section',
    'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'ol', 'p', 'pre', 'ul',
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    'area', 'audio', 'img', 'map', 'track', 'video',
    'iframe',
    'del', 'ins',
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
];
export const supportedHTMLTagsWithInlineChildren = [
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    'area', 'audio', 'img', 'map', 'track', 'video',
    'iframe',
    'del', 'ins',
    'col', 'colgroup', 'table', 'tbody', 'tfoot', 'thead', 'tr'
];
export const supportedSVGTags = [
    'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter',
    'animate', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'defs', 'desc', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'stop', 'svg', 'symbol', 'text', 'textPath', 'tspan', 'use'
];
export function createErrorElement(err) {
    const element = document.createElement('span');
    element.classList.add('unit', 'warn');
    element.textContent = err;
    return element;
}
export class Compiler {
    constructor(context) {
        this.context = context;
        this.stop = false;
        this.ston = ston;
        this.stdn = stdn;
        this.position = position;
        this.base = base;
        this.urls = urls;
        this.dom = dom;
        this.counter = counter;
        this.extractor = extractor;
        this.compile = compile;
        this.supportedHTMLTags = supportedHTMLTags;
        this.supportedHTMLTagsWithInlineChildren = supportedHTMLTagsWithInlineChildren;
        this.supportedSVGTags = supportedSVGTags;
        this.createErrorElement = createErrorElement;
        this.elementToUnitOrLine = new Map();
        this.unitOrLineToElements = new Map();
        this.unitToCompiling = new Map();
    }
    registerElement(element, unitOrLine) {
        this.elementToUnitOrLine.set(element, unitOrLine);
        let elements = this.unitOrLineToElements.get(unitOrLine);
        if (elements === undefined) {
            this.unitOrLineToElements.set(unitOrLine, elements = []);
        }
        elements.push(element);
    }
    compileUnit(unit) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.unitToCompiling.get(unit) === true) {
                const element = this.createErrorElement('Loop');
                this.registerElement(element, unit);
                return element;
            }
            if (unit.tag === 'global' || unit.options.global === true) {
                const element = document.createElement('div');
                element.classList.add('unit', 'global');
                this.registerElement(element, unit);
                return element;
            }
            this.unitToCompiling.set(unit, true);
            let realTag = (_a = unit.options['compile-with']) !== null && _a !== void 0 ? _a : extractor.extractLastGlobalOption('compile-with', unit.tag, this.context.tagToGlobalOptions);
            if (typeof realTag !== 'string' || realTag.length === 0) {
                realTag = unit.tag;
            }
            const unitCompiler = this.context.tagToUnitCompiler[realTag];
            let element;
            if (unitCompiler !== undefined) {
                try {
                    element = yield unitCompiler(unit, this);
                }
                catch (err) {
                    console.log(err);
                    element = this.createErrorElement('Broken');
                }
                if (element.classList.contains('unit') && element.classList.contains('warn')) {
                    this.registerElement(element, unit);
                    this.unitToCompiling.set(unit, false);
                    return element;
                }
            }
            else {
                if (supportedHTMLTags.includes(realTag)) {
                    element = document.createElement(realTag);
                    if (supportedHTMLTagsWithInlineChildren.includes(realTag)) {
                        element.append(yield this.compileInlineSTDN(unit.children));
                    }
                    else {
                        element.append(yield this.compileSTDN(unit.children));
                    }
                }
                else if (supportedSVGTags.includes(realTag)) {
                    element = document.createElementNS("http://www.w3.org/2000/svg", realTag);
                    element.append(yield this.compileInlineSTDN(unit.children));
                }
                else {
                    element = document.createElement('div');
                    element.append(yield this.compileSTDN(unit.children));
                }
            }
            element.classList.add('unit');
            try {
                element.classList.add(realTag);
                if (typeof unit.options.class === 'string') {
                    element.classList.add(...unit.options.class.trim().split(/\s+/));
                }
                for (const value of extractor.extractGlobalOptionArray('class', unit.tag, this.context.tagToGlobalOptions)) {
                    if (typeof value === 'string') {
                        element.classList.add(...value.trim().split(/\s+/));
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            const styles = [];
            let style = element.getAttribute('style');
            if (style !== null) {
                styles.push(style);
            }
            if (typeof unit.options.style === 'string') {
                styles.push(unit.options.style);
            }
            for (const value of extractor.extractGlobalOptionArray('style', unit.tag, this.context.tagToGlobalOptions)) {
                if (typeof value === 'string') {
                    styles.push(value);
                }
            }
            if (styles.length > 0) {
                try {
                    element.setAttribute('style', styles.join('; '));
                }
                catch (err) {
                    console.log(err);
                }
            }
            const id = this.context.unitToId.get(unit);
            if (id !== undefined) {
                element.id = id;
            }
            for (const key in unit.options) {
                if (key === 'id' || key === 'class' || key === 'style') {
                    continue;
                }
                if (element.hasAttribute(key)) {
                    continue;
                }
                let value = unit.options[key];
                if (value === true) {
                    value = '';
                }
                else if (typeof value === 'number') {
                    value = value.toString();
                }
                if (typeof value !== 'string') {
                    continue;
                }
                if ((key.endsWith('href') || key.endsWith('src'))
                    && urls.isRelURL(value)) {
                    value = this.context.urlToAbsURL(value, unit);
                }
                try {
                    element.setAttribute(key, value);
                }
                catch (err) {
                    console.log(err);
                }
            }
            this.registerElement(element, unit);
            this.unitToCompiling.set(unit, false);
            return element;
        });
    }
    compileInline(inline) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof inline !== 'string') {
                return yield this.compileUnit(inline);
            }
            return new Text(inline);
        });
    }
    compileLine(line) {
        return __awaiter(this, void 0, void 0, function* () {
            const df = new DocumentFragment();
            for (const inline of line) {
                if (this.stop) {
                    return df;
                }
                df.append(yield this.compileInline(inline));
            }
            return df;
        });
    }
    compileInlineSTDN(stdn) {
        return __awaiter(this, void 0, void 0, function* () {
            const df = new DocumentFragment();
            for (let i = 0; i < stdn.length; i++) {
                if (this.stop) {
                    return df;
                }
                df.append(yield this.compileLine(stdn[i]));
                if (i !== stdn.length - 1) {
                    df.append(new Text('\n'));
                }
            }
            return df;
        });
    }
    compileSTDN(stdn) {
        return __awaiter(this, void 0, void 0, function* () {
            const df = new DocumentFragment();
            for (const line of stdn) {
                if (this.stop) {
                    return df;
                }
                const div = document.createElement('div');
                div.classList.add('st-line');
                df.append(div);
                div.append(yield this.compileLine(line));
                this.registerElement(div, line);
            }
            return df;
        });
    }
}
